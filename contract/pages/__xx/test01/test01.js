// 默认已经定义了main模块
loader.define(function (require, exports, module) {

    var pageview = {};

    // 模块初始化定义    
    pageview.init = function () {

    }

    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;


});



$("#kk02").click(function (e) {

    //https://itt.bingosoft.net/CCMTest/api/ViewHerpService/CheckIsMySelf
    //bui.ajax({
    //    url: "http://10.200.54.222:8082/api/Test/1",
    //    data: {}
    //    , dataType: "jsonp"

    //}).done(function (res) {
    //    bui.alert(res);
    //}).fail(function (res, status) {
    //    bui.alert(status + res.responseText);
    //    // status = "timeout" || "error" || "abort", "parsererror"
    //});


    //成功的jsonp
    //var data = '美女';
    //window.baidu = {};
    //window.baidu.sug = function (data) {
    //    var x = JSON.stringify(data);
    //    x = JSON.parse(x);
    //    console.log(x.s)
    //};


    //$.ajax({
    //    async: false,
    //    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' +data,
    //    dataType: 'jsonp',
    //    jsonp: "mycallback",
    //    jsonpCallback: "window.baidu.sug"
    //    ,success: function (data) {
    //        console.log("success:" + data);
    //    }
    //    ,error: function () {
    //        console.log("发生异常");
    //    }
    //});


            //alert(13);
    //http://10.200.54.222:8082/api/Test/1  localhost


    //https://itt.bingosoft.net/CCMTest/api/ViewHerpService/CheckIsMySelf 原 已弃用
    //https://itt.bingosoft.net/CCMTest/api/ViewHerpService/CheckIsMySelfresponse 输出不带引号的文本
    //https://itt.bingosoft.net/CCMTest/api/ViewHerpService/CheckIsMySelfString 输出带引号的文本
    //https://itt.bingosoft.net/CCMTest/api/ViewHerpService/CheckIsMySelfJson 输出标准的JSON 正好用

    $.ajax({
        url: 'https://itt.bingosoft.net/CCMTest/api/ViewHerpService/CheckIsMySelfJson' 
        ,type: "GET",
        crossDomain: true,
        dataType: 'json', //json  text
        success: function (data) {
            alert(data.Check);
            //console.log(data);

        }
    });





});
