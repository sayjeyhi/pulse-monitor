import { utils } from './utils';
import Config from '../config';
import * as channels from '../channels';

export const notifier = {
  /**
   * Sends notification to all possible channels
   * @returns {Promise<void>}
   */
  async propagate(params) {
    utils.log('💬 Notifying with params:');
    utils.log(' ️ - expectedValue:', params.expectedValue);
    utils.log('   - jsonSelectorValue:', params.jsonSelectorValue);
    utils.log(
      ' ️ - htmlSelectorValue:',
      params.$selectedHtml.text().substring(0, 100) + '...'
    );
    utils.log('   - text:', params.response.substring(0, 100) + '...');

    const message = Config.HTTP.MESSAGE_FORMAT({ ...params, Config });
    utils.log('➡️ Message: "');
    console.log(message + '"');

    utils.log('----------------------------------');
    for (const channel in channels) {
      if (Config[channel.toUpperCase()] && Config[channel.toUpperCase()].ENABLED) {
        utils.log(`📣 Notifying ${channel}...`);
        await channels[channel].send(message);
      }
    }
  },
};
