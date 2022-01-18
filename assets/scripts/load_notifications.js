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
        console.log(notification);
        $("#subject").text("Subject: " + notification[0]);
        $("#event_description").text(notification[1]);
        $("#participating_members").empty();
        // Update the value of this field to match the notification's ID
        $("#requestID").val(notification[5]);
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