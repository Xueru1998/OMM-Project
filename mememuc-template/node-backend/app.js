/**
 *  Use mongoose to connect the database
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 *
 * cors: allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * npm website: https://www.npmjs.com/package/cors
 *
 *
 */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");
const routes = require("./routes/memeJson_routes");

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
// const MONGODB_PORT = process.env.DBPORT || '27017';
// const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
// console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######

mongoose.connect(`mongodb://localhost:27017/omm-2223`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
db.once("open", function () {
  console.log("MongoDB connected successfully");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var memesRouter = require("./routes/memes");

console.log("1");

var app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(routes);

app.use(function (req, res, next) {
  req.db = db;
  next();
});

// the login middleware. Requires BasicAuth authentication
// app.use((req,res,next) => {
//   const users = db.get('users');
//   users.findOne({basicauthtoken: req.headers.authorization}).then(user => {
//     if (user) {
//       req.username = user.username;  // test test => Basic dGVzdDp0ZXN0
//       next()
//     }
//     else {
//       res.set('WWW-Authenticate', 'Basic realm="401"')
//       res.status(401).send()
//     }
//   }).catch(e => {
//     console.error(e)
//     res.set('WWW-Authenticate', 'Basic realm="401"')
//     res.status(401).send()
//   })
// })

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/memes", memesRouter);

app.use("/memes", express.static(path.join(__dirname, "public/memes")));

app.listen(3002, () => {
  console.log("Server is running at port 3002");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
