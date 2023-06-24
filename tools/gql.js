import { createClient } from 'graphql-http';
import { utils } from './utils.js';

export const gql = {
  /**
   * Call graphql endpoint
   * @param url
   * @param query
   * @param headers
   * @param rest
   * @returns {Promise<string>}
   */
  async call({ url, query, headers = {}, ...rest }) {
    utils.logTitle(
      `🌎 HTTP Calling URL: ${url.replace('https://', '').replace('http://', '')}`,
      { bg: 'yellow', fg: 'black' }
    );

    try {
      const client = createClient({
        url,
        headers,
      });
      return await new Promise((resolve, reject) => {
        let result;
        client.subscribe(
          {
            query,
          },
          {
            next: (data) => (result = data),
            error: reject,
            complete: () => resolve(result),
          }
        );
      });
    } catch (e) {
      utils.log('🚫 Error while calling graphql endpoint');
      throw e;
    }
  },
};
