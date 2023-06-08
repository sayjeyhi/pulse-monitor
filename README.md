# A fast bun based checker

> This is a fast bun based checker/crawler, which is used to check the response of some endpoint and notify you

![banner.png](assets/banner.png)

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

### Checker configuration

You need to provide the website address and the xpath of the data you want to crawl.

```bash
CHECKER_WEBSITE_ADDRESS="https://www.example.com"
CHECKER_XPATH="//div[@class="example"]/text()"
```

### Email

Emailing works with google smtp server. You need to change the email address and password.
For this purpose you should use google app password. You can create one from [here](https://myaccount.google.com/apppasswords).

Then change the email address and password in the `main.yaml` file.

```yaml
EMAIL_ENABLED="true"
EMAIL_EMAIL_TO_ADDRESSES="john-doe@gmail.com,another-email@gmail.com"
EMAIL_SEND_EMAIL_ADDRESS="your@email.com"
EMAIL_SEND_EMAIL_PASSWORD="your-google-app-password"
```

### Telegram

You need to create a telegram bot and get the bot token and chat id. You can create a bot and get the token from [here](https://core.telegram.org/bots#6-botfather).

Then change the token and chat id in the `main.yaml` file.

```yaml
TELEGRAM_ENABLED="true"
TELEGRAM_TELEGRAM_BOT_TOKEN="your-telegram-bot-token"
TELEGRAM_TELEGRAM_CHAT_ID="your-telegram-chat-id"
```

### Slack

You need to create a slack app and get the webhook url. You can create a slack app and get the webhook url from [here](https://api.slack.com/messaging/webhooks).

Then change the webhook url in the `main.yaml` file.

```yaml
SLACK_SLACK_CHANNEL_ID="your-slack-channel-id"
SLACK_SLACK_WEBHOOK_URL="your-slack-webhook-url"
```

### Whatsapp (soon)

You need to create a whatsapp app and get the webhook url. You can create a whatsapp app and get the webhook url from [here](https://developers.facebook.com/docs/whatsapp/api/webhooks).

Then change the webhook url in the `main.yaml` file.

```yaml
WHATSAPP_ENABLED="true"
WHATSAPP_WHATSAPP_WEBHOOK_URL="your-whatsapp-webhook-url"
```

### Twitter (soon)

You need to create a twitter app and get the api key and api secret key. You can create a twitter app and get the api key and api secret key from [here](https://developer.twitter.com/en/portal/projects-and-apps).

Then change the api key and api secret key in the `main.yaml` file.

```yaml
TWITTER_ENABLED="true"
TWITTER_API_KEY="your-twitter-api-key"
TWITTER_API_SECRET_KEY="your-twitter-api-secret-key"
TWITTER_ACCESS_TOKEN="your-twitter-access-token"
TWITTER_ACCESS_TOKEN_SECRET="your-twitter-access-token-secret"
```

### Facebook (soon)

You need to create a facebook app and get the api key and api secret key. You can create a facebook app and get the api key and api secret key from [here](https://developers.facebook.com/apps/).

Then change the api key and api secret key in the `main.yaml` file.

```yaml
FACEBOOK_ENABLED="true"
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"
```

### Possible use cases

- This crawler allows you to retrieve website data and receive notifications when the data undergoes changes.
- You Can track the status of your website and receive notifications when it encounters downtime.
- You can observe the price of a product and receive notifications when it undergoes fluctuations.
- You can monitor the number of followers on a social network and receive notifications when it changes.

### Author

[![Twitter Follow](https://img.shields.io/twitter/follow/sayjeyhi?style=social)](https://twitter.com/sayjeyhi) [![GitHub followers](https://img.shields.io/github/followers/sayjeyhi?style=social)](https://github.com/sayjeyhi) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Jafar--Rezaei-blue)](https://www.linkedin.com/in/jafar-rezaei/)

### Todos
[] - call graphql endpoint
[] - TODO: call socket endpoint

## License

MIT
