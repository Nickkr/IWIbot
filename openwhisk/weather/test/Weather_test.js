/**
 * Created by Armin on 26.08.2017.
 */
var request = require('request');
var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/'+process.env.WSK_API_CODE+'/iwibotTest/weather';
var params = {
    semester: 5,
    courseOfStudies: 'INFB'
};

module.exports = {
    'Weather Action Test' : function (test) {
        test.expect(2);
        request.post({
            headers: {'content-type': 'text/plain'},
            url: actionUrl,
            body: JSON.stringify(params)
        }, function (err, response, body) {
            console.log('Body: ' + body);
            console.log('Error: ' + err);
            console.log('Response: ' + JSON.stringify(response));
            body = JSON.parse(body);
            test.ok('payload' in body);
            test.ok('htmlText' in body);
            test.done();
        });
    }
};