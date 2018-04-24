/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

	var contractTab01 = bui.slide({
		id: "#uiContractTab01",
		menu: ".bui-nav",
		children: ".bui-tab-main ul",
		scroll: true
	})
	var params = router.getPageParams();
	if(params.Tab01_TabIndex) {
		contractTab01.to(params.Tab01_TabIndex)
	}



	var pageview = {};
	var contractTab;

	// 模块初始化定义
	pageview.init = function() {
		navTab();

	}

	// 底部导航
	function navTab() {

	}

	// 初始化
	pageview.init();

	// 输出模块
	module.exports = pageview;

})

