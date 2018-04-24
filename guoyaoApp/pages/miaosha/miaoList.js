loader.define(function(require, exports, module) {

    var pageview = {};

    function bind() {
        $(".toCart").on("click", function() {
            if (userobj.cstid == null) {
                common.isLogin('cart')
            } else {
                bui.back({
                    name: 'main',
                    callback: function() {
                        loader.require(["main"], function(res) {
                            var pageTab = res.tab;
                            pageTab.to(3, "none");
                        })
                    }
                })
            }

        });
        /**
         *@param 轮播图
         ***/
        var uiSlide = bui.slide({
            id: "#miaoshaSlide",
            height: 220,
            zoom: 1,
            autoplay: true
        });
    }

    pageview.init = function() {
        bind();
    }

    // 初始化
    pageview.init();

})