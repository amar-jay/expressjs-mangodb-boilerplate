const { MongoClient } = require('mongodb');
const connectionString = process.env.URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db('firsttry');
      console.log('connected to MongoDB successfully.');

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};
