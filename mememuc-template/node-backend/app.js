/**
 *  Use mongoose to connect the database
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
// const MONGODB_PORT = process.env.DBPORT || '27017';
// const db = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
// console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######

mongoose
  .connect("mongodb://localhost:27017/omm-2023", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("connected failed");
    console.log(err);
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const wiki = require("./routes/wiki.js");

var app = express();

// Connect the Database via mongoose
// const uri = "mongodb+srv://niklaus:ommproject@cluster0.twr0nxt.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// mongoose.connect(uri);
// const db = mongoose.connection;

// client.connect(err => {
//   const collection = client.db("meme").collection("users");
//   console.log('sut');
//   // perform actions on the collection object
//   client.close();
// });

// db.on('error', console.error.bind(console, 'connection error: '));
// db.once('connected', () => {
//   console.log('Connected successfully!');
// });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
app.use("/wiki", wiki);

app.listen(3001, () => {
  console.log("Server is running at port 3001");
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
