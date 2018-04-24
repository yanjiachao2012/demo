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

        navTab();
    }

    // 底部导航
    function navTab() {
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
        // 2: 监听加载后的事件, load 只加载一次


        tab.on("to", function(res) {
            var index = $(this).index();
            //var bool = loader.checkLoad();
            //console.log(bool)
            switch (index) {
                case 0:
                    if (loader.checkLoad(["pages/home/home"])) {
                        return;
                    } else {
                        loader.require(["pages/home/home"])
                    }
                    break;
                case 1:
                    if (loader.checkLoad(['pages/sort/sort'])) {
                        return;
                    } else {
                        loader.require(["pages/sort/sort"])
                    }

                    break;
                case 2:
                    break;
                case 3:
                    if (userobj.cstid == null) {
                        common.isLogin('cart');
                        return;
                    }
                    if (loader.checkLoad(['pages/cart/cart'])) {
                        loader.require(["pages/cart/cart"], function(res) {
                            res.cartInit();
                        })
                        return;
                    } else {
                        loader.require(["pages/cart/cart"])
                    }

                    break;
                case 4:
                    if (userobj.cstid == null) {
                        common.isLogin('userIndex');
                        return;
                    }
                    if (loader.checkLoad(['pages/userCenter/userIndex'])) {
                        console.log('1')
                        loader.require(["pages/userCenter/userIndex"], function(res) {
                            res.initLogin();
                        })
                        return;
                    } else {
                        console.log('2')
                        loader.require(["pages/userCenter/userIndex"])
                    }

                    break;
                default:
                    break;
            }
        });
        tab.to(0); //切换到第一个tab
    }

    // 初始化
    pageview.init();
    pageview.tab = tab;

    // 输出模块
    module.exports = pageview;

})