/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {
    var tab;
    var pageview = {};

    // 模块初始化定义
    pageview.init = function() {
        pageview.navTab();
    }

    // 底部导航
    pageview.navTab = function() {
        var winHeight = $(window).height();
        //按钮在tab外层,需要传id
        tab = bui.slide({
            id: "#tabDynamic",
            menu: "#tabDynamicNav",
            children: ".bui-tab-main ul",
            height: winHeight,
            swipe: false,
            scroll: true,
            animate: false,
            // 1: 声明是动态加载的tab
            autoload: true,
        })
        // 2: 监听加载后的事件, load 只加载一次
        tab.on("load", function(res) {
            var index = $(this).index();
            switch (index) {
                case 0:
                    loader.require(["pages/home/home"])
                    break;
                case 1:
                    loader.require(["pages/sort/sort"])
                    break;
                case 2:
                    loader.require(["pages/main/photo"])
                    break;
                case 3:
                    loader.require(["pages/main/setting"])
                    break;
                case 4:
                    loader.require(["pages/userCenter/userIndex"])
                    break;
                default:
                    break;
            }
        })
    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})