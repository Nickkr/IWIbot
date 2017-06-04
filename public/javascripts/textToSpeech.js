var exports = module.exports = {};

exports.tts = function (result) {
    console.log('----------TTS_started----------');
    console.log('TTS_params: ' + result);
    var synthesize = require('watson-speech/text-to-speech/synthesize');
    var resultObj = JSON.parse(result);
    var text = resultObj.payload;

    function getVoice(obj) {

        if (obj.voice !== undefined) {
            return obj.voice;
        }
        else {
            return 'de-DE_DieterVoice';
        }

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
