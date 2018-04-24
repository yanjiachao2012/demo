loader.define(function(require, exports, module) {


	//接收传过来的ID
	var params = router.getPageParams();
//	console.log(params.WorkItemID);



	$("#btn_agree").on("click", ".disagree", function() {
		goPost("N");
	})
	$("#btn_agree").on("click", ".agree", function() {
		goPost("Y");
	})


	function goPost(IsApprove) {
		var id = params.WorkItemID || "fdada";
		var IsApprove = IsApprove;
		var OpinionMSG = $("#TX_msg").val();



		_AJPost("postApprovalOpinion"
			//string id = obj.ID; //合同ID
			//string IsApprove = obj.IsApprove; //是否審批。 Y为是 ，N为否
			//string OpinionMSG = obj.OpinionMSG; //意见内容
			, JSON.stringify({ id: id, IsApprove: IsApprove, OpinionMSG: OpinionMSG })
			, function(data) {
				var d = data.ApproveState

				//完成提示。
				if(d.ISSave == "OK") {
					bui.alert("提交成功" + d.Msg);
				} else {
					bui.alert("提交失败," + d.Msg);
				}

			}
		);
	
	
	
	}









	






    var pageview = {};


    // 模块初始化定义
    pageview.init = function() {

    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})