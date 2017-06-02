var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var openwhisk = require('openwhisk');
var conResponse;
var semester;
var courseOfStudies;

var conversation = new ConversationV1({
    username: "15bdf076-1ad9-4063-9bb1-6eb1db935f39",
    password: "8B5qyZwIftVg",
    path: {workspace_id: '8a3ad198-53a1-47ee-b4ed-b0b475e42c93'},
    version_date: "2017-02-03"
});


function main(params) {
    //console.log("PARAMS: " + JSON.stringify(params.payload));
    console.log("------Router started!------");
    console.log('RouterAction Params: ' + JSON.stringify(params));

    if (typeof params.semester !== undefined && params.courseOfStudies !== undefined) {

        semester = params.semester;
        courseOfStudies = params.courseOfStudies;

    }


    function con() {
        console.log("Conversation: " + params);
        return new Promise(function (resolve, reject) {

            // Start conversation with message from params
            conversation.message({
                input: {text: params.transcript.toString()}
            }, processResponse);

            // Process the conversation response.
            function processResponse(err, response) {
                if (err) {
                    console.error(err); // something went wrong
                    return;
                }

                // Display the output from dialog, if any.
                console.log("Conversation_response: " + JSON.stringify(response));
                resolve(response);


            }
        });

    }

    function dispatch(response) {
        var name = response.intents[0].intent;
        console.log("Action-Name: " + name);
        const blocking = true, result = true;
        const params = response;
        var ow = openwhisk();
        console.log("openwhisk init");
        return ow.actions.invoke({name, blocking, result, params});

    }

    var result = con().then(function (response) {
        response.semester = semester;
        response.courseOfStudies = courseOfStudies;
        console.log("Dispatch Response: " + JSON.stringify(response.courseOfStudies));
        return dispatch(response);

    }).catch(function (err) {
        console.log("Catch Error:" + err);
        var obj = {"response": {"result": {"payload": conResponse.output.text[0]}}};
        console.log("OBJ :" + obj);
        return obj;


    }).then(function (response) {
        response = response.response.result;

        return {
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
            body: JSON.stringify(response),
            code: 200
        };

    });

    return result;
}

exports.main = main;