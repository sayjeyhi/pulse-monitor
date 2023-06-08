export const log = (...params) => {
  if (process.env.DEBUG !== '1') return;
  console.log(...params);
};

export const makeHash = (data) => {
  const hasher = new Bun.CryptoHasher('md5');
  hasher.update(data, 'utf8');
  return hasher.digest('hex');
};
