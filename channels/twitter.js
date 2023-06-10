import { utils } from '../tools/utils';

export const twitter = {
  validate(parms) {
    utils.log(`Validating required values`);
  },
  send({ text, html }) {
    utils.log(' - Sending tweet...');
  },
};
