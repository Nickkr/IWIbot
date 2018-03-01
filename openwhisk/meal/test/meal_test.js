/**
 * Created by Armin on 05.06.2017.
 */
var request = require('request');
var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/'+process.env.WSK_API_CODE+'/iwibotTest/meal';

module.exports = {
    'Meal Action Test' : function (test) {
        test.expect(1);
        request.get(actionUrl, function (err, response, body) {
            console.log('\n Action URL: \n' + actionUrl);
            console.log('\n Body:       \n' + JSON.stringify(body, null, 4));
            console.log('\n Error:      \n' + err);
            console.log('\n Response:   \n' + JSON.stringify(response, null, 4));
            body = JSON.parse(body);
            test.ok(typeof body.payload === 'string');
            test.done();
        });
    }
};