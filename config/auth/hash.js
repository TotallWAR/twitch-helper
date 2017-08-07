'use strict';
const crypto = require('crypto');

const genRandomString = function(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
module.exports = {
  sha512: function(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value
    };
  },

  saltHashPassword: function(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = this.sha512(userpassword, salt);
    return {
      salt: passwordData.salt,
      passwordHash: passwordData.passwordHash
    }
    //console.log('UserPassword = ' + userpassword);
    //console.log('Passwordhash = ' + passwordData.passwordHash);
    //console.log('nSalt = ' + passwordData.salt);
  }
};
