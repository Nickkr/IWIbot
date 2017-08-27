var request = require('request');
var weather_host = 'https://1b68ea01-e52f-41b7-b695-4166b52f5865:BsSbIOsTwl@twcservice.mybluemix.net';

var today = new Date();
var currentDay = parseInt(today.getDay());
var weekday = new Array(7);
weekday[0] = 'Sonntag';
weekday[1] = 'Montag';
weekday[2] = 'Dienstag';
weekday[3] = 'Mittwoch';
weekday[4] = 'Donnerstag';
weekday[5] = 'Freitag';
weekday[6] = 'Samstag';
var currentDayString = weekday[currentDay];

var geo_location = 'Karlsruhe';
var geocode = new Array(2);
geocode[0] = 49.0068901;  // latitude
geocode[1] = 8.4036527; // longitude

function main(params) {
    console.log('------Weather Action started!------');
    console.log('WeatherAction Params:' + JSON.stringify(params));
    console.log('Day: ' + currentDay);
    console.log('DayString: ' + currentDayString);

    if('latitude' in params && 'longitude' in params) {
        geocode[0] = params.latitude;
        geocode[1] = params.longitude;
    }
    if('geo_location' in params) {
        geo_location = params.geo_location;
    }


    if('__ow_body' in params) { // For testing this action!!
        params = JSON.parse(params.__ow_body);
    }

    return new Promise(function (resolve, reject) {
        var resultObject = {};

        weatherAPI('/api/weather/v1/geocode/' + geocode[0] + '/' + geocode[1] + '/forecast/daily/3day.json', {
            units: params.units || 'm',
            language: params.language || 'de-DE'
        }, function (error, result) {

            if (!error) {
                console.log('Response Object: ' + JSON.stringify(result));
                var forecasts = result.forecasts, forecastsLength = result.forecasts.length;
                var ul = '<ul>';

                for(var i = 0; i < forecastsLength ; i++) {
                    var forecast = forecasts[i];
                    var day = forecast.day, night = forecast.night, lunar_phase = forecast.lunar_phase;
                    ul += '<li><b>' + day.daypart_name + '(' + day.long_daypart_name + '):</b>' + ' ' + day.narrative + '</li>';
                }

                ul += '</ul>';

                resultObject.htmlText = ul;
                resultObject.payload = 'In ' + geo_location + ' wird es heute ' + result.forecasts[0].day.shortcast;

                resolve(resultObject);

            } else {
                console.log('http status code:', (result || {}).statusCode);
                console.log('error:', error);
                console.log('result:', result);
                reject(error);
            }
        });
    });
}

function weatherAPI(path, qs, done) {
    var url = weather_host + path;
    console.log(url, qs);
    request({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json'
        },
        qs: qs
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, JSON.parse(data));
                } catch(e) {
                    console.log(e);
                    done(e);
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}

exports.main = main;