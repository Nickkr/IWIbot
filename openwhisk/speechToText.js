//Test Comment to validate if auto deploy works
var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var fs = require('fs');
var props = {
  username: '69767f6c-108e-4658-a8e1-a0a292704bbe',
  password: 'fjcaTONPnqzF'
};

function main(params) {
    console.log("PARAMS: " + JSON.stringify(params.payload));
    var speech_to_text = new SpeechToTextV1(props);

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}
base64_decode(params.payload , 'placeholder.wav');
//fs.appendFileSync('placeholder.wav', params.payload);

 var promise = new Promise(function(resolve, reject) {
    speech_to_text.recognize({
      audio: fs.createReadStream('placeholder.wav'),
	  content_type: 'audio/wav',
	  encoding: 'base64'
    }, function (err, res) {
    console.log("Res: " + JSON.stringify(res));
    console.log(err);
      if (err) {
        reject({
          headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
          body: new Buffer(JSON.stringify(err)).toString('base64'), 
          code: 200
        });
      } else {
          console.log('Resolve!');
      resolve({
          headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain'},
          body: JSON.stringify(res), 
          code: 200
        });
      }
    }, function (err) {
      reject(err);
    });
  });

return promise; 
}
