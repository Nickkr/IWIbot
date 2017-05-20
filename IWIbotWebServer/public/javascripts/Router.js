$(document).ready(function () {
    var $recordingButton = $(".btn-circle");
    var stt = require("./speechToText");
    var con = require("./conversation");
    var tts = require("./textToSpeech");
    var notificationNumber = 0;
    var greeting = "Hallo, ich bin Claudio, dein persönlicher Assistent. Wie kann ich dir helfen?";
    // tts.tts(greeting).then();

    $(".historyToggle").click(function () {
        notificationNumber = 0;
        $(".notification").hide().text();
        $(".voice , .history").toggle();
        $("#chatForm").toggle();
        window.scrollTo(0, document.body.scrollHeight);

    });

    $('#chatForm').submit(function (event) {
        event.preventDefault();
        var value = $('#messageField').val().toString();
        var msgSend = '<div class="row msg "><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + value + '</div></div><div class="col-lg-3"></div></div>';
        $(msgSend).appendTo("#chat div.container").hide().fadeIn();
        window.scrollTo(0, document.body.scrollHeight);
        con.con(value).then(function (result) {

            valueRecived = JSON.parse(result);
            valueRecived = valueRecived.payload.toString();
            var msgRecived = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="msg-recived">' + valueRecived + '</div></div><div class="col-lg-5"></div></div>';
            $(msgRecived).appendTo("#chat div.container").hide().fadeIn();
            window.scrollTo(0, document.body.scrollHeight);


        });

    });

    $(document).on('click', '.notRecording', function () {

        $recordingButton.removeClass("notRecording").addClass("recording");
        stt.promise().then(function (result) {
            return con.con(result);
        })
            .then(function (result) {
                //Add new notification and stop Loader animation
                notificationNumber++;
                $("#mainDiv").removeClass("loader");
                $recordingButton.show();
                $(".notification").show().text(notificationNumber.toString());
                //Extract Payload and safe as String
                result = JSON.parse(result);
                result = result.payload.toString();
                return tts.tts(result);
            });

    });
});