import dotenv from 'dotenv';
import { responseController } from './tools/responseController.js';
import { notifier } from './tools/notifier.js';
import { http } from './tools/http.js';
import { gql } from './tools/gql.js';
import { utils } from './tools/utils.js';
import { environment } from './tools/environment.js';
import { scenarioHandlers } from './constants/scenarioHandlers.js';
import Config from './config.js';

dotenv.config();
environment.loadPolyfills();
utils.printLogo();

const serviceAssociation = {
  HTTP: http,
  GRAPHQL: gql,
};

/**
 * Main function
 */
const PulseMonitor = {
  start(type) {
    Config[type]
      .filter((i) => i.ENABLED)
      .map(async (config) => {
        await PulseMonitor.run(serviceAssociation[type], config);
      });
  },
  async run(service, CONFIG) {
    let { PARSE_MODE, SCENARIO } = CONFIG;
    const response = await service.call(CONFIG);
    utils.log('🎉 Response received');
    utils.log(response);
    utils.logLineBreak();
    utils.logTitle('🔎 Checking response...', { bg: 'blue', fg: 'black' });

    let $selectedHtml = {}; // cheerio object
    let jsonValue; // json path value

    /**
     * Only allow JSON scenarios for GraphQL clients
     */
    if (service.name === 'graphql') {
      PARSE_MODE = 'JSON';
      if (!SCENARIO.startsWith('JSON_'))
        throw new Error(
          'GraphQL clients only support JSON scenarios. Please use JSON_ prefix in your scenario'
        );
    }

    if (PARSE_MODE === 'HTML') {
      if (!CONFIG.HTML_SELECTOR) {
        throw new Error('HTML_SELECTOR is required when using HTML parse mode');
      }
      if (SCENARIO.startsWith('JSON_')) {
        throw new Error(
          'JSON scenarios are not supported when using HTML parse mode'
        );
      }
      $selectedHtml = await responseController.parseHtml(
        response,
        CONFIG.HTML_SELECTOR
      );
    } else if (PARSE_MODE === 'JSON') {
      if (!CONFIG.JSON_SELECTOR) {
        throw new Error('JSON_SELECTOR is required when using JSON parse mode');
      }
      if (SCENARIO.startsWith('HTML_')) {
        throw new Error(
          'HTML scenarios are not supported when using JSON parse mode'
        );
      }
      if (typeof response === 'string') {
        jsonValue = responseController.parseJsonAndGet(
          response,
          CONFIG.JSON_SELECTOR
        );
      } else {
        jsonValue = responseController.getJsonProperty(
          response,
          CONFIG.JSON_SELECTOR
        );
      }
    } else {
      utils.logSecondary('📄 Checking response text directly');
    }

    const handler = scenarioHandlers[SCENARIO];
    const params = {
      CONFIG: CONFIG,
      formatter: CONFIG.MESSAGE_FORMATTER,
      expectedValue: CONFIG.VALUE_TO_CHECK,
      response,
      $selectedHtml,
      jsonSelectorValue: jsonValue,
    };

    /**
     * If we have the needed conditions, propagate the notification
     */
    if (handler && handler(params)) {
      utils.log('🎉 Condition met');
      utils.logLineBreak();
      await notifier.propagate(params);
    } else {
      utils.log('No notification needed');
      if (Config.NOTIFY_SCENARIO_FAILURES) {
        utils.log('Failure notifications enabled');
        await notifier.propagate({
          ...params,
          formatter: CONFIG.FAILURE_MESSAGE_FORMATTER,
        });
      }
    }
  },
};

/**
 * Start monitoring endpoints
 */
PulseMonitor.start('HTTP');
PulseMonitor.start('GRAPHQL');
