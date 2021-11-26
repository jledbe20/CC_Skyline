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
    let lastDate = new Date(year, month + 1, 0);
    let numDays = lastDate.getDate();
    return new CalendarMonth(name, firstDayOfMonth, numDays);
}

router.get('/', async function (req, res) {
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();
    res.redirect(`/calendar/${month}/${year}`);
});

router.get('/:month/:year', async function (req, res){
    month = createMonthByYear(req.params.month, req.params.year);
	res.render('calendar', {month:month});
});

module.exports = router;