# Pulse Monitor
> ⚡️A fast bun based checker/crawler/monitor tool which runs for free on github

![banner.png](assets/banner.png)


### Use cases

- This tool allows you to retrieve website data and receive notifications when some condition met.
- This can check your or other services Rest API response and do something with the response.
- You can track the status of your website and receive notifications when it encounters downtime.
- You can observe the price of a product and receive notifications when it undergoes fluctuations.
- You can monitor the number of followers on a social network and receive notifications when it changes.

### Features
Supported data sources:

| Data Source    | Supported |
|----------------|-----------|
| Rest API(json) | ✅         |
| Website(HTMl)  | ✅         |
| Website(Text)  | ✅         |
| GraphQL        | ❌         |
| Socket         | ❌         |

Supported scenarios:

| Scenario                           | Description                                                               |
|------------------------------------|---------------------------------------------------------------------------|
| RESPONSE_EQUAL                     | If the http call response is *equal* to some value                        |
| RESPONSE_NOT_EQUAL                 | If the http call response is *not equal* to some value                    |
| RESPONSE_GREATER_THAN              | If the http call response cascade to number is *greater than some value*  |
| RESPONSE_LOWER_THAN                | If the http call response cascade to number is *lower* than some value*   |
| RESPONSE_CONTAINS                  | If the http call response *contains* some value                           |
| RESPONSE_NOT_CONTAINS              | If the http call response does *not* contains some value                  |
| HTML_SELECTOR_EXIST                | If the HTML selector in http call response *exists*                       |
| HTML_SELECTOR_NOT_EXIST            | If the HTML selector in http call response *does not exist*               |
| HTML_SELECTOR_CONTENT_EQUAL        | If the HTML selector value is *equal* to some value                       |
| HTML_SELECTOR_CONTENT_NOT_EQUAL    | If the HTML selector value is *not equal* to some value                   |
| HTML_SELECTOR_CONTENT_GREATER_THAN | If the HTML selector value cascade to number is *greater than some value* |
| HTML_SELECTOR_CONTENT_LOWER_THAN   | If the HTML selector value cascade to number is *lower than some value*   |
| HTML_SELECTOR_CONTENT_CONTAINS     | ✅                                                                         |
| HTML_SELECTOR_CONTENT_NOT_CONTAINS | ✅                                                                         |
| JSON_SELECTOR_CONTENT_EXIST        | ✅                                                                         |
| JSON_SELECTOR_CONTENT_NOT_EXIST    | ✅                                                                         |
| JSON_SELECTOR_CONTENT_EQUAL        | ✅                                                                         |
| JSON_SELECTOR_CONTENT_NOT_EQUAL    | ✅                                                                         |
| JSON_SELECTOR_CONTENT_GREATER_THAN | ✅                                                                         |
| JSON_SELECTOR_CONTENT_LOWER_THAN   | ✅                                                                         |
| JSON_SELECTOR_CONTENT_CONTAINS     | ✅                                                                         |
| JSON_SELECTOR_CONTENT_NOT_CONTAINS | ✅                                                                         |

Supported notification methods:

| Method   | Supported |
|----------|-----------|
| Discord  | ❌         |
| Email    | ✅         |
| Facebook | ❌         |
| Slack    | ❌         |
| SMS      | ❌         |
| Telegram | ✅         |
| Twitter  | ❌         |
| Webhook  | ✅         |
| Whatsapp | ❌         |


## How to use

There are two ways to use this crawler.

- Self-hosted
- Github Action

If you want to use this crawler as a self-hosted, you need to install the dependencies and run the crawler with pm2 or forever. (see self-hosted section)
If you want to use this crawler in Github Action, you need to clone this repo, enable workflows and add below described secrets to your repo.

With secrets you can configure the crawler and receive notifications by Email, Whatsapp, Telegram, Slack or Twitter.
But first:

- You need to change the website address.
- You need to check the xpath of the data you want to crawl.
- Then per each notification method you need to change the configuration.

### HTTP configuration


| Feature                   | Description                                          | Supported values |
|---------------------------|------------------------------------------------------|------------------|
| URL                       | The service/website URL to be called                 | URL              |
| METHOD                    | The method that you want to be used to call this URL | GET, POST        |
| PARSE_MODE                | The parse method you want to use                     | HTML, TEXT, JSON |
| HTML_SELECTOR             | A CSS like selector for `cheerio` library            | string           |
| JSON_SELECTOR             | A object path selector text                          | string           |
| VALUE_TO_CHECK            | A value to be compared to selected content           | string, number   |
| SCENARIO                  | One of supported scenarios                           | SCENARIO         |
| MESSAGE_FORMATTER         | A function to format the message                     | Function         |
| FAILURE_MESSAGE_FORMATTER | A function to format the failure messages            | Function         |

You need to provide the website address and the selector based on your parse mode.
This configuration is common for all notification methods, and lives in the `config.js` file.

```javascript
{
  HTTP: [
    {
      URL: 'https://google.com',
      METHOD: 'GET',
      PARSE_MODE: parseModes.HTML,
      HTML_SELECTOR: 'title',
      JSON_SELECTOR: '.property[0].to.check',
      VALUE_TO_CHECK: 'some value to be checked', // if you want to check selector value
      SCENARIO: scenarios.RESPONSE_NOT_CONTAINS,
      MESSAGE_FORMATTER: ({
        HTTP,
        expectedValue,
        response,
        $selectedHtml,
        jsonSelectorValue,
      }) =>
        `${HTTP.URL}\n` +
        `${HTTP.METHOD}\n` +
        `${HTTP.PARSE_MODE}\n\n` +
        `${$selectedHtml.text().substring(0, 100)}\n`,
      FAILURE_MESSAGE_FORMATTER: ({
        HTTP,
        expectedValue,
        response,
        $selectedHtml,
        jsonSelectorValue,
      }) =>
        `${HTTP.URL}\n` +
        `${HTTP.METHOD}\n` +
        `${HTTP.PARSE_MODE}\n\n` +
        `${$selectedHtml.text().substring(0, 100)}\n`,
    },
  ]
}
```

You can pick different `PARSE_MODE` for the data you want to check. Currently supported modes are `HTML`, `TEXT` and `JSON`.
Also you can choose your `SCENARIO` from the list of supported scenarios.
The chosen scenario will be applied to the `VALUE_TO_CHECK` and the `HTML_SELECTOR` or `JSON_SELECTOR` value or the main Response of http call if `PARSE_MODE` is `TEXT`.

### Email

Emailing can work simply with google SMTP server. You need to change the email address and password.
For this purpose you should use google app password. You can create one from [here](https://myaccount.google.com/apppasswords).

Then change the email address and password in the `config.js` file.

```javascript
{
  EMAIL: {
    ENABLED: true,
    HOST: 'smtp.gmail.com',
    PORT: 465,
    SECURE: true,
    SUBJECT: 'New Items',
    FAILURE_SUBJECT: 'New Items',
    TO: ['your@email.com', 'another@email.com'],
  }
}
```

### Telegram

You need to create a telegram bot and get the bot token and chat id. You can create a bot and get the token from [here](https://core.telegram.org/bots#6-botfather).

Then change the token and chat id in the `config.js` file, also you need to change the chat ids.

```javascript
{
  TELEGRAM: {
    ENABLED: true,
    CHAT_IDS: ['YOUR_TELEGRAM_CHAT_ID'],
  },
}
```

### Slack

You need to create a Slack app and get the webhook url. You can create a slack app and get the webhook url from [here](https://api.slack.com/messaging/webhooks).

The configuration can be enabled using `config.js` file, also you need to change the channel id.

```javascript
{
  SLACK: {
    ENABLED: true,
    CHANNEL_ID: 'YOUR_SLACK_CHANNEL_ID',
  }
}
```

### Whatsapp (soon)

You need to create a whatsapp app and get the webhook url. You can create a whatsapp app and get the webhook url from [here](https://developers.facebook.com/docs/whatsapp/api/webhooks).

The configuration can be enabled using `config.js` file.

```javascript
{
  WHATSAPP: {
    ENABLED: false,
  }
}
```

### Twitter (soon)

You need to create a Twitter app and get the api key and api secret key. You can create a twitter app and get the api key and api secret key from [here](https://developer.twitter.com/en/portal/projects-and-apps).

The configuration can be enabled using `config.js` file.

```javascript
{
  TWITTER: {
    ENABLED: false,
  }
}
```

### Facebook (soon)

You need to create a facebook app and get the api key and api secret key. You can create a facebook app and get the api key and api secret key from [here](https://developers.facebook.com/apps/).

Then change the api key and api secret key in the `config.js` file.

```javascript
{
  FACEBOOK: {
    ENABLED: false,
  }
}
```

### SMS (soon)
You can use [Twilio](https://www.twilio.com/) to send SMS notifications. You need to create a twilio account and get the account sid and auth token. You can create a twilio account and get the account sid and auth token from [here](https://www.twilio.com/try-twilio).

The configuration can be enabled using `config.js` file.

```javascript
{
  SMS: {
    ENABLED: false,
  }
}
```

### Discord (soon)
You can use [Discord](https://discord.com/) to send notifications. You need to create a discord account and get the webhook url. You can create a discord account and get the webhook url from [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).

The configuration can be enabled using `config.js` file.

```javascript
{
  Discord: {
    ENABLED: false,
  }
}
```

### Author

[![Twitter Follow](https://img.shields.io/twitter/follow/sayjeyhi?style=social)](https://twitter.com/sayjeyhi) [![GitHub followers](https://img.shields.io/github/followers/sayjeyhi?style=social)](https://github.com/sayjeyhi) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Jafar--Rezaei-blue)](https://www.linkedin.com/in/jafar-rezaei/)

### Todos
- [ ] Support graphql endpoint calls
- [ ] Support socket endpoint calls
- [ ] Support webhooks
- [ ] Support more notification channels

## License

MIT
