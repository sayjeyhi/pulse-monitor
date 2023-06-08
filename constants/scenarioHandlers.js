export const scenarioHandlers = {
  /**
   * Text responses
   */
  RESPONSE_EQUAL: ({ response, expectedValue }) => response === expectedValue,
  RESPONSE_NOT_EQUAL: ({ response, expectedValue }) => response !== expectedValue,
  RESPONSE_GREATER_THAN: ({ response, expectedValue }) =>
    Number(response) > Number(expectedValue),
  RESPONSE_LOWER_THAN: ({ response, expectedValue }) =>
    Number(response) < Number(expectedValue),
  RESPONSE_CONTAINS: ({ response, expectedValue }) =>
    response.includes(expectedValue),
  RESPONSE_NOT_CONTAINS: ({ response, expectedValue }) =>
    !response.includes(expectedValue),
  /**
   * HTML responses
   */
  HTML_SELECTOR_CONTENT_EQUAL: ({ expectedValue, htmlSelectorContent }) =>
    htmlSelectorContent === expectedValue,
  HTML_SELECTOR_CONTENT_NOT_EQUAL: ({ expectedValue, htmlSelectorContent }) =>
    htmlSelectorContent !== expectedValue,
  HTML_SELECTOR_CONTENT_GREATER_THAN: ({ expectedValue, htmlSelectorContent }) =>
    Number(htmlSelectorContent) > Number(expectedValue),
  HTML_SELECTOR_CONTENT_LOWER_THAN: ({ expectedValue, htmlSelectorContent }) =>
    Number(htmlSelectorContent) < Number(expectedValue),
  HTML_SELECTOR_CONTENT_CONTAINS: ({ expectedValue, htmlSelectorContent }) =>
    htmlSelectorContent.includes(expectedValue),
  HTML_SELECTOR_CONTENT_NOT_CONTAINS: ({ expectedValue, htmlSelectorContent }) =>
    !htmlSelectorContent.includes(expectedValue),
  HTML_SELECTOR_EXIST: ({ $selectedHtml }) => $selectedHtml.length > 0,
  HTML_SELECTOR_NOT_EXIST: ({ $selectedHtml }) => $selectedHtml.length === 0,
  /**
   * Json attributes
   */
  JSON_SELECTOR_CONTENT_EQUAL: ({ expectedValue, jsonSelectorValue }) =>
    jsonSelectorValue === expectedValue,
  JSON_SELECTOR_CONTENT_NOT_EQUAL: ({ expectedValue, jsonSelectorValue }) =>
    jsonSelectorValue !== expectedValue,
  JSON_SELECTOR_CONTENT_GREATER_THAN: ({ expectedValue, jsonSelectorValue }) =>
    Number(jsonSelectorValue) > Number(expectedValue),
  JSON_SELECTOR_CONTENT_LOWER_THAN: ({ expectedValue, jsonSelectorValue }) =>
    Number(jsonSelectorValue) < Number(expectedValue),
  JSON_SELECTOR_CONTENT_CONTAINS: ({ expectedValue, jsonSelectorValue }) =>
    jsonSelectorValue.includes(expectedValue),
  JSON_SELECTOR_CONTENT_NOT_CONTAINS: ({ expectedValue, jsonSelectorValue }) =>
    !jsonSelectorValue.includes(expectedValue),
  JSON_SELECTOR_EXIST: ({ jsonSelectorValue }) =>
    jsonSelectorValue !== 'NOT_EXIST_VALUE',
  JSON_SELECTOR_NOT_EXIST: ({ jsonSelectorValue }) =>
    jsonSelectorValue === 'NOT_EXIST_VALUE',
};
