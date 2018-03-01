var openwhisk = require('openwhisk');

function dispatch(response) {
    console.log("------Dispatcher started!------");
    console.log('skip: ' + JSON.stringify(response, null, 4));
    var context = response.context;
    var responseObject = {};
    if ("actionToInvoke" in response.output) {
        console.log("Action to be invoked: " + response.output.actionToInvoke);
        console.log("Context : " + JSON.stringify(context, null, 4));
        var params = response;
        //const name = response.intents[0].intent;
        var name = response.output.actionToInvoke;
        var blocking = true, result = true;

        return action(name, blocking, result, params).then(function (response) {
            console.log("openwhisk response: " + JSON.stringify(response, null, 4));
            return new Promise(function (resolve) {
                responseObject = response;
                responseObject.context = context;
                resolve(responseObject);
            });
        });
    } else {
        responseObject.payload = response.output.text[0];
        responseObject.context = context;

        return new Promise(function (resolve) {
            console.log("Skiped action");
            console.log("ResponseObject " + JSON.stringify(responseObject, null, 4));
            resolve(responseObject);
        });
    }
}

function action(name, blocking, result, params) {
    var ow = openwhisk();
    return ow.actions.invoke({name, blocking, result, params}); // jshint ignore:line
}

exports.dispatch = dispatch;