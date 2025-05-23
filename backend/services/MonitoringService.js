const appInsights = require("applicationinsights");

appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true)
  .setAutoCollectExceptions(true)
  .start();

const client = appInsights.defaultClient;

function trackEvent(name, properties) {
  client.trackEvent({ name, properties });
}

function trackError(error, properties) {
  client.trackException({ exception: error, properties });
}

module.exports = { trackEvent, trackError };