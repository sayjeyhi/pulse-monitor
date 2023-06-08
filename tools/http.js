import { utils } from './utils';

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
    utils.log(`HTTP Calling URL: ${url}`);
    const response = await fetch(url, {
      method,
      headers,
      ...rest,
    });
    return await response.text();
  },
};
