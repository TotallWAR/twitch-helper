'use strict';
let userController = require('../controllers/user.controller.js');
module.exports = (app, route, passport) => {

  route.get('/login', async(ctx, next) => {
    let result = await userController.renderLogin(ctx, next);
  });

  route.post('/register', async(ctx, next) => {
    await userController.registerUser(ctx, next);
  });

  // user accesses the link that is sent
  route.get('/email-verification/:URL', async(ctx, next) => {
    await userController.confirmTempUser(ctx, next);
  });

  route.get('/resendVerificationEmail/:email', async(ctx, next) => {
    await userController.resendVerificationEmailAsync(ctx, next);
  });

  // POST /login
  // route.post('/login', passport.authenticate('local', {
  //   successRedirect: '/personalArea',
  //   failureRedirect: '/'
  // }));;

  route.post('/login', async(ctx, next) => {
    let result = await userController.login(ctx, next);
  });

  route.get('/logout', function(ctx, next) {
    ctx.logout()
    ctx.redirect('/')
  });

  route.get('/check', async(ctx, next) => {
    await userController.check(ctx, next);
  });

  /**
   * все запросы становятся недоступными без аутентификации - редиректятся
   */
  // app.use(function(ctx, next) {
  //   if (ctx.isAuthenticated()) {
  //     return next()
  //   } else {
  //     ctx.redirect('/')
  //   }
  // })
};
