var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var vcapServices = require('vcap_services');
var extend = (extend = require('util')._extend);

var tmp = {};
tmp.username = vcapServices.getCredentials('conversation').username;
tmp.password = vcapServices.getCredentials('conversation').password;

var conversation = new ConversationV1(extend({
    path: {workspace_id: '49d2a377-47a0-42aa-9649-cbce4637b624'},
    version_date: "2017-12-09"
}, tmp));

exports.sendMessage = function sendMessage(init, params) {
    console.log("------Conversation Started!------");
    console.log('Conversation Params: ' + params.payload);
    return new Promise(function (resolve, reject) {
        var options = init ? {} : {
            input: {text: params.payload.toString()},
            context: params.context
        };
        conversation.message(options, function (err, response) {
            if (err) {
                console.error("Conversation Error: " + err);
                reject(err);
            }

            console.log("Conversation Response: " + JSON.stringify(response));
            resolve(response);
        });
    });
};