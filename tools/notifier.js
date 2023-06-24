import { utils } from './utils.js';
import Config from '../config.js';
import * as channels from '../channels/index.js';

export const notifier = {
  /**
   * Sends notification to all possible channels
   * @returns {Promise<void>}
   */
  async propagate(params) {
    utils.logTitle('💬 Generating message with message fn', {
      bg: 'blue',
      fg: 'black',
    });
    utils.logSecondary(' Params:');
    utils.logSecondary('   expectedValue: ' + params.expectedValue);
    utils.logSecondary('   jsonSelectorValue: ' + params.jsonSelectorValue);
    utils.logSecondary(
      '   text: ' + (params?.response.toString() || '').substring(0, 100)
    );

    const message = params.formatter({ ...params });
    for (const channel in channels) {
      try {
        if (Config[channel.toUpperCase()] && Config[channel.toUpperCase()].ENABLED) {
          utils.logLineBreak();
          utils.logTitle(`📣 Notifying ${channel}...`);
          utils.logSecondary(`️ - Validating...`);
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
