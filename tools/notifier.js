import { utils } from './utils.js';
import Config from '../config.js';
import * as channels from '../channels/index.js';

export const notifier = {
  /**
   * Sends notification to all possible channels
   * @returns {Promise<void>}
   */
  async propagate(params) {
    utils.log('💬 Notifying with params:');
    utils.log(' - expectedValue:', params.expectedValue);
    utils.log(' - jsonSelectorValue:', params.jsonSelectorValue);
    utils.log(
      ' - htmlSelectorValue:',
      params.$selectedHtml.text().substring(0, 100) + '...'
    );
    utils.log(' - text:', params.response.substring(0, 100) + '...');

    const message = params.formatter({ ...params });
    for (const channel in channels) {
      try {
        if (Config[channel.toUpperCase()] && Config[channel.toUpperCase()].ENABLED) {
          utils.logLineBreak();
          utils.logTitle(`📣 Notifying ${channel}...`);
          await channels[channel].validate({ text: message });
          await channels[channel].send({ text: message });
          utils.log(`🎉 ${channel} message sent`);
        }
      } catch (e) {
        utils.log(` - ❌  ${e.message}`);
      }
    }
  },
};
