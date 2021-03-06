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
	var pkID2 = params.pkID2;
	

	_AJget("getProjectPreview"
		, { "workItemId": pkID2 || 1 }
		, function(data) {
			var d = data.ProjectProfit;

			console.log(pkID);
			console.log(data);

			///项目立项

			//加项目ID
			$(".AGoPage").attr("param", '{"pkID":"' + d.ProjectID + '"}');



			$("#sTp101").html(d.ProjectName);  // "万科物业客户关系管 项目一3", //项目名称  
			$("#sTp102").html(d.Department); // "企业管理部IT服务部", //所属部门 
			$("#sTp103").html(d.PM);  // "李家劲", //项目经理  
			$("#sTp104").html(d.MinimumProfit);  // "50.00%",  //部门最低利润率  
			$("#sTp105").html(d.OrderGrossMargin);  // "100,000", //项目订单毛利 
			$("#sTp106").html(d.WorkloadAssessment);  // "100", //考核工作量 
			$("#sTp107").html(d.ProjectDescription);  // "万科物业客户关系管项目说明:1,2,3", //项目说明 
			$("#sTp108").html(d.ContactNumber);  // "BG-GZ01-18-363",              //合同编号 
			$("#sTp109").html(d.ContactName);  // "刘欣欣", //合同名称 万科物业客户关系管理 
			$("#sTp110").html(d.Seller);  // "刘欣欣", //销售人员 刘欣欣
			$("#sTp111").html(d.ContractStatus);  //  = "已备案",                //合同状态 已备案




			///项目预算
			$("#sTp201").html(d.BudgeLaborCost);  // "5,000", //人工成本预算  
			$("#sTp202").html(d.BudgeContributory);  // "1,000", //计划投入  
			$("#sTp203").html(d.BudgeUnknownPeople);  // "3,000", //未确定人员人工成本预算   
			$("#sTp204").html(d.BudgeKnownPeople);  // "1,000", //已知人员人工成本预算   
			$("#sTp205").html(d.BudgeACWP);  // "500", //实际已发生人工成本  
			$("#sTp206").html(d.BudgeTravelCost);  // "1,000", //差旅费预算  


			///项目利润信息。
			$("#sT1").html(d.TotalIncome);  // "1,234,222", //税后收入 总收入 

			//收入
			$("#sT1").html(d.TotalIncome);  // "1,234,222", //税后收入 总收入 

			$("#sT11").html(d.IncomeService);  // "300,000", //技术服务收入
			$("#sT12").html(d.IncomeSoftware);  // "200", //软件收入
			$("#sT13").html(d.IncomeHardware);  // "0", //硬件收入
			$("#sT14").html(d.IncomeCloud);  // "1000", //云租凭收入
			$("#sT15").html(d.IncomeOther);  // "0", //其他收入
			$("#sT16").html(d.IncomeOwnProducts);  // "2000", //自有产品

			//支出
			$("#sT2").html(d.TotalExpenditure);  // "1,234,222", //税后支出 总支出

			$("#sT21").html(d.TotalDirectCost);  // "1,234,222", //直接成本 汇总
			$("#sT211").html(d.CostService);  // "300", //劳务外包
			$("#sT212").html(d.CostSoftware);  // "200", //软件采购
			$("#sT213").html(d.CostHardware);  // "0", //硬件采购
			$("#sT214").html(d.CostCloud);  // "300", //云租赁成本
			$("#sT215").html(d.CostOther);  // "200", //其它成本
			$("#sT216").html(d.CostOwnProducts);  // "0", //自有产品成本

			$("#sT22").html(d.TotalIndirectCost);  // "234,222", //间接成本 汇总
			$("#sT221").html(d.CostTravel);  // "200", //差旅费
			$("#sT222").html(d.CostProjectFund);  // "200", //项目经费
			$("#sT223").html(d.CostCapital);  // "0", //资金占用成本
			$("#sT224").html(d.CostDivisionSell);  // "300", //事业部销售费用分摊
			$("#sT225").html(d.CostDivision);  // "0", //事业部费用公摊
			$("#sT226").html(d.CostSecondLine);  // "0", //二线费用分摊

			$("#sT23").html(d.TotalOtherCost);  // "0", //其它成本 汇总
			$("#sT231").html(d.CostTaxes);  // "300" //税金及附加




			//利润计算

			//去逗号
			var TotalIncome = (d.TotalIncome + "").replace(/,/g, "") - 0;
			var TotalExpenditure = (d.TotalExpenditure + "").replace(/,/g, "") - 0;

			//利润
			var Profit = TotalIncome - TotalExpenditure;
			var strProfit = addCommas(Profit);

			//利润率
			ProfitMargin = (Profit / TotalIncome).toFixed(2)




			//利润饼图
			$("#sT0").html(strProfit);
			loader.import("js/plugins/echarts.min.js", function() {
				pieChart = echarts.init(document.getElementById("pieChart"));
				pieChart.setOption(pageview.initPie(ProfitMargin));
			});



		}
	);











	var contractTab;

	// 模块初始化定义
	pageview.init = function() {
		navTab();
	}
	pageview.initPie = function(P1) {  //p1 占比值 如0.38
		P1 = P1 - 0;

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


	// 底部导航
	function navTab() {
		contractTab = bui.slide({
			id: "#uiContractTab",
			menu: ".bui-nav",
			children: ".bui-tab-main ul",
			scroll: true
		})
	}

	// 初始化
	pageview.init();

	// 输出模块
	module.exports = pageview;

})





