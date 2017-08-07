'use strict';
let indexController = require('../controllers/index.controller.js');
module.exports = (app, route, passport) => {
  route.get('/css/bootstrap.min.css', async(ctx, next) => {
    await indexController.renderBootstrap(ctx, next);
  });
};
