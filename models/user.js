
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

module.exports = mongoose.model("User", userSchema);
