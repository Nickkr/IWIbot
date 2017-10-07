var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var vcapServices = require('vcap_services');

var conversation = new ConversationV1({
    username: "778dd9b2-02fb-4b22-895f-5c4b0b7a763b",
    password: "OKlE4wpgYNpb",
    path: {workspace_id: '49d2a377-47a0-42aa-9649-cbce4637b624'},
    version_date: "2017-12-09"
    //2017-13-06
    // 6/13/20171
    //"2017-02-03"
});

exports.sendMessage = function sendMessage(init, params) {
    console.log("------Conversation Started!------");
    console.log('Conversation Params: ' + params.payload);
    console.log('Conversation credentials: ' + vcapServices.getCredentials('conversation'));
    console.log('Conversation credentials stringifyied: ' + JSON.stringify(vcapServices.getCredentials('conversation')));
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