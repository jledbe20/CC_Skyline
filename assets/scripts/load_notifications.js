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
var notifications = [notification1, notification2, notification1, notification2, notification1, notification2, notification1, notification2];

$(document).ready(function() {
    $("aside").empty();
    for(var i = 0; i < notifications.length; i++) {
        $("aside").append(
            "<div class=notification id=" + String(i) + ">" +
            "<a href=#><h3>" + notifications[i][0] + "</h3></a>"
        );
    }
    $("aside div").click(function() {
        $("aside div").css("background-color", $("main").css("background-color"));
        $("aside div").css("color", $("main").css("color"));
        $(this).css("background-color", "#284B63");
        $(this).css("color", "#ffffff");
        var notification = notifications[parseInt($(this).attr("id"))];
        $("#subject").text("Subject: " + notification[0]);
        $("#event_description").text(notification[1]);
        $("#participating_members").empty();
        for(var i = 0; i < notification[2].length; i++) {
            $("#participating_members").append(
                "<li>" + notification[2][i] + "</li>"
            );
        }
        $("#date").text("Date: " + notification[3]);
        $("#color_box").text(notification[4]);
        $("#color_box").css("background-color", notification[4]);
    });
});