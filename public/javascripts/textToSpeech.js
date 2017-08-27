var exports = module.exports = {};
var synthesize = require('watson-speech/text-to-speech/synthesize');

exports.tts = function (result) {
    console.log('----------TextToSpeech_started----------');
    console.log('TextToSpeech_params: ' + result);

    var resultObj = JSON.parse(result);
    var text = resultObj.payload;

    //Get Api-Token from server
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

function getVoice(obj) {
    if ("voice" in obj) {
        return obj.voice;
    } else {
        return 'de-DE_DieterVoice';
    }
}
