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
    constructor(array, name){
        this.array = array; // An array of CalendarDays
        this.name = name; //ex 'December'
        this.firstDay = array[0].day; // The first day of the month, num.
    }
}

function createTestMonth(name, firstDayOfMonth, numDays){
    let array = [];
    let day = firstDayOfMonth;
    for (let i = 1; i < numDays+1; i++){
        array.push(new CalendarDay(i, day, ''));
        day++;
        if (day > 6) day = 0;
    }
    let month = new CalendarMonth(array, name);
    return month;
}

router.get('/*', async function (req, res) {
    month = createTestMonth('December', 3, 31);
    month.array[24].contents = '<b>Christmas</b>';
	res.render('calendar', {month:month});
});

module.exports = router;