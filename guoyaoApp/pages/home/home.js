loader.define(function(require, exports, module) {
    var pageview = {}; // 页面模块
    var $searchHome = $("#searchHome");

    pageview.bind = function() {
        /***
         *跳去搜索页面
         ***/
        $("#searchHome").on('click', function() {
            bui.load({
                url: 'pages/search/search.html'
            })

        })
        $(".toUser").on("click", function() {
            loader.require(["main"], function(res) {
                var pageTab = res.tab;
                pageTab.to(4, "none");
            })

        });
        //跳转到我的订单方法
        $('#myOrder').on('click', function() {
            console.log('1')
            if (userobj.cstid == null) {
                common.isLogin('myOrder');
            } else {
                bui.load({
                    url: 'pages/userCenter/myOrder/myOrder.html'
                })
            }
        })
        /**
         *@param 轮播图
         ***/
        uiSlide = bui.slide({
            id: "#homeSlide",
            height: 220,
            zoom: 1,
            autoplay: true
        });

        /**
         *@param 扫码功能的实现
         *@param 
         **/
        $("#scanCode").on("click", function() {
            app.barcode.scan(function(result) {
                bui.alert(result)
            }, function(result) {
                // app.alert(result);
            });
        })

        $(".backTop").on('touchstart', function(e) {
            $('#header')[0].scrollTop = 0
        });



    }

    // 页面初始化
    pageview.init = function() {
        pageview.bind();
    }
    // 初始化
    pageview.init();



    // 输出模块
    module.exports = pageview;
})


onerror = handleErr;

function handleErr(msg, url, line, colno, error) {
    var txt = '';
    txt += "Error: " + msg + "\n"
    txt += "URL: " + url + "\n"
    txt += "Line: " + line + "\n\n"
    txt += "col: " + colno + "\n\n"
    txt += "error: " + error + "\n\n"
    txt += "Click OK to continue.\n\n"
    console.log(txt)
    return true
}

window.onload = function() {
    setTimeout(function() {
        throw new Error
    }, 1000)

}
/*setTimeout(function() {
    throw new Error
}, 1000)*/