loader.define(function(require, exports, module) {
	var pageview = {};

	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;


	_AJget("getSpendingSummary"
		, { "contractId": pkID || 1 }
		, function(data) {
			var d = data.SpendingSummary

			///**支出汇总**
			$("#sT01").html(d.TotalPayCustomerOrder);  // "188,000", //客户订单支出 
			$("#sT02").html(d.TotalPayItemOrder);  // "60,000", //项目订单支出 
			$("#sT03").html(d.TotalPayProject);  // "0", //项目支出   
			$("#sT04").html(d.TotalPaySellingCost);  // "5,000", //项目销售成本 


			///项目销售成本 
			$("#sT11").html(d.PayMiscellaneous);  // "1,000", //杂项成本 
			$("#sT12").html(d.PayBidding);  // "0",            //中标服务费 0
			$("#sT13").html(d.PayBusiness);  // "2,000", //商务合作费 2,000
			$("#sT14").html(d.PayOther);  // "2,000",//其他费用 2,000


			///客户订单支出 
			$("#sT2all").html(d.TotalPayCustomerOrder);  // "188,000", //客户订单支出 
			//税后
			$("#sT211").html(d.Pay1Service1);  // "60,000", //劳务外包
			$("#sT221").html(d.Pay1Software1);  // "8,000", //软件采购
			$("#sT231").html(d.Pay1Hardware1);  // "80,000", //硬件采购
			$("#sT241").html(d.Pay1OwnProducts1);  // "3,000", //自有产品成本
			$("#sT251").html(d.Pay1Cloud1);  // "10,000", //云租凭成本
			//税金
			$("#sT212").html(d.Pay1Service2);  // "0", //劳务外包
			$("#sT222").html(d.Pay1Software2);  // "0", //软件采购
			$("#sT232").html(d.Pay1Hardware2);  // "0", //硬件采购
			$("#sT242").html(d.Pay1OwnProducts2);  // "0", //自有产品成本
			$("#sT252").html(d.Pay1Cloud2);  // "0", //云租凭成本
			//税前
			$("#sT213").html(d.Pay1Service3);  // "60,000", //劳务外包
			$("#sT223").html(d.Pay1Software3);  // "8,000", //软件采购
			$("#sT233").html(d.Pay1Hardware3);  // "80,000", //硬件采购
			$("#sT243").html(d.Pay1OwnProducts3);  // "3,000", //自有产品成本
			$("#sT253").html(d.Pay1Cloud3);  // "10,000", //云租凭成本


			///项目订单支出
			$("#sT3all").html(d.TotalPayItemOrder);  // "60,000", //项目订单支出 
			//税后
			$("#sT311").html(d.Pay2Service1);  // "60,000", //人工外包
			$("#sT321").html(d.Pay2Software1);  // "0", //软件采购
			$("#sT331").html(d.Pay2Hardware1);  // "0", //硬件采购
			$("#sT341").html(d.Pay2OwnProducts1);  // "0", //自有产品成本
			$("#sT351").html(d.Pay2Cloud1);  // "0", //云租凭成本
			//税金
			$("#sT312").html(d.Pay2Service2);  // "0", //人工外包
			$("#sT322").html(d.Pay2Software2);  // "0", //软件采购
			$("#sT332").html(d.Pay2Hardware2);  // "0", //硬件采购
			$("#sT342").html(d.Pay2OwnProducts2);  // "0", //自有产品成本
			$("#sT352").html(d.Pay2Cloud2);  // "0", //云租凭成本
			//税前
			$("#sT313").html(d.Pay2Service3);  // "60,000", //人工外包
			$("#sT323").html(d.Pay2Software3);  // "0", //软件采购
			$("#sT333").html(d.Pay2Hardware3);  // "0", //硬件采购
			$("#sT343").html(d.Pay2OwnProducts3);  // "0", //自有产品成本
			$("#sT353").html(d.Pay2Cloud3);  // "0", //云租凭成本


			///项目支出
			$("#sT4all").html(d.TotalPayProject);  // "0", //项目支出   
			//直接成本
			$("#sT411").html(d.Pay3Work);  // "0", //人工外包
			$("#sT412").html(d.Pay3LaborIn);  // "0", //人工成本(内部)
			$("#sT413").html(d.Pay3LaborOut);  // "0", //人工成本(外包)
			$("#sT414").html(d.Pay3Travel);  // "0", //差旅费
			$("#sT415").html(d.Pay3Project);  // "0", //项目经费
			$("#sT416").html(d.Pay3Occupation);  // "0", //资金占用成本
			//分摊成本
			$("#sT421").html(d.Pay3DivisionSales);  // "0", //事业部销售费用分摊
			$("#sT422").html(d.Pay3Division);  // "0", //事业部费用公摊
			$("#sT423").html(d.Pay3SecondLine);  // "0", //二线费用公摊
			//其他成本
			$("#sT431").html(d.Pay3Taxes);  // "0" //税金及附加




			



			////饼图
			loader.import("js/plugins/echarts.min.js", function() {
				var pieChart = echarts.init(document.getElementById("payTotalPie"));
				//客户订单支出,项目订单支出,项目支出,项目销售成本
				pieChart.setOption(pageview.initPie(
					d.TotalPayAll
					, d.TotalPayCustomerOrder.suigun()
					, d.TotalPayItemOrder.suigun()
					, d.TotalPayProject.suigun()
					, d.TotalPaySellingCost.suigun()
					));
			});
			



		}
	);












	var payTab, uiAccordion;
	// 模块初始化定义
	pageview.init = function() {
		navTab();
		accordion();
	}

	function navTab() {
		payTab = bui.slide({
			id: "#uiPayTotalTab",
			menu: ".bui-nav",
			children: ".bui-tab-main ul",
			scroll: true
		})
	};

	function accordion() {
		uiAccordion = bui.accordion({
			id: "#accordionPay"
		});
		uiAccordion.showAll();

	}

	pageview.initPie = function(vAll, v1, v2, v3, v4) {

		// 指定图表的配置项和数据
		var optionPieChart = {
			title: {
				show: true,
				text: vAll + "", //'253,000'
				subtext: '总成本',
				x: 'center',
				y: '25%',
				textStyle: {
					color: '#FFA027',
					lineHeight: 1,
					fontWeight: 'normal',
					fontSize: 18,
				},
				subtextStyle: {
					color: '#999',
					fontWeight: 'normal',
					fontSize: 14
				}
			},
			//配置色块颜色
			color: ['#3DB4FF', '#98D927', '#35C486', '#FF943B' ],
			tooltip: {
				show: false,
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				show: false,
				textStyle: {
					color: '#333'
				},
				orient: 'vertical',
				left: 0,
				top: 20,
				formatter: function(name) {
					return echarts.format.truncateText(name, 90, '14px Microsoft Yahei', '…');
				},
				tooltip: {
					show: true
				},
				data: ['客户订单', '项目订单', '项目支出', '项目销售成本']
			},
			series: [{
				name: '数据来源',
				type: 'pie',
				radius: ['75%', '100%'],
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
					value: v1, //168000
					name: '客户订单'
				}, {
					value: v2, //60000
					name: '项目订单'
				}, {
					value: v3, //0
					name: '项目支出'
				}, {
					value: v4, //5000
					name: '项目销售成本'
				}]
			}]
		};
		return optionPieChart;
	}



	// 初始化
	pageview.init();
	// 输出模块
	module.exports = pageview;
})