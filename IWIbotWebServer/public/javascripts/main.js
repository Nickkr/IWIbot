var openWhiskWebUrl = 'https://openwhisk.ng.bluemix.net/api/v1/web/erhe1011%40hs-karlsruhe.de_iwibot/default/home.http';
var context = {};

$(document).ready(function () {
    $('#chatForm').submit(function (event) {

        event.preventDefault();

        var text = $('#messageField').val();

        $('#chat div.container').append('<div class="row msg"><div class="col-lg-5"></div><div class="col-lg-4"><div class="msg-send">' + text +'</div></div><div class="col-lg-3"></div></div>');
        console.log($('#chat div.container').children().last());
        $('#chat div.container').children().last().fadeIn("slow");
        window.scrollTo(0,document.body.scrollHeight);
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
                $('#chat div.container').append('<div class="row msg"><div class="col-lg-3"></div><div class="col-lg-4"><div class="msg-recived">' + data.output.text +'</div></div><div class="col-lg-5"></div></div>');
                $('#chat div.container').children().last().fadeIn("slow");
                window.scrollTo(0,document.body.scrollHeight);
         });
    })

});
$(document).ready(function(){
    $("#chat").css('padding-top',$("header").height() - 40.0);
    console.log($("header").height() + "hashdasd");
    $(window).resize(function(){
        $("#chat").css('padding-top',$("header").height() -40.0);
    });
});
$(document).ready(function(){
    $(".content").css('padding-top',$("header").height() + 150.0);
    console.log($("header").height() + "hashdasd");
    $(window).resize(function(){
        $(".content").css('padding-top',$("header").height() + 150.0);
    });
});