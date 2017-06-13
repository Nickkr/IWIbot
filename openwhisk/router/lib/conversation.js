var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var conversation = new ConversationV1({
    username: "15bdf076-1ad9-4063-9bb1-6eb1db935f39",
    password: "8B5qyZwIftVg",
    path: {workspace_id: '8f7c31cd-6f9b-4bcb-bca8-f79ef7689085'},
    version_date: "2017-02-03"
});

function con(params) {
    console.log("------Conversation Started!------");
    return new Promise(function (resolve, reject) {

        conversation.message({
            input: {text: params.payload.toString()},
            context: params.context
        }, processResponse);

        function processResponse(err, response) {
            if (err) {
                console.error("Conversation Error: " + err);
                reject(err);
            }

            console.log("Conversation Response: " + JSON.stringify(response));
            resolve(response);


        }
    });

}


exports.con = con;
