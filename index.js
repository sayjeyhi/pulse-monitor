import dotenv from 'dotenv';
import { response } from './tools/response';
import { notifier } from './tools/notifier';
import { http } from './tools/http';
import { scenarioHandlers } from './constants/scenarioHandlers';
import Config from './config';

dotenv.config();

const PulseMonitor = {
  async http({
    METHOD,
    URL,
    PARSE_MODE,
    JSON_SELECTOR,
    HTML_SELECTOR,
    SCENARIO,
    VALUE_TO_CHECK,
  }) {
    const responseText = await http.call({
      url: URL,
      method: METHOD,
    });

    let $selectedHtml; // cheerio object
    let jsonValue; // json path value

    if (PARSE_MODE === 'HTML') {
      if (!HTML_SELECTOR) {
        throw new Error('HTML_SELECTOR is required when using HTML parse mode');
      }
      $selectedHtml = await response.parseHtml(responseText, HTML_SELECTOR);
    } else if (PARSE_MODE === 'JSON') {
      if (!JSON_SELECTOR) {
        throw new Error('JSON_SELECTOR is required when using JSON parse mode');
      }
      jsonValue = response.parseJson(responseText, JSON_SELECTOR);
    }

    const handler = scenarioHandlers[SCENARIO];
    const params = {
      expectedValue: VALUE_TO_CHECK,
      response: responseText,
      $selectedHtml,
      htmlSelectorContent: $selectedHtml.text(),
      jsonSelectorValue: jsonValue,
    };

    /**
     * If we have the needed conditions, propagate the notification
     */
    if (handler && handler(params)) {
      await notifier.propagate(params);
    }
  },
};

PulseMonitor.http(Config.HTTP);
