
/*
title: returns job title if available [Stakeholder, System Adminstrator, Property Managers] 
company: return which company this person orignates from 
batchSetting: //batch setting choices
    [Weekly, every two weeks, once a month, daily, none, or number of days.]
department: return a type of industry which this account is associated with, if avaiable.
    [healthcare, real estate, hospitality, .... etc. ]
*/
const mongoose = require("mongoose");

const userName = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
});

const propertyInfo = new mongoose.Schema({
       // pID = propertyInfo.objectID,
        pName:{type: String, required: true},
        pStreet: {type: String, required: true},
        pPhone: {type: String, required: true},
        pUnit: {type: String, required: true},
        pCity:{type: String,  default: "Charlotte"},
        pState: {type: String,  default: "North Carolina"},
        pZipC: {type: String, required: true},
        pLightCap: {type: String, required: true}
    
});

const userSchema = new mongoose.Schema({
   
    name: userName,

    email: {type: String, required: true},
    
    phone: {type: String, required: true},
    
    password: {type: String, required: true},

    title: String, 
    
    company: {type: String, required: true},

    batchSetting:String,
    
    propertyInformation:propertyInfo,

    department:{type: String, required: true}

}, {collection: "CCID_USERS"}

);

module.exports = mongoose.model("users", userSchema);

//insert into the server.js file
const user = require("./models/user");


/*
files implemented using 
https://kb.objectrocket.com/mongo-db/simple-mongoose-and-node-js-example-1007
https://youtu.be/5QEwqX5U_2M
*/


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
module.exports = mongoose.model("User", userSchema);
