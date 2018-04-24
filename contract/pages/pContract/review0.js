/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {};
	var contractTab;
	var uiAccordion;

    // 模块初始化定义
    pageview.init = function() {
	
		var uiStepbar = bui.stepbar({
			id: "#stepRecord",
			data: [{
				title: "预立项申请",
				subtitle: "2016-04-2 10:30",
				content: "成功创建申请,已经提交至XX部门经理审批,请耐心等待"
			}, {
				title: "立项审批",
				subtitle: "2016-04-21 10:30",
				content: "审批完成,资料递交中"
			}, {
				title: "立项审批",
				subtitle: "2016-04-21 10:30",
				content: "审批完成,资料递交中"
			}, {
				title: "立项审批",
				subtitle: "2016-04-21 10:30",
				content: "审批完成,资料递交中"
			}, {
				title: "立项审批",
				subtitle: "2016-04-21 10:30",
				content: "审批完成,资料递交中"
			}, {
				title: "立项审批",
				subtitle: "2016-04-21 10:30",
				content: "审批完成,资料递交中"
			}]
		});
		uiStepbar.value(0);
	

		accordion();
	}

	function accordion() {
		uiAccordion = bui.accordion({
			id: "#accordionPay"
		});
	}


    // 初始化
	pageview.init();
	// 输出模块
	module.exports = pageview;



})