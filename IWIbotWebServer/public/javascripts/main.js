var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.text';
var openWhiskUrl = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/erhe1011%40hs-karlsruhe.de_iwibot/actions/home';
var username = '80bb0dcc-75e6-4885-80da-7d86d121f3f6';
var password = 'K13yYnYPk65VCCYuatfhWnKQvzTwAHYdzpADjQWHBTYSkFmRGLuu7u8Cz52N1yHH';

var textToSpeechWebUrl = 'https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize';
var textToSpeechUrl = '';
var ttsUsername = '';
var ttsPassword = '';

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
    $.get(textToSpeechWebUrl + '?text=Hello', function (response) {
        //debugger
    });

    $.ajax({
        beforeSend: function (xhr) {
            //xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        url: textToSpeechWebUrl,
        method: "POST",
        dataType: "jsonp",
        data: { "text": "Hello",
            "username": "0da716ea-2a67-4710-83be-3ce2d3c7d62a",
            "password": "v5LL5oP6BiCl"
        }
    })
        .done(function (data) {
            console.log(data);
        });
    /*
    $.ajax({
        beforeSend: function (xhr) {
            //xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        url: textToSpeechWebUrl,
        method: "POST",
        dataType: "jsonp",
        data: { text: 'Hallo' }
    })
        .done(function (data) {
            console.log(data);

            $('#chat').append('<div class="msg"><div>' + data.output.text + '<div></div>');
        });
        */
});