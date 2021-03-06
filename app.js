var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
// bagian method PUT()
const methodOverride = require("method-override");
// bagian method PUT()

// express-seesion
const session = require("express-session");
// express-seesion

// connect-flash
const flash = require("connect-flash");
// connect-flash

// import mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://enaldev:bwamern@cluster0.henup.mongodb.net/db_staycation?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// bagian method PUT()
app.use(methodOverride("_method"));
// bagian method PUT()

// express-session
app.use(
  session({
    secret: "yuhuuuu",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 },
  })
);
// express-session

// connect-flush
app.use(flash());
// connect-flush

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
// admin

app.use(cors());

app.use("/admin", adminRouter);
app.use("/api/v1/member", apiRouter);

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
