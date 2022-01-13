const mongoose = require("mongoose");

const submitterSchema = new mongoose.Schema({
   // submitterID = new Schema.type.ObjectId,
    subName: {type: String, required:true},
    subPhone: {type: String, required:true},
    subEmail: {type: String, required:true},
});

const eventDate = new mongoose.Schema({
    startDate: {type: Date, required: true},

    startTime: {type: Date, required: true},

    endDate: {type: Date, required: true},

    endTime: {type: Date, required: true},

});

const imageUpload = new mongoose.Schema({
    fileImgName: {
        type: String,
    },
    img:{
        data:Buffer,
        contentType: String
    }
});

const requestSchema = new mongoose.Schema({
    subContact : submitterSchema,

    requestName: {type: String, required: true},

    requestDescription: {type: String, required: true},

    requestColorHex: {type: String, required: true},

    requestDates: eventDate,

    recurringEvent: Boolean,

    requestImage: imageUpload,
    
    approvalRejectionComments:{type:String },

}, {collection: "Request Information"});

module.exports = mongoose.model("requests", requestSchema);

/*
// Class for UserDB
class RequestFormDB{
  
    // Check to determine if the submitter already exists in the submitter table
    static async submitterExist(email){
        return new Promise((resolve, reject) => {

        })
    }

    // Add a new submitter to the submitter database
    static async addSubmitter(submitter){
        return new Promise((resolve, reject) => {

        })
    }

    // Add a new request to the request database
    static async addRequest(request){
        return new Promise((resolve, reject) => {
            
        })
    }
  */
