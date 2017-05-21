var exports = module.exports = {};

exports.tts = function (result) {
    result = JSON.parse(result);
    text = result.payload.toString();
    if (typeof result.voice !== "undefined") {

        voice = result.voice;

    }
    else {
        voice = 'de-DE_DieterVoice';
    }
    var msgRecived = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="msg-recived">' + text + '</div></div><div class="col-lg-5"></div></div>';
    $(msgRecived).appendTo("#chat div.container");
    return new Promise(function (resolve, reject) {

        var synthesize = require('watson-speech/text-to-speech/synthesize');

        fetch('/api/text-to-speech/token')
            .then(function (response) {
                return response.text();
            }).then(function (token) {

            // var obj = JSON.parse(text);
            //console.log(obj);
            var synth = synthesize({
                text: text,//obj.response.result.payload.toString(),
                token: token,
                voice: voice
            })

        });

        resolve(console.log("done"));


    });


}
