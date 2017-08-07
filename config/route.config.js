'use strict';
let Router = require('koa-better-router');
let router = Router().loadMethods();
module.exports = (app, passport) => {

  const userRoute = require('../app/routes/user.route.js')(app, router, passport);
  const indexRoute = require('../app/routes/index.route.js')(app, router, passport);
  const twitchRoute = require('../app/routes/twitch.route.js')(app, router, passport);

  return router;

};
