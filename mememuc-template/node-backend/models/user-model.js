/**
 *  Define a collection schema.
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 */

const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// });
//
// const User = mongoose.model("User", userSchema);
// module.exports = User;

const UserDetailsScehma = new mongoose.Schema(
    {
        fname: String,
        lname: String,
        email: { type: String, unique: true },
        password: String,
    },
    {
        collection: "UserInfo",
    }
);

mongoose.model("UserInfo", UserDetailsScehma);