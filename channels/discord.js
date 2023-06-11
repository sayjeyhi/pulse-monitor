import { utils } from '../tools/utils.js';

export const discord = {
  validate(parms) {
    const { DISCORD_WEBHOOK_URL } = process.env;
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK_URL is required when using Discord channel');
    }
  },
  async send({ text }) {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text,
      }),
    });
  },
};
