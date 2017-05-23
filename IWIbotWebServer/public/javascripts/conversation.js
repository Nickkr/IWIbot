var exports = module.exports = {};

exports.con = function (param) {
    console.log("Param :" + param);
    param = {"transcript" : param.toString()};
    var options = {
        url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/RouterV2.http',
        type: 'POST',
        data: JSON.stringify(param),
        contentType: "application/json",
        processData: false,
        success: function (data) {
            var obj = JSON.parse(data);
            console.log("DATA " + data);
            console.log("HTML: " + obj.htmlText );
            valueRecived = JSON.parse(data);
            htmlText = valueRecived.htmlText;
            valueRecived = valueRecived.payload.toString();
            var msgRecived = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="msg-recived">' + valueRecived + '</div></div><div class="col-lg-5"></div></div>';
            $(msgRecived).appendTo("#chat div.container").hide().fadeIn();
            var html = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="html-recived">'+ htmlText+ '</div></div><div class="col-lg-5"></div></div>';
            $(html).appendTo("#chat div.container").hide().fadeIn();
            window.scrollTo(0, document.body.scrollHeight);

        },
        error: function (err) {
            console.log(err);
            $("#mainDiv").removeClass("loader");
            $(".btn-circle").show();


        }
    }
    return new Promise(function (resolve, reject) {

        resolve($.ajax(options));

    });


}