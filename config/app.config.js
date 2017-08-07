'use strict';
module.exports = (app, csrf) => {
  // sessions
  const convert = require('koa-convert')
  const session = require('koa-generic-session')
  const MongoStore = require('koa-generic-session-mongo')
  const envCfg = require('./env/' + process.env.NODE_ENV + '.js');
  const cors = require('kcors');

  app.keys = ['your-session-secret', 'another-session-secret']
  // required for passport session
  app.use(convert(session({
    //secret: 'lala',
    saveUninitialized: true,
    resave: true,
    // using store session on MongoDB using express-session + connect
    store: new MongoStore({url: envCfg.dbURI, collection: 'sessions'})
  })));
  // body parser
  const bodyParser = require('koa-bodyparser')
  app.use(bodyParser())

  const auth = require('./auth/auth.js')();
  const passport = require('koa-passport')
  app.use(passport.initialize())
  app.use(passport.session())

  // csrf
  app.use(csrf.default({
    invalidStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    ignoreMethods: [
      'GET', 'OPTIONS', 'POST'
    ],
    ignorePaths: [],
    secretLength: 16,
    saltRounds: 10
  }));

  app.use(cors({
    // origin: function(ctx) {
    //   let reg = /http:\/\/localhost:*/g
    //   if (ctx.url.search(reg) === -1) {
    //     return false;
    //   }
    //   return '*';
    // },
    origin: '*',
    exposeHeaders: [
      'WWW-Authenticate', 'Server-Authorization'
    ],
    maxAge: 10, //Количество секунд, на которое запрос может быть кэширован.
    credentials: true,
    allowMethods: [
      'GET', 'POST', 'DELETE'
    ],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }));

  //роутинг
  const routes = require('./route.config.js');
  //const routeConfig = require('../config/route.config.js')(app, passport);
  const router = routes(app, passport);
  app.use(router.middleware());

  //статическая директория
  var serve = require('koa2-static-files');
  app.use(serve.static(__dirname + '/../public'));

  return {envCfg: envCfg, router: router}
};
