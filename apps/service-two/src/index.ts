import { SQSEvent, SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  for (const record of event.Records) {
    console.log('Received SQS message:', record.body);
  }
};
