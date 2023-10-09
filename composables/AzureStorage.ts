import { BlobServiceClient } from "@azure/storage-blob";
import axios from "~/utils/axiosInstance";


export const UploadImage = async (fileName: string, file: any) => {
  try {

    const response = await axios.post("/api/azurestorage/getuploadsastoken");

    const sasToken = response.data;

    const blobServiceClient = new BlobServiceClient(sasToken);

    const containerClient = blobServiceClient.getContainerClient("images");

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    return await blockBlobClient.uploadData(file);

  } catch (error) {
    console.error("UploadImage error:", error);
  }
}

export const UploadPodcast = async (fileName: string, file: any) => {
  try {
    const response = await axios.post("/api/azurestorage/getuploadsastoken");

    const sasToken = response.data;

    const blobServiceClient = new BlobServiceClient(sasToken);

    const containerClient = blobServiceClient.getContainerClient("podcasts");

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    return await blockBlobClient.uploadData(file);

  } catch (error) {
    console.error("UploadImage error:", error);
  }
};

export const DownloadImage = async (filename: string) => {
  try {
    const response = await axios.post("/api/azurestorage/getimage", {
      filename
    });

    return response.data;
  } catch (error) {
    console.error("DownloadImage error:", error);
  }
}

export const DownloadPodcast = async (filename: string) => {
  try {
    const response = await axios.post("/api/azurestorage/getpodcast", {
      filename,
    });

    return response.data;
  } catch (error) {
    console.error("DownloadPodcast error:", error);
  }
}