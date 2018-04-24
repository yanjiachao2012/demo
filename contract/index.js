//跳转去下一个页面

//bui.isWebapp = false;

//bui.ready(function() {


//})



window.router = bui.router();

bui.on("pageinit", function() {

	// 初始化路由
	router.init({
		id: "#bui-router",
		effect: "fadein",
		// reloadCache: false  测试的时候方便刷新页面，这时候返回按钮失效，打包的时候要改为true或删除
		//reloadCache: true
	})



	// 绑定事件
	bind();

	// 事件类定义
	function bind() {
		// 绑定页面的所有按钮有href跳转
		bui.btn({
			id: "#bui-router",
			handle: ".bui-btn,.to-link"
		}).load();

		// 统一绑定页面所有的后退按钮
		$("#bui-router").on("click", ".btn-back", function(e) {
			// 支持后退多层,支持回调
			bui.back();
		})
	}


});