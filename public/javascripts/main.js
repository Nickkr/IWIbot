$(document).ready(function () {
    //Require Watson Modules
    var stt = require("./speechToText");
    var con = require("./conversation");
    var tts = require("./textToSpeech");
    var chat = require("./chat.js");
    var login = require("./login");

    var $chatForm = $('#chatForm');
    var $recordingButton = $(".btn-circle");
    var $historyToggle = $(".historyToggle");
    var $modalTrigger = $("#modal_trigger");
    var $loginForm = $('.loginForm');
    var notificationNumber = 0;

    con.conInit().then(function () {

        notificationNumber++;
        $(".notification").show().text(notificationNumber.toString());
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

    //Toggle between chat and voice view
    $historyToggle.click(function () {
        notificationNumber = 0;
        chat.chatToggle();

    });
    //Chat Submit
    $chatForm.submit(function (event) {
        event.preventDefault();
        con.con(chat.chatSubmit());
    });
    //Open Login Window
    $modalTrigger.leanModal({
        top: 100,
        overlay: 0.6,
        closeButton: ".modal_close"
    });
    //Login Submit
    $loginForm.on('submit', function () {
        event.preventDefault();
        login.loginSubmit();
    });

    //Hide collapsed navbar when link is clicked
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

});