/**
 *  Define a collection schema.
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

const student2 = new User({
  username: "student1",
  email: "123@qq.com",
  password: "123",
});

student2
  .save()
  .then(() => {
    console.log("student has been saved to database");
  })
  .catch((e) => {
    console.log("error has happened");
    console.log(e);
  });

module.exports = User;
/**
 *  Define a collection schema.
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

const student2 = new User({
  username: "student1",
  email: "123@qq.com",
  password: "123",
});

student2
  .save()
  .then(() => {
    console.log("student has been saved to database");
  })
  .catch((e) => {
    console.log("error has happened");
    console.log(e);
  });

module.exports = User;
