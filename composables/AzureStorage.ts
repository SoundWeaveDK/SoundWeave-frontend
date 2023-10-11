import { BlockBlobClient } from "@azure/storage-blob";
import axios from "~/utils/axiosInstance";


export const UploadFile = async (file: File, containerName: string) => {
  try {
    const allowedFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "audio/mpeg",
      "audio/mp3",
      "audio/ogg",
      "audio/wav",
    ];

    if (!allowedFileTypes.includes(file.type)) {
      throw new Error("File type not permitted. Use jpeg, jpg, png, gif, mp3, ogg, or wav");
    }

    if (file.size > 100000000) {
      throw new Error("File size must be less than 100MB");
    }

    // add random string to file name to make it unique
    const fileName = Math.random().toString(36).substring(2, 15) + "_" + Date.now() + "_" + file.name;

    const response = await axios.post("/api/azurestorage/getuploadsastoken", {
      containerName,
      fileName,
    });

    const sasToken = response.data;

    const blockBlobClient = new BlockBlobClient(sasToken);

    return await blockBlobClient.uploadData(file);

  } catch (error) {
    console.error("UploadImage error:", error);
  }
};
