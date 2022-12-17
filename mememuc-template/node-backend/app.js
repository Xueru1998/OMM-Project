/**
 *  Use mongoose to connect the database
 *  References:
 *  https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
 *
 *  Login and Registration
 *  https://www.bezkoder.com/node-js-express-login-mongodb/
 *  https://www.youtube.com/watch?v=adMD46G5BXU
 *  https://www.youtube.com/watch?v=6oTDAyuQ5iw
 *
 *  JWT generator:
 *  https://jwt.io/
 *
 *  cors: allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
 *  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 *  npm website: https://www.npmjs.com/package/cors
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
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ##### IMPORTANT
// ### Your backend project has to switch the MongoDB port like this
// ### Thus copy paste this block to your project
// const MONGODB_PORT = process.env.DBPORT || '27017';
// const models = require('monk')(`127.0.0.1:${MONGODB_PORT}/omm-2223`); // connect to database omm-2021
// console.log(`Connected to MongoDB at port ${MONGODB_PORT}`)
// ######

// Expiration time: Thu June 01 2023 00:00:00 GMT+2 (Central European Summer Time)
const JWT_SECRET =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibWVtZSBnZW5lcmF0b3IiLCJpYXQiOjE2ODU1NzA0MDB9.fkz2BwlltKHTWAg-QfO_UdB0fTBvT1f0Z3gbL_zJ2fE";

// mongoose.connect(`mongodb://localhost:27017/omm-2223`);
//
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error: "));
// db.once("open", function () {
//   console.log("MongoDB connected successfully");
// });

const mongoUrl = "mongodb://localhost:27017/omm-2223";
mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
    }).then(() => {
        console.log("Connected to database");
    }).catch((e) => console.log(e));


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cookieSession({
      name: "omm-session",
      secret: "COOKIE_SECRET",
      httpOnly: true
    })
);

// app.use(function (req, res, next) {
//   req.db = db;
//   next();
// });

// the login middleware. Requires BasicAuth authentication
// app.use((req,res,next) => {
//   const users = models.get('users');
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

require("./models/user-model");
const buffer = require("buffer");
const User = mongoose.model("UserInfo");

// register part
/** TODO: add confirmed password */
app.post("/register", async (req, res) => {
    const { fname, lname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// login part
app.post("/login-user", async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (!user) {
       return res.json({ error: "User not found." });
   }
   if (await bcrypt.compare(password, user.password)) {
       const token = jwt.sign({ email: user.email }, JWT_SECRET);

       if (res.status(201)) {
           return res.json({ status: "ok", data: token });
       } else {
           return res.json({ error: "error" });
       }
   }

   res.json({ status: "error", error: "Invalid password." });
});

// get user data after login part
app.post("/userData", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);

        const email = user.email;
        User.findOne({ email: useremail })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {}
});

app.listen(5000, () => {
    console.log("Server is running at port 5000");
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

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

module.exports = app;
