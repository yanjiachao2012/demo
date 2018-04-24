/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

	//获取参数
	console.log(getUrlParam("aaa"));

	if(getUrlParam("aaa") == "go") {
		console.log("-");


		router.load({ url: "pages/pContract/review.html", param: { "name": "page2" } })

	}







	_AJget("getTodoCount",
		function(data) {
			$("#T11").html(data.Todo);
			$("#T12").html(data.Doing);
		}
	);



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




