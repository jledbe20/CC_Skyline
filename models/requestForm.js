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

const requestSchema = new mongoose.Schema({
    subContact : submitterSchema,

    requestName: {type: String, required: true},

    requestDescription: {type: String, required: true},

    requestColorHex: {type: String, required: true},

    requestDates: eventDate,

    recurringEvent: Boolean,
    
    approvalRejectionComments:{type:String, required: true },

}, {collection: "Request Information"});

module.exports = mongoose.model("requests", requestSchema);

