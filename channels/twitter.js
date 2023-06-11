import { utils } from '../tools/utils';

export const twitter = {
  validate(parms) {
    utils.log(`Validating required values`);
    const {
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_TOKEN_SECRET,
    } = process.env;

    if (
      !TWITTER_CONSUMER_KEY ||
      !TWITTER_CONSUMER_SECRET ||
      !TWITTER_ACCESS_TOKEN ||
      !TWITTER_ACCESS_TOKEN_SECRET
    ) {
      throw new Error(
        'TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET are required when using Twitter channel'
      );
    }
  },
  send({ text }) {
    utils.log(' - Sending tweet...');
    const {
      TWITTER_CONSUMER_KEY,
      TWITTER_CONSUMER_SECRET,
      TWITTER_ACCESS_TOKEN,
      TWITTER_ACCESS_TOKEN_SECRET,
    } = process.env;

    // Create a nonce (a unique string) for the request
    const nonce = Math.random().toString(36).substring(2, 15);
    const timestamp = Math.floor(Date.now() / 1000);

    // Define the request URL and method
    const url = 'https://api.twitter.com/1.1/statuses/update.json';
    const method = 'POST';

    // Create the OAuth signature
    const signatureKey =
      encodeURIComponent(TWITTER_CONSUMER_SECRET) +
      '&' +
      encodeURIComponent(TWITTER_ACCESS_TOKEN_SECRET);
    const signatureParams = {
      oauth_consumer_key: TWITTER_CONSUMER_KEY,
      oauth_nonce: nonce,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_token: TWITTER_ACCESS_TOKEN,
      oauth_version: '1.0',
      status: encodeURIComponent(text),
    };
    const signatureBaseString = `${method}&${encodeURIComponent(
      url
    )}&${encodeURIComponent(
      Object.entries(signatureParams)
        .sort()
        .map(([k, v]) => `${k}=${v}`)
        .join('&')
    )}`;
    const signatureIns = new Bun.CryptoHasher('sha1', signatureKey);
    signatureIns.update(signatureBaseString);
    const signature = signatureIns.digest('base64');
    // const signature = crypto
    //   .createHmac('sha1', signatureKey)
    //   .update(signatureBaseString)
    //   .digest('base64');

    // Create the Authorization header
    const authorizationHeaderParams = {
      oauth_consumer_key: TWITTER_CONSUMER_KEY,
      oauth_nonce: nonce,
      oauth_signature: signature,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: timestamp,
      oauth_token: TWITTER_ACCESS_TOKEN,
      oauth_version: '1.0',
    };
    const authorizationHeader = `OAuth ${Object.entries(authorizationHeaderParams)
      .map(([k, v]) => `${k}="${v}"`)
      .join(', ')}`;

    // Send the request
    fetch(url, {
      method,
      headers: {
        Authorization: authorizationHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `status=${encodeURIComponent(text)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        utils.log('Tweet sent successfully!', data);
      })
      .catch((error) => {
        utils.log('Error:', error);
      });
  },
};
