import Config from '../config.js';
import { cliColours } from '../constants/cliColors.js';

export const utils = {
  printLogo() {
    console.log(`

 ______ __  __  __      ______  ______       __    __  ______  __   __  __  ______ ______  ______    
/\\  == /\\ \\/\\ \\/\\ \\    /\\  ___\\/\\  ___\\     /\\ "-./  \\/\\  __ \\/\\ "-.\\ \\/\\ \\/\\__  _/\\  __ \\/\\  == \\   
\\ \\  _-\\ \\ \\_\\ \\ \\ \\___\\ \\___  \\ \\  __\\     \\ \\ \\-./\\ \\ \\ \\/\\ \\ \\ \\-.  \\ \\ \\/_/\\ \\\\ \\ \\/\\ \\ \\  __<   
 \\ \\_\\  \\ \\_____\\ \\_____\\/\\_____\\ \\_____\\    \\ \\_\\ \\ \\_\\ \\_____\\ \\_\\\\"\\_\\ \\_\\ \\ \\_\\\\ \\_____\\ \\_\\ \\_\\ 
  \\/_/   \\/_____/\\/_____/\\/_____/\\/_____/     \\/_/  \\/_/\\/_____/\\/_/ \\/_/\\/_/  \\/_/ \\/_____/\\/_/ /_/ 
                                                                                                     

    
`);
    utils.logSecondary(`- version: ${Config.VERSION}\n\n`);
  },
  log(...params) {
    if (!Config.DEBUG) return;
    console.log(' ', ...params);
  },
  logTitle(title, { bg, fg } = { bg: 'black', fg: 'white' }) {
    if (!Config.DEBUG) return;
    console.log(cliColours.bg[bg], cliColours.fg[fg], title, cliColours.reset);
  },
  logSecondary(text) {
    if (!Config.DEBUG) return;
    console.log(cliColours.fg.gray, text, cliColours.reset);
  },
  logLineBreak() {
    utils.logSecondary('----------------------------------');
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
