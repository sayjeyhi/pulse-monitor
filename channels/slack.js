import { utils } from '../tools/utils';
import Config from '../config';

export const slack = {
  validate(parms) {
    utils.log(`Validating required values`);
    const { SLACK_URL, SLACK_TOKEN } = process.env;
    if (!SLACK_URL || !SLACK_TOKEN) {
      throw new Error(
        'SLACK_URL and SLACK_TOKEN are required when using Slack channel'
      );
    }
  },
  send({ text }) {
    utils.log(' - Sending message to Slack...');

    // Define the Slack API endpoint and the necessary parameters
    const slackEndpoint = `${process.env.SLACK_URL}/api/chat.postMessage`;

    // Create the request payload
    const postData = JSON.stringify({
      channel: Config.SLACK.CHANNEL_ID,
      text,
    });

    // Send the request to the Slack API
    fetch(slackEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
        'Content-Length': postData.length,
      },
    })
      .then((res) => {
        res.on('data', (data) => {
          const response = JSON.parse(data);
          if (response.ok) {
            console.log('Message sent successfully:', response.ts);
          } else {
            console.error('Error sending message to Slack:', response.error);
          }
        });
      })
      .catch((error) => {
        console.error('Error sending request to Slack:', error);
      });
  },
};
