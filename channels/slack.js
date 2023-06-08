import * as cheerio from 'cheerio';
import { log } from './utils';

export default {
  /**
   * Load selector
   * @param bodyContent
   * @returns {Promise<CheerioAPI>}
   */
  async loadHtmlSelector(bodyContent) {
    try {
      return cheerio.load(bodyContent);
    } catch (e) {
      log('Error loading page:', e.message);
    }
  },
};
