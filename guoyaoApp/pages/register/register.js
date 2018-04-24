// 默认已经定义了main模块
loader.define(function() {

    var pageview = {};
    var $stepProcess = $("#stepProcess"),
        $processPart = $stepProcess.find('.process-part'),
        $stepFirst = $("#step-first"),
        $stepSecond = $("#step-second"),
        $stepThird = $("#step-third"),
        $prev = $("#prev"),
        $next = $("#next");
    var currentIndex = 0;

    // 主要业务初始化
    pageview.init = function() {
        // 这里写main模块的业务
        console.log("register.js was loaded");

    }

    // 事件绑定
    pageview.bind = function() {
        $prev.on("click", function() {
            if (currentIndex == 0) {
                bui.back();
                return;
            }
            if (currentIndex == 1) {
                currentIndex = 0;
                $(this).text('取消');
                $next.text('下一步')
                $stepSecond.hide();
                $stepFirst.show();
                $processPart.removeClass('active-process').eq(currentIndex).addClass('active-process');
            }
        });
        $next.on("click", function() {
            if (currentIndex == 0) {
                currentIndex = 1;
                $prev.text('上一步');
                $(this).text('提交审核')
                $stepFirst.hide();
                $stepSecond.show();
                $processPart.removeClass('active-process').eq(currentIndex).addClass('active-process');
                return;
            }
            if (currentIndex == 1) {
                currentIndex = 2;
                $stepSecond.hide();
                $stepThird.show();
                $(".register-page-footer").hide();
                $processPart.removeClass('active-process').eq(currentIndex).addClass('active-process');
            }
        })


    }

    // 初始化
    pageview.init();
    // 绑定事件
    pageview.bind();

    return pageview;
})