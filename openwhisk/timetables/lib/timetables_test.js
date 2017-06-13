/**
 * Created by Armin on 11.06.2017.
 */
var request = require('request');
var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/2b5bfd7bced95ed3c16e36929ac1576f8ca11a7df301beca57861caf482d1b7e/iwibot/timetables';
var formData = {
    semester: 5,
    courseOfStudies: 'INFB'
};

module.exports = {
    'Meal Action Test' : function (test) {
        test.expect(1);
        request.post({url: actionUrl, formData: formData}, function (err, response, body) {
            body = JSON.parse(body);
            test.ok(typeof body.payload == 'string');
            test.done();
        });
    }
};