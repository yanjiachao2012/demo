/**
 * 底部导航TAB模板
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(require, exports, module) {

    var pageview = {};

	//接收传过来的ID
	var params = router.getPageParams();
		console.log(params.WorkItemID);


		_AJget("getUnsurePreview"
			, { "WorkItemID": params.WorkItemID || 1 }
			, function(data) {
				//待处理事件。

				show_List1(data);

			}
		);
		function show_List1(_data) {



			//
			$(".sT01").html(_data.UnsurePreviewInfo.UnsurePreviewTotal);
			 


			//生成HTML
			//reHTML("#bui-nav1", "#MB_bui-nav1", DL);

			//

			var can = "#unsurePreviewList", MB = "#MB_unsurePreviewList", data = _data.IncomeNode;
			var cc_0 = $(can);
			cc_0.empty();
			MB_body = $(MB);


			//二级模板
			var MB_2x0 = MB_body.find(".popleList");

			//人员数据
			var data2 = _data.UnsurePreviewList;


			for(var i0 = 0; i0 < data.length; i0++) {
				var d = data[i0];
				//获取模版
				//d.IncomeNodeID //收入节点ID
				//获取模版
				var cc = MB_body.children().eq(0).clone();
				cc.find(".sT10").html(d.IncomeNodeName); //收入节点名称
				//cc.find(".sT11").html(d.IncomeNodeAmount);  //当前节点人员成本合计

				cc.find(".sT10").html(d.IncomeNodeName); //收入节点名称


				var cc_0_2x = cc.find(".popleList");
				cc_0_2x.empty();

				for(var j0 = 0; j0 < data2.length; j0++) {
					var d2 = data2[j0];
					if(d.IncomeNodeID == d2.IncomeNodeID){
					//复制一个模版出来。
					var MB_2x = MB_2x0.clone();
					//d2.IncomeNodeID //收入节点ID
					MB_2x.find(".sT20").html(d2.EmployeeType);  //人员类型
					MB_2x.find(".sT21").html(d2.HowDays);  //投入天数
					MB_2x.find(".sT22").html(d2.PerCapitalCost);  //均人日成本
					MB_2x.find(".sT23").html(d2.SubMin);  //小计
					cc_0_2x.append(MB_2x);
					
					}
				}
		
				cc_0.append(cc);
			}

		}


















    var contractTab;

    // 模块初始化定义
    pageview.init = function() {
        
    }


    // 初始化
    pageview.init();

    // 输出模块
    module.exports = pageview;

})