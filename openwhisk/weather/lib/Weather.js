var request = require('request-promise');
var weather_host = $WEATHER_COMPANY_URL;

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
    if ('__ow_body' in params) { // For testing this action!!
        params = JSON.parse(params.__ow_body);
    }

    console.log('------Weather Action started!------');
    console.log('WeatherAction Params:' + JSON.stringify(params));
    console.log('Day: ' + currentDay);
    console.log('DayString: ' + currentDayString);
    params.units = 'm';
    params.language = 'de-DE';

    var qs = {language: params.language, units: params.units};
    if ('latitude' in params && 'longitude' in params) {
        geocode[0] = params.latitude;
        geocode[1] = params.longitude;
    }
    if ('geo_location' in params) {
        geo_location = params.geo_location;
    }

    var optionsObservation = {
        url: weather_host + '/api/weather/v1/geocode/' + geocode[0] + '/' + geocode[1] + '/observations.json',
        qs: qs
    };

    var optionsForecast = {
        url: weather_host + '/api/weather/v1/geocode/' + geocode[0] + '/' + geocode[1] + '/forecast/daily/3day.json',
        qs: qs
    };

    var observationHtmlString;

    return request(optionsObservation)
        .then(function (response) {
            return processObservationData(response);

        }).then(function (response) {
            observationHtmlString = response;
            return request(optionsForecast);

        }).then(function (response) {
            return processForecastData(response, observationHtmlString);

        }).then(function (response) {
            return response;
        });
}

function processObservationData(observationData) {
    var data = JSON.parse(observationData);
    var observation = data.observation;
    var weatherHtml = "<ul style='list-style-type:none'>";

    weatherHtml += "<li style='font-size:25px'>" + geo_location + "</li>";
    weatherHtml += "<li>" + observation.wx_phrase + "</li>";
    weatherHtml += "<li style='font-size:50px'>" + observation.temp + "&#8451;</li>";
    weatherHtml += "</ul>";

    return weatherHtml;
}

function processForecastData(forecastData, weatherHtml) {
    var resultObject = {};
    var data = JSON.parse(forecastData);
    var forecasts = data.forecasts, forecastsLength = forecasts.length;

    weatherHtml += '<table width="100%">';

    for (var i = 1; i < forecastsLength; i++) {
        var forecast = forecasts[i];

        var day = forecast.day, //night = forecast.night, shortcast = forecast.shortcast,
            max_temp = forecast.max_temp, min_temp = forecast.min_temp, dow = forecast.dow;

        weatherHtml += '<tr><td>' + dow + '</td><td><img  src="' + getIconURL(day.icon_code) + '" height="30" width="30"/></td><td>' + max_temp + " Grad</td><td>" + min_temp + " Grad</td></tr>";
    }

    weatherHtml += '</table>';
    resultObject.htmlText = weatherHtml;
    var payloadShortcast;

    if ('day' in forecasts[0]) {
        payloadShortcast = forecasts[0].day.shortcast;
    } else {
        payloadShortcast = forecasts[0].night.shortcast;
    }

    resultObject.payload = 'In ' + geo_location + ' wird es heute ' + payloadShortcast;

    return resultObject;
}

function getIconURL(code) {
    return "http://weather-company-data-demo.eu-gb.mybluemix.net/images/weathericons/icon" + code + ".png";
}

exports.main = main;