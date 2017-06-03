var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var openwhisk = require('openwhisk');
var semester;
var courseOfStudies;

var conversation = new ConversationV1({
    username: "15bdf076-1ad9-4063-9bb1-6eb1db935f39",
    password: "8B5qyZwIftVg",
    path: {workspace_id: '8a3ad198-53a1-47ee-b4ed-b0b475e42c93'},
    version_date: "2017-02-03"
});


function main(params) {

    console.log("------Router started!------");
    console.log('Router Action Params: ' + JSON.stringify(params));

    if (typeof params.semester !== undefined && params.courseOfStudies !== undefined) {

        semester = params.semester;
        courseOfStudies = params.courseOfStudies;

    }

    return con().then(function (response) {

        response.semester = semester;
        response.courseOfStudies = courseOfStudies;
        return dispatch(response);

    }, function (reason) {

        console.log("Conversation Error: " + reason);


    }).then(function (response) {
        response = response.response.result;

        return {
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
            body: JSON.stringify(response),
            code: 200
        };

    }, function (reason) {
        console.log("Dispatcher Error: " + reason);

        var response = {};
        response.payload = reason.toString();

        return {
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
            body: JSON.stringify(response),
            code: 200

        };

    });

    function con() {
        console.log("------Conversation Started!------");
        return new Promise(function (resolve, reject) {

            conversation.message({
                input: {text: params.transcript}
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

    function dispatch(response) {
        console.log("------Dispatcher started!------");
        console.log("Action to be invoked: " + response.intents[0].intent);

        const params = response;
        var name = response.intents[0].intent;
        var ow = openwhisk();
        const blocking = true, result = true;

        return ow.actions.invoke({name, blocking, result, params});

    }


}


exports.main = main;