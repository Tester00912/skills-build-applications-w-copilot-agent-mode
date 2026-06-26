const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

module.exports = {
  connectToDatabase,
  mongoUri,
};

module.exports.default = connectToDatabase;
