const { LogAnalyticsClient } = require('@azure/monitor-ingestion');
const { DefaultAzureCredential } = require('@azure/identity');

const endpoint = process.env.LOG_ANALYTICS_ENDPOINT;
const ruleId = process.env.LOG_ANALYTICS_RULE_ID;
const streamName = "your-stream-name";

const client = new LogAnalyticsClient(
  endpoint,
  new DefaultAzureCredential()
);

async function sendLog(logData) {
  const logs = [{
    time: new Date().toISOString(),
    ...logData
  }];

  await client.upload(ruleId, streamName, logs);
}

module.exports = { sendLog };