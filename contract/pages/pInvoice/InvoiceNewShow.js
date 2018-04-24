loader.define(function(require, exports, module) {

	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;









	///审批历史列表
	//数据处理
	var stepbarData = [];
	//for(var i0 = 0, _data = data.ApprovalHistoryList; i0 < _data.length; i0++) {
	//	var dl = _data[i0];
	//	stepbarData.push({
	//		title: "[" + dl.ProcessStatus + "]" + dl.ProcessStep,
	//		subtitle: dl.suggestion == "" ? "已经提交至 " + dl.processor : dl.processor + "：" + dl.suggestion,
	//		content: dl.ProcessingTime
	//	});

	//}

	stepbarData = [{
		title: "完成",
		subtitle: "成功完成",
		content: "2016-04-2 10:30"
	}, {
		title: "审批",
		subtitle: "审批完成",
		content: "2016-04-21 10:30"
	}, {
		title: "审批",
		subtitle: "审批完成",
		content: "2016-04-21 10:30"
	}, {
		title: "提交",
		subtitle: "提交申请",
		content: "2016-04-21 10:30"
	}];









	//更新列表
	var uiStepbar = bui.stepbar({
		id: "#stepRecord",
		data: stepbarData
	});
	uiStepbar.value(0);











	var pageview = {};



	// 模块初始化定义
	pageview.init = function() {

		//var uiStepbar = bui.stepbar({
		//	id: "#stepRecord"
		//	,
		//	data: [{
		//		title: "预立项申请",
		//		subtitle: "成功创建申请,已经提交至XX部门经理审批,请耐心等待",
		//		content: "2016-04-2 10:30"
		//	}, {
		//		title: "立项审批",
		//		subtitle: "审批完成, 资料递交中",
		//		content: "2016-04-21 10:30"
		//	}, {
		//		title: "立项审批",
		//		subtitle: "审批完成, 资料递交中",
		//		content: "2016-04-21 10:30"
		//	}, {
		//		title: "立项审批",
		//		subtitle: "审批完成, 资料递交中",
		//		content: "2016-04-21 10:30"
		//	}]
		//});
		//uiStepbar.value(0);



	}




	// 初始化
	pageview.init();
	// 输出模块
	module.exports = pageview;



})






