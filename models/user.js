const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

// Define Schema Types
let userSchema = new Schema({
    //sets the default mongo _id for each new users, pID 
    _id: new Schema.Types.ObjectId,
    name: {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true}
    },

    email: {
        type: {type: String, required: true}
    },

    phone: {
        type: {type: Number, required: true}
    },

    password: {
        type: {type: String, required: true}
    },

    title:{
        type:  String
    },

    company:{
        type: {type: String, required: true}
    },

    department:{type: String, required: true},

    propertyInformation: String,
    
    propertyOversight: String

}, { collection: 'CCID users'}

);

module.exports = mongoose.model("users", userSchema);

//insert into the server.js file
const user = require("./models/user");


/*
files implemented using 
https://kb.objectrocket.com/mongo-db/simple-mongoose-and-node-js-example-1007
https://youtu.be/5QEwqX5U_2M
*/