const Express = require('express');
const { nextTick } = require('process');
let router = Express.Router();

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
    constructor(array){
        this.array = array; // An array of CalendarDays
        this.firstDay = array[0].day; // The first day of the month, num.
        this.lastDay = array[array.length-1].day; // The last day of the month, num.
    }
}

function createTestMonth(firstDayOfMonth, numDays){
    let array = [];
    let day = firstDayOfMonth;
    for (let i = 1; i < numDays+1; i++){
        array.push(new CalendarDay(i, day, ''));
        day++;
        if (day > 6) day = 0;
    }
    let month = new CalendarMonth(array);
    return month;
}

router.get('/*', async function (req, res) {
    month = createTestMonth(1, 30);
    month.array[25].contents = '<b>Thanksgiving</b>'
    console.log(month);
	res.render('calendar', {month:month});
});

module.exports = router;