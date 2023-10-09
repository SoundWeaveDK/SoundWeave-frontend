import { BlobServiceClient } from "@azure/storage-blob";
import axios from "~/utils/axiosInstance";


export const UploadFile = async (fileName: string, file: File, containerName: string) => {
  try {
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "audio/mpeg",
      "audio/mp3",
      "audio/ogg",
      "audio/wav",
    ];

    if (!allowedFileTypes.includes(file.type)) {
      throw new Error("File type not permitted");
    }

    if (file.size > 100000000) {
      throw new Error("File size too large");
    }

    // add random string to file name to make it unique
    fileName = Math.random().toString(36).substring(2, 15) + "_" + Date.now() + "_" + fileName;

    const response = await axios.get("/api/azurestorage/getuploadsastoken");

    const sasToken = response.data;

    const blobServiceClient = new BlobServiceClient(sasToken);

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    return await blockBlobClient.uploadData(file);

  } catch (error) {
    console.error("UploadImage error:", error);
  }
};
