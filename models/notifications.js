const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let notificationSchema = new Schema({
    notificationID = new Schema.Types.ObjectId,
    requestID: {type: ObjectId, required: true},
    
    requestName:  {type: String, required: true},

    requestDate:  {type: Date, required: true},

    requestDescription:  {type: String, required: true},

    requestColorHex:{type:String, required: true },

    startDate: {type: Date, required: true},
    
    startTime: {type: Date, required: true},
    
    endDate: {type: Date, required: true},
    
    endTime: {type: Date, required: true},
    
    recurringEvent: {type: Boolean},
    
    approvalRejectionComments: {type: String},

    participatingParties:[
        {
            stakeholderID:
            {
                type: ObjectId
            }
        }
    ]


}, { collection: 'notifications'});
