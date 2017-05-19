$(document).ready(function () {
    var $recordingButton = $(".btn-circle");
    var stt = require("./speechToText");
    var con = require("./conversation");
    var tts = require("./textToSpeech");
    var greeting = "Hallo, ich bin Claudio, dein persönlicher Assistent. Wie kann ich dir helfen?";
    var notificationNumber = 0;

    $(".hider").click(function () {
        notificationNumber = 0;
        $(".notification").hide().text();
        $(".voice , .history").toggle();
        $("#chatForm").toggle();
        window.scrollTo(0,document.body.scrollHeight);

    });

    $('#chatForm').submit(function (event) {
        event.preventDefault();
        var msgSend = '<div class="row msg "><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + $('#messageField').val().toString() +'</div></div><div class="col-lg-3"></div></div>';
        $(msgSend).appendTo("#chat div.container");
        var obj = {"transcript" : $('#messageField').val().toString()}
        con.con(obj).then(function (result) {

            obj = JSON.parse(result);
            obj = obj.response.result.payload.toString();
            var msgRecived = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="msg-recived">' + obj +'</div></div><div class="col-lg-5"></div></div>';
            $(msgRecived).appendTo("#chat div.container");
            window.scrollTo(0,document.body.scrollHeight);


        });

    });

   // tts.tts(greeting).then();

    $(document).on('click', '#record', function () {

        $recordingButton.removeAttr('id').attr('id', 'recordingNow').css('background-color', '#FF7F50').addClass("recording");
        stt.promise().then(function (result) {
            return con.con(result);
        }).then(function (result) {
            obj = JSON.parse(result);
            obj = obj.response.result.payload.toString();
            notificationNumber++;
            $(".notification").show().text(notificationNumber.toString());
            return tts.tts(obj)
        });

    });
});