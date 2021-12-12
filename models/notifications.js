const mongoose = require("mongoose");

//participating parties list, do we want to query each notificationSchema _ID and the 
//participatingParties user: _iD collected and returned inside the calander event card. 

const eventDate = new mongoose.Schema({
    startDate: {type: Date, required: true},

    startTime: {type: Date, required: true},

    endDate: {type: Date, required: true},

    endTime: {type: Date, required: true},

});

const notificationSchema = new mongoose.Schema({
    requestIDRef: {type:mongoose.Schema.Types.ObjectId},

    requestName: {type: String, required: true}, 

    requestDescription: {type: String, required: true},

    requestColorHex: {type: String, required: true},

    requestDates: eventDate,

    recurringEvent: Boolean, 

    approvalRejectionComments:{type:String, required: true },

    participatingParties:[mongoose.Schema.Types.ObjectId],

}, {collection: "Event_Notifications" });

module.exports = mongoose.model("notifications",notificationSchema);
