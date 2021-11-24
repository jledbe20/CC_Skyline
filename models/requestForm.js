const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const submitterInfo = new mongoose.Schema({
    submitterID = new Schema.type.ObjectId,
    subName:  {type: String, required: true},
    phone:  {type: String, required: true},
    email:  {type: String, required: true},
});


let requestSchema = new Schema({
    requestID = new Schema.Types.ObjectId,
    obj:submitterInfo,
    ccApprove: {type: ObjectId, default: false},

    requestName:  {type: String, required: true},

    requestDate:  {type: Date, required: true},

    requestDescription:  {type: String, required: true},

    requestColorHex:{type:String, required: true },

    startDate: {type: Date, required: true},
    
    startTime: {type: Date, required: true},
    
    endDate: {type: Date, required: true},
    
    endTime: {type: Date, required: true},
    
    recurringEvent: {type: Boolean},
    
    approvalRejectionComments: {type: String}


}, { collection: 'requestForm'});

module.export = mongoose.model("requests", requestSchema);

//insert into the server.js file
const request = require("./models/requestForm")