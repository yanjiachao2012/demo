loader.define(function(require, exports, module) {

    var sculptureUpload = bui.upload();

    // 请求个人信息数据
    bui.ajax({
        url: "json/userInfo.json",
        data: {}, //接口请求的参数

        // 可选参数
        method: "GET",
        timeout: 20000
    }).done(function(result) {
        $(".userInfo-page-list .user-pic img").attr("src", result.data.sculpture);
        $(".userInfo-page-list").append(template(result.data));

        // 绑定事件
        bind();
    }).fail(function(result, status) {
        //console.log(status)//"timeout"
    });

    function template(data) {
        var html = "";
        html += '<div class="bui-box bui-btn">';
        html += '    <div class="bui-label">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</div>';
        html += '    <div class="span1 inputBtn">' + data.nickname + '</div>';
        html += '</div>';
        html += '<div class="bui-box bui-btn">';
        html += '    <div class="bui-label">联系地址</div>';
        html += '    <div class="span1 inputBtn">' + data.address + '</div>';
        html += '</div>';
        html += '<div class="bui-box bui-btn">';
        html += '    <div class="bui-label">联系电话</div>';
        html += '    <div class="span1 inputBtn tel">' + data.tel + '</div>';
        html += '</div>';
        html += '<div class="bui-box bui-btn">';
        html += '    <div class="bui-label">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</div>';
        html += '    <div class="span1 inputBtn">' + data.email + '</div>';
        html += '</div>';
        return html;
    }


    // 事件类定义
    function bind() {
        // 绑定页面的所有按钮有href跳转
        $(".container-xy .bui-btn").on("click", function() {
            bui.confirm("是否确认退出登录？", function(ui) {
                // this 为底部按钮
                var text = $(this).text();
                if (text == "确定") {
                    userobj.cstid = null;
                    bui.back({
                        name: 'main',
                        callback: function() {
                            userobj.firstClick = '1';
                            loader.require(["main"], function(res) {
                                var pageTab = res.tab;
                                pageTab.to(0, "none");
                            });

                            //loader.require(["pages/userCenter/userIndex"], function(res) {
                            // res.initLogin();
                            //});
                        }
                    })
                }
                ui.close();
            });
        })

        $(".userInfo-page-list").on("click", ".inputBtn", function() {
            $(this).html("<input class='bui-input' type='" + ($(this).hasClass("tel") ? "number" : "type") + "' value='" + $(this).text() + "'>");
            var $this = $(this);
            $(this).addClass("cancelBtn").removeClass("inputBtn");
            $($this).find("input").on("keyup", function(event) {
                if (event.keyCode == 13) {
                    // $($this).find("input").val($($this).find("input").val().subString(0, $($this).find("input").val().length - 1))
                    $($this).find("input").trigger("blur");
                }
            })
            $($this).find("input").on("blur", function() {
                var text = $(this).val();
                var $that = $(this).parent();
                $($that).html(text);
                $($that).removeClass("cancelBtn").addClass("inputBtn");
            })
        })

        // 选择图片文件
        $("#sculptureSelect").on("click", function() {

            sculptureUpload.add({
                "onSuccess": function(val, data) {
                    // $output.text(val);

                    // 展示本地图片
                    this.toBase64({
                        onSuccess: function(url) {
                            // $("#output").append('<img src="' + url + '" alt="" style="width:100%;"/>');
                            $(".userInfo-page-list .user-pic img").attr("src", url);

                            sculptureUpload.start({
                                // url:"http://eid.bingosoft.net:83/share/apis/upload/image",
                                url: "http://10.200.43.142:81/dataservice.ashx?CommandName=Atd$ImgUpLoad",
                                onSuccess: function(data) {
                                    //显示上传以后的图片
                                    // $output.append('<img src="http://eid.bingosoft.net:83'+data.detail[0].path+'" alt="" style="width:100%;"/>')
                                },
                                onFail: function(data) {
                                    bui.alert(data)
                                }
                            })
                        }
                    });
                }
            })
        })
    }
})