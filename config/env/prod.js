const mongoose = require('mongoose');

const port = 3000;
const dbURI = 'mongodb://localhost:27017/';

module.exports = {
  HOST: 'http://localhost:' + port,
  dbURI: dbURI,
  appPort: port,
  dbConnect: function(dbToBeConnected) {
    console.log('connecting to MongoDB...' + dbURI + '/' + dbToBeConnected);
    var db = null;
    db = mongoose.connection.openUri(dbURI + dbToBeConnected, {useMongoClient: true}).then((err, db) => {
      console.log('Connected to mongo server. ');
      return db;
    });
  }
};
