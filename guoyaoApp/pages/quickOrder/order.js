loader.define(function(require, exports, module) {

    var pageView = {};
    var uiList, $quickListView = $("#quick-list-view");

    pageView.bind = function() {
        // 下拉菜单有遮罩的情况
        var uiMask = bui.mask({
            autoTrigger: false,
            appendTo: "#main",
            zIndex: 9
        });

        var uiDropdown1 = bui.dropdown({
            id: "#uiDropdown1",
            width: 270,
            callback: function() {
                console.log(uiDropdown1.value())
            }
        });
        var uiDropdown2 = bui.dropdown({
            id: "#uiDropdown2",
            width: 270,
            callback: function() {
                console.log(uiDropdown2.value())
            }
        });

        // 通过监听事件绑定
        uiDropdown1.on("show", function() {
            uiMask.show();
        });
        uiDropdown1.on("hide", function() {
            uiMask.hide();
        });

        uiDropdown2.on("show", function() {
            uiMask.show();
        });
        uiDropdown2.on("hide", function() {
            uiMask.hide();
        });

        /**
         *加入购物车
         *@param id为此商品id
         */
        $quickListView.on("click", '.add', function() {
            var _this = $(this),
                _id = _this.attr('data-id');
            hint({
                html: '加入购物车成功'
            })
            common.dataAjax({
                url: '',
                data: {
                    id: _id
                }
            }).done(function() {

            }).fail(function() {

            })
        });
        /**
         *立即购买
         *@param id为此商品id
         */
        $quickListView.on("click", '.shop', function() {
            var _this = $(this),
                _id = _this.attr('data-id');
            router.load({
                url: 'pages/product/productDetails.html',
                param: {
                    id: _id
                }
            })
        });
        /**
         *立即购买
         *@param id为此商品id
         */
        $quickListView.on("click", '.toLink', function() {
            var _this = $(this),
                _id = _this.attr('data-id');
            router.load({
                url: 'pages/product/productDetails.html',
                param: {
                    id: _id
                }
            })
        });
    }

    // 初始化控件
    pageView.init = function() {
        uiList = common.List({
            id: "#quick-list-view",
            url: "json/order.json",
            method: 'get',
            data: {},
            // 如果分页的字段名不一样,通过field重新定义
            field: {
                data: "returnValue"
            },
            template: pageView.template
        });
    }

    pageView.template = function(data) {
        var data = data || [],
            html = '';
        $.each(data, function(index, item) {
            html += '<li class="span6">';
            html += '<div class="showL toLink">';
            html += '<div class="img">';
            html += '<img src="' + item.imgSmall + '" alt="">';
            html += '</div>';
            html += '<h3>' + item.drugname + '</h3>';
            html += '<p>规格：' + item.spec + '</p>';
            html += '<span>￥' + item.promotionPrice + '</span>';
            html += '</div>';
            html += '<div class="bui-box bottomB">';
            html += '<div href="#" class="span6 add">加入购物车</div>';
            html += '<div href="#" class="span6 shop">立即购买</div>';
            html += '</div>';
            html += '</li>';
        });
        return html;
    }

    pageView.init();
    pageView.bind();
})