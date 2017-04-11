var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.http';
var context = {};

var textToSpeechWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/kuar1013_kuar1013-Sued/default/text-to-speech.http';

$(document).ready(function () {
    $('#chatForm').submit(function (event) {
        
        event.preventDefault();

        var text = $('#messageField').val();

        $('#chat').append('<div class="msg myMsg"><div>' + text + '<div></div>');

        console.log(context);

        $.ajax({
            url: openWhiskWebUrl,
            method: "POST",
            data: {
                message: text,
                context: context
            }
        })
            .done(function (data) {
                console.log(data);
                context = data.context;
                $('#chat').append('<div class="msg"><div>' + data.output.text + '<div></div>');
            });
    })

});

function getSpeechFromText(input) {
    $.ajax({
        url: textToSpeechWebUrl,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "text": input.value,
            "voice": "en-US_LisaVoice",
            "accept": "audio/wav",
            "username": "0da716ea-2a67-4710-83be-3ce2d3c7d62a",
            "password": "v5LL5oP6BiCl"
        }),
        complete: function (response, status) {
            debugger
            if (status == 'success') {
                var audioPlayer = document.getElementById('audioPlayer');

                var dataUri = 'data:audio/wav;base64,' + response.responseText;

                audioPlayer.src = dataUri;
                audioPlayer.style.display = 'inline-block';
                audioPlayer.style.right = 0;
                audioPlayer.style.bottom = 0;
                audioPlayer.style.position = 'absolute';
                audioPlayer.play();
            } else {
                console.log('Response status: -> ' + status);
            }
        }
    });
}