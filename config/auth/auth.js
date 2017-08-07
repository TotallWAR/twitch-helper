'use strict';
const passport = require('koa-passport');

module.exports = () => {
  let User = require('mongoose').model('User');
  let stratagy1 = require('./stratagies/local.js')(User, passport);

  passport.serializeUser((user, done) => {
    //console.log('ser:', user)
    done(null, user);
  });

  passport.deserializeUser((userCred, done) => {
    (async() => {
      try {
        const user = await User.findOne({email: userCred.email});
        //console.log("des: user", user);
        done(null, user);
      } catch (error) {
        console.log("error")
        done(error);
      }
    })();
  });

};
