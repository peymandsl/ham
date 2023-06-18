const next = require("next");
const express = require("express");
const multer = require("multer");
const shortId = require("shortid");
const sharp = require("sharp");
// const fs = require("fs");
const server = express();
const { fileFilter } = require("./utils/multer");
const port = 3000;
require("dotenv").config({ path: __dirname + "/.env.local" });
const { CreateMedia } = require("./server/controller/MediaController");

const connectToDatabase = require("./utils/mongodb");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "pages/api/uploads/avatars/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${shortId.generate()}_${file.originalname}`);
//   },
// });

// var upload = multer({ storage: storage, limits: { fileSize: 4000000 } });

app.prepare().then(async () => {
  await connectToDatabase();

  // server.post("/upload", upload.array("media"), CreateMedia);
  server.post("/uploadAvatar", (req, res) => {
    const upload = multer({
      limits: { fileSize: 4000000 },
      fileFilter: fileFilter,
    }).single("media");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
        }
        res.status(400).send(err);
      } else {
        if (req.file) {
          const fileName = `${shortId.generate()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .resize({
              width: 200,
              height: 200,
            })
            .jpeg({
              quality: 60,
            })
            .toFile(`public/uploads/avatars/${fileName}`)
            .catch((err) => console.log(err));
          res.status(200).send(fileName);
        } else {
          res.send("جهت آپلود باید عکسی انتخاب کنید");
        }
      }
    });
  });

  server.post("/uploadBanner", (req, res) => {
    const upload = multer({
      limits: { fileSize: 4000000 },
      fileFilter: fileFilter,
    }).single("media");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
        }
        res.status(400).send(err);
      } else {
        if (req.file) {
          const fileName = `${shortId.generate()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .resize({
              width: 1448,
              height: 1000,
            })
            .jpeg({
              quality: 60,
            })
            .toFile(`public/uploads/club_banners/${fileName}`)
            .catch((err) => console.log(err));
          res.status(200).send(fileName);
        } else {
          res.send("جهت آپلود باید عکسی انتخاب کنید");
        }
      }
    });
  });
  server.post("/uploadEventBanner", (req, res) => {
    const upload = multer({
      limits: { fileSize: 4000000 },
      fileFilter: fileFilter,
    }).single("media");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
        }
        res.status(400).send(err);
      } else {
        if (req.file) {
          const fileName = `${shortId.generate()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .resize({
              width: 1448,
              height: 1000,
            })
            .jpeg({
              quality: 60,
            })
            .toFile(`public/uploads/event_banners/${fileName}`)
            .catch((err) => console.log(err));
          res.status(200).send(fileName);
        } else {
          res.send("جهت آپلود باید عکسی انتخاب کنید");
        }
      }
    });
  });
  server.post("/events/editEvent/uploadEventBanner", (req, res) => {
    const upload = multer({
      limits: { fileSize: 4000000 },
      fileFilter: fileFilter,
    }).single("media");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
        }
        res.status(400).send(err);
      } else {
        if (req.file) {
          const fileName = `${shortId.generate()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .resize({
              width: 1448,
              height: 1000,
            })
            .jpeg({
              quality: 60,
            })
            .toFile(`public/uploads/event_banners/${fileName}`)
            .catch((err) => console.log(err));
          res.status(200).send(fileName);
        } else {
          res.send("جهت آپلود باید عکسی انتخاب کنید");
        }
      }
    });
  });
  server.post("/uploadCoursBanner", (req, res) => {
    const upload = multer({
      limits: { fileSize: 4000000 },
      fileFilter: fileFilter,
    }).single("media");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
        }
        res.status(400).send(err);
      } else {
        if (req.file) {
          const fileName = `${shortId.generate()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .resize({
              width: 1448,
              height: 1000,
            })
            .jpeg({
              quality: 60,
            })
            .toFile(`public/uploads/cours_banners/${fileName}`)
            .catch((err) => console.log(err));
          res.status(200).send(fileName);
        } else {
          res.send("جهت آپلود باید عکسی انتخاب کنید");
        }
      }
    });
  });
  server.post("/courses/editCours/uploadCoursBanner", (req, res) => {
    const upload = multer({
      limits: { fileSize: 4000000 },
      fileFilter: fileFilter,
    }).single("media");

    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .send("حجم عکس ارسالی نباید بیشتر از 4 مگابایت باشد");
        }
        res.status(400).send(err);
      } else {
        if (req.file) {
          const fileName = `${shortId.generate()}_${req.file.originalname}`;
          await sharp(req.file.buffer)
            .resize({
              width: 1448,
              height: 1000,
            })
            .jpeg({
              quality: 60,
            })
            .toFile(`public/uploads/cours_banners/${fileName}`)
            .catch((err) => console.log(err));
          res.status(200).send(fileName);
        } else {
          res.send("جهت آپلود باید عکسی انتخاب کنید");
        }
      }
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
