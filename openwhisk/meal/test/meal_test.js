/**
 * Created by Armin on 05.06.2017.
 */
var request = require('request');
var actionUrl = $API_TEST_URL + '/meal';

module.exports = {
    'Meal Action Test' : function (test) {
        test.expect(1);
        request.get(actionUrl, function (err, response, body) {
            console.log('Body: ' + body);
            console.log('Error: ' + err);
            console.log('Response: ' + JSON.stringify(response));
            body = JSON.parse(body);
            test.ok(typeof body.payload === 'string');
            test.done();
        });
    }
};