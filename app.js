var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to mongodb
const mongoose = require("mongoose");
const dev_db_url =
  "mongodb+srv://dbUser:dbuserPassword@cluster0-kaysv.azure.mongodb.net/todo_db?retryWrites=true&w=majority";

const mongoDb = process.env.MONGODB_URI || dev_db_url;

const db = mongoose.connection;

mongoose.connect(mongoDb, { useNewUrlParser: true });

// Setup passport local mongoose
const User = require("./models/user");
const passport = require("passport");
const passportLocal = require("passport-local");
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
