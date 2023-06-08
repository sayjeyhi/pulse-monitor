import { scenarios } from './constants/scenarios';
import { parseModes } from './constants/parseModes';

/**
 * @type {{CACHE_KEY_PREFIX: string, SLACK: {CHANNEL_ID: string, ENABLED: boolean}, WEBHOOK: {CALL_URL: string, FAILURE_CALL_URL: string, ENABLED: boolean}, EMAIL: {FAILURE_SUBJECT: string, PORT: number, HOST: string, SECURE: boolean, SUBJECT: string, TO: string[]}, DEBUG: boolean, TWITTER: {ENABLED: boolean}, CHECKER: {MESSAGE_FORMAT: (function(*, *, *): string), METHOD: string, PARSE_MODE: string, HTML: {FAILURE_SELECTOR: string, SELECTOR_PATH: string}, JSON: {FAILURE_SELECTOR: string, SELECTOR_PATH: string}, TEXT: {FAILURE_CONTENT: string, CONTENT: string}, SCENARIO: string, NOTIFY_SCENARIO_FAILURES: boolean, URL: string}, TELEGRAM: {CHAT_IDS: string[], ENABLED: boolean}}}
 */
export default {
  DEBUG: true,
  CACHE_KEY_PREFIX: 'pulse-cache',
  NOTIFY_SCENARIO_FAILURES: true,
  HTTP: {
    URL: 'https://google.com',
    METHOD: 'GET',
    PARSE_MODE: parseModes.TEXT,
    HTML_SELECTOR: '#some_id > .class',
    JSON_SELECTOR: '.price',
    VALUE_TO_CHECK: 'some value to be checked', // if you want to check selector value
    SCENARIO: scenarios.RESPONSE_CONTAINS,
    MESSAGE_FORMAT: ({ url, $body }) => `
      ${url}\n\n
      ${$body
        .find('h1')
        .text()
        .replace(/\\r?\\n|\\r|\\t/gm, '')
        .trim()}
    `,
  },
  EMAIL: {
    HOST: 'smtp.gmail.com',
    PORT: 465,
    SECURE: true,
    SUBJECT: 'New Items',
    FAILURE_SUBJECT: 'New Items',
    TO: ['your@email.com', 'another@email.com'],
  },
  TELEGRAM: {
    ENABLED: false,
    CHAT_IDS: ['YOUR_TELEGRAM_CHAT_ID'],
  },
  SLACK: {
    ENABLED: false,
    CHANNEL_ID: 'YOUR_SLACK_CHANNEL_ID',
  },
  WEBHOOK: {
    ENABLED: false,
    CALL_URL: 'YOUR_WEBHOOK_URL',
    FAILURE_CALL_URL: 'YOUR_FAILURE_WEBHOOK_URL',
  },
  TWITTER: {
    ENABLED: false,
  },
};
