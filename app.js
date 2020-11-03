var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var browseRouter = require("./routes/browse")
var wenFenRouter = require("./routes/wenfen")
var getlunRouter = require("./routes/getlun")
var adminRouter = require("./routes/admin")
var admin1Router = require("./routes/admin1")
var manageRouter = require("./routes/manage");

var app = express();
var cors = require("cors");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/wx", cors(), express.static(path.join(__dirname, 'public')));

app.use('/wx', cors(), indexRouter);
app.use('/wx', cors(), usersRouter);
app.use("/wx", cors(), getlunRouter);
app.use("/wx", cors(), browseRouter);
app.use("/wx", cors(), wenFenRouter);
app.use("/wx", cors(), adminRouter);
app.use("/wx", cors(), admin1Router);
app.use("/wx", cors(), manageRouter);

app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
