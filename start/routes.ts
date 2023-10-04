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
import User from "App/Models/User";
import {DateTime} from "luxon";
import AllyToken from "App/Models/AllyToken";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";
import Env from "@ioc:Adonis/Core/Env";


Route.get('health', async ({response}) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/twitter/redirect', async ({ ally }) => {
  return ally.use('twitter_v2').redirect()
})

Route.get('/twitter/callback', async ({ ally, response, auth }) => {
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

  const user = await User.firstOrCreate({
    email: twitterUser.email || '',
  }, {
    name: twitterUser.name || twitterUser.nickName,
    avatar_url: twitterUser.avatarUrl,
    // twitter_access_token: twitterUser.token.token,
    email_verified_at: DateTime.now()
  })

  await AllyToken.create({
    user_id: user.id,
    driver: 'twitter_v2',
    token: twitterUser.token.token,
    type: twitterUser.token.type,
    refreshToken: twitterUser.token.refreshToken,
    expires_at: DateTime.now().plus({
      seconds: twitterUser.token.expiresIn
    }),
    // secret: twitterUser.token.secret,
  })

  /**
   * Login user using the web guard
   */
  await auth.use('web').login(user)
  return response.redirect(Env.get('TWITTER_FRONTEND_REDIRECT_URL'))
})

Route.get('/user', async ({auth}) => {
  return { user: auth.user }
}).middleware('auth')
