/**
 *  Define a collection schema.
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 */

const mongoose = require('mongoose');

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
    }
});

const user = mongoose.model('user', userSchema);
module.exports = user;