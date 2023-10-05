import { DefaultAzureCredential } from "@azure/identity";
import { StorageSharedKeyCredential, BlobServiceClient } from "@azure/storage-blob";
import axios from "~/utils/axiosInstance";

const PRODUCTION: boolean = process.env.NODE_ENV === 'production';

const AZURITEACCOUNTKEY: any = process.env.AZURITEACCOUNTKEY;

// devstoreaccount1 is the default account name created for Azurite emulator.
const ACCOUNTNAME = PRODUCTION ? "soundweavestorage" : "devstoreaccount1";
// The service endpoints for Azurite are different from the endpoints of an Azure Storage account. The local computer doesn't do domain name resolution, requiring Azurite endpoints to be local addresses.
const ACCOUNTURL = PRODUCTION
  ? `https://${ACCOUNTNAME}.blob.core.windows.net`
  : `http://127.0.0.1:10000/${ACCOUNTNAME}`;


export const UploadImage = async (fileName: string, content: ArrayBuffer) => {
  try {
    const response = await axios.post("/api/azurestorage/getuploadimagesastoken", {
      fileName: fileName,
    });

    const sasToken = response.data;

    console.log("fileName:", fileName);
    console.log("sasToken:", sasToken);
    console.log("content:", content);

    let auth = null;
    if (PRODUCTION) {
      // Use managed identity in production for our static web app
      auth = new DefaultAzureCredential();
    } else {
      // Use Azurite account key in development
      auth = new StorageSharedKeyCredential(ACCOUNTNAME, AZURITEACCOUNTKEY);
    }

    const blockBlobClient = new BlobServiceClient(ACCOUNTURL, auth).getContainerClient("images").getBlockBlobClient(fileName + sasToken);

    await blockBlobClient.uploadData(content);
    console.log("UploadImage success");

  } catch (error) {
    console.error("UploadImage error:", error);
  }
}

