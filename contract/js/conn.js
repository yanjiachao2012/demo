//常量集合
//var service_location = "http://10.200.54.222:8082/";
var service_location = "https://itt.bingosoft.net/CCMMobile/";
//var service_location = "http://10.200.40.24:8023/CCM/";


///路由表
var service_controller_F1 = "api/CommonMobileService/"; //目录1

var List_service_controller_action = {
	getTodoCount: service_controller_F1 + "getTodoCount",
	getTodoList: service_controller_F1 + "getTodoList",
	getDoingList: service_controller_F1 + "getDoingList",
	getReview: service_controller_F1 + "getReview",
	getReviewProfit: service_controller_F1 + "getReviewProfit",
	getIncomeSummary: service_controller_F1 + "getIncomeSummary",
	getIncomeSummaryOrder: service_controller_F1 + "getIncomeSummaryOrder",
	getSpendingSummary: service_controller_F1 + "getSpendingSummary",
	getWorkload: service_controller_F1 + "getWorkload",
	getContractInfo: service_controller_F1 + "getContractInfo",
	getProjectList: service_controller_F1 + "getProjectList",
	getProjectProfit: service_controller_F1 + "getProjectProfit",
	getProjectPreview: service_controller_F1 + "getProjectPreview",
	getUnsurePreview: service_controller_F1 + "getUnsurePreview",
	getKnownPreview: service_controller_F1 + "getKnownPreview",
	postApprovalOpinion: service_controller_F1 + "postApprovalOpinion",
	getUser: service_controller_F1 + "getUser",
	postLogin: service_controller_F1 + "Login",
	getLogout: "account/LogOff"
}



///函数集合


//从服务获得数据
function _AJget(service_controller_actionName, JSONorFn, OkFn, ErrFn) {

	var service_controller_action = List_service_controller_action[service_controller_actionName];

	//console.log(typeof (JSONorFn));
	if (typeof(JSONorFn) === "object")
		_AJx(service_controller_action, JSONorFn, OkFn, ErrFn);
	else if (typeof(JSONorFn) === "function")
		_AJx(service_controller_action, {}, JSONorFn, OkFn);
}
var ivvv = 0;
var loading_show = 0;
var bui_loading = bui.loading(); //初始化 半透明的 loading 层
function _AJx(service_controller_action, JSON, OkFn, ErrFn) {

	var default_ErrFn = function(textStatus, errorThrown) {
		alert(textStatus + errorThrown);
		console.log("系统ajax交互错误: " + textStatus);
		//关闭进度条
		bui_loading.hide();
	}

	bui_loading.show();
	// 开启进度条
	if (!loading_show) {
		bui_loading.show();
	}
	loading_show++;
	//alert(++ivvv + " -" + 1 + "-" + service_controller_action);
	console.log(service_location + service_controller_action + JSON);

	$.ajax({
		url: service_location + service_controller_action,
		type: "GET",
		data: JSON,
		crossDomain: true,
		dataType: 'json' //json  text
			,
		success: function(data) {
			OkFn(data);
			//关闭进度条
			loading_show--;
			if (!loading_show) {
				bui_loading.hide();
			}
			//alert(++ivvv + " -" + 2 + "-" + service_controller_action);
			//setTimeout(function(){ bui.loading().hide(); }, 80);
		},
		error: ErrFn || default_ErrFn
	});

}

function _AJPost(service_controller_actionName, JSON, OkFn, ErrFn) {
	var service_controller_action = List_service_controller_action[service_controller_actionName];


	var default_ErrFn = function(textStatus, errorThrown) {
		console.log("系统ajax交互错误: " + textStatus);
		//关闭进度条
		bui.loading().hide();
	}


	// 开启进度条
	bui.loading().show();


	$.ajax({
		url: service_location + service_controller_action,
		type: "post",
		data: JSON //JSON.stringify(
			,
		crossDomain: true,
		contentType: 'application/json',
		dataType: 'json' //json  text
			,
		success: function(data) {
			//关闭进度条
			bui.loading().hide();
			//setTimeout(function(){ bui.loading().hide(); }, 80);
			OkFn(data);
			console.log(data);


		},
		error: ErrFn || default_ErrFn
	});



}



////用法
//var _service_controller_action = "Test/getTodoCount";
//var _josn = { aa: "cc" };
//_AJget(
//	_service_controller_action,
//	_josn,
//	function(data) {

//	},
//	function(textStatus, errorThrown) {

//	}
//);


//替换文字
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}



/// 把 数据 按 模版 添加到容器里面去。
/// 容器，模版， 数据
function reHTML(can, MB, data) {



	var cc_0 = $(can);
	cc_0.empty();

	MB_body = $(MB);

	for (var i0 = 0; i0 < data.length; i0++) {
		var dl = data[i0];


		//获取模版
		//var cc = MB_body.find(">div:first-child").clone();
		//var cc = MB_body.children().eq(0).clone();
		var cc = MB_body.eq(0).clone();
		var CC_HMTL = cc.html();



		//替换所有的 [项目] 为实际需要的值。
		for (var key in dl) {
			//CC_HMTL = CC_HMTL.replaceAll("\\[ContactName\\]", data.DoingList[i0].ContactName);
			//console.log(key + '=' + dl[key]);
			CC_HMTL = CC_HMTL.replaceAll("\\[" + key + "\\]", dl[key]);
		}

		cc_0.append(CC_HMTL);
	}

}


//去掉逗号
String.prototype.suigun = function() {
	return (this + "").replace(/,/g, "") - 0;
}



//数字每三位加逗号。
function addCommas(num) {

	　　
	var string = num + ''; //将数字转换成字符串形式

	　　
	var arr = string.split('.'); //分割逗号;

	　　
	var num1 = arr[0];

	　　
	var num2 = arr[1] ? '.' + arr[1] : ''; //若有小数则添加逗号，若没有则设置为成两位小数；

	　　
	var reg = /(\d+)(\d{3})/;

	while (reg.test(num1)) {

		num1 = num1.replace(reg, '$1' + ',' + '$2')

		　　
	}

	　　
	return num1 + num2;

}



//获取url参数  
var getUrlParam = function(name) {

	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象  

	var r = window.location.search.substr(1).match(reg); //匹配目标参数  

	if (r != null) return unescape(r[2]);
	return null; //返回参数值  
}