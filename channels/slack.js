import { utils } from '../tools/utils.js';
import Config from '../config.js';

export const slack = {
  validate(parms) {
    const { SLACK_URL, SLACK_TOKEN } = process.env;
    if (!SLACK_URL || !SLACK_TOKEN) {
      throw new Error(
        'SLACK_URL and SLACK_TOKEN are required when using Slack channel'
      );
    }
  },
  async send({ text }) {
    const slackEndpoint = `${process.env.SLACK_URL}/api/chat.postMessage`;

    // Create the request payload
    const postData = JSON.stringify({
      channel: Config.SLACK.CHANNEL_ID,
      text,
    });

    // Send the request to the Slack API
    const response = await fetch(slackEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
        'Content-Length': postData.length,
      },
    });
    const res = await response.json();
    if (res.ok) {
      console.log('Message sent successfully:', res.ts);
    } else {
      throw new Error('Error sending message to Slack:' + res.error);
    }
  },
};
