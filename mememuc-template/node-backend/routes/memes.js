/**
 *  To handle multipart/form-data
 * npm website: https://www.npmjs.com/package/multer
 * useage: https://www.section.io/engineering-education/uploading-files-using-multer-nodejs/
 */
var express = require("express");
var router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/memes/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

const memeModel = require("../db/meme-model");

router.get("/get_memes", async function (req, res, next) {
  // const db = req.db;
  //const users = db.get('users');
  // users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
  //     .then((docs) => res.json(docs))
  //     .catch((e) => res.status(500).send())

  try {
    const memes = await memeModel.find({});
    res.status(200).send(memes);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add_meme", upload.single("file"), async (req, res) => {
  console.log(req.file);
  console.log(req.body.name);
  console.log(req.body.author);

  const meme = new memeModel({
    name: req.file.filename,
  });

  try {
    await meme.save();
    res.status(200).send(meme);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
