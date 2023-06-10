import { utils } from '../tools/utils';

export const facebook = {
  validate(parms) {
    utils.log(`Validating required values`);
  },
  send({ text, html }) {
    utils.log(' - Sending message to Facebook...');
  },
};
