var exports = module.exports = {};
var chat = require("./chat.js");
exports.con = function (result) {

        console.log("----------CONVERSATION_started----------");
        console.log("CONVERSATION_param: " + result);
        var $mainDiv = $("#mainDiv");
        var $btnCircle = $(".btn-circle");
        var requestObject = {};
        requestObject.payload = result.toString();

        if (localStorage.getItem("courseOfStudies") !== null && localStorage.getItem("semester") !== null) {

            requestObject.courseOfStudies = localStorage.getItem("courseOfStudies");
            requestObject.semester = localStorage.getItem("semester");
        }
        if(localStorage.getItem("context") !== null) {

            var temp = localStorage.getItem("context");
            requestObject.context = JSON.parse(temp);
            localStorage.setItem("context" , null);
        }
        console.log("CONVERSATION_RequestObject : " + JSON.stringify(requestObject));

        var options = {
            url: 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/2b5bfd7bced95ed3c16e36929ac1576f8ca11a7df301beca57861caf482d1b7e/iwibot/router',
            type: 'POST',
            data: JSON.stringify(requestObject),
            contentType: "application/json",
            processData: false,
            success: function (data) {

                console.log("CONVERSATION_recivedData: " + data);
                console.log("CONVERSATION_htmlText: " + data.htmlText);
                var dataObj = JSON.parse(data);
                var payload = dataObj.payload.toString();

                chat.appendReceivedMessage(payload);

                if(typeof dataObj.htmlText !== 'undefined') {

                    chat.appendReceivedMessage(dataObj.htmlText.toString());

                }
                if("context" in dataObj) {

                    localStorage.setItem("context" , JSON.stringify(dataObj.context));

                }

            },
            error: function (err) {
                console.log("CONVERSATION_err: " + JSON.stringify(err));
                //remove loader animation and show recording button
                $mainDiv.removeClass("loader");
                $btnCircle.show();


            }
        };

    return $.ajax(options);

};