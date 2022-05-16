var axios = require("axios");

async function msApiRequest(options, option1) {
  try {
    return new Promise(function (resolve, reject) {
      axios(options, option1)
        .then((response) => {
          resolve({ data: response.data, status: response.status });
        })
        .catch((err) => {
          reject({ data: err.message });
        });
    });
  } catch (err) {
    reject(err.message);
  }
}
module.exports = { msApiRequest };
