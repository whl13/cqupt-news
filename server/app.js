var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const webnewsRouter = require('./routes/web/webnewsRouter');
const userRouter = require('./routes/admin/userRouter');
const newsRouter = require('./routes/admin/newsRouter');
const webproductRouter = require('./routes/web/webproductRouter');
const productRouter = require('./routes/admin/productRouter');
const JWT = require('./utils/JWT')
var app = express();

// 将jade设置为默认模板引擎(模板需要经过render后才能使用)
app.set('view engine', 'jade');
// 设置模板路径
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
// 解析req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 设置静态资源路径
app.use(express.static(path.join(__dirname, 'public')));
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


  res.status(err.status || 500);
  /* 通过render渲染error.jade模板并返回给浏览器
  render('模板名',{a:1,b:'sth'})
  可以通过第二个参数传对象给模板使用(类似于vue，react)
  模板中通过<%=变量名 %> (经过转义的) 
           <%-变量名 %> (未经转义的,原样输出包括html标签,易xss攻击)来使用
           <% js代码 %> 在模板中编写js代码，在服务器端运行  
  */
  res.render('error');
});

module.exports = app;
