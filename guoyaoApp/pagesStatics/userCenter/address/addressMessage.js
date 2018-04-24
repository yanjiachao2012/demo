loader.define(function(require,exports,module) {
	var phone = $(".phoneNum").text();
    var mphone = phone.substr(0, 3) + '****' + phone.substr(7);
    $('.phoneNum').text(mphone)

})