var request = require('request');
var url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/timetable/INFB/0/5?format=json';
var today = new Date();
var currentDay = parseInt(today.getDay());
var weekday = new Array(7);
weekday[0] = "Sonntag";
weekday[1] = "Montag";
weekday[2] = "Dienstag";
weekday[3] = "Mittwoch";
weekday[4] = "Donnerstag";
weekday[5] = "Freitag";
weekday[6] = "Samstag";
var currentDayString = weekday[currentDay];

function main(params) {

    console.log("------Timetable Action started!------");
    console.log("TimetableAction Params:" + JSON.stringify(params, null, 4));
    console.log("Timetable Semester: " + params.semester);
    console.log("Day: " + currentDay);
    console.log("DayString: " + currentDayString);

    if("__ow_body" in params) { // For testing this action!!
        params = JSON.parse(params.__ow_body);
    }

    return new Promise(function (resolve, reject) {
        var resultObject = {};
        var dayIndex = convertDayToHskaDay(currentDay), dayValue = currentDayString;

        if (params.semester !== undefined && params.courseOfStudies !== undefined) {
            url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/timetable/' + params.courseOfStudies + '/0/' + params.semester + '?format=json';
        } else {
            console.log("Es wurde kein Semester angegeben");
            resultObject.payload = "Es wurde kein Semester angegeben!";
            resolve(resultObject);
        }

        if (params.entities !== undefined && params.entities.length !== 0) {
            console.log('Entitie Value: ' + params.entities[0].value);
            switch (params.entities[0].value) {
                case '7':
                    dayIndex = 0;
                    dayValue = 'Montag';
                    break;

                case '1':
                    dayIndex = 1;
                    dayValue = 'Dienstag';
                    break;

                case '2':
                    dayIndex = 2;
                    dayValue = 'Mittwoch';
                    break;

                case '3':
                    dayIndex = 3;
                    dayValue = 'Donnerstag';
                    break;

                case '4':
                    dayIndex = 4;
                    dayValue = 'Freitag';
                    break;
                case '5':
                    dayIndex = 5;
                    dayValue = 'Samstag';
                    break;
                case '6':
                    dayIndex = 6;
                    dayValue = 'Sonntag';
                    break;
            }
        }

        request({
            url: url
        }, function (error, response, body) {
            var ulStart = '<ul>';

            if (!error && response.statusCode === 200) {
                var responseObject = JSON.parse(body);

                console.log('Response Object: ' + JSON.stringify(responseObject, null, 4));
                var entries = responseObject.timetables[dayIndex].entries;

                if (!entries || entries.length === 0) {
                    resolve({"payload": "Heute findet keine Vorlesung statt."});
                }
                for (var i = 0; entries.length > i; i++) {
                    var startTime = entries[i].startTime;
                    var endTime = entries[i].endTime;
                    var locationsLength = entries[i].locations.length;
                    var locationsUl = '<ul>';

                    for (var j = 0; locationsLength > j; j++) {
                        var aliasName = '';
                        if (entries[i].locations[j].aliasName) {
                            aliasName = entries[i].locations[j].aliasName;
                        }
                        locationsUl += '<li>' + aliasName + ' ' + entries[i].locations[j].building + entries[i].locations[j].room + '</li>';
                    }
                    locationsUl += '</ul>';

                    ulStart += '<li>' + combineStartAndEndTime(startTime, endTime) + ': <strong>' + entries[i].lectureName + '</strong>' + locationsUl + '</li>';
                }
                ulStart += '</ul>';
                resultObject.htmlText = ulStart;
                resultObject.payload = 'Hier ist der Stundenplan für ' + dayValue + ':';

                resolve(resultObject);

            } else {
                console.log('http status code:', (response || {}).statusCode);
                console.log('error:', error);
                console.log('body:', body);
                reject(error);
            }
        });
    });
}

function convertToHoursMins(value) {
    var h = Math.floor(value / 60);
    var m = value % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
}

function combineStartAndEndTime(startTime, endTime) {
    startTime = convertToHoursMins(startTime);
    endTime = convertToHoursMins(endTime);
    return startTime + " - " + endTime;
}

function convertDayToHskaDay(day) {
    day = currentDay - 1;
    if (day === -1) {
        day = 6;
    }
    return day;
}

exports.main = main;