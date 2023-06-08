import * as cheerio from 'cheerio';
import { log } from './utils';

/**
 * EMAIL: {
 *   HOST: 'smtp.gmail.com',
 *   PORT: 465,
 *   SECURE: true,
 *   SUBJECT: 'New Items',
 *   FAILURE_SUBJECT: 'New Items',
 *   TO: ['your@email.com', 'another@email.com'],
 * },
 */
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
