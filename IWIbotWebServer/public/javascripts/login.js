$(document).ready(function () {

    $('.form-signin').on('submit', function () {
        event.preventDefault()
        console.log("hello");
        var name;
        var $inputs = $('.form-signin :input');
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();

        });


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

});