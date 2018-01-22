var dispatcher = require('./dispatcher');
var conversation = require('./conversation');


function main(params) {

    console.log("------Router started!------");
    console.log('Router Action Params: ' + JSON.stringify(params, null, 4));

    var semester;
    var courseOfStudies;

    if("__ow_body" in params) { // For testing this action!!
        params = JSON.parse(params.__ow_body);
    }

    if ("semester" in params && "courseOfStudies" in params) {
        semester = params.semester;
        courseOfStudies = params.courseOfStudies;
    }

    return conversation.sendMessage("conInit" in params, params).then(function (response) {

        response.semester = semester;
        response.courseOfStudies = courseOfStudies;
        return dispatcher.dispatch(response);

    }, function (reason) {

        console.error("Conversation Error: " + reason);
        throw reason;

    }).then(function (response) {

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
}
exports.main = main;