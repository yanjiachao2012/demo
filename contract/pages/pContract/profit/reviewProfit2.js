/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

	var pageview = {};

	var payTab;

	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;




	_AJget("getIncomeSummaryOrder"
		, { "contractId": pkID || 1 }
		, function(data) {
			//待处理事件。
			show_List1(data.IncomeSummaryOrder);


		}
	);
	function show_List1(DL) {



		//生成HTML
		//reHTML("#bui-nav1", "#MB_bui-nav1", DL);

		//修改标签头。
		var can = "#bui-nav1", MB = "#MB_bui-nav1", data = DL;

		var cc_0 = $(can);
		cc_0.empty();

		MB_body = $(MB);

		for(var i0 = 0; i0 < data.length; i0++) {
			var dl = data[i0];
			//获取模版
			var cc = MB_body.children().eq(0).clone();
			cc.addClass("active");
			cc.find("span").html(dl.CustomerOrderName);
			cc_0.append(cc);
		}
		navTab();

		//内页。

		var can = "#bui-tab-main", MB = "#MB_bui-tab-main", data = DL;
		var cc_0 = $(can);
		cc_0.empty();

		MB_body = $(MB);

		for(var i0 = 0; i0 < data.length; i0++) {
			var d = data[i0];
			//获取模版
			var cc = MB_body.children().eq(0).clone();
			cc.addClass("active");



			////替换所有的 [项目] 为实际需要的值。
			//for(var key in dl) {
			//	cc.find("." + key).html(dl[key]);
			//}

			
			//税后总收入
			cc.find(".sTall").html(d.TotalIncome);  // "38,000", //税后收入 总收入 

			//税后
			cc.find(".sT11").html(d.IncomeService1);  // "30,000", //技术服务收入
			cc.find(".sT21").html(d.IncomeSoftware1);  // "5,000", //软件收入
			cc.find(".sT31").html(d.IncomeHardware1);  // "0", //硬件收入
			cc.find(".sT41").html(d.IncomeCloud1);  // "1,000", //云租凭收入
			cc.find(".sT51").html(d.IncomeOther1);  // "0", //其他收入
			cc.find(".sT61").html(d.IncomeOwnProducts1);  // "2,000", //自有产品

			//税金
			cc.find(".sT12").html(d.IncomeService2);  // "25,641", //技术服务收入
			cc.find(".sT22").html(d.IncomeSoftware2);  // "4,273.50", //软件收入
			cc.find(".sT32").html(d.IncomeHardware2);  // "0", //硬件收入
			cc.find(".sT42").html(d.IncomeCloud2);  // "854.70", //云租凭收入
			cc.find(".sT52").html(d.IncomeOther2);  // "0", //其他收入
			cc.find(".sT62").html(d.IncomeOwnProducts2);  // "1709.40", //自有产品

			//税前
			cc.find(".sT13").html(d.IncomeService3);  // "4,359", //技术服务收入
			cc.find(".sT23").html(d.IncomeSoftware3);  // "726.50", //软件收入
			cc.find(".sT33").html(d.IncomeHardware3);  // "0", //硬件收入
			cc.find(".sT43").html(d.IncomeCloud3);  // "145.30", //云租凭收入
			cc.find(".sT53").html(d.IncomeOther3);  // "0", //其他收入
			cc.find(".sT63").html(d.IncomeOwnProducts3);  // "290.6", //自有产品


























			cc_0.append(cc);
		}
		navTab();












	}























	// 模块初始化定义
	pageview.init = function() {
		
	}

	function navTab() {

		
		payTab = bui.slide({
			id: "#uiPayTotalTab",
			menu: ".bui-nav",
			children: ".bui-tab-main",
			scroll: true
		});
		
	};





	pageview.init();
	// 输出模块
	module.exports = pageview;

})