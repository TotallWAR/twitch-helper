'use strict';
const mongoose = require('mongoose');
//используем bluebird промисы, а не промисы из mongoose
mongoose.Promise = require('bluebird');

const envCfg = require('./env/' + process.env.NODE_ENV + '.js');
// MongoDB
module.exports = async() => {
  require('../app/models/user.model.js');
  let db = null;
  try {
    db = await envCfg.dbConnect('twitchHelper');
  } catch (e) {
    console.log(e);
  }

  return db;
};
