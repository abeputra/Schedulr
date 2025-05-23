const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "your-container-name";

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadImage(fileBuffer, fileName, contentType) {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
    blobHTTPHeaders: { blobContentType: contentType }
  });
  return blockBlobClient.url;
}

async function deleteImage(fileName) {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  await blockBlobClient.delete();
}

module.exports = { uploadImage, deleteImage };