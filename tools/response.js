import * as cheerio from 'cheerio';
import get from 'lodash-es/get';
import { utils } from './utils';

export const response = {
  /**
   * Load HTML and return cheerio object
   * @param bodyContent
   * @param selector
   * @returns {Promise<*>}
   */
  async parseHtml(bodyContent, selector) {
    try {
      utils.log('Parsing HTML:', bodyContent.substring(0, 100), '...');
      utils.log('With selector::', selector);
      const $ = await cheerio.load(bodyContent);
      return $(selector);
    } catch (e) {
      utils.log('Error loading page:', e.message);
    }
  },
  /**
   * Load JSON and return getter function
   * @param bodyContent
   * @param selector
   * @returns {*}
   */
  parseJson(bodyContent, selector) {
    try {
      utils.log('Parsing JSON:', bodyContent.substring(0, 100), '...');
      utils.log('With selector::', selector);
      const jsonObject = JSON.parse(bodyContent);
      return get(jsonObject, selector, 'NOT_EXIST_VALUE');
    } catch (e) {
      utils.log('Error loading page:', e.message);
    }
  },
};
