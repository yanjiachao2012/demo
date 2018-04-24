loader.define(function(require, exports, module) {
    bui.ajax({
        url: "json/invoiceShouldMessage.json",
        data: {}, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        $(".page_invoiceShouldMessage main ul").append(template(result.data));

        $(".page_invoiceShouldMessage main ul .bui-list .bui-btn").on("click", function() {
            router.load({ url: "pages/userCenter/invoice/invoiceMessage.html", param: { id: $(this).data("id") } })
        })
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });

    function template(data) {
        var html = '';
        $.each(data, function(i, el) {
            html += '<li class="bui-list">';
            html += '    <div data-id="' + el.id + '" class="bui-box bui-btn">';
            html += '        <span>订单编号：</span>';
            html += '        <p class="span1">' + el.invoiceCode + '</p>';
            html += '        <i class="icon-listright"></i>  ';
            html += '    </div>';
            html += '    <div class="bui-box timeL">';
            html += '        <dl>';
            html += '            <dt>' + el.billingDate + '</dt>';
            html += '            <dd>开票日期</dd>';
            html += '        </dl>';
            html += '        <dl>';
            html += '            <dt class="account">￥' + (parseFloat(el.price).toFixed(2)) + '</dt>';
            html += '            <dd>发票金额</dd>';
            html += '        </dl>';
            html += '    </div>';
            html += '</li>';
        });
        return html;
    }
})