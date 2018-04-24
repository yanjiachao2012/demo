/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

	var pageview = {};
	var contractTab;

	// 模块初始化定义
	pageview.init = function() {

	}

	pageview.initPie = function() {

		// 指定图表的配置项和数据
		var optionPieChart = {
			title: {
				show: true,
				text: '38%',
				subtext: '利润率',
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
				data: ['利润率', '可用率']
			},
			series: [{
				name: '数据来源',
				type: 'pie',
				radius: ['80%', '100%'],
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
					value: 38,
					name: '利用率'
				}, {
					value: 62,
					name: '可用率'
				}]
			}]
		};
		return optionPieChart;
	}
	// 初始化


	loader.import("js/plugins/echarts.min.js", function() {
		var pieChart = echarts.init(document.getElementById("pieChart"));
		pieChart.setOption(pageview.initPie());

	});

	// 输出模块
	module.exports = pageview;

})