﻿loader.define(function(require, exports, module) {
	var pageview = {};

	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;



	////饼图
	loader.import("js/plugins/echarts.min.js", function() {
		var pieChart = echarts.init(document.getElementById("payTotalPie"));
		//客户订单支出,项目订单支出,项目支出,项目销售成本
		pieChart.setOption(pageview.initPie(
			"3200"
			, "222"
			, "3000"

		));
	});










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

	pageview.initPie = function(vAll, v1, v2) {

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
			color: ['#3DB4FF', '#98D927', '#35C486', '#FF943B'],
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
					name: '已发生的差旅费'
				}, {
					value: v2, //60000
					name: '可用的差旅费用'
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