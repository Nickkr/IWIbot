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
            console.log("DATA " + data);

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