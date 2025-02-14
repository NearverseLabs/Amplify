/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import AllyToken from 'App/Models/AllyToken'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Env from '@ioc:Adonis/Core/Env'
import { alice, backend } from 'App/Handlers/Actor'
import { Principal } from '@dfinity/principal'
import Logger from '@ioc:Adonis/Core/Logger'

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/twitter/user/:username', async ({ request }) => {
  const user = await User.query().where('username', request.param('username')).firstOrFail()
  return { user_avatar: user.avatar_url }
})

Route.get('/twitter/redirect/:principal', async ({ ally, request, session }) => {
  session.put('my-address', request.param('principal'))
  return ally.use('twitter_v2').redirect()
})


Route.get('/twitter/callback', async ({ ally, response, session, auth }) => {
  const twitter = ally.use('twitter_v2')

  /**
   * User has explicitly denied the login request
   */
  response.abortIf(twitter.accessDenied(), 'Access was denied', 401)

  /**
   * Unable to verify the CSRF state
   */
  response.abortIf(twitter.stateMisMatch(), 'Request expired. Retry again', 401)

  /**
   * There was an unknown error during the redirect
   */
  response.abortIf(twitter.hasError(), twitter.getError(), 401)

  /**
   * Finally, access the user
   */
  const twitterUser = await twitter.user()

  // if(!twitterUser.email || !twitterUser.name || !twitterUser.token.token || !twitterUser.emailVerificationState) {
  //   response.abort("Something went wrong", 401)
  //   return
  // }
  console.log('twitterUser', twitterUser)
  const address = session.get('my-address')
  response.abortIf(!address, 'Invalid Address', 422)
  const backendActor = backend(
    Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
    alice,
    Env.get('ICP_HOST')
  )
  try {
    const done = await backendActor.get_user(Principal.fromText(address))
    Logger.info(`get_user response ${done}, ${address}`)
    if ('Err' in done) {
      if (done.Err) throw Error(`Register Failed: ${done.Err}`)
    }
    if ('Ok' in done) {
      if (!done.Ok) throw Error(`Register Failed: Something went wrong`)
      // if (done.Ok.twitter_username !== twitterUser.nickName || done.Ok.id.toString() !== address)
      //   throw Error(`Login Failed: Username & wallet address is not matching`)
    }
  } catch (e) {
    if (e?.message !== 'Login Failed: Username & wallet address is not matching') {
      const done = await backendActor.register_user({
        openchat_principal: [],
        taggr_principal: [],
        name: twitterUser.name,
        // twitter_username: twitterUser.nickName,
        id: Principal.fromText(address),
      })
      if ('Err' in done) {
        response.abortIf(done.Err, `Register Failed: ${done.Err}`, 422)
      }
      if ('Ok' in done) {
        response.abortIf(!done.Ok, `Register Failed: Something went wrong`, 422)
      }
    } else {
      throw e
    }
  }
  const user = await User.updateOrCreate(
    {
      username: twitterUser.nickName,
    },
    {
      address: address,
      email: twitterUser.email || '',
      name: twitterUser.name || twitterUser.nickName,
      username: twitterUser.nickName,
      avatar_url: twitterUser.avatarUrl,
      account_id: twitterUser.id,
      // twitter_access_token: twitterUser.token.token,
      // email_verified_at:
      //   twitterUser.emailVerificationState === 'verified' ? DateTime.now() : undefined,
    }
  )
  response.abortIf(
    user.address !== address,
    `Login Failed: Wrong Address. Expected address ${user.address}`,
    422
  )

  await AllyToken.updateOrCreate(
    {
      user_id: user.id,
    },
    {
      driver: 'twitter_v2',
      token: twitterUser.token.token,
      type: twitterUser.token.type,
      refreshToken: twitterUser.token.refreshToken,
      expires_at: DateTime.now().plus({
        seconds: twitterUser.token.expiresIn,
      }),
      // secret: twitterUser.token.secret,
    }
  )

  /**
   * Login user using the web guard
   */
  await auth.use('web').login(user)
  return response.redirect(Env.get('TWITTER_FRONTEND_REDIRECT_URL'))
})

Route.get('/user', async ({ auth, response }) => {
  const token = await AllyToken.query()
    .where('user_id', auth.user!.id)
    .where('expires_at', '>', DateTime.now().toJSDate())
    .first()
  if (!token) {
    return response.abort('Please login again', 403)
  }

  return { user: auth.user }
}).middleware('auth')

Route.get('/test-auth', async ({ auth }) => {
  const user = await User.query().where('username', 'DeshmukhBhavesh').first()
  if (user) {
    await auth.use('web').login(user)

    return { user: user }
  }
})

Route.get('/update-address', async ({ auth, request }) => {
  const user = auth!.user
  if (user) {
    const { address } = request.qs()
    user.merge({
      address,
    })
    await user.save()
  }
}).middleware('auth')

Route.get('/update-username', async ({ auth, response, request }) => {
  const user = auth!.user
  if (user) {
    const backendActor = backend(
      Env.get('CANISTER_ID_AMPLIFY_SC_RUST_BACKEND'),
      alice,
      Env.get('ICP_HOST')
    )
    const { username } = request.qs()

    const done = await backendActor.update_user({
      openchat_principal: [],
      taggr_principal: [],
      name: username,
      // twitter_username: username,
      id: Principal.fromText(user.address),
    })
    if ('Err' in done) {
      response.abortIf(done.Err, `Register Failed: ${done.Err}`, 422)
    }
    if ('Ok' in done) {
      response.abortIf(!done.Ok, `Register Failed: Something went wrong`, 422)
    }
    response.json({ success: true })
  }
}).middleware('auth')

Route.get('/campaigns', 'CampaignsController.index')
Route.post('/campaigns', 'CampaignsController.create')
Route.post('/participate', 'CampaignsController.participate')
Route.get('/winners/:campaign_id', 'CampaignsController.winners')
