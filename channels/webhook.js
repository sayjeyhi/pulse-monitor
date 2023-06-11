import { http } from '../tools/http';
import { utils } from '../tools/utils';

export const webhook = {
  validate(parms) {
    utils.log(`➡️  Validating...`);
    const { WEBHOOK_URL, WEBHOOK_X_API_KEY } = process.env;
    if (!WEBHOOK_URL || !WEBHOOK_X_API_KEY) {
      throw new Error(
        'WEBHOOK_URL and WEBHOOK_X_API_KEY are required when using Webhook channel'
      );
    }
  },
  async send({ text, html }) {
    await http.call({
      url: process.env.WEBHOOK_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.WEBHOOK_X_API_KEY,
      },
      body: JSON.stringify({
        text,
        html,
      }),
    });
  },
};
