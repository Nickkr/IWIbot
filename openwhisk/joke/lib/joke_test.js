/**
 * Created by Armin on 05.06.2017.
 */
var request = require('request');
var actionUrl = 'https://service.us.apiconnect.ibmcloud.com/gws/apigateway/api/2b5bfd7bced95ed3c16e36929ac1576f8ca11a7df301beca57861caf482d1b7e/iwibot/joke';

module.exports = {
    'Joke Action Test' : function (test) {
        test.expect(1);
        request.get(actionUrl, function (err, response, body) {
            console.log('Body: ' + body);
            body = JSON.parse(body);
            test.ok(typeof body.payload == 'string');
            test.done();
        })
    }
};