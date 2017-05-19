var exports = module.exports = {};

exports.promise = function () {
    var response;
    var $recordingButton = $(".btn-circle");
    return new Promise(function (resolve, reject) {
        //$(document).on('click', '#record', function () {
        $recordingButton.removeAttr('id').attr('id', 'recordingNow').css('background-color', '#FF7F50').addClass("recording");
        var recognizeMicrophone = require('watson-speech/speech-to-text/recognize-microphone');

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
                $recordingButton.css('background-color', '#e6e6e6').removeAttr('id', 'recordingNow').attr('id', 'record').removeClass("recording");
                console.log(err);
            });
            stream.on('data', function (message) {
                // console.log(message);
                if (message.results[0] != undefined) {

                    if (message.results[0].final) {
                        response = message.results[0].alternatives[0];
                        console.log("Messag: " + JSON.stringify(message.results[0].alternatives[0]));

                    }

                }
            })
            document.querySelector('#recordingNow').onclick = stream.stop.bind(stream);

            stream.on('finish', function () {
                $recordingButton.css('background-color', '#e6e6e6').removeAttr('id', 'recordingNow').attr('id', 'record').removeClass("recording");
                $recordingButton.css('background-color', '#e6e6e6').removeClass("recording").hide();
                $("#mainDiv").addClass("loader");
                var msgSend = '<div class="row msg "><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + response.transcript + '</div></div><div class="col-lg-3"></div></div>';
                $(msgSend).appendTo("#chat div.container");



                //$recordingButton.hide();
                resolve(response);

            })


            /* $(document).on('click', '#recordingNow', function () {
             stream.stop.bind(stream);
             //stream.stop();
             });*/

            /* $recordingButton.click(function () {

             stream.stop();

             });
             */
        }).catch(function (error) {

            //$recordingButton.css('background-color', '#e6e6e6').removeAttr('id', 'recordingNow').attr('id', 'record').removeClass("recording");
            console.log(error);
        });
    });
    // });
}
