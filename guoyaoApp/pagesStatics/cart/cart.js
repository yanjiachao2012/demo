loader.define(function(require, exports, module) {
    var pageview = {};
    var cartLoading = bui.loading({
        autoClose: true
    });
    cartLoading.start();

    var numList = new Array();
    var numWidget = new Array();

    var selectList = new Array();
    var goodsList = new Array();

    var numIndex = 0;

    // 商品总价
    var totalPrice = 0.0;
    var totalSelect = 0;
    var $cartPage = $('#cartPage');
    var listHeight = $(window).height() - $cartPage.find('.common-header').height() - $cartPage.find('.select-panel').height() - $('footer').height();
    // 初始化
    var uilist = bui.list({
        id: "#scrollCart",
        url: "json/cart.json",
        field: {
            data: "data.data"
        },
        height: listHeight,
        data: {},
        template: template,
        onLoad: function() {
            bind();

            cartLoading.stop();

        },
        callback: function() {},
        onRefresh: function() {
            bind();
            $("input.selectAll").prop("checked", false);
            getCount();
        }
    });

    // 生成模板
    function template(data) {
        var html = "";

        $.each(data, function(index, el) {
            html += '<li class="bui-btn goods-item" data-id="' + el.id + '">';
            html += '    <div class="bui-panel">';
            html += '        <div class="bui-panel-head">';
            html += '           <div class="h-sale">';
            if (el.discount) {
                html += '               <div class="hs-category">满减</div>';
                html += '               <div class="hs-content bui-text-hide">' + el.discount + '</div>';
            }
            html += '           </div>';
            html += '           <div class="h-join" href="http://www.baidu.com">去凑单<i class="icon-next"></i></div>';
            html += '        </div>';
            html += '        <div class="bui-panel-main">';
            html += '            <div>';
            html += '                <input type="checkbox" class="bui-choose">';
            html += '            </div>';
            html += '            <div class="nail" style="background: url(' + el.imgSmall + ') no-repeat;background-size: contain;"></div>';
            html += '            <div class="item-msg">';
            html += '               <div class="im-head bui-text-hide">' + el.drugname + '</div>';
            html += '               <div class="im-main bui-text-hide">规格：<span>' + el.spec + '</span></div>';
            html += '               <div class="im-foot">';
            html += '                   <div class="if-price" data-price="' + el.sale[0].price + '">';
            html += '                       <span class="unit">¥</span><span class="int">' + parseInt(el.sale[0].price) + '</span><span class="decimal">.</span><span class="float">' + ((parseFloat(el.sale[0].price)).toFixed(2) + "").split('.')[1] + '</span>';
            html += '                   </div>';
            html += '                   <div class="if-counter">';
            html += '                       <div id="' + ("number" + numIndex) + '" class="bui-number"></div>';
            numList.push("number" + numIndex);
            html += '                   </div>';
            html += '               </div>';
            html += '            </div>';
            html += '        </div>';
            html += '        <div class="bui-panel-foot">';
            html += '           <div class="sale-category">';
            html += '               <div class="sc-type">促销</div><div class="bui-select sc-content bui-text-hide" id="select' + numIndex + '" value="' + (el.sale.length > 0 ? el.sale[0].value : "") + '">' + (el.sale.length > 0 ? el.sale[0].name : "无促销活动") + '</div>';
            selectList.push({
                name: "select" + numIndex,
                data: el.sale
            });
            numIndex++;
            html += '           </div>';
            html += '           <div class="enable-choose">' + el.sale.length + '个可选</div>';
            html += '        </div>';
            html += '    </div>';
            html += '</li>';

        });

        return html;
    }

    // 事件类定义
    function bind() {

        // 初始化
        $.each(numList, function(i, el) {
            numWidget.push(bui.number({
                id: '#' + el,
                value: 1,
                min: 1,
                callback: function() {
                    var $this = $("#" + el).parent().parent().parent().parent();
                    $($this).find("input[type=checkbox]").prop("checked", true);
                    getCount();
                }
            }));

            // if(selectList[i].data.length == 0){
            //  return true;
            // }
            // goodsList.push(bui.select({
            //     trigger: "#"+selectList[i].name,
            //     type: "radio",
            //     data: selectList[i].data,
            //     autoClose: true
            // }))
        })
        //获取值
        // uiNumber.value();

        var cartSelect = bui.select({
            // trigger: "#" + selectList[0].name
            type: "radio",
            height: 210,
            autoClose: true
        });
        // cartSelect.active(0);

        // 选择促销的时间绑定
        $(".bui-panel-foot .bui-select").off("click");
        $(".bui-panel-foot .bui-select").on("click", function() {
            var data, $this = $(this);
            $.each(selectList, function(i, el) {
                if (el.name == $($this).attr("id")) {
                    data = el.data;
                }
            })
            // var items = new Array();
            // $.each(data, function(i, el) {
            //     items.push({ "value": el.value, "name": el.name });
            // })

            if (data && data.length > 0) {
                cartSelect.option({
                    // trigger: "#" + $($this).attr("id"),
                    data: data,
                    onChange: function(index) {
                        $($this).text(cartSelect.text());
                        $($this).attr("value", cartSelect.value());
                        var price = 0;
                        $.each(data, function(i, el) {
                            if (el.value == cartSelect.value()) {
                                price = el.price;
                            }
                        })
                        $($this).parent().parent().parent().find(".if-price").attr("data-price", price);
                        $($this).parent().parent().parent().find(".if-price .int").text(parseInt(price));
                        $($this).parent().parent().parent().find(".if-price .float").text(((parseFloat(price)).toFixed(2) + "").split('.')[1]);
                        getCount();
                    }
                })
                cartSelect.value($($this).attr("value"));
                cartSelect.show();
            }
        });

        // 凑单、详情、结算按钮的时间绑定
        $(".bui-panel-head .h-join").off("click");
        $(".bui-panel-head .h-join").on("click", function() {
            router.load({
                url: "pages/quickOrder/order.html",
                param: {
                    id: $(this).parent().parent().parent().data("id")
                }
            });
        })

        $(".bui-panel-main .nail").off("click");
        $(".bui-panel-main .nail").on("click", function() {
            router.load({
                url: "pages/product/productDetails.html",
                param: {
                    id: $(this).parent().parent().parent().data("id")
                }
            });
        })

        $(".bui-panel-main .im-head").off("click");
        $(".bui-panel-main .im-head").on("click", function() {
            router.load({
                url: "pages/product/productDetails.html",
                param: {
                    id: $(this).parent().parent().parent().parent().data("id")
                }
            });
        })

        $(".bui-panel-main .im-main").off("click");
        $(".bui-panel-main .im-main").on("click", function() {
            router.load({
                url: "pages/product/productDetails.html",
                param: {
                    id: $(this).parent().parent().parent().parent().data("id")
                }
            });
        })

        $(".bui-panel-main .if-price").off("click");
        $(".bui-panel-main .if-price").on("click", function() {
            router.load({
                url: "pages/product/productDetails.html",
                param: {
                    id: $(this).parent().parent().parent().parent().parent().data("id")
                }
            });
        })

        $(".pay-btn").off("click");
        $(".pay-btn").on("click", function() {
            if (totalSelect == 0) {
                bui.alert("未选择购买商品！");
                return;
            }
            router.load({
                url: "pages/userCenter/myOrder/myOrderSure.html",
                param: {
                    goodsMsg: goodsList
                }
            });
        })

    }

    // 绑定编辑按钮事件
    $(".select-panel").on("click", ".edit", function() {
        $(this).css("display", "none");
        $(".select-panel .delete").css("display", "block");
    }).on("click", ".delete", function() {
        // $(this).css("display", "none");
        // $(".select-panel .edit").css("display", "block");
        if (totalSelect == 0) {
            bui.alert("未选择购买商品！");
            return;
        }
        bui.confirm("是否删除选中商品？", function(ui) {
            // this 为底部按钮
            var text = $(this).text();
            if (text == "确定") {
                //do something
                var checkbox = $("input[type=checkbox]");
                $.each(checkbox, function(i, el) {
                    if ($(el).hasClass("selectAll")) {
                        return true
                    }
                    if ($(el).prop("checked") == true) {
                        $(el).parent().parent().parent().parent().addClass("remove");
                        setTimeout(function() {
                            $(el).parent().parent().parent().parent().remove();
                        }, 400)
                    }
                })
                getCount();
            }
            ui.close();
        });
    })

    // 每个checkbox的事件
    $(".cart-panel").on("click", "input[type=checkbox]", function(e) {
        e.stopPropagation();
        // 绑定全选按钮事件
        if ($(this).hasClass("selectAll")) {
            var checkbox = $("input[type=checkbox]");

            if ($(this).eq(0).prop("checked") == false) {
                $.each(checkbox, function(i, el) {
                    $(el).prop("checked", false);
                })
            } else {
                $.each(checkbox, function(i, el) {
                    $(el).prop("checked", true);
                })
            }
        }

        getCount();
    })
    // 计算总价和总数
    function getCount() {
        var input = $("input[type=checkbox]:not(.selectAll)");
        totalPrice = 0;
        totalSelect = 0;
        goodsList.splice(0, goodsList.length);
        $.each(input, function(i, el) {
            if ($(el).prop("checked") == true) {
                var $this = $(el).parent().parent().parent().parent();
                var tmp = {};
                $.each(numList, function(i, el) {
                    if (el == $($this).find(".bui-number").attr("id")) {
                        totalSelect += parseInt(numWidget[i].value());
                        totalPrice += parseFloat($($this).find(".if-price").data("price")) * numWidget[i].value();
                        tmp.id = $($this).data("id");
                        tmp.count = numWidget[i].value();
                        tmp.sale = parseInt($($this).find(".bui-select").attr("value"));
                        goodsList.push(tmp);
                    }
                })

            }
        })

        $(".tp-price").text(totalPrice.toFixed(2));
        $(".goods-count").text(totalSelect);
    }
    pageview.cartInit = function() {
        alert('1')
    }
    pageview.uilist = uilist;

    module.exports = pageview;

})