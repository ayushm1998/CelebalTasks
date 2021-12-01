const sql = require('mssql')
const config = {
    user: "myserver",
    password: "root",
    server: "DESKTOP-425GJQD",
    database: "sample",
    encrypt: true,
    requestTimeout: 1500000,
    trustedConnection:true,
    options: {
        trustServerCertificate: true
          }
    
};
//Database connection
sql.connect(config, err => {
    if (err) {
        console.log('Failed to open a SQL Database connection.', err.stack);
    }
    console.log(`SQL connected`)
});

sql.on('error', err => console.log(err.stack));