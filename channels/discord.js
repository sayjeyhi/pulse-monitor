import { utils } from '../tools/utils';

export const sms = {
  validate(parms) {
    utils.log(`Validating required values`);
    const { DISCORD_WEBHOOK_URL } = process.env;
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is required when using Discord channel');
    }
  },
  send({ text }) {
    utils.log(' - Sending message to discord...');

    fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text,
      }),
    })
      .then((response) => {
        utils.log(`Status: ${response.status}`);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  },
};
