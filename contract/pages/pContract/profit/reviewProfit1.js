/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {


	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;

	//连接传值更改
	$(".AGo11", current).attr("param", "{\"pkID\":\"" + pkID + "\"}");

	

	_AJget("getIncomeSummary"
		, { "contractId": pkID || 1 }
		, function(data) {
			var d = data.IncomeSummary


			//税后总收入
			$("#sTall").html(d.TotalIncome);  // "38,000", //税后收入 总收入 

			//税后
			$("#sT11").html(d.IncomeService1);  // "30,000", //技术服务收入
			$("#sT21").html(d.IncomeSoftware1);  // "5,000", //软件收入
			$("#sT31").html(d.IncomeHardware1);  // "0", //硬件收入
			$("#sT41").html(d.IncomeCloud1);  // "1,000", //云租凭收入
			$("#sT51").html(d.IncomeOther1);  // "0", //其他收入
			$("#sT61").html(d.IncomeOwnProducts1);  // "2,000", //自有产品

			//税金
			$("#sT12").html(d.IncomeService2);  // "25,641", //技术服务收入
			$("#sT22").html(d.IncomeSoftware2);  // "4,273.50", //软件收入
			$("#sT32").html(d.IncomeHardware2);  // "0", //硬件收入
			$("#sT42").html(d.IncomeCloud2);  // "854.70", //云租凭收入
			$("#sT52").html(d.IncomeOther2);  // "0", //其他收入
			$("#sT62").html(d.IncomeOwnProducts2);  // "1709.40", //自有产品

			//税前
			$("#sT13").html(d.IncomeService3);  // "4,359", //技术服务收入
			$("#sT23").html(d.IncomeSoftware3);  // "726.50", //软件收入
			$("#sT33").html(d.IncomeHardware3);  // "0", //硬件收入
			$("#sT43").html(d.IncomeCloud3);  // "145.30", //云租凭收入
			$("#sT53").html(d.IncomeOther3);  // "0", //其他收入
			$("#sT63").html(d.IncomeOwnProducts3);  // "290.6", //自有产品




		}
	);


























	var pageview = {};

	// 模块初始化定义
	pageview.init = function() {

	}

	// 输出模块
	module.exports = pageview;

})