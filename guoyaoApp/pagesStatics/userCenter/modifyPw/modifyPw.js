// 默认已经定义了main模块
loader.define(function() {

    var pageview = {};
    var $modifySubmit = $("#modifySubmit");
    var modifyUrl = 'json/order.json';

    var rePw = /[a-zA-Z0-9]+/gi;

    pageview.submitFn = function(loading) {
        var $passwordOld = $("#password-old").val(),
            $passwordNew = $("#password-new").val(),
            $passwordSure = $("#password-sure").val();
        if ($passwordOld == null || $passwordOld == '') {
            hint({
                html: '旧密码不能为空',
                callback: function() {
                    loading.stop();
                }
            })
            return;
        }
        if ($passwordNew == null || $passwordNew == '') {
            hint({
                html: '新密码不能为空'
            })
            loading.stop();
            return;
        }
        if (!rePw.test($passwordNew) || $passwordNew.length < 6 || $passwordNew.length > 18) {
            hint({
                html: '密码不符合要求',
                callback: function() {
                    loading.stop();
                }
            })
            return;
        }
        if ($passwordSure !== $passwordNew) {
            hint({
                html: '两次密码不一致',
                callback: function() {
                    loading.stop();
                }
            })

            return;
        };
        common.dataAjax({
            url: modifyUrl,
            data: {
                pw: 'ww'
            },
            method: 'post'
        }).done(function(res) {
            hint({
                html: '修改成功,请重新登录',
                callback: function() {
                    bui.back({
                        name: 'main'
                    })
                }
            })

        }).fail(function(res) {})
    }

    // 事件绑定
    pageview.bind = function() {
        /**
         *设置暗码和明码
         **/
        $(".modifyPw-page-form").on("click", '.eye-icon', function() {
            var _this = $(this),
                _input = _this.siblings('.span1').find('input');
            if (_input.attr('type') == 'password') {
                _input.attr('type', 'text');
            } else {
                _input.attr('type', 'password');
            }
        });
        /**提交**/
        bui.btn("#modifySubmit").submit(function(loading) {
            pageview.submitFn(loading);
        });
    }

    // 绑定事件
    pageview.bind();

})