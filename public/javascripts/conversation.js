var exports = module.exports = {};
var chat = require("./chat.js");
var context = null;
var $mainDiv = $("#mainDiv");
var $btnCircle = $(".btn-circle");

exports.con = function (result) {

        console.log("----------CONVERSATION_started----------");
        console.log("CONVERSATION_param: " + result);

        var requestObject = {};
        requestObject.payload = result.toString();
        requestObject.context = context;

        if ("courseOfStudies" in localStorage && "semester" in localStorage) {

            requestObject.courseOfStudies = localStorage.getItem("courseOfStudies");
            requestObject.semester = localStorage.getItem("semester");

        } else if ("courseOfStudies" in sessionStorage && "semester" in sessionStorage) {

            requestObject.courseOfStudies = sessionStorage.getItem("courseOfStudies");
            requestObject.semester = sessionStorage.getItem("semester");

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

                var dataObj = JSON.parse(data);
                var payload = dataObj.payload.toString();

                chat.appendReceivedMessage(payload);

                if("htmlText" in dataObj) {

                    chat.appendReceivedMessage(dataObj.htmlText.toString());

                }
                if("context" in dataObj) {

                    context = dataObj.context;

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
exports.conInit = function () {

    var conversationInit = {};
    conversationInit.conInit = true;

    var options = {
        url: 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/2b5bfd7bced95ed3c16e36929ac1576f8ca11a7df301beca57861caf482d1b7e/iwibot/router',
        type: 'POST',
        data: JSON.stringify(conversationInit),
        contentType: "application/json",
        processData: false,
        success: function (data) {

            console.log("CONVERSATION_recivedData: " + data);

            var dataObj = JSON.parse(data);
            var payload = dataObj.payload.toString();

            chat.appendReceivedMessage(payload);

            if(typeof dataObj.htmlText !== 'undefined') {

                chat.appendReceivedMessage(dataObj.htmlText.toString());

            }
            if("context" in dataObj) {

                context = dataObj.context;

            }

        },
        error: function (err) {
            console.log("CONVERSATION_err: " + JSON.stringify(err));
            //remove loader animation and show recording button
        }
    };

    return $.ajax(options);



};