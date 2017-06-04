var exports = module.exports = {};

exports.tts = function (result) {
    console.log('----------TTS_started----------');
    console.log('TTS_params: ' + result);
    //Require Watson Module
    var synthesize = require('watson-speech/text-to-speech/synthesize');

    //Get and set voice from json
    result = JSON.parse(result);
    var text = result.payload
    var voice;
    if (typeof result.voice !== "undefined") {

        voice = result.voice;

    }
    else {
        voice = 'de-DE_DieterVoice';
    }


    //Get API-Token from server
    fetch('/api/text-to-speech/token')
        .then(function (response) {
            return response.text();
        }).then(function (token) {

        return synthesize({
                text: text,
                token: token,
                voice: voice
            }
        );

    });


};
