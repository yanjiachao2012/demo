/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

	var pageview = {};


	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;


	_AJget("getProjectList"
		, { "contractId": pkID }
		, function(data) {
			//待处理事件。
			show_List1(data.ProjectList);


		}
	);
	function show_List1(DL) {

		//生成HTML
		//reHTML("#bui-nav1", "#MB_bui-nav1", DL);
		//

		var can = "#div_List01", MB = "#MB_div_List01", data = DL;
		var cc_0 = $(can);
		cc_0.empty();

		MB_body = $(MB);

		for(var i0 = 0; i0 < data.length; i0++) {
			var d = data[i0];
			//获取模版
			var cc = MB_body.children().eq(0).clone();

			cc.attr("param", '{"pkID":"' + d.ProjectID+'"}');
			cc.find(".sT02").html(d.ProjectName); //项目名称
			cc.find(".sT03").html(d.ProjectAmount); //金额
			cc.find(".sT04").html(d.ProjectProfit); //利润率
			cc_0.append(cc);
		}

	}









	var contractTab;

	// 模块初始化定义
	pageview.init = function() {

	}

	// 初始化

	pageview.init();

	// 输出模块
	module.exports = pageview;

})