const argv = require("yargs").argv;
const resourceGraph = require("@azure/arm-resourcegraph");
const {ClientSecretCredential} = require("@azure/identity");
const fs = require("fs");
require("dotenv").config();
const {BlobServiceClient} = require('@azure/storage-blob');
const blobConnectionString= 'DefaultEndpointsProtocol=https;AccountName=icertispocaed1;AccountKey=Cz17vRyqBiNM2hJ5oIw5L+uLYdA0QXl2qPNJOz/9LhWLU4QVp0T8a81dAvv+zGkpa4skmpt1WMJ5+AStcbB6Qw==;EndpointSuffix=core.windows.net'
const blobContainerClient= 'recommendation-container'
const getCredentials = require('../../helpers/getCredentials')


const query = async () => {
  try {


   let cred = await getCredentials(csmartID).catch(err => {reject(err)})
    // const tenantId = "e4e34038-ea1f-4882-b6e8-ccd776459ca0";
    // const clientId = "e1456d9f-8f5d-4b56-8d3a-7d36c9c7d28a";
    // const clientSecret = "kxN7Q~UEpu~zqp9K8r8rHLKKX.99f0se9pEQH";
    
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
