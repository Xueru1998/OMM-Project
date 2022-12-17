var express = require('express');
var router = express.Router();

const userModel = require('../models/user-model');

/* GET users listing. */
router.get('/get_users', async function(req, res, next) {
  // const models = req.models;
  //const users = models.get('users');
  // users.find({username: req.username},{ projection: {basicauthtoken: 0} }) // return all user properties, except the basic auth token
  //     .then((docs) => res.json(docs))
  //     .catch((e) => res.status(500).send())

  const users = await userModel.find({});

  console.log('Ouxxxx ');

  try {
    res.send(users);
    console.log('Output: '+res.json);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/add_user', async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;