loader.define(function(require, exports, module) {
	var pageview = {};

	// 绑定事件
	bind();

	// 事件类定义
	function bind() {
		var $noLogin = $("#noLogin"),
			$hasLogin = $("#hasLogin");
		if (userobj.cstid == null) {
			$noLogin.show();
			$hasLogin.hide();
		} else {
			$noLogin.hide();
			$hasLogin.show();
		}
	};
	pageview.initLogin = function() {
		bind();
	}

	module.exports = pageview;

})