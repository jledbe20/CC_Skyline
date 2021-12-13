const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
require('dotenv').config();

const MONGODB_URI = "mongodb+srv://skylineT:unccSkyline2022@cluster0.59ufx.mongodb.net/"
// Connecting Mongoose
/*mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/

// Setting up the login aspect of the schema
const UserLogin = new mongoose.Schema({
  username: String,
  password: String,
});

// Setting up the passport plugin
UserLogin.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserLogin', UserLogin);