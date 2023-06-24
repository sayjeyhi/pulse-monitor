import { scenarios } from './constants/scenarios.js';
import { parseModes } from './constants/parseModes.js';

/**
 * @type {{CACHE_KEY_PREFIX: string, SLACK: {CHANNEL_ID: string, ENABLED: boolean}, WEBHOOK: {CALL_URL: string, FAILURE_CALL_URL: string, ENABLED: boolean}, EMAIL: {FAILURE_SUBJECT: string, PORT: number, HOST: string, SECURE: boolean, SUBJECT: string, TO: string[]}, DEBUG: boolean, TWITTER: {ENABLED: boolean}, CHECKER: {MESSAGE_FORMAT: (function(*, *, *): string), METHOD: string, PARSE_MODE: string, HTML: {FAILURE_SELECTOR: string, SELECTOR_PATH: string}, JSON: {FAILURE_SELECTOR: string, SELECTOR_PATH: string}, TEXT: {FAILURE_CONTENT: string, CONTENT: string}, SCENARIO: string, NOTIFY_SCENARIO_FAILURES: boolean, URL: string}, TELEGRAM: {CHAT_IDS: string[], ENABLED: boolean}}}
 */
export default {
  DEBUG: true,
  CACHE_KEY_PREFIX: 'pulse-cache',
  NOTIFY_SCENARIO_FAILURES: true,
  HTTP: [
    {
      ENABLED: false,
      URL: 'https://google.com',
      METHOD: 'GET',
      PARSE_MODE: parseModes.HTML,
      HTML_SELECTOR: 'title',
      JSON_SELECTOR: '.property[0].to.check',
      VALUE_TO_CHECK: 'some value to be checked', // if you want to check selector value
      SCENARIO: scenarios.RESPONSE_NOT_CONTAINS,
      HEADERS: {},
      MESSAGE_FORMATTER: ({
        CONFIG,
        expectedValue,
        response,
        $selectedHtml,
        jsonSelectorValue,
      }) => `${CONFIG.URL}\n` + `${$selectedHtml.text().substring(0, 100)}\n`,
      FAILURE_MESSAGE_FORMATTER: ({
        CONFIG,
        expectedValue,
        response,
        $selectedHtml,
        jsonSelectorValue,
      }) => `${CONFIG.URL}\n` + `${$selectedHtml.text().substring(0, 100)}\n`,
    },
  ],
  GRAPHQL: [
    {
      ENABLED: true,
      URL: 'https://spacex-production.up.railway.app/',
      QUERY: `
      query ExampleQuery {
        company {
          ceo
        }
        roadster {
          apoapsis_au
        }
      }
      `,
      VARIABLES: {},
      JSON_SELECTOR: 'data.company.ceo',
      VALUE_TO_CHECK: 'Elon Musk', // if you want to check selector value
      SCENARIO: scenarios.JSON_SELECTOR_CONTENT_EQUAL,
      HEADERS: {},
      MESSAGE_FORMATTER: ({ CONFIG, expectedValue, response, jsonSelectorValue }) =>
        `${CONFIG.URL}\n` + `${jsonSelectorValue}\n`,
      FAILURE_MESSAGE_FORMATTER: ({
        CONFIG,
        expectedValue,
        response,
        jsonSelectorValue,
      }) => `${CONFIG.URL}\n` + `${jsonSelectorValue}\n`,
    },
  ],
  EMAIL: {
    ENABLED: false,
    HOST: 'smtp.gmail.com',
    PORT: 465,
    SECURE: true,
    SUBJECT: 'New Items',
    TO: ['your@email.com', 'another@email.com'],
  },
  WEBHOOK: {
    ENABLED: false,
    METHOD: 'POST',
  },
  TELEGRAM: {
    ENABLED: true,
    CHAT_IDS: ['YOUR_TELEGRAM_CHAT_ID'],
  },
  FACEBOOK: {
    ENABLED: true,
  },
  SLACK: {
    ENABLED: false,
    CHANNEL_ID: 'YOUR_SLACK_CHANNEL_ID',
  },
  SMS: {
    ENABLED: false,
  },
  TWITTER: {
    ENABLED: false,
  },
  WHATSAPP: {
    ENABLED: false,
  },
  VERSION: '1.0.0',
};
