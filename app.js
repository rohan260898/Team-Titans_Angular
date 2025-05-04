var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// var indexRouter = require('./APP_SERVER/routes/index');
var usersRouter = require("./APP_SERVER/routes/users");

require("./app_server/models/db");
//const apiRouter = require('./APP_API/routes/bike');

const bikeRouter = require("./APP_API/routes/bike");
const carRouter = require("./APP_API/routes/car");
const scooterRouter = require('./APP_API/routes/scooter');
const accessoryRouter = require("./APP_API/routes/accessory"); // import accessory router
const contactRouter = require("./APP_API/routes/contact");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "APP_SERVER", "views"));

// app.use(express.static(path.join(__dirname, 'APP_PUBLIC')));
app.use(express.static(path.join(__dirname, "app_public", "build")));
app.use(function (req, res, next) {
  /*var err = new Error('Not Found');
   err.status = 404;
   next(err);*/
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );

  // Website you wish to allow to connect
  res.header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
app.use("/users", usersRouter);

//app.use('/api/bikes', apiRouter);
app.use("/api", bikeRouter);
app.use("/api", carRouter);
app.use("/api", accessoryRouter); // use accessory router
app.use('/api', scooterRouter);
app.use("/api", contactRouter);

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
