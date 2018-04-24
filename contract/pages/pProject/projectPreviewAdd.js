/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {};
    var contractTab;

    // 模块初始化定义
    pageview.init = function() {
        navTab();
    }

    // 底部导航
    function navTab() {
        contractTab = bui.slide({
            id: "#uiContractTab",
            menu: ".bui-nav",
            children: ".bui-tab-main ul",
            scroll: true
        })
    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})