/**
 * Contract source: https://git.io/JOdiQ
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

declare module '@ioc:Adonis/Addons/Ally' {
	import {TwitterV2, TwitterV2Config} from "@bahdcoder/ally-twitter-v2";

  interface SocialProviders {
    twitter_v2: {
      config: TwitterV2Config
      implementation: TwitterV2
    }
  }
}
