var dispatcher = require('./dispatcher');
var con = require('./conversation');


function main(params) {

    console.log("------Router started!------");
    console.log('Router Action Params: ' + JSON.stringify(params));

    var semester;
    var courseOfStudies;


    if ("semester" in params && "courseOfStudies" in params) {

        semester = params.semester;
        courseOfStudies = params.courseOfStudies;

    }

    return con.con(params).then(function (response) {

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