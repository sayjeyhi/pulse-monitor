import { utils } from '../tools/utils';
import Config from '../config';

export const telegram = {
  validate(parms) {
    utils.log(`Validating required values`);

    const { TELEGRAM_BOT_TOKEN } = process.env;
    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is required when using Telegram channel');
    }
  },
  async send({ text, to }) {
    if (!to || !to.length) to = Config.TELEGRAM.CHAT_IDS;

    utils.log(`Sending message to telegram: ${to.join(',')}`);
    try {
      to.map(async (chat_id) => {
        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}`,
          {
            method: 'GET',
          }
        );

        // todo: increase hits or add
      });
    } catch (e) {
      utils.log('Error sending Telegram message: ', e.message);
    }
  },
  async _giveChatId() {
    utils.log(`Getting updates`);
    const updates = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getUpdates`,
      {
        method: 'GET',
      }
    );
    const res = await updates.json();

    utils.log(`Got telegram update: ${JSON.stringify(res.ok)}`);

    return res;
  },
};
