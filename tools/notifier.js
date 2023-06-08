import { utils } from './utils';
import Config from '../config';

export const notifier = {
  /**
   * Sends notification to all possible channels
   * @returns {Promise<void>}
   */
  async propagate(params) {
    utils.log('Notifying...', params);
    const message = Config.HTTP.MESSAGE_FORMAT({ ...params, Config });
    utils.log('Message:', message);
  },
};
