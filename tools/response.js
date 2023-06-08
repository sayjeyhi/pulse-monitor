import * as cheerio from 'cheerio';
import get from 'lodash-es/get';
import { utils } from './utils';

export const response = {
  /**
   * Load selector
   * @param bodyContent
   * @returns {Promise<CheerioAPI>}
   */
  async parseHtml(bodyContent) {
    try {
      return cheerio.load(bodyContent);
    } catch (e) {
      utils.log('Error loading page:', e.message);
    }
  },
  /**
   * Parse JSON
   * @param bodyContent
   * @returns {Promise<function(*, *): *>}
   */
  async parseJson(bodyContent) {
    try {
      const jsonObject = JSON.parse(bodyContent);
      return (path, defaultValue) => get(jsonObject, path, [defaultValue]);
    } catch (e) {
      utils.log('Error loading page:', e.message);
    }
  },
};
