/**
 * @typedef {import('./types').Types}
 */
module.exports = {
  DEBUG: true,
  CACHE_KEY_PREFIX: 'pulse-cache',
  CHECKER: {
    URL: 'http://localhost:3000',
    METHOD: 'GET',
    SCENARIO: 'SELECTOR_DOES_NOT_EXIST', // RESPONSE_EQUAL:value, RESPONSE_NOT_EQUAL:value, SELECTOR_VALUE_IS:value, SELECTOR_VALUE_IS_NOT:value, SELECTOR_VALUE_IS_LOWER_THAN:value, SELECTOR_VALUE_IS_HIGHER_THAN:value, SELECTOR_DOES_NOT_EXIST, FAILURE_SELECTOR_EXISTS
    NOTIFY_SCENARIO_FAILURES: true,
    MESSAGE_FORMAT: (title, url, $body) => `
      ${title}\n\n
      ${url}\n\n
      ${$body.find('h1').text().replace(/\\r?\\n|\\r|\\t/gm, "").trim()}
    `,
    PARSE_MODE: 'TEXT', // TEXT, HTML, JSON
    HTML: {
      SELECTOR_PATH: '#some_id > .class',
      FAILURE_SELECTOR: '#some_id > .class', // only used if SCENARIO is FAILURE_SELECTOR_EXISTS
    },
    JSON: {
      SELECTOR_PATH: '.price',
      FAILURE_SELECTOR: '', // only used if SCENARIO is FAILURE_SELECTOR_EXISTS
    },
    TEXT: {
      CONTENT: 'value',
      FAILURE_CONTENT: 'value', // only used if SCENARIO is FAILURE_SELECTOR_EXISTS
    },
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
  }
};