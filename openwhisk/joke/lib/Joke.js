var request = require('request');
var url = "http://api.icndb.com/jokes/random";
var voice = "en-US_MichaelVoice";

function main() {

    return new Promise(function (resolve, reject) {

        request({
            url: url,
        }, function (error, response, body) {
            var jokeResponse;

            if (!error && response.statusCode === 200) {

                body = JSON.parse(body);
                jokeResponse = {"payload": body.value.joke, "voice": voice};
                resolve(jokeResponse);

            }

            else {
                console.log('http status code:', (response || {}).statusCode);
                console.log('error:', error);
                console.log('body:', body);
                jokeResponse = {
                    "payload": "The is joke you requested is taking a coffee or tea break. Look at the kitchen, maybe it is sitting there.",
                    "voice": voice
                };

                reject(jokeResponse);
            }
        });
    });
}
exports.main = main;