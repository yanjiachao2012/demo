loader.define(function(require, exports, module) {
    bui.ajax({
        url: "json/news.json",
        data: {}, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        $(".news-page main .news-page-list").append(template(result.data));

        $(".news-page main .news-page-list .bui-btn").on("click", function() {
            router.load({
                url: "pages/userCenter/news/newsDetails.html",
                param: {
                    id: $(this).data("id")
                }
            })
        })
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });

    function template(data) {
        var html = '';
        $.each(data, function(i, el) {
            html += '<div class="bui-box bui-btn" data-id="' + el.id + '">';
            html += '    <i class="news-icon ' + el.type + '-icon"></i>';
            html += '    <div class="span1">';
            html += '    <h3 class="item-title bui-box"><div class="span1"><p class="bui-text-hide">' + el.title + '</p></div><span class="time">' + el.time + '</span></h3>';
            html += '    <div class="item-detail bui-box"><div class="span1" style="height:.4rem;overflow:hidden;">' + el.content + '</div><i class="bui-badges">' + el.count + '</i></div>';
            html += '    </div>';
            html += '</div>';
        });
        return html;
    }
})