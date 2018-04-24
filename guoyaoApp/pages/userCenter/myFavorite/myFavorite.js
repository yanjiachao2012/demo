loader.define(function(require, exports, module) {
    var $favoriteListView = $("#favorite-list-view");
    $favoriteListView.on("click", '.toLink', function() {
        var _this = $(this),
            _id = _this.attr('data-id');
        bui.load({
            url: 'pages/product/productDetails.html',
            param: {
                id: _id
            }
        })
    })

    var uiList;
    init();

    // 初始化控件
    function init() {
        uiList = common.List({
            id: "#favorite-list-view",
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
            html += '<li class="bui-box toLink" data-id="' + item.id + '">';
            html += '<div class="img">';
            html += '<img src="' + item.imgSmall + '" alt="">';
            html += '</div>';
            html += '<div class="span1">';
            html += '<h3>' + item.drugname + '</h3>';
            html += '<p>规格：' + item.spec + '</p>';
            html += '<span>￥' + item.promotionPrice + '</span>';
            html += '<span class="iconR">';
            html += '</span>';
            html += '</div>';
            html += '</li>';
        });
        return html;
    }
})