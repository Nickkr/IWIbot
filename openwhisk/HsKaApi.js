var request = require('request');
var url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/canteen/2/2017-04-27'
function main() {

var promise = new Promise(function(resolve, reject) {
        request({
            url: url,
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var j = JSON.parse(body);
                console.log(j.name);
                resolve(j);
            } else {
                console.log('error getting forecast');
                console.log('http status code:', (response || {}).statusCode);
                console.log('error:', error);
                console.log('body:', body);
                reject({
                    error: error,
                    response: response,
                    body: body
                });
            }
        });
    });

    return promise;
}