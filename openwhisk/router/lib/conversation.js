var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var conversation = new ConversationV1({
    username: "15bdf076-1ad9-4063-9bb1-6eb1db935f39",
    password: "8B5qyZwIftVg",
    path: {workspace_id: '8f7c31cd-6f9b-4bcb-bca8-f79ef7689085'},
    version_date: "2017-19-08"
    //2017-13-06
    // 6/13/20171
    //"2017-02-03"
});

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
}