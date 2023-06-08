export const utils = {
  log(...params) {
    if (process.env.DEBUG !== '1') return;
    console.log(...params);
  },
  makeHash(data) {
    const hasher = new Bun.CryptoHasher('md5');
    hasher.update(data, 'utf8');
    return hasher.digest('hex');
  },
  isGithub() {
    return process.env.GITHUB_EVENT_NAME === 'schedule';
  },
};
