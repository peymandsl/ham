const Media = require("../models/mediaModel");
const fs = require("fs");
const path = require("path");

const CreateMedia = async (req, res, next) => {
  const medias = req.files;
  try {
    const response = await medias.reduce(
      async (memo, { fieldName, originalname, mimetype, filename, size }) => {
        // const author = req.user.id;
        const beforeResults = await memo;

        const obj = {
          alt: originalname,
          size,
          name: filename,
          media: {
            data: fs.readFileSync(
              path.resolve(
                __dirname,
                `../../pages/api/uploads/avatars/${filename}`
              )
            ),
            contentType: mimetype,
          },
        };
        const newMedia = await Media.create(obj);
        return [...beforeResults, newMedia];
      },
      []
    );

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

const DeleteMedia = async (id) => {
  try {
    const deletedMedia = await Media.findByIdAndDelete(id);
    return deletedMedia;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  CreateMedia,
  DeleteMedia,
};
