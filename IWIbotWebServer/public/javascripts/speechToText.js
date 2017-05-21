var exports = module.exports = {};

exports.promise = function () {
    var sttResponse;
    var $recordingButton = $(".btn-circle");
    var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');
    return new Promise(function (resolve, reject) {

        fetch('./api/speech-to-text/token')
            .then(function (response) {
                return response.text();
            }).then(function (token) {
            var stream = recognizeMicrophone({
                token: token,
                continuous: false,
                outputElement: '#sttContent' // CSS selector or DOM Element
            });

            stream.on('error', function (err) {
                $recordingButton.removeClass("recording").addClass("notRecording");
                console.log(err);
            });
            stream.on('data', function (message) {
                console.log(message);
                console.log(JSON.stringify(message));
                console.log(typeof message.results[0] !== "undefined");
                if (typeof message.results[0] !== "undefined") {

                    if (message.results[0].final) {
                        sttResponse = message.results[0].alternatives[0].transcript;
                        console.log("Messag: " + JSON.stringify(message.results[0].alternatives[0]));

                    }

                }
            })
            document.querySelector('.recording').onclick = stream.stop.bind(stream);

            stream.on('finish', function () {
                console.log("Response" + sttResponse);

                if (typeof sttResponse !== "undefined") {

                    $recordingButton.removeClass("recording").addClass("notRecording").hide();
                    $("#mainDiv").addClass("loader");
                    var msgSend = '<div class="row msg "><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + sttResponse + '</div></div><div class="col-lg-3"></div></div>';
                    $(msgSend).appendTo("#chat div.container");
                    resolve(sttResponse);
                } else {

                    $recordingButton.removeClass("recording").addClass("notRecording")
                    reject();


                }


            })


        }).catch(function (error) {
            console.log(error);
        });
    });
}
