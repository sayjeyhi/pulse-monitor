import Config from '../config';

export const utils = {
  printLogo() {
    console.log(`
  ____        _            __  __             _ _             
 |  _ \\ _   _| |___  ___  |  \\/  | ___  _ __ (_| |_ ___  _ __ 
 | |_) | | | | / __|/ _ \\ | |\\/| |/ _ \\| '_ \\| | __/ _ \\| '__|
 |  __/| |_| | \\__ |  __/ | |  | | (_) | | | | | || (_) | |   
 |_|    \\__,_|_|___/\\___| |_|  |_|\\___/|_| |_|_|\\__\\___/|_|   
    
 - version: ${Config.VERSION}   
 ===============================================================`);
  },
  log(...params) {
    if (!Config.DEBUG) return;
    console.log(' ', ...params);
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
