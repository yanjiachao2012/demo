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





	




	_AJget("getReview"
		, { "procInstId": pkID}
		,function(data) {
			///合同信息。
			$("#spanT1").html(data.ContactInfo.ContactNumber);
			$("#spanT2").html(data.ContactInfo.ContactName);
			$("#spanT3").html(data.ContactInfo.ProcessNumber);
			$("#spanT4").html(data.ContactInfo.Client);
			$("#spanT5").html(data.ContactInfo.ContractType);
			$("#spanT6").html(data.ContactInfo.SettlementType);
			$("#spanT7").html(data.ContactInfo.SignCompany);
			$("#spanT8").html(data.ContactInfo.SellCompany);
			$("#spanT9").html(data.ContactInfo.AttributionDepartment);
			$("#spanT10").html(data.ContactInfo.Seller);
			$("#spanT11").html(data.ContactInfo.ProfitMargin);
			$("#spanT12").html(data.ContactInfo.ContractAmount);
			$("#spanT13").html(data.ContactInfo.Profit);
			$("#spanT21").html(data.ContactInfo.PaymentPlanCount);
			$("#spanT22").html(data.ContactInfo.ProjectCount);
			$("#spanT23").html(data.ContactInfo.AttachmentCount);

			

			var ContractId = data.ContactInfo.ContractId;

			//连接传值更改
			$(".AGo11", current).attr("param", "{\"pkID\":\"" + ContractId + "\"}");



			///审批历史列表
			//数据处理
			var stepbarData = [];
			for(var i0 = 0, _data = data.ApprovalHistoryList; i0 < _data.length; i0++) {
				var dl = _data[i0];
				stepbarData.push({
					title: "[" + dl.ProcessStatus + "]" + dl.ProcessStep,
					subtitle: dl.suggestion == "" ? "已经提交至 " + dl.processor : dl.processor + "：" + dl.suggestion,
					content: dl.ProcessingTime
				});

			}
			//更新列表
			var uiStepbar = bui.stepbar({
				id: "#stepRecord",
				data: stepbarData
			});
			uiStepbar.value(0);
		}
	);









    var pageview = {};
	var contractTab;
	var uiAccordion;

    // 模块初始化定义
    pageview.init = function() {
	
		var uiStepbar = bui.stepbar({
			id: "#stepRecord"
			//,
			//data: [{
			//	title: "预立项申请",
			//	subtitle: "成功创建申请,已经提交至XX部门经理审批,请耐心等待",
			//	content: "2016-04-2 10:30"
			//}, {
			//	title: "立项审批",
			//	subtitle: "审批完成, 资料递交中",
			//	content: "2016-04-21 10:30"
			//}, {
			//	title: "立项审批",
			//	subtitle: "审批完成, 资料递交中",
			//	content: "2016-04-21 10:30"
			//}, {
			//	title: "立项审批",
			//	subtitle: "审批完成, 资料递交中",
			//	content: "2016-04-21 10:30"
			//}]
		});
		uiStepbar.value(0);
	

		accordion();
	}

	// function accordion() {
	// 	uiAccordion = bui.accordion({
	// 		id: "#accordionPay"
	// 	});
	// }

	function accordion(){

		//折叠功能
		$(".down").click(function() {
			$(".project-item").toggle();
			$(".icon-listdown").toggleClass("icon-listup");

			//$(".project-content").toggle();
		})
	}
    // 初始化
	pageview.init();
	// 输出模块
	module.exports = pageview;



})