/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-undef */

const aws = require('aws-sdk');

const sns = new aws.SNS();

const handler = async (event) => {
  const messages = [
    { id: 1, text: 'Message 1 from Service One!' },
    { id: 2, text: 'Message 2 from Service One!' },
    { id: 3, text: 'Message 3 from Service One!' },
  ];

  const topicArn = process.env.SNS_TOPIC_ARN;

  if (!topicArn) {
    console.error('SNS_TOPIC_ARN is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SNS_TOPIC_ARN is not configured' }),
    };
  }

  try {
    const publishPromises = messages.map((message) => {
      const params = {
        Message: JSON.stringify(message),
        TopicArn: topicArn,
      };

      return sns.publish(params).promise();
    });

    const results = await Promise.all(publishPromises);
    console.log('Messages published to SNS:', results);
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } catch (error) {
    console.error('Error publishing messages:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to publish messages' }),
    };
  }
};

module.exports = { handler };
