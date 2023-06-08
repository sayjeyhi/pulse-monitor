require('dotenv').config();

import { response } from './tools/response';
import { notifier } from './tools/notifier';
import { http } from './tools/http';
import Config from './config';

const {
  HTTP: {
    METHOD,
    URL,
    PARSE_MODE,
    JSON_SELECTOR,
    HTML_SELECTOR,
    SCENARIO,
    VALUE_TO_CHECK,
  },
} = Config;

/**
 * Call HTTP endpoint and parse response
 */
!(async () => {
  const responseText = await http.call({
    url: URL,
    method: METHOD,
  });

  let $; // parser
  let $html; // parsed body
  let jsonGetter = () => {}; // json path getter
  if (PARSE_MODE === 'HTML') {
    if (!HTML_SELECTOR)
      throw new Error('HTML_SELECTOR is required when using HTML parse mode');

    $ = await response.parseHtml(responseText);
    $html = $(HTML_SELECTOR);
  } else if (PARSE_MODE === 'JSON') {
    if (!JSON_SELECTOR)
      throw new Error('JSON_SELECTOR is required when using JSON parse mode');

    jsonGetter = response.parseJson(responseText);
  }

  /**
   * Check parsed response with scenario
   */
  switch (SCENARIO) {
    /**
     * Text responses
     */
    case 'RESPONSE_EQUAL':
      if (responseText === VALUE_TO_CHECK) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'RESPONSE_NOT_EQUAL':
      if (responseText !== VALUE_TO_CHECK) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'RESPONSE_GREATER_THAN':
      if (Number(responseText) > Number(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'RESPONSE_LOWER_THAN':
      if (Number(responseText) < Number(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'RESPONSE_CONTAINS':
      if (responseText.includes(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'RESPONSE_NOT_CONTAINS':
      if (!responseText.includes(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    /**
     * HTML responses
     */
    case 'HTML_SELECTOR_CONTENT_EQUAL':
      if ($html.text() === VALUE_TO_CHECK) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_CONTENT_NOT_EQUAL':
      if ($html.text() !== VALUE_TO_CHECK) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_CONTENT_GREATER_THAN':
      if (Number($html.text()) > Number(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_CONTENT_LOWER_THAN':
      if (Number($html.text()) < Number(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_CONTENT_CONTAINS':
      if ($html.text().includes(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_CONTENT_NOT_CONTAINS':
      if (!$html.text().includes(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_EXIST':
      if ($html.length > 0) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'HTML_SELECTOR_NOT_EXIST':
      if ($html.length === 0) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    /**
     * Json attributes
     */
    case 'JSON_SELECTOR_CONTENT_EQUAL':
      if (jsonGetter(JSON_SELECTOR) === VALUE_TO_CHECK) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_CONTENT_NOT_EQUAL':
      if (jsonGetter(JSON_SELECTOR) !== VALUE_TO_CHECK) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_CONTENT_GREATER_THAN':
      if (Number(jsonGetter(JSON_SELECTOR)) > Number(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_CONTENT_LOWER_THAN':
      if (Number(jsonGetter(JSON_SELECTOR)) < Number(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_CONTENT_CONTAINS':
      if (jsonGetter(JSON_SELECTOR).includes(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_CONTENT_NOT_CONTAINS':
      if (!jsonGetter(JSON_SELECTOR).includes(VALUE_TO_CHECK)) {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_EXIST':
      if (jsonGetter(JSON_SELECTOR, 'NOT_EXIST_VALUE') !== 'NOT_EXIST_VALUE') {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
    case 'JSON_SELECTOR_NOT_EXIST':
      if (jsonGetter(JSON_SELECTOR, 'NOT_EXIST_VALUE') === 'NOT_EXIST_VALUE') {
        await notifier.propagate({ responseText, $html, VALUE_TO_CHECK });
      }
      break;
  }
})();

/**
 * TODO: call graphql endpoint
 * TODO: call socket endpoint
 */
