loader.define(function(require, exports, module) {
    bui.ajax({
        url: "json/newsDetails.json",
        data: {}, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        $(".newsDetails-page main .newsDetails-page-panel").append(template(result.data));
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });

    function template(data) {
        var html = '';
        $.each(data, function(i, el) {
            html += '<div class="bui-panel-main">';
            html += '    <div class="wrap-time bui-align-center"><span class="time round">'+el.time+'</span></div>';
            html += '    <h4 class="notice-title bui-align-center">'+el.title+'</h4>';
            html += '    <div class="notice-content">';
            html += el.content;
            html += '    </div>';
            html += '</div>';
        });
        return html;
    }
})