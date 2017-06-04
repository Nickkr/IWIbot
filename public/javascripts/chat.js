var exports = module.exports = {};

exports.appendSendMessage = function appendSendMessage(msg) {


    var msgSend = '<div class="row msg "><div class="col-lg-5">'
        + '</div><div class="col-lg-4"><div class="msg-send">'
        + msg + '</div></div><div class="col-lg-3"></div></div>';
    $(msgSend).appendTo("#chat div.container").hide().fadeIn();
    window.scrollTo(0, document.body.scrollHeight);

};

exports.appendReceivedMessage = function appendReceivedMessage(msg) {

    var msgReceived = '<div class="row msg "><div class="col-lg-3">'
        + '</div><div class="col-lg-4"><div class="msg-recived">'
        + msg + '</div></div><div class="col-lg-5"></div></div>';

    $(msgReceived).appendTo("#chat div.container").hide().fadeIn();

    window.scrollTo(0, document.body.scrollHeight);
};

exports.chatSubmit = function chatSubmit() {

    var $messageField = $('#messageField');
    var value = $messageField.val().toString();
    exports.appendSendMessage(value);
    window.scrollTo(0, document.body.scrollHeight);
    return value;
};
exports.chatToggle = function chatToggle() {

    var $notification = $(".notification");
    var $toggleIcon = $("i.toggleIcon");
    var $voiceChatToggle = $(".voice , .history");
    var $chatForm = $('#chatForm');

    $notification.hide().text();
    $toggleIcon.toggleClass(".fa fa-microphone");
    $voiceChatToggle.toggle(400, function () {

    });
    $chatForm.toggle();


};