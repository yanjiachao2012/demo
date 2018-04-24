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

        //按钮在tab外层,需要传id
        pageview.tab();
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
                    break;
                case 3:
                    break;
                case 4:
                    loader.require(["pages/userCenter/userIndex"])
                    break;
                default:
                    break;
            }
        })
    }
    pageview.tab = function(index) {
        var winHeight = $(window).height() - $('footer').height();
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
        tab.to(index)
    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})