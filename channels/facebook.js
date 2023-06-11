import { utils } from '../tools/utils.js';

export const facebook = {
  validate(parms) {
    const { FACEBOOK_ACCESS_TOKEN } = process.env;
    if (!FACEBOOK_ACCESS_TOKEN) {
      throw new Error(
        'FACEBOOK_ACCESS_TOKEN, FACEBOOK_APP_ID and FACEBOOK_ACCESS_TOKEN are required when using Facebook channel'
      );
    }
  },
  async send({ text }) {
    const { FACEBOOK_ACCESS_TOKEN } = process.env;

    await fetch(
      `https://graph.facebook.com/me/feed?message=${encodeURIComponent(
        text
      )}&access_token=${FACEBOOK_ACCESS_TOKEN}`,
      {
        method: 'POST',
      }
    );
  },
};
