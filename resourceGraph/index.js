const argv = require("yargs").argv;
const resourceGraph = require("@azure/arm-resourcegraph");
const {ClientSecretCredential} = require("@azure/identity");
const fs = require("fs");
require("dotenv").config();


const query = async () => {
  try {


   let cred = await getCredentials(csmartID).catch(err => {reject(err)})
  
    credentials = new ClientSecretCredential(cred[0].tenantId, cred[0].clientId, cred[0].clientSecret);
    console.log(credentials)
    const client = new resourceGraph.ResourceGraphClient(credentials);
    const result = await client.resources(
      {
        query: "advisorresources",
      },
      { resultFormat: "table" }
    );
    console.log("Records: " + result. );
    data = JSON.stringify(result.data,null,2);
    await sendtoBlob(data)
    }
  } catch (error) {
    console.log(error);
  }
};


async function sendtoBlob(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const blobName = './recommentations/' + new Date().getTime() + '.json'; //path
            const blobServiceClient = BlobServiceClient.fromConnectionString(blobConnectionString);
            // Get a reference to a container
            const containerClient = blobServiceClient.getContainerClient(blobContainerClient);
            const blockBlobClient = containerClient.getBlockBlobClient(blobName);
               // let arrayBuffer = Uint8Array.from(data);
                const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
                console.log("Success")
        } catch (err) {
            reject(err.message)
        }
    })
}
query();
