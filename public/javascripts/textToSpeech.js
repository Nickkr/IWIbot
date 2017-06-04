var exports = module.exports = {};

exports.tts = function (result) {
    console.log('----------TTS_started----------');
    console.log('TTS_params: ' + result);
    var synthesize = require('watson-speech/text-to-speech/synthesize');
    var resultObj = JSON.parse(result);
    var text = resultObj.payload;

    function getVoice(obj) {
        var voice;

        if (obj.voice !== undefined) {

            voice = obj.voice;

        }
        else {
            voice = 'de-DE_DieterVoice';
        }

        return voice
    }

    fetch('/api/text-to-speech/token')
        .then(function (response) {
            return response.text();
        }).then(function (token) {

        return synthesize({
                text: text,
                token: token,
                voice: getVoice(resultObj)
            }
        );

    });


};
