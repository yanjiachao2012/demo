/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

	_AJget("getTodoList",
		function(data) {
			//待处理事件。
			show_TodoList(data.TodoList);

			//进行中事件。
			show_DoingList(data.DoingList);
		}
	);
	function show_TodoList(DL) {
	
		//数据处理 特殊数据处理和生成新数据

		


		DL.push({ "WorkItemID": "ba6ffc6b-7f4e-4b1b-935d-0cbb326784cb", "ProcInstId": "35d0da92-9e17-4505-8daf-d68ad0480306"
			, "ProcessCategory": "新开发票"
			, "ContactName": "[测试合同14-项目订单01]-申请开发票"
			, "WorkflowName": "申请开发票"
			, "WorkflowNameTittle": "发票管理员审核并收票"
			, "Proposer": "周欣欣"
			, "ReceiptTime": "2018-03-21 01:46:06"
			});
		DL.push({
			"WorkItemID": "ba6ffc6b-7f4e-4b1b-935d-0cbb326784cb", "ProcInstId": "35d0da92-9e17-4505-8daf-d68ad0480306"
			, "ProcessCategory": "发票冲红"
			, "ContactName": "[测试合同14-项目订单01]-申请发票冲红"
			, "WorkflowName": "申请发票冲红"
			, "WorkflowNameTittle": "销售申请作废并还票"
			, "Proposer": "张小泉"
			, "ReceiptTime": "2018-03-21 01:46:06"
		});
		DL.push({
			"WorkItemID": "ba6ffc6b-7f4e-4b1b-935d-0cbb326784cb", "ProcInstId": "35d0da92-9e17-4505-8daf-d68ad0480306"
			, "ProcessCategory": "发票作废"
			, "ContactName": "[测试合同14-项目订单01]-发票作废"
			, "WorkflowName": "申请发票作废"
			, "WorkflowNameTittle": "销售申请作废并还票"
			, "Proposer": "张小泉"
			, "ReceiptTime": "2018-03-21 01:46:06"
		});


		for(var i0 = 0; i0 < DL.length; i0++) {
			var dl = DL[i0];

			//替换新的连接
			var dl_href = "";
			if(dl.ProcessCategory == "合同") {
				dl_href = "pages/pContract/review.html";
			}else if(dl.ProcessCategory == "项目") {
				dl_href = "pages/pProject/projectPreview.html";
			} else if(dl.ProcessCategory == "新开发票") {
				dl_href = "pages/pInvoice/InvoiceNewShow.html";
			} else if(dl.ProcessCategory == "发票冲红") {
				dl_href = "pages/pInvoice/InvoiceAtredShow.html";
			} else if(dl.ProcessCategory == "发票作废") {
				dl_href = "pages/pInvoice/InvoiceInvalidShow.html";
			}
			dl.href = dl_href
		}

		//生成HTML
		reHTML("#div_List1", "#MB_div_List1", DL);

		//事件绑定
		//$("#MB_div_list1").on("click", "a", function() {

		//})
	}

	function show_DoingList(DL) {
		
		//数据处理 特殊数据处理和生成新数据
		for(var i0 = 0; i0 < DL.length; i0++) {
			var dl = DL[i0];

			//替换新的连接
			var dl_href = "";
			if(dl.ProcessCategory == "合同") {
				dl_href = "pages/pContract/review.html";
			} else if(dl.ProcessCategory == "项目") {
				dl_href = "pages/pProject/projectPreview.html";
			} else if(dl.ProcessCategory == "开发票") {
				dl_href = "pages/pInvoice/InvoiceNewShow.html";
			} else if(dl.ProcessCategory == "发票冲红") {
				dl_href = "pages/pInvoice/InvoiceAtredShow.html";
			} else if(dl.ProcessCategory == "发票作废") {
				dl_href = "pages/pInvoice/InvoiceInvalidShow.html";
			}
			dl.href = dl_href
		}

		//生成HTML
		reHTML("#div_List2", "#MB_div_List1", DL);

	}







	var contractTab01 = bui.slide({
		id: "#uiContractTab01",
		menu: ".bui-nav",
		children: ".bui-tab-main ul",
		scroll: true
	})
	var params = router.getPageParams();
	if(params.Tab01_TabIndex) {
		contractTab01.to(params.Tab01_TabIndex)
	}



	var pageview = {};
	var contractTab;

	// 模块初始化定义
	pageview.init = function() {
		navTab();

	}

	// 底部导航
	function navTab() {

	}

	// 初始化
	pageview.init();

	// 输出模块
	module.exports = pageview;

})

