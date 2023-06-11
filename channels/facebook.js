import { utils } from '../tools/utils';

export const facebook = {
  validate(parms) {
    utils.log(`Validating required values`);
    const { FACEBOOK_ACCESS_TOKEN } = process.env;
    if (!FACEBOOK_ACCESS_TOKEN) {
      throw new Error(
        'FACEBOOK_ACCESS_TOKEN, FACEBOOK_APP_ID and FACEBOOK_ACCESS_TOKEN are required when using Facebook channel'
      );
    }
  },
  send({ text }) {
    utils.log(' - Sending status to Facebook...');
    const { FACEBOOK_ACCESS_TOKEN } = process.env;

    fetch(
      `https://graph.facebook.com/me/feed?message=${encodeURIComponent(
        text
      )}&access_token=${FACEBOOK_ACCESS_TOKEN}`,
      {
        method: 'POST',
      }
    )
      .then((response) => {
        utils.log('Status posted successfully on Facebook!');
      })
      .catch((error) => {
        console.error(
          'Error posting to Facebook:',
          error.response.data.error.message
        );
      });
  },
};
