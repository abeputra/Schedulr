// import express from 'express';
// import multer from 'multer'; // Ganti require dengan import
// import { BlobServiceClient } from '@azure/storage-blob';
// import appInsights from 'applicationinsights';
// const { LogAnalyticsClient, DefaultAzureCredential } = await import('@azure/monitor-ingestion');

// const router = express.Router();
// const upload = multer();

// // Config
// const AZURE_CONFIG = {
//   storage: {
//     connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING,
//     containerName: "demo-container"
//   },
//   appInsights: {
//     ikey: process.env.APPINSIGHTS_INSTRUMENTATIONKEY
//   },
//   logAnalytics: {
//     endpoint: process.env.LOG_ANALYTICS_ENDPOINT,
//     ruleId: process.env.DATA_COLLECTION_RULE_ID,
//     streamName: "demo-stream"
//   }
// };

// // Initialize Services
// const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_CONFIG.storage.connectionString);
// const containerClient = blobServiceClient.getContainerClient(AZURE_CONFIG.storage.containerName);

// appInsights.setup(AZURE_CONFIG.appInsights.ikey).start();
// const logAnalyticsClient = new LogAnalyticsClient(
//   AZURE_CONFIG.logAnalytics.endpoint,
//   new DefaultAzureCredential()
// );

// // Demo Endpoint
// router.post('/demo', upload.single('image'), async (req, res) => {
//   const startTime = Date.now();
//   const operationId = Math.random().toString(36).substring(7);

//   try {
//     // 1. Upload ke Azure Blob
//     const blobName = `demo-${Date.now()}-${req.file.originalname}`;
//     const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//     await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
//       blobHTTPHeaders: { blobContentType: req.file.mimetype }
//     });
//     const imageUrl = blockBlobClient.url;

//     // 2. Track ke Application Insights
//     appInsights.defaultClient.trackEvent({
//       name: "ImageUploaded",
//       properties: {
//         operationId,
//         fileName: req.file.originalname,
//         fileSize: req.file.size
//       }
//     });

//     // 3. Kirim log ke Azure Log Analytics
//     await logAnalyticsClient.upload(
//       AZURE_CONFIG.logAnalytics.ruleId,
//       AZURE_CONFIG.logAnalytics.streamName,
//       [{
//         time: new Date().toISOString(),
//         operation: "upload",
//         operationId,
//         status: "success",
//         durationMs: Date.now() - startTime,
//         imageUrl: imageUrl
//       }]
//     );

//     res.json({
//       success: true,
//       imageUrl,
//       operationId
//     });

//   } catch (error) {
//     // Error Handling
//     appInsights.defaultClient.trackException({
//       exception: error,
//       properties: { operationId }
//     });

//     await logAnalyticsClient.upload(
//       AZURE_CONFIG.logAnalytics.ruleId,
//       AZURE_CONFIG.logAnalytics.streamName,
//       [{
//         time: new Date().toISOString(),
//         operation: "upload",
//         operationId,
//         status: "failed",
//         error: error.message,
//         durationMs: Date.now() - startTime
//       }]
//     );

//     res.status(500).json({
//       success: false,
//       error: error.message,
//       operationId
//     });
//   }
// });

// export default router; // Gunakan export default
