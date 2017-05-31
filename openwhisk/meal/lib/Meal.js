var request = require('request');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/canteen/2/' + yyyy + '-' + mm + '-' + dd;

var entity;
var para;

function main(params) {
    console.log("Meal action");
    console.log(params);

    return new Promise(function (resolve, reject) {
        if (params.entities.length !== 0) {
            para = params.entities[0].value;
        } else {
            console.log("else: Hey");
            para = "-1";
        }

        switch (para) {
            case '1':           //Wahlessen 1
                entity = 0;
                break;
            case '2':           //Wahlessen 2
                entity = 1;
                break;

            case '3':           //Aktionstheke
                entity = 2;
                break;

            case '4':           //GutUndGuenstig
                entity = 3;
                break;

            case '5':           //Buffet
                entity = 4;
                break;

            default:            //Schnitzelbar
                entity = 5;
                break;
        }

        request({
            url: url,
        }, function (error, response, body) {
            var resultObject = {};

            if (!error && response.statusCode === 200) {
                var meals = JSON.parse(body);

                console.log("Mensa" + meals.mealGroups);

                if (meals.mealGroups.length === 0 || meals.mealGroups.length === undefined ||
                    meals.mealGroups[entity] === undefined || meals.mealGroups[entity].meals.length === 0 ||
                    meals.mealGroups[entity].meals.length === undefined) {

                    reject({
                        error: 'Something is wrong with the HSKA-API',
                        errorMessage: 'Maybe today is a holiday?'
                    });
                }

                var mealsLength = meals.mealGroups[entity].meals.length;
                var mealsArray = meals.mealGroups[entity].meals;
                var ulStart = '<ul>';

                for (var i = 0; mealsLength > i; i++) {
                    ulStart += '<li>' + mealsArray[i].name + '</li>';
                }

                ulStart += '</ul>';
                resultObject.payload = meals.mealGroups[entity].title + ' hat heute folgendes im Angebot:';
                resultObject.htmlText = ulStart;

                resolve(resultObject);
            } else {
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
}

exports.main = main;