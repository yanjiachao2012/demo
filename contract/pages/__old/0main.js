/**
 * �ײ�����TABģ��
 * Ĭ��ģ����: main
 * @return {[object]}  [ ����һ������ ]
 */
loader.define(function(require, exports, module) {

	//��ȡ����
	console.log(getUrlParam("aaa"));

	if(getUrlParam("aaa") == "go") {
		console.log("-");


		router.load({ url: "pages/pContract/review.html", param: { "name": "page2" } })

	}







	_AJget("getTodoCount",
		function(data) {
			$("#T11").html(data.Todo);
			$("#T12").html(data.Doing);
		}
	);



	var pageview = {};
	var contractTab;

	// ģ���ʼ������
	pageview.init = function() {




		navTab();

	}

	// �ײ�����
	function navTab() {

	}

	// ��ʼ��
	pageview.init();

	// ���ģ��
	module.exports = pageview;

})




