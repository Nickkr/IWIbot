var exports = module.exports = {};


exports.loginSubmit = function() {

        var $invalidInput = $(".invalidInput");
        var $noSemesterSelected = $(".noSemesterSelected");
        var $inputs = $('.loginForm :input');
        var values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
            console.log(values[this.name]);
        });

        if (values.semester === "0") {

            $noSemesterSelected.show();

        } else {
            $(".loginForm").trigger('reset');

            $.ajax({
                type: "GET",
                //url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/validate",
                url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/info",
                async: false,
                headers: {
                    "Authorization": "Basic " + btoa(values.username + ":" + values.password)
                },
                success: function (data) {
                    console.log(data);
                    //var firstName = {payload: "Hallo " + data.firstName + ", du hast dich erfolgreich eingeloggt"};
                    //firstName = JSON.stringify(firstName);
                    //tts.tts(firstName).then;
                    $invalidInput.hide();
                    $noSemesterSelected.hide();
                    close_modal();

                    setItem("username", values.username);
                    setItem("password", values.password);
                    setItem("semester", values.semester);
                    setItem("courseOfStudies", data.courseOfStudies);
                    console.log("courseOfStudies: " + getItem("courseOfStudies"));
                    console.log("Semester: " + getItem("semester"));


                    /* sessionStorage.setItem("semester", values.semester);
                     sessionStorage.setItem("courseOfStudies", data.courseOfStudies);
                     console.log("Session storage");*/

                },
                error: function () {
                    $noSemesterSelected.hide();
                    $invalidInput.show();
                }

            });
        }
    function close_modal() {
        $("#lean_overlay").fadeOut(200);
        $("#modal").css({"display": "none"});
    }
    function setItem(key, value) {
        localStorage.setItem(key, value);
    }

    function getItem(key) {
        return localStorage.getItem(key);
    }


};
