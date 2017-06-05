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
        console.log('Conversation started inner: ' + response);
        response.semester = semester;
        response.courseOfStudies = courseOfStudies;
        if("skip" in response.output) {

            var obj = {};
            obj.payload = response.output.text[0];
            obj.skip = response.output.skip;
            obj.context = response.context;
            obj.intents = response.intents;

            return dispatch(obj);

        } else {

            return dispatch(response);
        }
    }, function (reason) {

        console.error("Conversation Error: " + reason);
        throw reason;

    }).then(function (response) {
        console.log('LAST STEP -----------------------');
        console.log('Inner Last Step: ' + typeof response.response);
        console.log('Response: ' + JSON.stringify(response));
        if("response" in response) {
            console.log('In if ---------------------');
            response = response.response.result;
        }
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
                input: {text: params.payload},
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

    function dispatch(response) {
        console.log("------Dispatcher started!------");
        console.log('skip: ' + JSON.stringify(response));
        console.log("Action to be invoked: " + response.intents[0].intent);
        if(!response.skip) {
            console.log("Action Invoke");
            const params = response;
            var name = response.intents[0].intent;
            var ow = openwhisk();
            const blocking = true, result = true;

            return ow.actions.invoke({name, blocking, result, params});
        } else {
            return new Promise(function (resolve, reject) {
               console.log("SKiped action");
               resolve(response);
            });
        }

    }


}


exports.main = main;