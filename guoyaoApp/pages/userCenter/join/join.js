loader.define(function(require, exports, module) {
    var $collectListView = $("#collect-list-view");
    $collectListView.on('click', '.icon_deleteBlue', function() {
        var _this = $(this);
        bui.confirm("确定删除吗？", function(e) {
            if ($(this).text() == "确定") {
                hint({
                    html: '删除成功'
                });
                _this.parents('.bui-box').remove();
            }
        });
    });
    $collectListView.on("click", '.icon_carBlue', function() {
        hint({
            html: '加入购物车成功'
        })
    });
    $collectListView.on("click", '.toLink', function() {
        var _this = $(this),
            _id = _this.attr('data-id');
        bui.load({
            url: 'pages/product/productDetails.html',
            param: {
                id: _id
            }
        })
    });



    var uiList;
    init();

    // 初始化控件
    function init() {
        uiList = common.List({
            id: "#collect-list-view",
            url: "json/order.json",
            method: 'get',
            data: {},
            // 如果分页的字段名不一样,通过field重新定义
            field: {
                data: "returnValue"
            },
            template: template
        });
    }

    function template(data) {
        var data = data || [],
            html = '';
        $.each(data, function(index, item) {
            html += '<li class="bui-box">';
            html += '<div class="img">';
            html += '<img src="' + item.imgSmall + '" alt="">';
            html += '</div>';
            html += '<div class="span1">';
            html += '<h3 class="toLink" data-id="' + item.id + '">' + item.drugname + '</h3>';
            html += '<p>规格：' + item.spec + '</p>';
            html += '<span>￥' + item.promotionPrice + '</span>';
            html += '<span class="iconR">';
            html += '<i class="icon_carBlue"></i>';
            html += '</span>';
            html += '</div>';
            html += '</li>';
        });
        return html;
    }
})