loader.define(function(require, exports, module) {

    var pageView = {};

    pageView.bind = function() {
        // 下拉菜单有遮罩的情况
        var uiMask = bui.mask({
            autoTrigger: false,
            appendTo: "#main",
            zIndex: 9
        });

        var uiDropdown1 = bui.dropdown({
            id: "#uiDropdown1",
            width: 270,
            callback: function() {
                console.log(uiDropdown1.value())
            }
        });
        var uiDropdown2 = bui.dropdown({
            id: "#uiDropdown2",
            width: 270,
            callback: function() {
                console.log(uiDropdown2.value())
            }
        });

        // 通过监听事件绑定
        uiDropdown1.on("show", function() {
            uiMask.show();
        });
        uiDropdown1.on("hide", function() {
            uiMask.hide();
        });

        uiDropdown2.on("show", function() {
            uiMask.show();
        });
        uiDropdown2.on("hide", function() {
            uiMask.hide();
        });

        bui.btn({
            id: "#quickOrder",
            handle: ".toLink"
        }).load();
    }
    pageView.bind();


})