import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Campaign from "App/Models/Campaign";
import {DateTime} from "luxon";

export default class extends BaseSeeder {
  public async run () {
    const dummyData = [
      {
        project_name: 'Project 1',
        tweet_id: 'https://twitter.com/ICbicycle/status/1762762814257524821',
        winners: 3,
        reward_token: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
        reward: '100',
        requirements: {
          follow: true,
          like: true,
          retweet: true,
          quote_retweet: false,
          tweet_reply: true,
        },
        startsAt: DateTime.fromMillis(Date.now()),
        endsAt: DateTime.fromMillis(Date.now() + 86400000),
      },
      {
        project_name: 'Project 2',
        tweet_id: 'https://twitter.com/cosmicrafts/status/1762885373305258344',
        winners: 2,
        reward_token: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
        reward: '50',
        requirements: {
          follow: false,
          like: true,
          retweet: true,
          quote_retweet: true,
          tweet_reply: false,
        },
        startsAt: DateTime.fromMillis(Date.now() + 86400000),
        endsAt: DateTime.fromMillis(Date.now() + 172800000),
      },
      {
        project_name: 'Project 3',
        tweet_id: 'https://twitter.com/vrive058/status/1762470013234016331',
        winners: 2,
        reward_token: 'bkyz2-fmaaa-aaaaa-qaaaq-cai',
        reward: '50',
        requirements: {
          follow: false,
          like: true,
          retweet: true,
          quote_retweet: true,
          tweet_reply: false,
        },
        startsAt: DateTime.fromMillis(Date.now() - 86400000),
        endsAt: DateTime.fromMillis(Date.now()),
      },
      // Add more objects as needed
    ];
    for (const dummyDatum of dummyData) {
      await Campaign.updateOrCreate({
        project_name: dummyDatum.project_name
      }, dummyDatum)
    }
  }
}
