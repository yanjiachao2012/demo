
loader.define(function(require, exports, module) {
	var pageview = {};

	var current = router.currentPage();
	//接收传过来的ID
	var params = router.getPageParams();
	var pkID = params.pkID;




	function Kc_getUer() {
		_AJget("getUser"
			, function(data) {
				$(".sT01", current).html(data.Id);
				$(".sT02", current).html(data.LoginId);
				$(".sT03", current).html(data.Name);
			}
		);	
	}

	Kc_getUer();

	var LKgetLoginInfo = {};

	var userId = "";
	app.link = app.link || {};
	if(app.link.getLoginInfo) {
		app.link.getLoginInfo(function(result) {
			LKgetLoginInfo = (result);
			userId = result.userId;
		});


	}

	


	var LK_UserInfo = {};

	if(app.link.getUserInfo) {

		app.link.getUserInfo(function(result) {
			LK_UserInfo = result
		},
		function(error) {
			app.alert(error);
		},
			userId
		);
	}





	var strLKgetLoginInfo = JOSNtoStrx(LKgetLoginInfo);
	var strLK_UserInfo = JOSNtoStrx(LK_UserInfo);





	$(".sT21", current).html(strLKgetLoginInfo + " - " + userId+ " - " + strLK_UserInfo);





	function JOSNtoStrx(json) {
		var str = "";
		for(var k in json) {
			//遍历对象，k即为key，obj[k]为当前k对应的值
			str += k + ":";
			str += json[k] + ",";
		}

		return str;
	}








	$(document).on('click', '#Bgo_connerPage', function() {
		goPost();
	});




	function goPost() {

		var v_LoginId = $("#Tna_connerPage").val();
		var v_Password = $("#Tpw_connerPage").val();



		if(v_LoginId == "") {
			//注销登陆
			_AJget("getLogout"
				, function(data) {
					//bui.alert("成功" + d.Msg);
					Kc_getUer();
				}
				, function(data) {
					//bui.alert("成功" + d.Msg);
					Kc_getUer();
				}
			);

		
			return;
		}



		_AJPost("postLogin"

			, JSON.stringify({ LoginId: v_LoginId, Password: v_Password})
			, function(data) {
				var d = data.ApproveState

				//完成提示。
				if(d.Code == "OK") {
					//bui.alert("成功" + d.Msg);
					Kc_getUer();
				} else {
					//bui.alert("失败," + d.Msg);
				}

			}
		);





	}























	var contractTab;

	// 模块初始化定义
	pageview.init = function() {

	}


	// 初始化





	// 输出模块
	module.exports = pageview;

})