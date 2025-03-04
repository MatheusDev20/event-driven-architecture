/* eslint-disable no-undef */

const someFakeAsyncProcess = async (message) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (message.id === 2) {
        reject(new Error(`Processing failed for message ID: ${message.id}`));
      } else {
        console.log(`Successfully processed message ID: ${message.id}`);
        resolve();
      }
    }, 5000);
  });
};

const handler = async (event) => {
  try {
    for (const record of event.Records) {
      const parse = JSON.parse(record.body);
      const message = JSON.parse(parse.Message);

      await someFakeAsyncProcess(message);
    }
  } catch (e) {
    console.error('Error processing message:', e);
    throw e; // Ensures the Lambda fails and SQS retries the message
  }
};

module.exports = { handler };
