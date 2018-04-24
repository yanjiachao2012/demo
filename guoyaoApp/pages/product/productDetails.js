loader.define(function(require, exports, module) {

    var productSlide, uiCartDialog;
    var pageview = {};

    var currentPage = router.currentPage();
    console.log(currentPage)

    $(currentPage).on("click", function(e) {
        console.log(this.id);
    })

    $(".toback", currentPage).on("click", function(e) {
        console.log(this);
    })

    pageview.bind = function() {
        // 数量选择器
        var productNumber = bui.number({
            id: $(".bui-number", currentPage),
            value: 1,
            min: 1,
            callback: function() {
                var price = $(".select-price .total-price").text();
                price = parseFloat(price) * productNumber.value();
                $(".select-price .total-price").text(price.toFixed(2))
            }
        });

        /***促销信息折叠菜单**/
        var uiAccordion = bui.accordion({
            id: $(".bui-accordion", currentPage)
        });
        uiAccordion.show();

        /**
         *@param 购物车数量
         *@param 
         **/
        uiCartDialog = bui.dialog({
            id: $(".bui-dialog", currentPage),
            position: 'bottom',
            autoClose: true
        });

        $("#nowBuy").on("click", function() {
            uiCartDialog.open();
        })

        $("#join-cart").on("click", function() {
            hint({
                html: "已加入购物车",
                position: "center"
            });
        });

        $('.sure-btn').on("click", function() {
            router.load({
                url: 'pages/userCenter/myOrder/myOrderSure.html'
            })
        })

        // 收藏按钮
        $(".pdetails-footer .collect-icon").parent().on("click", function() {
            if ($(".pdetails-footer .collect-icon").css("background-image") == 'url("images/icon-heart.png")') {
                $(".pdetails-footer .collect-icon").css("background-image", 'url("images/icon-heart-gray.png")');
                hint({
                    html: "已取消收藏",
                    position: "center"
                });
                $(".pdetails-footer .collect-tip").text("收藏");
            } else {
                $(".pdetails-footer .collect-icon").css("background-image", 'url("images/icon-heart.png")');
                hint({
                    html: "已收藏",
                    position: "center"
                });
                $(".pdetails-footer .collect-tip").text("取消收藏");
            }
        });
        $(".toback", currentPage).on("click", function() {
            //productSlide = null;
            bui.back();
        });
    }

    var pageParams = router.getPageParams();
    bui.ajax({
        url: "json/product.json",
        data: pageParams, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        loadPage(result.data);
        pageview.bind();
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });

    function loadPage(data) {
        $(".short-details .title").text(data.goodsName || "暂无");
        $("#cartDialog .select-title").text(data.goodsName || "暂无");
        $("#cartDialog .pic").attr("src", data.goodsImg[0].url);
        $(".short-details .info").text(data.goodsDosage || "暂无");
        $(".short-details .p-int").text((parseFloat(data.goodsPrice)).toFixed(2));
        $("#goodsCode .item-right").text(data.goodsCode || "暂无");
        $("#goodsName .item-right").text(data.goodsName || "暂无");
        $("#goodsProducer .item-right").text(data.goodsProducer || "暂无");
        $("#goodsSpec .item-right").text(data.goodsSpec || "暂无");
        $("#goodsMsunitno .item-right").text(data.goodsMsunitno || "暂无");
        $("#goodsPackNum .item-right").text(data.goodsPackNum || "暂无");
        $(".select-price .total-price").text((parseFloat(data.goodsPrice)).toFixed(2));
        if (data.isCollect) {
            $(".pdetails-footer .collect-icon").css("background-image", 'url("images/icon-heart.png")');
        }

        var html = "";
        $.each(data.goodsImg, function(i, el) {
            html += '<li><img src="' + el.url + '" alt="" data-id="' + el.id + '"></li>'
        });
        $("#productSlide .bui-slide-main ul", currentPage).append(html);

        $("#productSlide .number", currentPage).eq(1).text(data.goodsImg.length);
        /**
         *@param 轮播图
         ***/
        productSlide = bui.slide({
            id: $(".bui-slide", currentPage),
            height: 450,
            zoom: 1,
            autoplay: true
        });

        productSlide.on("to", function(index) {
            console.log(productSlide.index())
            $(".bui-slide .number", currentPage).eq(0).text(productSlide.index() + 1);
        });
        //productSlide = null;

    }

})