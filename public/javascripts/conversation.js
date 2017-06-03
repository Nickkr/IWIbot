var exports = module.exports = {};


exports.con = function (result) {

        console.log("----------CONVERSATION_started----------");
        console.log("CONVERSATION_param: " + result);

        var requestObject = {};
        requestObject.transcript = result.toString();
        console.log("Local Storage " + localStorage.getItem("courseOfStudies"));

        if (localStorage.getItem("courseOfStudies") !== null && localStorage.getItem("semester") !== null) {
            requestObject.courseOfStudies = localStorage.getItem("courseOfStudies");
            requestObject.semester = localStorage.getItem("semester");
        }
        /*result = {"transcript": result.toString(),
         "courseOfStudies": localStorage.getItem("courseOfStudies") ,
         "semester": localStorage.getItem("semester") };
         */
        console.log("Result Object : " + JSON.stringify(requestObject));
        var options = {
            //url: 'https://openwhisk.ng.bluemix.net/api/v1/web/Hochschule_Test/default/RouterV2.http',
            url: 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/2b5bfd7bced95ed3c16e36929ac1576f8ca11a7df301beca57861caf482d1b7e/iwibot/router',
            type: 'POST',
            data: JSON.stringify(requestObject),
            contentType: "application/json",
            processData: false,
            success: function (data) {

                var valueRecived = JSON.parse(data);
                console.log("CONVERSATION_recivedData: " + data);
                console.log("CONVERSATION_htmlText: " + data.htmlText);
                var htmlText = valueRecived.htmlText;
                valueRecived = valueRecived.payload.toString();
                var msgRecived = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="msg-recived">' + valueRecived + '</div></div><div class="col-lg-5"></div></div>';
                $(msgRecived).appendTo("#chat div.container").hide().fadeIn();

                if (typeof htmlText !== 'undefined') {

                    var html = '<div class="row msg "><div class="col-lg-3"></div><div class="col-lg-4"><div class="html-recived">' + htmlText + '</div></div><div class="col-lg-5"></div></div>';
                    $(html).appendTo("#chat div.container").hide().fadeIn();
                }
                window.scrollTo(0, document.body.scrollHeight);

            },
            error: function (err) {
                console.log("CONVERSATION_err: " + JSON.stringify(err));
                //remove loader animation and show recording button
                $("#mainDiv").removeClass("loader");
                $(".btn-circle").show();


            }
        };


    return $.ajax(options);

};