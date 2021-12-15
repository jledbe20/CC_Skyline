const Express = require('express');
const { $where } = require('../models/requestForm');
let router = Express.Router();

router.get('/', async function (req, res) {
    var notification1 = [
        "St. Jude Children's Research Walk Request",
        "St. Jude Children's Research Walk is going to take place next week. To raise awareness about the event we would like to light the building red to promote the event. The red lights used to color the building event will fit the charity logo color. ",
        ["Company A", "Company T", "Building 33"],
        "September 24th, 2022",
        "#FF0000"
        ];
    var notification2 = [
        "4th of July",
        "The Fourth of July celebrates the passage of the Declaration of Independence by the Continental Congress on July 4, 1776. The Declaration announced the political separation of the 13 North American colonies from Great Britain",
        ["Company X", "Building 4", "Building 52", "Company W", "Company A", "Building 12", "Building 16", "Building 29"],
        "July 4th, 2022",
        "#0000FF"
        ];
    // Stringify the notifications
    let str = JSON.stringify([notification1, notification2]);
    res.render('notifications', {notifications:str});
});

module.exports = router;