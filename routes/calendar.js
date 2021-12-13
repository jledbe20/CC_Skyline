const Express = require('express');
const { nextTick } = require('process');
let router = Express.Router();
const Request = require("../models/requestForm");

// A single block (day) in the calendar
class CalendarDay{
    constructor(date, day, contents){
        this.date = date; // date as num;
        this.day = day // Day of week as num, 0=sun/6=sat
        // Note: This is a data sink, ensure your input is safe.
        this.contents = contents; // ex '<a>link</a>'
    }
}

// A calendar page (month).
class CalendarMonth{
    constructor(name, firstDayOfMonth, numDays){
        this.array = [];
        this.name = name; //ex 'December'
        let day = firstDayOfMonth;
        for (let i = 1; i < numDays+1; i++){
            this.array.push(new CalendarDay(i, day, ''));
            day++;
            if (day > 6) day = 0;
        }
    }

    addEvent(date, contents){
        this.array[date-1].contents = contents;
    }
}

// Note: Month is zero-indexed.
function createMonthByYear(month, year){
    let date = new Date(year, month, 1);
    let name = date.toLocaleString('default', { month: 'long' });
    let firstDayOfMonth = date.getDay();
    // Last date of month is used to find end of month.
    let lastDate = new Date(year, parseInt(month) + 1, 0);
    let numDays = lastDate.getDate();
    return new CalendarMonth(name, firstDayOfMonth, numDays);
}

// Given year and month as strings, returns all matching requests as a promise
async function getRequests(year, month){
    return new Promise((resolve,reject) => {
    let string = year + '-' + month;
    // Find all events that are within the month.
    Request.find({'requestDates.startDate': {$gte: (string + '-01'), $lte: (string + '-31') }}).then(async (data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
}

router.get('/', async function (req, res) {
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    res.redirect(`/calendar/${month}/${year}`);
});

router.get('/:month/:year', async function (req, res){
    let month = createMonthByYear(req.params.month, req.params.year);
    // Months are zero-indexed in the query, but one-indexed in the DB...
    let events = await getRequests(req.params.year, parseInt(req.params.month)+1);
    events.forEach(ele => {
        month.addEvent(ele.requestDates.startDate.getDate(), ele.requestName);
    });
	res.render('calendar', {month:month, 
        yearNum:parseInt(req.params.year), 
        monthNum:parseInt(req.params.month)});
});

module.exports = router;