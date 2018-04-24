/**
 * 通用登录模板,包含输入交互,提交需要自己绑定验证
 * 默认模块名: pages/page-login/page-login
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {};
    var loginUrl = pathSite + '/guoyao/orderList';


    /**
     *@param 此处为获取链接的所有参数
     *@param fromPage为判断来自于哪个页面;
     **/
    var fromPage;
    var getParams = bui.getPageParams();
    getParams.done(function(res) {
        fromPage = res.fromPage
    });

    pageview.submitFn = function(loading) {
        var $loginAccount = $("#loginAccount").val(),
            $loginPassword = $("#loginPassword").val();

        if ($loginAccount == null || $loginAccount == '') {
            hint({
                html: '账号不能为空',
                callback: function() {
                    loading.stop();
                }
            })
            return;
        }
        if ($loginPassword == null || $loginPassword == '') {
            hint({
                html: '密码不能为空'
            })
            loading.stop();
            return;
        }
        common.dataAjax({
            url: loginUrl,
            data: {
                pw: 'ww'
            },
            method: 'post'
        }).done(function(res) {
            userobj.cstid = 1;
            hint({
                html: '登录成功',
                callback: function() {
                    bui.back({
                        name: 'main',
                        callback: function() {
                            if (fromPage == 'cart') {
                                loader.require(["main"], function(res) {
                                    var pageTab = res.tab;
                                    pageTab.to(3, "none");
                                })
                                /*               if (loader.checkLoad(['pages/cart/cart'])) {
                                                    loader.require(["pages/cart/cart"], function(res) {
                                                                     res.cartInit()
                                                    })
                                                } else {
                                                                 loader.require(["pages/cart/cart"])
                                                             }*/

                            }
                            if (fromPage == 'userIndex') {
                                loader.require(["main"], function(res) {
                                    var pageTab = res.tab;
                                    pageTab.to(4, "none");
                                })
                                // loader.require(["pages/userCenter/userIndex"], function(res) {
                                // res.initLogin()
                                //})
                            }

                        }
                    })
                }
            })

        }).fail(function(res) {})
    }


    pageview.bind = function() {

        // 监听用户名输入事件
        common.onInput({
            id: ".user-input",
            callback: function() {
                // 点击删除按钮清空
                $(".user-input input").val('');
                $(this).hide();
            }
        })
        // 监听密码输入事件
        common.onInput({
            id: ".password-input",
            callback: function() {
                // 点击删除按钮清空
                $("#password").val('');
                $(this).hide();
            }
        });


        /**提交**/
        bui.btn("#loginSubmit").submit(function(loading) {
            pageview.submitFn(loading);
        });

        /*
         *点击logo返回首页
         *@param 回调函数执行tab操作，返回到第一个
         **/
        $("#logo").on('click', function() {
            bui.back({
                name: 'main',
                callback: function() {
                    loader.require(["main"], function(res) {
                        var pageTab = res.tab;
                        pageTab.to(0, "none");
                    });
                }
            });


        })
    }

    pageview.init = function() {

        // 绑定事件
        this.bind();
    }


    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;
})