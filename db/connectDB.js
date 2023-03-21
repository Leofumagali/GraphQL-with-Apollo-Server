const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to the database');
  } catch (error) {
    console.log(
      `Wouldn't able to connect to the database: ${error}`,
    );
  }
};

module.exports = connectToDatabase;
