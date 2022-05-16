const util = require("util");
const multer = require("multer");


let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "../uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const maxSize = 20 * 1024 * 1024;

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
