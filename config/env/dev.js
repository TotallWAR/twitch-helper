const port = 3000;
const dbURI = 'mongodb://localhost:27017/';

const mongoose = require('mongoose');

module.exports = {
  HOST: 'http://localhost:' + port,
  dbURI: dbURI,
  appPort: port,
  dbConnect: async function(dbToBeConnected) {
    console.log('connecting to MongoDB...' + dbURI + '/' + dbToBeConnected);
    try {
      var db = null;
      db = await mongoose.connection.openUri(dbURI + dbToBeConnected, {useMongoClient: true});
      console.log('Connected to MongoDB.');
      mongoose.connection.on('disconnected', function() {
        console.log('Mongoose default connection disconnected');
        tnl.close();
      });
      return db;
    } catch (e) {
      console.log(e);
    }
  }
};
