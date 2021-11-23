const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

// Define Schema Types
let propertySchema = new Schema({
    
    propertyID: new Schema.Types.ObjectId,
    
    pName: {type:String, required:true},

    pStreet: {type:String, required:true},

    pPhone: {type:Number, required:true},

    pUnitSuite: {type:String, required:true},

    pCity: {type:String, default: "Charlotte",required:true},

    pState:  {type:String, default: "North Carolina",required:true},

    pZipCode:  {type:Number, default: 28015 ,required:true},

    pLightingCap: {type:String, required:true}

}, {collection: "PropertyInformation"});

module.exports = mongoose.model("property", propertySchema);

//insert into the server.js file
const property = require("./models/propertyinfo");

