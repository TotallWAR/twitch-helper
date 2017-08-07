const mongoose = require('mongoose');
let User = require('mongoose').model('User');
const nodemailer = require('nodemailer'),
  smtpConfig = require('../../config/smtp.config'),
  htmlTemp = require('../../public/views/emailConfirmTemplate'),
  envCfg = require('../../config/env/' + process.env.NODE_ENV + '.js');
Promise = require('bluebird');
let nev = Promise.promisifyAll(require('email-verification')(mongoose));

module.exports = () => {
  // NEV configuration =====================
  nev.configureAsync({
    persistentUserModel: User, expirationTime: 86400, // 24 часа

    verificationURL: '${URL}',
    transportOptions: {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure, // upgrade later with STARTTLS
      auth: {
        user: smtpConfig.smtpUser,
        pass: smtpConfig.smtpUserPassword
      }
    },
    confirmMailOptions: {
      from: smtpConfig.smtpUser, //заголовок from должен быть такой же, как и user в SMTP
      subject: 'Successfully verified!',
      html: '<p>Your account has been successfully verified.</p>',
      text: 'Your account has been successfully verified.'
    },
    verifyMailOptions: {
      from: smtpConfig.smtpUser,
      subject: 'Confirm your account',
      html: htmlTemp.htmlTemp,
      text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
    hashingFunction: null,
    passwordFieldName: 'password'
  }).then(function(options) {
    console.log('configured: ' + (typeof options === 'object'));
    return nev.generateTempUserModelAsync(User);
  }).then(function(tempUserModel) {
    console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
  }).catch(function(err) {
    console.log('ERROR!');
    console.log(err);
  });

  let createTempUser = async(ctx) => {
    let userParams = null;
    try {
      let createTempUserAsync = Promise.promisify(nev.createTempUser, {
        context: nev,
        multiArgs: true
      });
      //создание временного пользователя на 24 часа
      userParams = await createTempUserAsync(ctx.user);
    } catch (err) {
      ctx.throw(500, err.message);
    }
    let existingPersistentUser = userParams[0],
      newTempUser = userParams[1];
    // user already exists in persistent collection
    if (existingPersistentUser) {
      ctx.throw(400, 'You have already signed up and confirmed your account. Did you forget your password?');
    }
    if (newTempUser) {
      var URL = newTempUser[nev.options.URLFieldName];
      //заменяем в шаблоне емейл
      var e = /\$\{EMAIL\}/g;
      let h = /\$\{HOST\}/g;
      let mailOptions = nev.options.verifyMailOptions;
      mailOptions.html = await mailOptions.html.replace(e, ctx.user.email);
      mailOptions.html = await mailOptions.html.replace(h, envCfg.HOST);
      //отправляем польз-лю
      return nev.sendVerificationEmailAsync(ctx.user.email, URL);

      // user already exists in temporary collection!
    } else {
      ctx.throw(400, 'You have already signed up. Please check your email to verify your account.')
    }
  };

  // resend verification button was clicked
  let resendVerificationEmail = async(ctx) => {
    try {
      let userFound = await nev.resendVerificationEmailAsync(ctx.email);
      if (userFound) {
        ctx.status = 200;
        ctx.body = 'An email has been sent to you, yet again. Please check it to verify your account.';
      } else {
        ctx.status = 403;
        ctx.body = 'Your verification code has expired. Please sign up again.';
      }
    } catch (e) {
      throw(e);
    }
  };

  let confirmTempUser = async(ctx) => {
    try {
      //удаление из временной коллекции и перенос юзера в зарегестрированных
      let user = await nev.confirmTempUserAsync(ctx.url);
      if (user) {
        return user;
      } else {
        ctx.status = 400;
        ctx.body = 'Couldn\'t confirm user. Perhaps your code expired?';
      }
    } catch (e) {
      ctx.throw(500, e);
    }
  };

  return {createTempUser: createTempUser, resendVerificationEmail: resendVerificationEmail, confirmTempUser: confirmTempUser}
};
