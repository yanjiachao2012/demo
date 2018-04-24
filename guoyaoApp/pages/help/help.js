loader.define(function(require, exports, module) {
	// 列表切换
	var tab = bui.slide({
		id: "#tabHelp",
		menu: "#navHelp",
		children: ".bui-tab-main ul",
		scroll: true
	})

	tab.on("to", function(index) {

		var left = $("#navHelp li")[index].offsetLeft;
		document.getElementById("navHelp").scrollLeft = left;
	})
})