var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const webnewsRouter = require('./routes/web/webnewsRouter');
const userRouter = require('./routes/admin/userRouter');
const newsRouter = require('./routes/admin/newsRouter');
const webproductRouter = require('./routes/web/webproductRouter');
const productRouter = require('./routes/admin/productRouter');
const JWT = require('./utils/JWT')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(webnewsRouter)
app.use(webproductRouter)
app.use((req, res, next) => {
  if (req.url === '/adminapi/user/login') {
    next()
    return
  } else {
    const token = req.headers.authorization.replace('Bearer ', '')
    if (token) {
      const payload = JWT.verify(token)
      console.log(payload)
      if (payload) {
        const newToken = JWT.generate({
          _id: payload._id,
          username: payload.username
        }, '1d')
        res.header('Authorization', newToken)
        next()
      } else {
        res.status(401).json({
          code: 401,
          message: 'token过期'
        })
      }
    }
  }
})
app.use(userRouter)
app.use(newsRouter)
app.use(productRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
