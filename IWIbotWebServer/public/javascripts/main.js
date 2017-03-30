var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.json';
var openWhiskUrl = 'https://openwhisk.ng.bluemix.net/api/v1/namespaces/erhe1011%40hs-karlsruhe.de_iwibot/actions/home';
var username = '80bb0dcc-75e6-4885-80da-7d86d121f3f6';
var password = 'K13yYnYPk65VCCYuatfhWnKQvzTwAHYdzpADjQWHBTYSkFmRGLuu7u8Cz52N1yHH';

$(document).ready(function () {

    $('#chatForm').submit(function (event) {
        
        event.preventDefault();

        var text = $('messageField').val();

        $.ajax({
            beforeSend: function (xhr) {
                //xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
            },
            url: openWhiskWebUrl,
            method: "POST",
            crossDomain: true,
            data: { message: "TEst" }
        })
            .done(function (data) {
                alert(data);
                console.log('DONE');
            });
    })

});