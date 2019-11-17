class Events {
    constructor() {
        this.index;
        this.callData = '<a href=`#`>Call with phone</a><br><a href=`#`>Call with Skype</a>';
        this.call = '<a tabindex="0" data-toggle="popover" data-placement="bottom" data-html="true" data-content="' + this.callData + '"><img class="phone" src="../images/phone.png"></a>';
        this.email = '<a href="mailto:jessica@alba.com"><img class="email" src="../images/mail.png"></a>';
        this.delete = '<img src="../images/delete.png" class="delete">'
        this.edit = '<img src="../images/edit.png" class="edit" data-target="#editCurrEvent" data-toggle="modal"></img>'
        this.element;
        this.eventList = [{
            title: "Call Jessica",
            date: "",
            body: "Löksås ipsum erfarenheter nya hwila inom tre tid på flera trevnadens att av enligt, söka i är bland färdväg sjö se faktor är träutensilierna ta. Plats olika söka rännil har när det enligt regn, strand jäst gör blev strand oss sista flera tiden, inom söka stora som björnbär hwila oss och, som både dock träutensilierna regn i har."
        }, {
            title: "Call Ashur",
            date: "",
            body: "Löksås ipsum erfarenheter nya hwila inom tre tid på flera trevnadens att av enligt, söka i är bland färdväg sjö se faktor är träutensilierna ta. Plats olika söka rännil har när det enligt regn, strand jäst gör blev strand oss sista flera tiden, inom söka stora som björnbär hwila oss och, som både dock träutensilierna regn i har."

        }];
        this.eventList[0].date = new Date("2019 11 15 15:00");
        this.eventList[1].date = new Date("2019 11 18 17:00");
    }

    sortByDate() {
        this.eventList.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
    }

    displayEvents() { // gets events from array of objects and displays them on the site
        this.sortByDate();
        $("#events").empty();
        $(".calendarEvent").remove();
        for (let i = 0; i < this.eventList.length; i++) {
            if (this.eventList[i].date.getMonth() === calendar.month && this.eventList[i].date.getFullYear() === calendar.year) {
                $("#day" + this.eventList[i].date.getDate()).append("<span class='calendarEvent'>" + this.eventList[i].date.toLocaleTimeString("sv-SE", {
                    timeStyle: "short"
                }) + "<span class='calendarTitle'>" + this.eventList[i].title + "</span></span>");
            }
            let monthName = new Intl.DateTimeFormat("en-US", calendar.options).format(this.eventList[i].date);
            let eventCard = "<div class='eventCard'><h3 class='eventTitle'>" + this.eventList[i].title + "</h3><span class='eventTime'>" + this.eventList[i].date.toLocaleTimeString("sv-SE", {
                timeStyle: "short"
            }) + "</span><span class='eventDate'>" + monthName + " " + this.eventList[i].date.getDate() + "&nbsp;</span>" + "<p>" + this.eventList[i].body + "</p>" + this.call + this.email + this.delete + this.edit + "</div>";
            $("#events").append(eventCard);
        }
        $('[data-toggle="popover"]').popover({
            trigger: 'focus'
        });
    }

    addEvent() {
        let modal = $(".addInput");
        let arr = [];
        let obj = {
            title: "",
            date: "",
            body: ""
        };
        modal.each(function (index, element) { // takes input values and puts them into array
            if (element.value != "") {
                arr.push(element.value);
            }
        });
        if (arr.length === 4) { // checks if all fields are entered
            let [time1, time2] = arr[2].split(":");
            let date = new Date($("#addEventDate").datepicker('getDate'));
            date.setHours(time1, time2);
            obj.title = arr[0];
            obj.date = new Date(date);
            obj.body = arr[3];
            this.eventList.push(obj);
            this.displayEvents();
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
            $("#addNewEvent").modal("hide");
        } else {
            alert("Fill in all fields");
        }
    }

    deleteEvent(element) { // deletes event element
        this.index = element.parent().index();
        if (confirm("Delete?")) {
            this.eventList.splice(this.index, 1);
            this.displayEvents();
        }
    }
    getEventInfo(element) { // takes text from event element and puts it into inputs in modal
        this.index = element.parent().index();
        $("#editEventTitle").val(this.eventList[this.index].title);
        $("#editEventTime").val(this.eventList[this.index].date.toLocaleTimeString("sv-SE", {
            timeStyle: "short"
        }));
        $("#editEventDate").datepicker("setDate", this.eventList[this.index].date);
        $("#editEventTextArea").val(this.eventList[this.index].body);
    }
    editEvent() { // inserts new values from inputs back into edited event
        let modal = $(".editInput");
        let arr = [];
        modal.each(function (index, element) {
            if (element.value != "") {
                arr.push(element.value);
            }
        });
        if (arr.length === 4) {
            let [time1, time2] = arr[2].split(":");
            let date = new Date($("#editEventDate").datepicker('getDate'));
            date.setHours(time1, time2);
            this.eventList[this.index].title = arr[0];
            this.eventList[this.index].date = date;
            this.eventList[this.index].body = arr[3];
            this.displayEvents();
            $("#editCurrEvent").modal("hide");
        } else {
            alert("Fill in all fields");
        }
    }
}

class Calendar {
    constructor() {
        this.date = new Date();
        this.day = this.date.getDate();
        this.options = {
            month: "long"
        };
        this.currentYear = this.date.getFullYear();
        this.currentMonth = this.date.getMonth();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
    }
    createCalendar(month, year) {
        this.date.setMonth(month, 1);
        this.date.setYear(year);
        let monthName = new Intl.DateTimeFormat("en-US", this.options).format(this.date); // name of month
        let firstDay = (new Date(year, month)).getDay(); // gets first day of month
        if (firstDay === 0) { // changes javascript date function to return monday as first day of the week
            firstDay = 6;
        } else {
            firstDay -= 1;
        }
        let currentDay = firstDay - firstDay - firstDay + 1;
        let days = this.getMonthDays(this.month, this.year);
        for (currentDay; currentDay < 8 - firstDay; currentDay++) {
            let day = currentDay;
            if (day <= 0) { // fills in empty table data when first day is anything but monday
                day = "";
            }
            $(".week1").append("<td id='day" + currentDay + "'>" + day + "</td>");
        }
        for (let week = 0; week < 7; week++) {
            $(".week2").append("<td id='day" + currentDay + "'>" + currentDay + "</td>");
            currentDay++;
        }
        for (let week = 0; week < 7; week++) {
            $(".week3").append("<td id='day" + currentDay + "'>" + currentDay + "</td>");
            currentDay++;
        }
        for (let week = 0; week < 7; week++) {
            $(".week4").append("<td id='day" + currentDay + "'>" + currentDay + "</td>");
            currentDay++;
        }
        for (let week = 0; week < 7; week++) {
            let day = currentDay;
            if (day > days) {
                day = "";
            }
            $(".week5").append("<td id='day" + currentDay + "'>" + day + "</td>");
            currentDay++;
        }
        for (currentDay; currentDay <= days; currentDay++) { // handles last week shenanigans when first day is sunday
            let day = currentDay;
            if (firstDay === 6) {
                days = 36;
            } else if (firstDay === 5) {
                days = 37;
            }
            if (currentDay > 31) {
                day = "";
            }
            $(".week6").append("<td id='day" + currentDay + "'>" + day + "</td>");
        }
        let week6 = $(".week6");
        let week5 = $(".week5");
        if (week6.children().length === 0) { // border fix
            week6.hide();
        } else {
            week6.show();
        }
        if (firstDay === 0 && days === 28) { // february fix
            week5.hide();
        } else {
            week5.show();
        }
        $("#calendarMonth").prepend(monthName);
        $("#calendarYear").html(this.year);
        if (this.month == this.currentMonth && this.year == this.currentYear) {
            $(".days tr td").each(function (index, element) {
                let today = Number(element.innerText);
                if (today === calendar.day) {
                    $(element).addClass("active");
                }
            });
        }
        events.displayEvents();
    }
    getMonthDays(month, year) { // returns number of days in month
        return 32 - new Date(year, month, 32).getDate();
    }
    nextMonth() { // next month in calendar
        if (this.month === 11) {
            this.month = 0;
            this.year += 1;
        } else {
            this.month += 1;
        }
        $(".days tr td").remove();
        $("#calendarMonth").empty();
        this.createCalendar(this.month, this.year);
    }
    prevMonth() { // previous month in calendar
        if (this.month === 0) {
            this.month = 11;
            this.year -= 1;
        } else {
            this.month -= 1;
        }
        $(".days tr td").remove();
        $("#calendarMonth").empty();
        this.createCalendar(this.month, this.year);
    }
}


calendar = new Calendar();
events = new Events();
calendar.createCalendar(calendar.month, calendar.year);

$(".month").on("click", "#nextMonth", function () {
    calendar.nextMonth();
});

$(".month").on("click", "#prevMonth", function () {
    calendar.prevMonth();
});

$("#addEvent").click(function () {
    events.addEvent();
});

$("#editEvent").click(function () {
    events.editEvent();
});

$("#addEventDate, #editEventDate").datepicker({
    dateFormat: "MM d yy",
    firstDay: 1
});

$(document).on("click", ".delete", function () {
    events.deleteEvent($(this));
});

$(document).on("click", ".edit", function () {
    events.getEventInfo($(this));
});