import { createClient } from 'graphql-http';
import { utils } from './utils.js';

export const gql = {
  name: 'graphql',
  /**
   * Call graphql endpoint
   * @param URL
   * @param QUERY
   * @param HEADERS
   * @param rest
   * @returns {Promise<string>}
   */
  async call({ URL, QUERY, HEADERS = {}, ...rest }) {
    utils.logTitle(
      `🌎 GRAPHQL Calling URL: ${URL.replace('https://', '').replace(
        'http://',
        ''
      )}`,
      { bg: 'yellow', fg: 'black' }
    );

    try {
      const client = createClient({
        url: URL,
        headers: HEADERS,
      });
      return await new Promise((resolve, reject) => {
        let result;
        client.subscribe(
          {
            query: QUERY,
            variables: rest.VARIABLES || {},
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
