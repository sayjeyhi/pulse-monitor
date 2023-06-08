/**
 * @typedef Types
 * @type {{CACHE_KEY_PREFIX: string, SLACK: {CHANNEL_ID: string, ENABLED: boolean}, WEBHOOK: {CALL_URL: string, FAILURE_CALL_URL: string, ENABLED: boolean}, EMAIL: {FAILURE_SUBJECT: string, PORT: number, HOST: string, SECURE: boolean, SUBJECT: string, TO: string[]}, DEBUG: boolean, TWITTER: {ENABLED: boolean}, CHECKER: {MESSAGE_FORMAT: (function(*, *, *): string), METHOD: string, PARSE_MODE: string, HTML: {FAILURE_SELECTOR: string, SELECTOR_PATH: string}, JSON: {FAILURE_SELECTOR: string, SELECTOR_PATH: string}, TEXT: {FAILURE_CONTENT: string, CONTENT: string}, SCENARIO: string, NOTIFY_SCENARIO_FAILURES: boolean, URL: string}, TELEGRAM: {CHAT_IDS: string[], ENABLED: boolean}}}
 */
export const Types =  {}