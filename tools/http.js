import { utils } from './utils.js';

export const http = {
  name: 'http',
  /**
   * Call URL
   * @param URL
   * @param METHOD
   * @param HEADERS
   * @param rest
   * @returns {Promise<string>}
   */
  async call({ URL, METHOD = 'GET', HEADERS = {} }) {
    utils.logTitle(
      `🌎 HTTP Calling URL: ${URL.replace('https://', '').replace('http://', '')}`,
      { bg: 'yellow', fg: 'black' }
    );
    try {
      const response = await fetch(URL, {
        method: METHOD,
        headers: HEADERS,
      });
      return await response.text();
    } catch (e) {
      utils.log('🚫 Error calling URL!');
      throw e;
    }
  },
};
