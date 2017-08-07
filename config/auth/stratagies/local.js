'use strict';
const hash = require('../hash.js');

module.exports = (User, passport) => {
  const LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Incorrect username.'
          });
        }
        let hashedPassword = hash.sha512(password, user.salt);
        if (hashedPassword.passwordHash !== user.password) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      });
    }));
};
