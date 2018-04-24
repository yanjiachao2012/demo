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
        if ($("#certicates-type").val() == "") {
            bui.alert("请填写证照类型！");
            return;
        }
        if ($("#certicates-code").val() == "") {
            bui.alert("请填写证照代码！");
            return;
        }
        if ($("#certicates-validity").val() == "") {
            bui.alert("请填写证照有效期！");
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