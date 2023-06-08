import * as cheerio from 'cheerio';
import { log } from './utils';

export const response = {
  /**
   * Load selector
   * @param bodyContent
   * @returns {Promise<CheerioAPI>}
   */
  async parse(bodyContent) {
    try {
      return cheerio.load(bodyContent);
    } catch (e) {
      log('Error loading page:', e.message);
    }
  },
};
