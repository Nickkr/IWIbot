/**
 * Created by Armin on 05.06.2017.
 */
var request = require('request');
//var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/'+process.env.WSK_API_CODE+'/iwibotTest/meal';
var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/c9f88de3acb5a4648e4f118769d019c8df8797d1777c4342f43260626b4c51bf/iwibotTest/meal';

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