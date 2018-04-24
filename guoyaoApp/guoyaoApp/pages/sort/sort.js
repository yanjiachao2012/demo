loader.define(function(require, exports, module) {


	// 绑定事件
	bind();

	// 事件类定义
	function bind() {
		// 绑定页面的所有按钮有href跳转
		bui.btn({
			id: "#sortPage",
			handle: ".toLink"
		}).load();

	}

})