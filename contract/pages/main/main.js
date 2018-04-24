
var User_userId = "";
app.link = app.link || {};
if(app.link.getLoginInfo) {
	app.link.getLoginInfo(function(result) {
		User_userId = result.userId;

	});
}
var User_loginId = "";
if(app.link.getUserInfo) {
	app.link.getUserInfo(function(result) {
			User_loginId = result.loginId;
		}
		,function(error) {
			//app.alert(error);
		}
		,User_userId
	);
}


	












loader.define(function(require, exports, module) {

	//获取参数
	console.log(getUrlParam("aaa"));

	///聆客 服务器号消息发送成功后 回调入合同系统指定的页面。
	if(getUrlParam("aaa") == "go") {
		console.log("-");


		router.load({ url: "pages/pContract/review.html", param: { "name": "page2" } })

	}




	

	//if(User_loginId != "") {
	//	_AJPost("postLogin"

	//		, JSON.stringify({ LoginId: User_loginId, Password: "" })
	//		, function(data) {
	//			var d = data.ApproveState

	//			//完成提示。
	//			if(d.Code == "OK") {
	//				//bui.alert("成功" + d.Msg);

	//				//get1();
	//				//get2();


	//			} else {
	//				//bui.alert("失败," + d.Msg);
	//			}

	//		}
	//	);

	//} else {
	//	//get1();
	//	//get2();
	//}

	get1();
	get2();





	//get1();
	//get2();
	function get1() {
	_AJget("getTodoCount",
		function(data) {
			$("#T11").html(data.Todo);
			$("#T12").html(data.Doing);
			
		}
	);
	}



	function get2() {
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
		for(var i0 = 0; i0 < DL.length; i0++) {
			var dl = DL[i0];

			//替换新的连接
			var dl_href = "";
			var dl_href = "";
			if(dl.ProcessCategory == "合同") {
				dl_href = "pages/pContract/review.html";
			} else if(dl.ProcessCategory == "项目") {
				dl_href = "pages/pProject/projectPreview.html";
			} else if(dl.ProcessCategory == "新开发票") {
				dl_href = "pages/pInvoice/InvoiceNewShow.html";
			} else if(dl.ProcessCategory == "发票冲红") {
				dl_href = "pages/pInvoice/InvoiceAtredShow.html";
			} else if(dl.ProcessCategory == "发票作废") {
				dl_href = "pages/pInvoice/InvoiceInvalidShow.html";
			}
			dl.href = dl_href;
		}

		//生成HTML
		reHTML("#div_List1", "#MB_div_List1", DL);

		//事件绑定
		//$("#MB_div_list1").on("click", "a", function() {

		//})
	}

	function show_DoingList(DL) {


		DL.push({
			"WorkItemID": "ba6ffc6b-7f4e-4b1b-935d-0cbb326784cb", "ProcInstId": "35d0da92-9e17-4505-8daf-d68ad0480306"
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




		//数据处理 特殊数据处理和生成新数据
		for(var i0 = 0; i0 < DL.length; i0++) {
			var dl = DL[i0];
			//替换新的连接
			var dl_href = "";
			if(dl.ProcessCategory == "合同") {
				dl_href = "pages/pContract/review.html";
			} else if(dl.ProcessCategory == "项目") {
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
		reHTML("#div_List2", "#MB_div_List1", DL);

	}

	}







	//待办 进行中 页

	var contractTab01 = bui.slide({
		id: "#uiContractTab01",
		menu: ".bui-nav",
		children: ".bui-tab-main ul",
		scroll: true
	})
	//var params = router.getPageParams();
	//if(params.Tab01_TabIndex) {
	//	contractTab01.to(params.Tab01_TabIndex)
	//}











	///多击事件
	var Kconner_count = 0;
	var Kconner_TimeoutOBJ;

	$(document).on('click', '.spT0000', function() {
		clearTimeout(Kconner_TimeoutOBJ);
		
		//点击4次
		if(Kconner_count > 2) {
			Kconner_count = 0;
			router.load({ url: "pages/main/connerPage.html", param: { "source": "v" } })
			return;
		}
		Kconner_count++;
		Kconner_TimeoutOBJ = setTimeout(function() { 
			Kconner_count = 0;
		}, 300);

	});















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




