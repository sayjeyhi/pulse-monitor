import fetch2 from 'node-fetch';

export const environment = {
  isBun() {
    return typeof process.env.BUN_ENV !== 'undefined';
  },
  loadPolyfills() {
    if (this.isBun()) return;

    // eslint-disable-next-line no-undef
    global.fetch = fetch2;
  },
};
