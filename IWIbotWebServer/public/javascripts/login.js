$(document).ready(function () {

    var $invalidInput = $(".invalidInput");

    //Close Login-Overlay
    function close_modal() {
        $("#lean_overlay").fadeOut(200);
        $("#modal").css({"display": "none"})

    }

    $("#modal_trigger").leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });
    //Set local storage
    function setItem(key, value) {
        localStorage.setItem(key, value);
    }
    //Get local storage
    function getItem(key) {
        return localStorage.getItem(key);
    }

    $('.loginForm').on('submit', function () {
        event.preventDefault()

        var $inputs = $('.loginForm :input');
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();

        });
        $(".loginForm").trigger('reset');
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
                $invalidInput.hide();
                close_modal();
                setItem("username", values["username"]);
                setItem("password", values["password"]);
            },
            error: function () {
                $invalidInput.show();
            }

        });


    });


})