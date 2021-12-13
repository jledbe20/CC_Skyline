
/*
title: returns job title if available [Stakeholder, System Adminstrator, Property Managers] 
company: return which company this person orignates from 
batchSetting: //batch setting choices
    [Weekly, every two weeks, once a month, daily, none, or number of days.]
department: return a type of industry which this account is associated with, if avaiable.
    [healthcare, real estate, hospitality, .... etc. ]
*/
const mongoose = require("mongoose");
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

const userName = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
});

const propertyInfo = new mongoose.Schema({
        // pID = propertyInfo.objectID,
        pName:{type: String, required: true},
        pStreet: {type: String, required: true},
        pPhone: {type: String, required: true},
        //some buildings might not have unts number
        pUnit: {type: String},
        pCity:{type: String,  default: "Charlotte"},
        pState: {type: String,  default: "North Carolina"},
        pZipC: {type: String, required: true},
        pLightCap: {type: String, required: true}
    
});

const userSchema = new mongoose.Schema({
    // sets the default mongo _id for each new users, pID 
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {type: String, required: false},
        lastName: {type: String, required: false}
    },

    email: {
        type: {type: String, required: false}
    },

    phone: {
        type: {type: String, required: false}
    },

    password: {
        type: {type: String, required: false}
    },

    title:{
        type:  String // returns job title if available [Stakeholder, System Adminstrator, Property Managers] 
    },

    company:{
        type: {type: String, required: false} // return which company this person orignates from 
    },

    // batch setting choices
    // Weekly, every two weeks, once a month, daily, none, or number of days.
    batchSetting:{type: String},

    // department return a type of industry which this account is associated with, if available.
    // healthcare, real estate, hospitality, .... etc.   
    
    propertyInformation:propertyInfo,
    department:{type: String, required: false}

}, {collection: "CCID_USERS"}

);

module.exports = mongoose.model("users", userSchema);

/*
files implemented using 
https://kb.objectrocket.com/mongo-db/simple-mongoose-and-node-js-example-1007
https://youtu.be/5QEwqX5U_2M
*/

/*
// Class for UserDB
class UserDB{
  
    // Getters and Setters
  
    // Retrieve a user by ID. Return promise
    static async getUser(id){
      return new Promise((resolve, reject) => {
  
      })
    }
  
    // Use the user id to reset properties of the user that have been passed, properties and values should be arrays that are in a paired format.
    static async resetUser(id, properties, values){
        return new Promise((resolve, reject) => {

        })
    }
  
    // Add user to database
    static async addUser(user){
  
      // Return the success or failure of the 
      return new Promise((resolve, reject) => {
        UserDB.updateNextID.then((data) => {
  
        })
      })
    }
  
    // Does there need to be a function to update for the nextID like in Kyle's quoteDB
  
    // Delete user by ID. 
    static async deleteUser(id){
      return new Promise((resolve, reject) => {
  
      })
    }
  
    // Determine if an id is valid. This function will determine if the user has entered the correct password.
    static idValidation(email, password){
      return new Promise((resolve, reject) => {
  
      })
    }
  
    // 
  }
module.exports = mongoose.model("Users", userSchema);
  }*/


// Setting up the passport plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
