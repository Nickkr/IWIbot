var chat = require("./chat.js");

module.exports = function () {
    console.log("----------STT_started----------");
    //Require Watson Module
    var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');
    var $recordingButton = $(".btn-circle");
    var $mainDiv = $("#mainDiv");
    var sttResponse;

    return new Promise(function (resolve, reject) {
        //Get API-Token from server
        fetch('./api/speech-to-text/token')
            .then(function (response) {
                return response.text();
            }).then(function (token) {
                var stream = recognizeMicrophone({
                    token: token,
                    outputElement: '#sttContent' // CSS selector or DOM Element
                });
                stream.on('error', function (err) {
                    //Remove recording animation on error
                    $recordingButton.removeClass("recording").addClass("notRecording");
                    console.log("SpeechToText_Error: " + err);
                });
                stream.on('data', function (message) {
                    console.log("SpeechToText_streamData: " + JSON.stringify(message, null, 4));
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
                    console.log("SpeechToText_finalResponse: " + sttResponse);
                    //Data recorded
                    if (typeof sttResponse !== "undefined") {
                        //Hide recording button and show loader animation
                        $recordingButton.removeClass("recording").addClass("notRecording").hide();
                        //Append final stt response to chat view
                        $mainDiv.addClass("loader");
                        chat.appendSendMessage(sttResponse);

                        resolve(sttResponse);
                    } else {
                        $recordingButton.removeClass("recording").addClass("notRecording");

                        reject();
                    }
                });
            }).catch(function (/*error*/) {
                //console.log(error);
            });
    });
};
