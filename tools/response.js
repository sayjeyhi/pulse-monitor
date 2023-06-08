import { log } from './utils';
import { callUrl } from './load';
import * as cheerio from 'cheerio';

export default {
  async loadSelector(bodyContent) {
    try {
      const body = await callUrl(bodyContent);
      return cheerio.load(body);
    } catch (e) {
      log('Error loading page:', e.message);
    }
  },
};
