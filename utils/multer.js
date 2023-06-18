const multer = require("multer");
const shortId = require("shortid");

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, `${shortId.generate()}_${file.originalname}`);
  },
});

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb("تنهای فرمت های JPEG,PNG پشتیبانی می شود", false);
  }
};
