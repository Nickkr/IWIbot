var request = require('request');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var url = 'https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/canteen/2/' + yyyy + '-' + mm + '-' + dd;

var meal;
var entity;

function main(params) {

    console.log("------Meal Action started!------");
    console.log("Meal Action Params:" + params);

    return new Promise(function (resolve, reject) {

        if (params.entities.length !== 0) {
            console.log("Entity found in Params");
            entity = params.entities[0].value;
        } else {
            console.log("No Entity in Params!");
            entity = "-1";
        }

        switch (entity) {
            case '1':           //Wahlessen 1
                meal = 0;
                break;
            case '2':           //Wahlessen 2
                meal = 1;
                break;

            case '3':           //Aktionstheke
                meal = 2;
                break;

            case '4':           //GutUndGuenstig
                meal = 3;
                break;

            case '5':           //Buffet
                meal = 4;
                break;

            default:            //Schnitzelbar
                meal = 5;
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

                    resultObject.payload = "Heute gibt es nichts zu essen in der Mensa, vielleicht sind Ferien?";

                    reject(resultObject);


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
                resultObject.payload = "Die HsKa-Api ist zur Zeit nicht erreichbar!";
                reject(resultObject);

            }
        });
    });
}

exports.main = main;