const Express = require('express');
const { $where } = require('../models/requestForm');
const Notification = require("../models/notifications");
const Request = require("../models/requestForm");
let router = Express.Router();
let urlencodedParser = Express.urlencoded({ extended: false});

// Given a mongo query object, returns an array of all matching notificatons.
async function getNotifications(query){
    return new Promise((resolve,reject) => {
    // Find all events that are within the month.
    Notification.find(query).then(async (data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

// Approve a given request
router.post('/updateRequest', urlencodedParser, async function(req, res){
	// TODO: Change this password validation to instead check the user's authentication (should be admin only)
    // TODO: Make this asynchronous on the user side (eg. AJAX), so that the page doesn't reload.
	if (req.body.pass != 'password'){
        return res.send('Error: Invalid Password');
    }

    let request = await getRequests({_id: req.body.requestID});
    request = request[0]

    if (req.body.approve == ''){
        let toSave = new Notification({requestName: request.requestName, requestDescription: request.requestDescription, 
            requestColorHex: request.requestColorHex, requestDates: request.requestDates, 
            recurringEvent: request.recurringEvent, approvalRejectionComments: request.approvalRejectionComments});
        toSave.save()
    }
    // Delete the request object.
    await Request.deleteOne({_id: req.body.requestID});
    res.redirect('/notifications/');
});

// Given a mongo query object, returns an array of all matching requests.
async function getRequests(query){
    return new Promise((resolve,reject) => {
    // Find all events that are within the month.
    Request.find(query).then(async (data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

router.get('/', async function (req, res) {
    let rawNotifications = await getNotifications({'requestDates.endDate': {'$gte': Date.now()}});
    let processedNotifications = [];
    for (let rawNotif of rawNotifications){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = null;
        try{
            date = rawNotif.requestDates.startDate.toLocaleDateString("en-US", options);
        } catch (e){
            console.log('Error: Malformed Notification Object: ' + rawNotif)
        }
        let processed = [
            rawNotif.requestName,
            rawNotif.requestDescription,
            rawNotif.participatingParties,
            date,
            rawNotif.requestColorHex[0]
        ];
        processedNotifications.push(processed);
    }
    // Stringify the notifications
    let str = JSON.stringify(processedNotifications);
    res.render('public/notifications', { notifications: str });
});

// TODO: Delete this method once the admin view functions
// This function is for testing admin view functionality
router.get('/test', async function (req, res) {
    // Get only requests in the past.
    let rawNotifications = await getRequests({'requestDates.endDate': {'$gte': Date.now()}});
    let processedNotifications = [];
    for (let rawNotif of rawNotifications){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = null;
        try{
            date = rawNotif.requestDates.endDate.toLocaleDateString("en-US", options);
        } catch (e){
            console.log('Error: Malformed Request Object: ' + rawNotif)
        }
        let processed = [
            rawNotif.requestName,
            rawNotif.requestDescription,
            rawNotif.participatingParties,
            date,
            rawNotif.requestColorHex[0],
            rawNotif._id
        ];
        processedNotifications.push(processed);
    }
    // Stringify the notifications
    let str = JSON.stringify(processedNotifications);
    
    res.render('admin/notifications', { notifications: str });
});

module.exports = router;