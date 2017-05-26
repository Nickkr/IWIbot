var exports = module.exports = {};

exports.promise = function () {
    console.log("----------STT_started----------");
    //Require Watson Module
    var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');

    var $recordingButton = $(".btn-circle");
    var sttResponse;

    return new Promise(function (resolve, reject) {
        //Get API-Token from server
        fetch('./api/speech-to-text/token')
            .then(function (response) {
                return response.text();
            }).then(function (token) {
            var stream = recognizeMicrophone({
                token: token,
                //continuous: false,
                outputElement: '#sttContent' // CSS selector or DOM Element
            });

            stream.on('error', function (err) {
                //Remove recording animation on error
                $recordingButton.removeClass("recording").addClass("notRecording");
                console.log("STT_err: " + err);
            });
            stream.on('data', function (message) {
                console.log("STT_streamData: " + JSON.stringify(message));
                //If Speech To Text service recognized something
                if (typeof message.results[0] !== "undefined") {
                    //Safe sst response when sentence has ended
                    if (message.results[0].final) {
                        sttResponse = message.results[0].alternatives[0].transcript;

                    }

                }
            });
            //Stop recording
            document.querySelector('.recording').onclick = stream.stop.bind(stream);

            stream.on('finish', function () {

                console.log("STT_finalResponse: " + sttResponse);
                //Data recorded
                if (typeof sttResponse !== "undefined") {
                    //Hide recording button and show loader animation
                    $recordingButton.removeClass("recording").addClass("notRecording").hide();

                    //Append final stt response to chat view
                    $("#mainDiv").addClass("loader");
                    var msgSend = '<div class="row msg "><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + sttResponse + '</div></div><div class="col-lg-3"></div></div>';
                    $(msgSend).appendTo("#chat div.container");

                    resolve(sttResponse);

                } else {

                    $recordingButton.removeClass("recording").addClass("notRecording");
                    reject();


                }


            });


        }).catch(function (error) {
            console.log(error);
        });
    });
};
