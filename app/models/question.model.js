'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  answers: [{
    id: Number,
    body: String
  }]
}, {
  collection: 'questions'
});

module.exports = mongoose.model('Question', questionSchema)
