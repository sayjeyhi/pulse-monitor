import { log } from './utils';

const fetch = require('node-fetch');
const cheerio = require('cheerio');

export const callUrl = async ({ url, method = 'GET', headers = {} }) => {
  log(`Calling URL: ${url}`);
  const response = await fetch(url, {
    method,
    headers,
  });
  return await response.text();
};
