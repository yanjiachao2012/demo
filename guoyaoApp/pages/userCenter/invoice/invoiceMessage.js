loader.define(function(require, exports, module) {
    bui.ajax({
        url: "json/invoiceMessage.json",
        data: {}, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        $(".page_invoiceMessage main .orderList dl").append(template(result.data));
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });

    function template(data) {
        var html = '';
        html += '<dt class="bui-btn">';
        html += data.enterpriseName;
        html += '    <span class="circle"></span>';
        html += '    <span class="circle circleR"></span>';
        html += '</dt>';
        html += '<dd class="bui-btn bui-box">';
        html += '    <div class="span1">开票信息代码</div>';
        html += '    <span>' + data.code + '</span>';
        html += '</dd>';
        html += '<dd class="bui-btn bui-box">';
        html += '    <div class="span1">公司地址</div>';
        html += '    <span>' + data.enterpriseAddress + '</span>';
        html += '</dd>';
        html += '<dd class="bui-btn bui-box">';
        html += '    <div class="span1">开户行</div>';
        html += '    <span>' + data.bankMsg + '</span>';
        html += '</dd>';
        html += '<dd class="bui-btn bui-box">';
        html += '    <div class="span1">银行账号</div>';
        html += '    <span>' + data.bankAccount + '</span>';
        html += '</dd>';
        html += '<dd class="bui-btn bui-box">';
        html += '    <div class="span1">纳税号</div>';
        html += '    <span>' + data.taxNo + '</span>';
        html += '</dd>';
        html += '<dd class="bui-btn bui-box">';
        html += '    <div class="span1">联系电话</div>';
        html += '    <span>' + data.tel + '</span>';
        html += '</dd>';
        return html;
    }

})