loader.define(function(require, exports, module) {



    var pageview = {}, // 页面模块
        uiSlide; // 焦点图控件;

    // 页面初始化
    pageview.init = function() {

        // 初始化焦点图
        uiSlide = bui.slide({
            id: "#tabSlideImg",
            height: 200,
            autoplay: true,
            autopage: true,
            zoom: true
        })

        $("#toUser").on("click", function() {
            loader.require(["main"], function(res) {
                var pageTab = res.tab;
                pageTab();
            })
        })

    }
    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;
})