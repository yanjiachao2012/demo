loader.define(function(require, exports, module) {



    var pageview = {};

    // var myOrderUrl = pathSite + '/guoyao/orderSure';
    var myOrderUrl = 'json/orderSure.json';

    var orderId = '';


    //初始化事件方法
    pageview.init = function() {
        /***获取参数***/
        var params = router.getPageParams();
        orderId = params.orderId;
        //使用baidu.template命名空间
        var bt = baidu.template;

        common.dataAjax({
            url: myOrderUrl,
            method: 'get',
            data: {
                orderId: orderId
            }
        }).done(function(res) {
            var data = res.returnValue;
            //最简使用方法
            var html = bt('t:_myordersure-1', data);

            //渲染
            document.getElementById('myorderPageSure').innerHTML = html;
            var sum = 0;
            res.returnValue.orderList.map(function(item) {
                return sum += item.qutity * item.PRICE
            })

            $("#orderSureTotal").text('￥' + sum)
        })

        pageview.bind();

    }
    pageview.bind = function() {

        $("#orderSureSubmit").on("click", function() {
            var loading = bui.loading();
            loading.show();
            common.dataAjax({
                url: myOrderUrl,
                method: 'get',
                data: {

                }
            }).done(function(res) {
                loading.hide();
                bui.load({
                    url: 'pages/userCenter/myOrder/myOrderDetails.html',
                })
            });

        });

        $("#myorderPageSure").on("click", ".user-info", function() {
            router.load({
                url: "pages/userCenter/address/addressSelect.html",
                param: {
                    isSelect: true
                }
            })
        })

    }

    pageview.setLocation = function(addr) {
        $("#myorderPageSure .user-info .span1").html('<h3 class="user">' +
            addr.name + '<span class="phone">' + addr.tel + '</span>' + (addr.isDefault ? '<i class="default-address">默认</i></h3>' : '</h3>') + '<p class="address">' + addr.address + '</p>')
    }

    loader.import("js/plugins/baiduTemplate.js", function() {

        // 初始化
        pageview.init();

    });

    return pageview;

});