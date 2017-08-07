'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: String,
  provider: String,
  GENERATED_VERIFYING_URL: String
}, {collection: "users"});

//хотел создать метод для сравнения пароля
// userSchema.methods.validPassword = (candidatePassword) => {
//   return (candidatePassword == this.password ? 1 : 0);
// };

module.exports = mongoose.model('User', userSchema);
