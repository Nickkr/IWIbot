var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.http';
var context = {};

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