loader.define(function(require, exports, module) {



	var pageview = {};
	var $myOrderDetails = $("#myOrderDetails"),
		$myOrderDetailsPage = $("#myOrderDetailsPage");
	//var myOrderUrl = pathSite + '/guoyao/orderDeatails';
	var myOrderUrl = 'json/myOrderDetails.json';
	var fromType = '';

	var orderId = '';


	//初始化事件方法
	pageview.init = function() {
		/***获取参数***/
		var params = router.getPageParams();
		orderId = params.orderId;
		//使用baidu.template命名空间
		var bt = baidu.template;

		common.dataAjax({
			url: myOrderUrl,
			method: 'get',
			data: {
				orderId: orderId
			}
		}).done(function(res) {
			var data = res.returnValue;

			//最简使用方法
			var html = bt('t:_myorder-1', data);

			//渲染
			document.getElementById('myOrderDetails').innerHTML = html;
		})

		pageview.bind();

		var params = router.getPageParams();

		fromType = params.fromType;


	}

	pageview.bind = function() {

		$("#toBackOrder").on("click", function() {
			if (fromType == "cart") {
				bui.back({
					name: 'main',
					callback: function(res) {
						loader.require(["main"], function(res) {
							var pageTab = res.tab;
							pageTab.to(0, "none");
						})
					}
				})
				/*if (loader.checkLoad(['pages/userCenter/myOrder/myorder'])) {
					bui.back({
						name: 'pages/userCenter/myOrder/myOrder'
					})
				} else {
					bui.load({
						url: 'pages/userCenter/myOrder/myorder.html'
					})
				}*/
			} else {
				bui.back();
			}
		})

		$myOrderDetails.on("click", '.remove-btn', function() {
			bui.confirm({
				content: "确定作废此单吗",
				title: "提示",
				buttons: ["取消", "确定"],
				callback: function() {
					var text = $(this).text();
					if (text == "确定") {
						bui.back();
					}
				}
			})
		});

		$myOrderDetailsPage.on("click", '.buyAgain', function() {
			bui.load({
				url: 'pages/product/productDetails.html',
				param: {
					id: orderId
				}
			})

		});
		$('#myorderSure').on("click", function() {
			hint({
				html: '确认成功',
				position: 'bottom',
				callback: function() {
					bui.alert('我在回调函数')
				}
			})
		})
	}

	loader.import("js/plugins/baiduTemplate.js", function() {

		// 初始化
		pageview.init();

	});

});