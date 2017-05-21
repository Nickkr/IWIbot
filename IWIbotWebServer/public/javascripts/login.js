$(document).ready(function () {
    $("#modal_trigger").leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });

    $('.loginForm').on('submit', function () {
        event.preventDefault()
        console.log("hello");
        var name;
        var $inputs = $('.loginForm :input');
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();

        });

        console.log(values["username"]);
        $.ajax
        ({
            type: "GET",
            url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/validate",
            async: false,
            headers: {
                "Authorization": "Basic " + btoa(values["username"] + ":" + values["password"])
            },
            success: function () {

                window.location = "/stream";
            },
            error: function () {
                alert("Username or Password wrong");
            }

        });


    });


})