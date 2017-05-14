var recording = false;
var mediaRecorder = null;

$(function(){
    var recordingButton = $(".btn-circle");
    function gotStream(stream) {
        var options = {
            audioBitsPerSecond : 16000,
            mimeType : 'audio/ogg; codecs=opus'
        }
        mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.onstop = function (e) {

        };

        mediaRecorder.ondataavailable = function (e) {
            var reader = new window.FileReader();
            console.log('Blob size: ' + e.data.size);
            reader.readAsDataURL(e.data);
            reader.onloadend = function() {
                var json = JSON.stringify({"payload": reader.result.split(',')[1]});
                $("#mainDiv").addClass("loader");
                recordingButton.hide();

                $.ajax({
                    url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/Router.http',
                    type: 'POST',
                    data: json,
                    contentType: "application/json",
                    processData: false,
                    success: function(data) {
                        console.log("Success: " + data);
                        var obj = JSON.parse(data);
                        $('.tts').attr('src', "data:audio/ogg;base64," + obj.payload.toString());
                        $('.stt').html(obj.text.toString());
                        $("#mainDiv").removeClass("loader");
                        recordingButton.show();
                    },
                    error: function(err) {
                        console.log("Error: " + err);
                        $('.stt').html(obj.text.toString());
                        $("#mainDiv").removeClass("loader");
                        recordingButton.show();
                    }
                });
            }
        }
        mediaRecorder.start();
        mediaRecorder.pause();
    }

    // Call one time record to get the user agreement for using the microphone
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    navigator.getUserMedia({audio: true}, gotStream, function() {
        alert('No live audio input');
    });
});

$(document).ready(function() {
    var recordingButton = $(".btn-circle");
    $("#record").click(function () {
        if(!recording) {
            recordingButton.css('background-color', '#FF7F50').addClass("recording");
            recording = true;
            mediaRecorder.resume();
        } else {
            recordingButton.css('background-color', '#e6e6e6').removeClass("recording");
            recording = false;
            mediaRecorder.requestData();
            mediaRecorder.pause();
        }
    });
});



