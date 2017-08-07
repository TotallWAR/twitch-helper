'use strict';
let User = require('mongoose').model('User'),
  passport = require('passport'),
  fs = require('fs');

exports.renderBootstrap = async(ctx, next) => {
  try {
    ctx.type = 'html';
    var body = await fs.readFileSync('./public/css/bootstrap.min.css', 'utf8');
    ctx.body = body;
  } catch (e) {
    ctx.throw(404, "Not Found");
  }
};
