'use strict';
const User = require('mongoose').model('User'),
  passport = require('passport'),
  hash = require('../../config/auth/hash.js'),
  fs = require('fs'),
  emailConfirmCtrl = require('../controllers/emailConfirmation.controller')();

exports.renderLogin = async(ctx) => {
  try {
    //await ctx.render('login', ctx.csrf);
    ctx.type = 'html'
    var body = await fs.readFileSync('/views/login.html', 'utf8');
    ctx.body = body.replace('{csrfToken}', ctx.csrf);
  } catch (e) {
    ctx.throw(404, "Not Found");
  }
};

exports.login = async(ctx, next) => {
  try {
    let user = await User.findOne({email: ctx.request.body.email});
    if (!user) {
      ctx.status = 404;
      ctx.body = 'Not found';
      return next();
    }
    let hashObject = hash.sha512(ctx.request.body.password, user.salt);
    //сохраняем хэш и соль
    (user.password === hashObject.passwordHash)
      ? await ctx.login(user)
      : null;
    if (ctx.isAuthenticated()) {
      ctx.status = 200;
      ctx.body = {
        user: ctx.state.user
      };
    } else {
      ctx.status = 400;
    }
  } catch (e) {
    ctx.throw(500, e.message);
  }
};

exports.registerUser = async(ctx, next) => {
  let user = new User(ctx.request.body);
  user.provider = 'local';
  //хэшируем пароль
  let hashObject = hash.saltHashPassword(user.password);
  //сохраняем хэш и соль
  user.password = hashObject.passwordHash;
  user.salt = hashObject.salt;
  ctx.user = user;
  try {
    let result = await emailConfirmCtrl.createTempUser(ctx);
    if (result) {
      ctx.status = 201;
      ctx.body = 'An email has been sent to you. Please check it to verify your account.';
    }
  } catch (e) {
    ctx.status = 400;
    ctx.body = e.message;
  }
};

exports.check = async(ctx, next) => {
  let user = await User.findOne({_id: ctx.header.authorization});
  if (user) {
    ctx.status = 200;
    ctx.body = user;
  } else {
    ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
  }
};

exports.confirmTempUser = async(ctx, next) => {
  ctx.url = ctx.params.URL;
  let result = await emailConfirmCtrl.confirmTempUser(ctx);
  if (result) {
    ctx.status = 200;
    ctx.body = 'You have been confirmed!';
  } else {
    ctx.throw(404, 'FAILED');
  }
};

exports.resendVerificationEmailAsync = async(ctx, next) => {
  try {
    ctx.email = ctx.params.email;
    let result = await emailConfirmCtrl.resendVerificationEmailAsync(ctx);
    if (!result) {
      ctx.throw(404, 'ERROR: resending verification email FAILED');
    }
  } catch (e) {
    ctx.throw(500, e.message);
  }
};
