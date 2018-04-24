loader.define(function(require, exports, module) {
    var pageview = {};



	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;


	_AJget("getWorkload"
		, { "contractId": pkID || 1 }
		, function(data) {
			var d = data.Workload

			$("#sT01").html(d.WorkloadALL);  //   //预算总工作量
			$("#sT02").html(d.WorkloadIn);  //   //预算工作量(内部)
			$("#sT03").html(d.WorkloadOut);  //   //预算工作量(外包)
			$("#sT04").html(d.WorkloadAssessment);  //   //考核工作量
			$("#sT05").html(d.WorkloadProportion);  //   //预算工作量占比

		}
	);


















    // 模块初始化定义
    pageview.init = function() {

    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})