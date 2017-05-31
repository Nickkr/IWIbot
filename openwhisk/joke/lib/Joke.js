var url = "http://api.icndb.com/jokes/random";
var request = require('request');

function main(params) {

    var promise = new Promise(function (resolve, reject) {

        request({
            url: url,
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                body = JSON.parse(body);
                var joke = {"payload": body.value.joke, "voice": "en-US_MichaelVoice"};
                resolve(joke);
            }

            else {
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
exports.main = main;