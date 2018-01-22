'use strict';

var exports = module.exports = {};

exports.loginSubmit = function () {
    var $invalidInput = $(".invalidInput");
    var $noSemesterSelected = $(".noSemesterSelected");
    var $rememberMeChecked = $("#remember").is(':checked');
    var $loginForm = $(".loginForm");
    var $inputs = $('.loginForm :input');
    var values = {};

    $inputs.each(function () {
        values[this.name] = $(this).val();
    });

    if (values.semester === "0") {
        $noSemesterSelected.show();
    } else {
        $loginForm.trigger('reset');

        $.ajax({
            type: "GET",
            url: "https://www.iwi.hs-karlsruhe.de/Intranetaccess/REST/credential/info",
            headers: {
                "Authorization": "Basic " + btoa(values.username + ":" + values.password)
            },
            success: function (data) {
                console.log("Login success data: " + JSON.stringify(data, null, 4));
                $invalidInput.hide();
                $noSemesterSelected.hide();
                close_modal();

                if ($rememberMeChecked) {
                    localStorage.setItem("semester", values.semester);
                    localStorage.setItem("courseOfStudies", data.courseOfStudies);
                } else {
                    sessionStorage.setItem("semester", values.semester);
                    sessionStorage.setItem("courseOfStudies", data.courseOfStudies);
                }
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
        resetLoginForm();
    }

    function resetLoginForm() {
        $('#selectSemester').prop('selectedIndex', 0);
        $('#remember').prop('checked' , false);
        $('.loginForm').find('input').each(function () {
            //console.log($(this).prop("tagName"));
            $(this).val('');
        });
    }
};