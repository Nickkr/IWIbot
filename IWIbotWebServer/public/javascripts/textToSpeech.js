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
