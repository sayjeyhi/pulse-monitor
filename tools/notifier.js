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
    utils.log(' - expectedValue:', params.expectedValue);
    utils.log(' - jsonSelectorValue:', params.jsonSelectorValue);
    utils.log(
      ' - htmlSelectorValue:',
      params.$selectedHtml.text().substring(0, 100) + '...'
    );
    utils.log(' - text:', params.response.substring(0, 100) + '...');

    const message = params.formatter({ ...params });
    utils.log('➡️ Message: "');
    console.log(message + '"');

    utils.logLineBreak();
    for (const channel in channels) {
      utils.log(`📣 Notifying ${channel}...`);
      if (Config[channel.toUpperCase()] && Config[channel.toUpperCase()].ENABLED) {
        await channels[channel].send({ text: message });
      } else {
        utils.log(' - ❌  Channel disabled');
      }
    }
  },
};
