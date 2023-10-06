import { BlobServiceClient } from "@azure/storage-blob";
import axios from "~/utils/axiosInstance";


export const UploadImage = async (fileName: string, file: any) => {
  try {

    const response = await axios.post("/api/azurestorage/getuploadsastoken", {
      containername: "images",
    });

    const sasToken = response.data;

    const blobServiceClient = new BlobServiceClient(sasToken);

    const containerClient = blobServiceClient.getContainerClient("images");

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    return await blockBlobClient.uploadBrowserData(file);

  } catch (error) {
    console.error("UploadImage error:", error);
  }
}

export const UploadPodcast = async (fileName: string, file: any) => {
  try {
    const response = await axios.post("/api/azurestorage/getuploadsastoken", {
      containername: "podcasts",
    });

    const sasToken = response.data;

    const blobServiceClient = new BlobServiceClient(sasToken);

    const containerClient = blobServiceClient.getContainerClient("podcasts");

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    return await blockBlobClient.uploadBrowserData(file);

  } catch (error) {
    console.error("UploadImage error:", error);
  }
};

