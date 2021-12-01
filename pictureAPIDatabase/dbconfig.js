//const { options } = require("./routes");

const config ={
    user:'myserver',
    password:'root',
    server: 'DESKTOP-425GJQD',
    database: 'sample',
    encrypt: true,
    requestTimeout: 1500000,
    trustedConnection:true,
    options: {
        trustServerCertificate: true
          },
    port: 1433
    }

    module.exports = config;