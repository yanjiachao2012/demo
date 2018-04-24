loader.define(function(require, exports, module) {

	var pageview = {};


	// 模块初始化定义
	pageview.init = function() {
		accordion();
	}

	function accordion() {
		uiAccordion = bui.accordion({
			id: "#infoList"
		});
		uiAccordion.showFirst();
	}

	// 初始化
	pageview.init();

	// 输出模块
	module.exports = pageview;

})