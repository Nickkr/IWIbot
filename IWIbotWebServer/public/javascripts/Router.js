$(document).ready(function () {
    //Require Watson Modules
    var stt = require("./speechToText");
    var con = require("./conversation");
    var tts = require("./textToSpeech");


    var $recordingButton = $(".btn-circle");
    var notificationNumber = 0;
    var greeting = "Hallo, ich bin Claudio, dein persönlicher Assistent. Wie kann ich dir helfen?";
    // tts.tts(greeting).then();

    //Onclick toggle between Chat and Voice view
    $(".historyToggle").click(function () {
        notificationNumber = 0;
        $(".notification").hide().text();
        $("i.toggleIcon").toggleClass(".fa fa-microphone");
        $(".voice , .history").toggle();
        $("#chatForm").toggle();
        window.scrollTo(0, document.body.scrollHeight);

    });

    //Form submit in Chat view
    $('#chatForm').submit(function (event) {
        event.preventDefault();
        //Append submitted message to Chat
        var value = $('#messageField').val().toString();
        var msgSend = '<div class="row msg "><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + value + '</div></div><div class="col-lg-3"></div></div>';
        $(msgSend).appendTo("#chat div.container").hide().fadeIn();
        window.scrollTo(0, document.body.scrollHeight);

        con.con(value).then();



    });
    //Recording
    $(document).on('click', '.notRecording', function () {

        $recordingButton.removeClass("notRecording").addClass("recording");
        stt.promise().then(function (result) {

            return con.con(result);

        }).then(function (result) {
                //Add new notification, stop loader animation and show recording button again
                notificationNumber++;
                $("#mainDiv").removeClass("loader");
                $recordingButton.show();
                $(".notification").show().text(notificationNumber.toString());

                return tts.tts(result);
            });

    });

    //-------------Login-------------------
    var $invalidInput = $(".invalidInput");

    //Close Login-Overlay
    function close_modal() {
        $("#lean_overlay").fadeOut(200);
        $("#modal").css({"display": "none"});
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
        event.preventDefault();

        var $inputs = $('.loginForm :input');
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();

        });
        $(".loginForm").trigger('reset');

        $.ajax({
            type: "GET",
            //url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/validate",
            url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/info",
            async: false,
            headers: {
                "Authorization": "Basic " + btoa(values.username + ":" + values.password)
            },
            success: function (data) {
                console.log(data);
                firstName = {payload: "Hallo " + data.firstName + ", du hast dich erfolgreich eingeloggt"};
                firstName = JSON.stringify(firstName);
                //tts.tts(firstName).then;
                $invalidInput.hide();
                close_modal();
                setItem("username", values.username);
                setItem("password", values.password);
                setItem("courseOfStudies", data.courseOfStudies);
                console.log("courseOfStudies: " + getItem("courseOfStudies"));
            },
            error: function () {
                $invalidInput.show();
            }

        });
    });
    //Hide collapsed navbar when link is clicked
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') ) {
            $(this).collapse('hide');
        }
    });

});