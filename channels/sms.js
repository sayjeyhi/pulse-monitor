import { utils } from '../tools/utils';

export const sms = {
  validate(parms) {
    utils.log(`Validating required values`);
  },
  send({ text, html }) {
    utils.log(' - Sending SMS...');
  },
};
