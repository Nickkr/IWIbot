var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.text';
var openWhiskUrl = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/erhe1011%40hs-karlsruhe.de_iwibot/actions/home';
var username = '80bb0dcc-75e6-4885-80da-7d86d121f3f6';
var password = 'K13yYnYPk65VCCYuatfhWnKQvzTwAHYdzpADjQWHBTYSkFmRGLuu7u8Cz52N1yHH';

$(document).ready(function () {
    $('#chatForm').submit(function (event) {
        
        event.preventDefault();

        var text = $('#messageField').val();

        $('#chat').append('<div class="msg myMsg"><div>' + text + '<div></div>');
        
        console.log(text);
        $.ajax({
            beforeSend: function (xhr) {
                //xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            url: openWhiskWebUrl,
            method: "POST",
            dataType: "jsonp",
            data: { message: text }
        })
            .done(function (data) {
                console.log(data);

                $('#chat').append('<div class="msg"><div>' + data.output.text + '<div></div>');
            });
    })

});

$(function () {
    'use strict';

    // This example takes uncompressed wav audio from the Text to Speech service and plays it through the computer's speakers
    // Should work on windows/mac/linux, but linux may require some extra setup first: https://www.npmjs.com/package/speaker

    debugger
    const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
    const wav = require('wav');
    const Speaker = require('speaker');
    require('dotenv').load({ silent: true }); // imports environment properties from a .env file if present

    const textToSpeech = new TextToSpeechV1(
        {
            // if left unspecified here, the SDK will fall back to the TEXT_TO_SPEECH_USERNAME and TEXT_TO_SPEECH_PASSWORD
            // environment properties, and then Bluemix's VCAP_SERVICES environment property
            // username: 'INSERT YOUR USERNAME FOR THE SERVICE HERE',
            // password: 'INSERT YOUR PASSWORD FOR THE SERVICE HERE'
        }
    );

    const reader = new wav.Reader();

// the "format" event gets emitted at the end of the WAVE header
    reader.on('format', function(format) {
        // the WAVE header is stripped from the output of the reader
        reader.pipe(new Speaker(format));
    });

    textToSpeech.synthesize({ text: 'hello from IBM Watson', accept: 'audio/wav' }).pipe(reader);
});