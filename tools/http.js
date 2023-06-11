import { utils } from './utils.js';

export const http = {
  /**
   * Call URL
   * @param url
   * @param method
   * @param headers
   * @param rest
   * @returns {Promise<string>}
   */
  async call({ url, method = 'GET', headers = {}, ...rest }) {
    utils.logTitle(
      `🌎 HTTP Calling URL: ${url.replace('https://', '').replace('http://', '')}`,
      { bg: 'yellow', fg: 'black' }
    );
    try {
      const response = await fetch(url, {
        method,
        headers,
        ...rest,
      });
      return await response.text();
    } catch (e) {
      utils.log('🚫 Error calling URL!');
      throw e;
    }
  },
};
