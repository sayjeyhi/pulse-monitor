import { log } from './utils';
import Config from '../config';

export const notifier = {
  /**
   * Sends notification to all possible channels
   * @returns {Promise<void>}
   */
  async propagate({ body, $htmlBody, VALUE_TO_CHECK }) {
    log('Notifying...');
    const message = Config.HTTP.MESSAGE_FORMAT({ body, $htmlBody });
    log(body, VALUE_TO_CHECK);
  },
};
