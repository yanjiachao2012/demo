loader.define(function(require, exports, module) {

	var pageview = {};

	var payTab;

	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;




	_AJget("getContractInfo"
		, { "contractId": pkID || 1 }
		, function(data) {
			//待处理事件。
			show_List1(data.ContractInfo);


		}
	);
	function show_List1(DL) {



		//生成HTML
		//reHTML("#bui-nav1", "#MB_bui-nav1", DL);

		//

		var can = "#div_List01", MB = "#MB_div_List01", data = DL;
		var cc_0 = $(can);
		cc_0.empty();

		MB_body = $(MB);

		for(var i0 = 0; i0 < data.length; i0++) {
			var d = data[i0];
			//获取模版
			var cc = MB_body.children().eq(d.ProceedsIsReceived =="已收"?0:1).clone();


			cc.find(".sT01").html(d.ProceedsAccrualDate); //应收日期
			cc.find(".sT02").html(d.ProceedsPhase); //收款阶段
			cc.find(".sT03").html(d.ProceedsCollection); //收款条件
			cc.find(".sT04").html(d.ProceedsPlan); //计划收款金额
			cc.find(".sT05").html(d.ProceedsProportion); //占合同金额比例
			cc.find(".sT06").html(d.ProceedsIsImplementation); //是否实施
			cc.find(".sT07").html(d.ProceedsIsReceived); //收款情况

			cc_0.append(cc);
		}

	}



    // 模块初始化定义
    pageview.init = function() {

    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})