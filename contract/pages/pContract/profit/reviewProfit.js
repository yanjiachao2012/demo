/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {




	//生成饼图
	var pageview = {};
	var pieChart;
	//loader.import("js/plugins/echarts.min.js", function() {
	//	//pieChart = echarts.init(document.getElementById("pieChart"));
	//	//pieChart.setOption(pageview.initPie(100,62));
	//});
	pageview.initPie = function(P1) {  //p1 占比值 如0.38
		P1=P1-0;

		//利润率
		var T1 = ((P1 * 100).toFixed(2) - 0) + "%";
		//利润率饼图百分比占值
		var pre1 = (P1 * 100).toFixed(0);
		var pre2 = 100 - pre1;


		//a.toFixed(2)


		// 指定图表的配置项和数据
		var optionPieChart = {
			title: {
				show: true,
				text: T1,  //'38%',
				subtext: '利润率',  //'利润率',
				x: 'center',
				y: '20%',
				textStyle: {
					color: '#fff',
					lineHeight: 1,
					fontWeight: 'normal',
					fontSize: 18,
				},
				subtextStyle: {
					color: 'rgba(255,255,255,0.8)',
					fontWeight: 'normal',
					fontSize: 12
				}
			},
			//配置色块颜色
			color: ['#fff', "rgba(255,255,255,0.5)"],
			tooltip: {
				show: false,
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				show: false,
				textStyle: {
					color: '#fff'
				},
				formatter: function(name) {
					return echarts.format.truncateText(name, 90, '14px Microsoft Yahei', '…');
				},
				tooltip: {
					show: true
				},
				data: ['利润', '支出']
			},
			series: [{
				name: '数据来源',
				type: 'pie',
				radius: ['80%', '100%'],
				hoverAnimation: false, //禁止滑过变大效果
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: false,
						textStyle: {
							fontSize: '30',
							fontWeight: 'normal',
							color: '#fff'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				itemStyle: {

				},
				center: ['50%', '50%'],
				data: [{
					value: pre1, //38
					name: '利润'
				}, {
					value: pre2, //62
					name: '支出'
				}]
			}]
		};
		return optionPieChart;
	}


	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;




	//连接传值更改
	$(".AGo11", current).attr("param", "{\"pkID\":\"" + pkID + "\"}");
	$(".AGo12", current).attr("param", "{\"pkID\":\"" + pkID + "\"}");
	$(".AGo13", current).attr("param", "{\"pkID\":\"" + pkID + "\"}");







	_AJget("getReviewProfit"
		, { "contractId": pkID||1 }
		, function(data) {
			var d = data.ContactProfitInfo




			//收入
			$(".sT1", current).html(d.TotalIncome);  // "1,234,222", //税后收入 总收入 

			$(".sT11", current).html(d.IncomeService);  // "300,000", //技术服务收入
			$(".sT12", current).html(d.IncomeSoftware);  // "200", //软件收入
			$(".sT13", current).html(d.IncomeHardware);  // "0", //硬件收入
			$(".sT14", current).html(d.IncomeCloud);  // "1000", //云租凭收入
			$(".sT15", current).html(d.IncomeOther);  // "0", //其他收入
			$(".sT16", current).html(d.IncomeOwnProducts);  // "2000", //自有产品

			//支出
			$(".sT2", current).html(d.TotalExpenditure);  // "1,234,222", //税后支出 总支出

			$(".sT21", current).html(d.TotalDirectCost);  // "1,234,222", //直接成本 汇总
			$(".sT211", current).html(d.CostService);  // "300", //劳务外包
			$(".sT212", current).html(d.CostSoftware);  // "200", //软件采购
			$(".sT213", current).html(d.CostHardware);  // "0", //硬件采购
			$(".sT214", current).html(d.CostCloud);  // "300", //云租赁成本
			$(".sT215", current).html(d.CostOther);  // "200", //其它成本
			$(".sT216", current).html(d.CostOwnProducts);  // "0", //自有产品成本

			$(".sT22", current).html(d.TotalIndirectCost);  // "234,222", //间接成本 汇总
			$(".sT221", current).html(d.CostTravel);  // "200", //差旅费
			$(".sT222", current).html(d.CostProjectFund);  // "200", //项目经费
			$(".sT223", current).html(d.CostCapital);  // "0", //资金占用成本
			$(".sT224", current).html(d.CostDivisionSell);  // "300", //事业部销售费用分摊
			$(".sT225", current).html(d.CostDivision);  // "0", //事业部费用公摊
			$(".sT226", current).html(d.CostSecondLine);  // "0", //二线费用分摊

			$(".sT23", current).html(d.TotalOtherCost);  // "0", //其它成本 汇总
			$(".sT231", current).html(d.CostTaxes);  // "300" //税金及附加




			//利润计算

			//去逗号
			var TotalIncome = (d.TotalIncome + "").replace(/,/g, "") - 0;
			var TotalExpenditure = (d.TotalExpenditure + "").replace(/,/g, "") - 0;

			//利润
			var Profit = TotalIncome - TotalExpenditure;
			var strProfit = addCommas(Profit);

			//利润率
			ProfitMargin = (Profit/TotalIncome).toFixed(2)




			//利润饼图
			$(".sT0", current).html(strProfit);
			loader.import("js/plugins/echarts.min.js", function() {
				pieChart = echarts.init(document.getElementById("pieChart"));
				pieChart.setOption(pageview.initPie(ProfitMargin));
			});



		}
	);













	var contractTab;

	// 模块初始化定义
	pageview.init = function() {

	}


	// 初始化





	// 输出模块
	module.exports = pageview;

})

