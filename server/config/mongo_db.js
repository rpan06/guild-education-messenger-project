const mongoose = require('mongoose');
const CONFIG = require('./mongo_config');

const MONGOURI = `mongodb+srv://${CONFIG.USERNAME}:${CONFIG.PASSWORD}@cluster0.8o5np.mongodb.net/${CONFIG.DATABASE}`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connection established successfully');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
