/* eslint-disable turbo/no-undeclared-env-vars */
import { SNS } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const sns = new SNS();

export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const message = 'Hello from Service One!';
  const topicArn = process.env.SNS_TOPIC_ARN;

  if (!topicArn) {
    console.error('SNS_TOPIC_ARN is not set');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SNS_TOPIC_ARN is not configured' }),
    };
  }

  const params: SNS.PublishInput = {
    Message: message,
    TopicArn: topicArn,
  };

  try {
    const result = await sns.publish(params).promise();
    console.log('Message published to SNS:', result);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error publishing message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to publish message' }),
    };
  }
};
