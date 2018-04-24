loader.define(function(require, exports, module) {

	var uiSlide, uiCartDialog;
	var pageview = {};

	pageview.bind = function() {
		/**
		 *@param 轮播图
		 ***/
		uiSlide = bui.slide({
			id: "#slide",
			height: 450,
			zoom: 1,
			autoplay: true
		});

		/**
		 *@param 购物车数量
		 *@param 
		 **/
		uiCartDialog = bui.dialog({
			id: "#cartDialog",
			position: 'bottom'
		});

		$("#nowBuy").on("click", function() {
			uiCartDialog.open();
		})
	}
	pageview.bind();

})