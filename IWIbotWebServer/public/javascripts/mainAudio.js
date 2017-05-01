var recording = false;

$(function(){
    // Call one time record to get the user agreement for using the microphone
    Fr.voice.record(false);
    Fr.voice.pause();
    Fr.voice.recorder.clear();
});

$(document).ready(function() {
    $("#record").click(function () {
        var $recordingButton = $(".btn-circle");

        if(!recording) {
            $recordingButton.css('background-color', '#FF5036').addClass("recording");
            recording = true;
            Fr.voice.resume();
        } else {
            $recordingButton.css('background-color', '#e6e6e6').removeClass("recording");
            recording = false;
            Fr.voice.pause();
            Fr.voice.export(function(blob){

                var payload = {"payload": blob};
                $.ajax({
                    //url: 'https://speech.googleapis.com/v1/speech:recognize?key=API_KEY',
                    url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/speechToText.http',
                    //url : 'https://openwhisk.ng.bluemix.net/api/v1/web/kuar1013_kuar1013-Sued/default/speech-to-text.http',
                    type: 'POST',
                    data: JSON.stringify(payload),
                /* Example object for Google Cloud Speech Service
                {
                    "config": {
                        "encoding": "LINEAR16",
                        "sampleRateHertz": 16000,
                        "languageCode": "en-US"
                },
                    "audio": {
                    "content": "/9j/7QBEUGhvdG9zaG9...base64-encoded-audio-content...fXNWzvDEeYxxxzj/Coa6Bax//Z"
                }
                }*/
                    contentType: "application/json",
                    processData: false,
                    success: function(data) {
                        console.log(data);
                        var obj = JSON.parse(data);
                        console.log(obj.transcript);
                        $('.stt').html(data);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
                console.log(blob);
            }, "base64");

            Fr.voice.recorder.clear();
        }
    });
});



