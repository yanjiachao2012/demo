loader.define(function(require, exports, module) {
    // 隐藏手机号
    // var phone = $(".phoneNum").text();
    //    var mphone = phone.substr(0, 3) + '****' + phone.substr(7);
    //    $('.phoneNum').text(mphone)

    //    // 删除弹窗
    //    $(".icon_deleteS").parent("span").click(function(){
    //    	bui.confirm("确定删除吗？",function (e){
    // 		if($(this).text()=="确定"){
    // 			hint("删除成功", "center");
    // 		}
    // 	});
    //    })

    $("#modifySubmit").on("click", function() {
        if ($("#recipient-name").val() == "") {
            bui.alert("请填写收件人姓名！");
            return;
        }
        if ($("#recipient-tel").val() == "") {
            bui.alert("请填写收件人电话！");
            return;
        }
        if ($("#recipient-address").val() == "") {
            bui.alert("请填写收件人地址！");
            return;
        }
        if (!(/^1[34578]\d{9}$/.test($("#recipient-tel").val()))) {
            bui.alert("收件人电话格式不正确！");
            return;
        }
        
        // bui.ajax({
        //     url: "http://",
        //     data: {},//接口请求的参数
        
        //     // 可选参数
        //     method: "GET",
        //     timeout: 20000
        // }).done(function(result){
            router.back();
        // }).fail(function(result,stus){
        //     //console.log(status)//"timeout"
        // });at
    })
})