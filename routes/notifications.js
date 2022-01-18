const Express = require('express');
const { $where } = require('../models/requestForm');
const Notification = require("../models/notifications");
const Request = require("../models/requestForm");
let router = Express.Router();

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
    let rawNotifications = await getNotifications();
    let processedNotifications = [];
    for (let rawNotif of rawNotifications){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = rawNotif.requestDates.startDate.toLocaleDateString("en-US", options)
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
    let rawNotifications = await getRequests();
    let processedNotifications = [];
    for (let rawNotif of rawNotifications){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let date = rawNotif.requestDates.startDate.toLocaleDateString("en-US", options)
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

module.exports = router;