loader.define(function(require, exports, module) {
    $("#info-list-view ").on('click', '.icon_deleteBlue', function() {
        bui.confirm("确定删除吗？", function(e) {
            if ($(this).text() == "确定") {
                hint("删除成功", "center");
            }
        });
    })


    var uiDialog, uiList, $info_list;
    $info_list = $("#info_list");
    init();

    // 初始化控件
    function init() {
        uiList = common.List({
            id: "#info-list-view",
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