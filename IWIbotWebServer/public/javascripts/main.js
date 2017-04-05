var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.http';
var context = {};

var textToSpeechWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/kuar1013_kuar1013-Sued/default/text-to-speech.json';

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

$(function () {
    $.ajax({
        beforeSend: function (xhr) {
            //xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        url: textToSpeechWebUrl,
        method: "POST",
        dataType: "json",
        data: {
            "payload": "Hello",
            "voice": "es-US_SofiaVoice",
            "accept": "audio/wav",
            "username": "0da716ea-2a67-4710-83be-3ce2d3c7d62a",
            "password": "v5LL5oP6BiCl"
        }
    })
        .done(function (data) {
            debugger
            console.log(data);
        });
});