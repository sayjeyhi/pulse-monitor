require('dotenv').config();

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const telegram = require('node-telegram-bot-api')
const crypto = require("crypto");
const cache = require('@actions/cache');
const CONFIG = require('./config');

// const cacheId = await cache.saveCache(paths, key)
// const cacheKey = await cache.restoreCache(paths, key, restoreKeys)
//
// const bot = new telegram(core.getInput('TELEGRAM_TOKEN'));
// bot.sendMessage(chatID, core.getInput('message'), {
//   parse_mode: parse_mode == '' ?  "Markdown" : parse_mode,
// });
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//
//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

/**
 * Configuration utils
 */
const tools = {
  callUrl: async ({ url, method = 'GET', headers = {} }) => {
    tools.log(`Calling URL: ${url}`);
    const response = await fetch(url, {
      method,
      headers,
    });
    return await response.text();
  },
  loadSelector: async (bodyContent) => {
    try {
      const body = await tools.callUrl(bodyContent);
      return cheerio.load(body);
    } catch (e) {
      tools.log("Error loading page:", e.message)
    }
  },
  log: (...params) => {
    if(process.env.DEBUG !== '1') return;
    console.log(...params);
  },
  makeHash: (data) => crypto.createHash('md5').update(data).digest("hex")
}


/**
 * Parse URL
 */
(async () => {
  const $ = await loadQuerySelector();

  const textTitleList = [];
  const htmlTitleList = [];
  // like: #layer-product-list > div.regi-list > div
  $(process.env.XPATH).each((i, section) => {
    const $section = $(section);
    const titleAndInfo = $section.find('h4').text().replace(/\r?\n|\r|\t/gm, "").trim().split("  ");
    const mainTitle = titleAndInfo[0];
    const des = titleAndInfo.filter(n => n.trim()).join(" , ");

    const items = [];
    items.map(item => {
      $section.find("ul.regi-acm > li").each((i, li) => features.push($(li).text()));
    })

    textTitleList.push(`${mainTitle}\n
${$section.find(".price").text()}\n
\n
[${des}]\n
\n
${$section.attr('data-url')}
    `);
  });

  tools.log("Grabbed " + textTitleList.length + " Items!");
  for(let i = 0; i < textTitleList.length; i++) {
    const title = textTitleList[i];
    await propagateToChannels({ text: title, html: htmlTitleList[i] });
  }
})();
