function makeWaveform() {
    var analyser = Fr.voice.recorder.analyser;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
}
var recording = false;
$(document).ready(function() {

    $("#record").click(function () {
            if(!recording) {
                $(".btn-circle").css('background-color', '#FF5036');
                recording= true;
                Fr.voice.record(false , function () {
                    makeWaveform();
                });
            } else {
                $(".btn-circle").css('background-color', '#e6e6e6');
                recording=false;
                Fr.voice.pause();
                Fr.voice.export(function(blob){
                    //var formData = new FormData();
                    //formData.append('file', blob);
                    var payload = {"payload": blob};
                        $.ajax({
                        url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/speechToText.http',
                        //url : 'https://openwhisk.ng.bluemix.net/api/v1/web/kuar1013_kuar1013-Sued/default/speech-to-text.http',
                        type: 'POST',
                        data: JSON.stringify(payload),
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

                   /* var audio = document.createTextNode('audio');
                    audio.src = base64;
                    audio.controls = true;
                    audio.style.display = 'block';
                    document.appendChild(audio),
                    audio.play(); */

                }, "base64");
                Fr.voice.stop()
            }
    }

    )


});



