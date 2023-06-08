require('dotenv').config();

import { http } from './tools/http';
import { response } from './tools/response';
import Config from './config';

!(async () => {
  const body = await http.call({
    url: Config.HTTP.URL,
    method: Config.HTTP.METHOD,
  });
  const $ = await response.parse(body);
  console.log(body);
})();

//
// async () => {
//     const $ = await loadQuerySelector();
//
//     const textTitleList = [];
//     const htmlTitleList = [];
//     // like: #layer-product-list > div.regi-list > div
//     $(process.env.XPATH).each((i, section) => {
//       const $section = $(section);
//       const titleAndInfo = $section
//         .find('h4')
//         .text()
//         .replace(/\r?\n|\r|\t/gm, '')
//         .trim()
//         .split('  ');
//       const mainTitle = titleAndInfo[0];
//       const des = titleAndInfo.filter((n) => n.trim()).join(' , ');
//
//       const items = [];
//       items.map((item) => {
//         $section
//           .find('ul.regi-acm > li')
//           .each((i, li) => features.push($(li).text()));
//       });
//
//       textTitleList.push(`${mainTitle}\n
// ${$section.find('.price').text()}\n
// \n
// [${des}]\n
// \n
// ${$section.attr('data-url')}
//     `);
//     });
//
//     tools.log('Grabbed ' + textTitleList.length + ' Items!');
//     for (let i = 0; i < textTitleList.length; i++) {
//       const title = textTitleList[i];
//       await propagateToChannels({ text: title, html: htmlTitleList[i] });
//     }
//   }
// )();
