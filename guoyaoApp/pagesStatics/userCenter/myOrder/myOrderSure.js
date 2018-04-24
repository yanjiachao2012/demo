loader.define(function(require, exports, module) {

	var pageHandler = {};
	var orderTab, orderDialog;
	var $uiOrderTab = $("#uiOrderTab"),
		$orderDialog = $("#orderDialog");


	//初始化事件方法
	pageHandler.init = function() {
		orderTab = bui.slide({
			id: "#uiOrderTab",
			menu: ".bui-nav",
			children: ".bui-tab-main ul",
			scroll: true
		})
		orderDialog = bui.dialog({
			id: '#orderDialog',
			mask: false,
			autoClose: false,
			callback: function(e) {
				console.log(e)
			}
		});


		$uiOrderTab.on("click", '.sure-btn', function() {
			orderDialog.open();
		});
		/*
		 *@param 确定按钮的判断
		 *@param data-clickNum的点击次数 为0则是第一次点击，1则是第二次
		 */
		$orderDialog.on("click", '.sure-btn', function() {
			var _this = $(this),
				clickNum = _this.attr('data-clickNum');
			if (clickNum == '0') {
				$orderDialog.find('.bui-dialog-head').addClass('order-modal-title');
				$orderDialog.find('.bui-dialog-main').hide();
				$orderDialog.find('.cancel-btn').hide();
				_this.attr('data-clickNum', '1')
			} else {
				orderDialog.close();
				_this.attr('data-clickNum', '0')
			}

		});
		$orderDialog.on("click", '.cancel-btn', function() {
			orderDialog.close();
		});


	}

	pageHandler.init();
});