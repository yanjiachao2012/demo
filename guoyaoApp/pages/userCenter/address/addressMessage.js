loader.define(function(require, exports, module) {


    bui.ajax({
        url: "json/address.json",
        data: {}, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        $(".page_addressMessage main ul").append(template(result.data)); // // 隐藏手机号
        $.each($(".page_addressMessage main ul li"), function(i, el) {
            var phone = $(el).find(".phoneNum").text();
            var mphone = phone.substr(0, 3) + '****' + phone.substr(7);
            $(el).find(".phoneNum").text(mphone)
        })

        // 删除弹窗
        $(".icon_deleteS").parent("span").click(function() {
            var $this = $(this);
            bui.confirm("确定删除吗？", function(e) {
                if ($(this).text() == "确定") {
                    $($this).parent().parent().parent().remove();
                    hint({
                        html: '删除成功',
                        position: 'center'
                    });
                }
            });
        });

        //编辑按钮
        $(".icon_editor").parent("span").on("click", function() {
            router.load({
                url: "pages/userCenter/address/addressAdd.html",
                param: {
                    id: $(this).parent().parent().parent().data("id")
                }
            })
        })

        // 设置默认地址
        $.each($("input.bui-choose"), function(i, el) {
            if ($(this).attr("default") == "true") {
                $(this).prop("checked", true);
            }
        })
        $("input[type=checkbox]").on("click", function() {
            $.each($("input[type=checkbox]"), function(i, el) {
                $(el).prop("checked", false);
            })
            $(this).prop("checked", true);
        })

        // 若为选地址页面，则点击直接回退
        var pageParams = router.getPageParams();
        if (pageParams.isSelect) {
            $(".listM").on("click", function() {
                var obj = {};
                obj.name = $(this).find(".name").text();
                obj.tel = $(this).find(".phoneNum").text();
                obj.address = $(this).find("p").text();
                obj.id = $(this).parent().data("id");
                obj.isDefault = $(this).parent().find("input[type=checkbox]").prop("checked");
                router.back({ callback: function(order) {
                    order.setLocation(obj);
                } })
            })
        }
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });


    function template(data) {
        var html = "";
        $.each(data, function(i, el) {
            html += '<li data-id="' + el.id + '">';
            html += '    <div class="listM">';
            html += '        <div class="bui-box msg">';
            html += '            <span class="name">' + el.addressname + '</span>';
            html += '            <span class="span1 phoneNum">' + el.addresstel + '</span>';
            html += '            <span class="span1 addressCode">' + el.addresscode + '</span>';
            html += '        </div>';
            html += '        <p>' + el.address + '</p>';
            html += '    </div>';
            html += '    <div class="operate bui-box">';
            html += '        <input type="checkbox" class="bui-choose" name="address" title="默认地址" default="' + (el.isDefault) + '">';
            html += '        <div class="span1">';
            html += '            <span class="editorT"><i class="icon_editor"></i>编辑</span>';
            html += '            <span><i class="icon_deleteS"></i>删除</span>';
            html += '        </div>';
            html += '    </div>';
            html += '</li>';
        });
        return html;
    }
})