var exports = module.exports = {};

exports.tts = function (result) {
    console.log('----------TTS_started----------');
    console.log('TTS_params: ' + result);
    //Require Watson Module
    var synthesize = require('watson-speech/text-to-speech/synthesize');

    //Get and set voice from json
    result = JSON.parse(result);
    text = result.payload.toString();
    if (typeof result.voice !== "undefined") {

        voice = result.voice;

    }
    else {
        voice = 'de-DE_DieterVoice';
    }

    return new Promise(function (resolve, reject) {

        //Get API-Token from server
        fetch('/api/text-to-speech/token')
            .then(function (response) {
                return response.text();
            }).then(function (token) {

            var synth = synthesize({
                text: text,
                token: token,
                voice: voice
            });

        });
        resolve();
    });
};
