import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

const ONE_HOUR: any = 1 * 60 * 60 * 1000;
const ENVIRONMENT: any = process.env.NODE_ENV;
const AZURITEACCOUNTKEY: any = process.env.AZURITEACCOUNTKEY;

export const UploadImage = async (file: any, blobName: string) => {
  // Send request to the backend with the image name to get a sas token.
  // Upload the image to the blob storage using the sas token.
};

export const UploadBlob = async (blobName: string): Promise<string> => {
  
};
