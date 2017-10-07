/**
 * Created by Armin on 11.06.2017.
 */
var request = require('request');
var actionUrl = $API_TEST_URL + '/timetables';
var params = {
    semester: 5,
    courseOfStudies: 'INFB'
};

module.exports = {
    'Meal Action Test' : function (test) {
        test.expect(1);
        request.post({
            headers: {'content-type': 'text/plain'},
            url: actionUrl,
            body: JSON.stringify(params)
        }, function (err, response, body) {
            console.log('Body: ' + body);
            console.log('Error: ' + err);
            console.log('Response: ' + JSON.stringify(response));
            body = JSON.parse(body);
            test.ok(typeof body.payload === 'string');
            test.done();
        });
    }
};