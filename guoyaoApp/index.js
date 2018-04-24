window.router = bui.router();

//bui.debug = false;
bui.isWebapp = true;

bui.on("pageinit", function() {
    // 初始化路由
    router.init({
        id: "#bui-router",
        reloadCache: false
    })

    // 绑定事件
    bind();

    // 事件类定义
    function bind() {
        // 绑定页面的所有按钮有href跳转
        bui.btn({
            id: "#bui-router",
            handle: ".bui-btn,.toLink"
        }).load();

        // 统一绑定页面所有的后退按钮
        $("#bui-router").on("click", ".btn-back", function(e) {
            // 支持后退多层,支持回调
            bui.back();
        })
    }
})

var pathSite = 'http://10.200.201.72:8090'; //请求数据接口地址
//var pathSite = "http://192.168.1.101:8090";
var userobj = {
    cstid: null,
    firstClick: null
}

/*
 *默认两秒消失
 *@param html:显示内容
 *@param position:显示的位置 默认从顶部出现
 *@param callback:设置回调函数
 */

function hint(param) {
    param.html = param.html || '';
    param.appendTo = param.appendTo || '';
    param.position = param.position || 'top';
    param.callback = param.callback || '';
    param.effect = param.effect || 'fadeInDown';
    param.timeout = param.timeout || '2000';
    param.autoClose = param.autoClose || true;
    bui.hint({
        content: param.html,
        position: param.position,
        effect: param.effect,
        onClose: param.callback,
        timeout: param.timeout,
        autoClose: param.autoClose
    });
}

var common = {};
common.List = function(param) {
    var list;
    param.data = param.data || {};
    param.field = param.field || {
        data: ''
    };
    param.method = param.method || 'POST';
    list = bui.list(param);
    //todo --list跳转
    return list;
}
/**
 * 统一请求方法
 * @param {}
 * @return {}
 */
common.dataAjax = function(param) {
    param.method = param.method || 'POST';
    param.data = param.data || {};
    param.timeout = param.timeout || 3 * 60 * 1000; //超时三分钟

    var def = Zepto.Deferred();
    bui.ajax(param).done(function(resultValue) {
        def.resolve(resultValue);
    }).fail(function(resultValue) {
        def.reject(resultValue);
    });
    return def;
}
/**
@param 本地存储
@param 
***/
common.storage = function() {
    return bui.storage(0);
}
/**
     * [onInput 监听input事件]
     * @param  {[object]} opt [description]
     * @param  {[string]} opt.id [事件的父级]
     * @param  {[string]} opt.target [目标是input]
     * @example  
     * 
     * html: 
      
        <div class="bui-input password-input">
            <input id="password" type="password" placeholder="密码">
        </div>

       js: 

        onInput({
            id: ".password-input",
            callback: function () {
                // 点击删除按钮清空
                $("#password").val('');
                $(this).hide();
            }
        })
     * 
     * @return {[type]}     [description]
     */
common.onInput = function(opt) {
    var opt = opt || {};
    opt.id = opt.id || "";
    opt.target = opt.target || "input";
    opt.event = opt.event || "keyup";
    opt.icon = opt.icon || "icon-remove";
    opt.onInput = opt.onInput || function() {};
    opt.callback = opt.callback || function() {};

    if (opt.id == "" || opt.id === null) {
        return;
    }
    var $id = $(opt.id),
        $target = $id.find(opt.target);
    iconClass = '.' + opt.icon;

    // 输入框监听延迟执行
    $target.on(opt.event, bui.unit.debounce(function() {
        var val = $(this).val(),
            $btnRemove = $id.find(iconClass);
        if (val.length > 0) {
            if ($btnRemove && $btnRemove.length) {
                $btnRemove.css("display", "block");
            } else {
                $id.append('<i class="' + opt.icon + '"></i>');
                $btnRemove = $target.find(iconClass);
            }
        } else {
            $btnRemove && $btnRemove.css("display", "none");
        }

        opt.onInput && opt.onInput.call(this, val);
    }, 100))

    // 图标点击事件
    $id.on("click", iconClass, function() {
        opt.callback && opt.callback.call(this);
    })
}

/***
 *@param 判断是否登录
 *@param $type 表示来自于哪个页面，这个参数是唯一的，用于登录页执行方法
 ***/
common.isLogin = function($type) {
    return bui.load({
        url: "pages/login/login.html",
        param: {
            fromPage: $type
        }
    })
}

/*bui.back({
                name: "main"
            })*/