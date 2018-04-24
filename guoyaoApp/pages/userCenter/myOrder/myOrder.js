loader.define(function(require, exports, module) {

	var pageview = {},
		localview = {};
	var orderTab, orderDialog;
	var $uiOrderTab = $("#uiOrderTab"),
		$orderDialog = $("#orderDialog");

	var allList, waitList, sureList;

	var clickNum = 0;

	var myOrderUrl = pathSite + '/guoyao/orderList';

	var tipTextArr = ['确认订单', '取消订单'],
		operateTextArr = ['确认订单成功', '取消订单成功'];


	/**
	 *@param 用于提交数据
	 *@param 判断正在操作的类型是取消还是确认
	 *@param type=cancel表示取消，type=sure为确认，id为该条数据的id
	 **/
	var opearteIng = {};

	localview = {
		bind: function() {
			orderTab = bui.slide({
				id: "#uiOrderTab",
				menu: ".bui-nav",
				children: ".bui-tab-main ul",
				scroll: true
			})
			orderDialog = bui.dialog({
				id: '#orderDialog',
				autoClose: false,
				callback: function(e) {}
			});
			//后退返回事件
			$("#orderBackHome").on("click", function() {
				bui.back({
					name: 'main',
					callback: function() {
						loader.require(["main"], function(res) {
							var pageTab = res.tab;
							pageTab.to(4, "none");
						})
					}
				})
			});
			/**
			 *@param tab点击再请求数据
			 *@param _index==0表示全部tab,1表示待处理，2表示已确认
			 **/
			$("#orderNav").on("click", '.bui-btn', function() {
				var _this = $(this),
					_index = _this.index();
				if (_index == 0) {
					localview.allData();
				} else if (_index == 1) {
					localview.waitData();
				} else {
					localview.hasData();
				}

			});
			/**
			 *@param 确认按钮操作
			 **/
			$uiOrderTab.on("click", '.sure-btn', function() {
				var _this = $(this),
					_id = _this.attr('data-id');
				opearteIng.type = _this.attr('data-operate');
				opearteIng.id = _id;

				$orderDialog.find('.notice-title').text(tipTextArr[0]);
				$orderDialog.find('.operate-tip').text(operateTextArr[0])
				$orderDialog.find('.bui-dialog-main').text('是否确认' + _id + '采购订单?');
				orderDialog.open();
			});
			/**
			 *@param 取消按钮操作
			 **/
			$uiOrderTab.on("click", '.not-sure', function() {
				var _this = $(this),
					_id = _this.attr('data-id');
				opearteIng.type = _this.attr('data-operate');
				opearteIng.id = _id;
				$orderDialog.find('.notice-title').text(tipTextArr[1]);
				$orderDialog.find('.operate-tip').text(operateTextArr[1])
				$orderDialog.find('.bui-dialog-main').text('是否取消' + _id + '采购订单?');
				orderDialog.open();
			});
			/*
			 *@param 确定按钮的判断
			 *@param clickNum的点击次数 为0则是第一次点击，1则是第二次
			 */
			$orderDialog.on("click", '.sure-btn', function() {
				if (clickNum == 0) { //这里为提交操作
					if (opearteIng.type == 'cancel') {
						common.dataAjax({
							url: myOrderUrl,
							data: {
								id: opearteIng.id,
								type: opearteIng.type
							}
						}).done(function(res) {
							localview.initStatus();
						}).fail(function() {

						})
					} else {
						common.dataAjax({
							url: myOrderUrl,
							data: {
								id: opearteIng.id,
								type: opearteIng.type
							}
						}).done(function(res) {
							localview.initStatus();
						}).fail(function() {

						})
					}
				} else {
					$orderDialog.find('.bui-dialog-head').removeClass('order-modal-title');
					$orderDialog.find('.bui-dialog-main').show();
					$orderDialog.find('.cancel-btn').show();
					clickNum = 0;
					orderDialog.close();
				}

			});
			/**
			 *@param 模态框取消按钮
			 **/
			$orderDialog.on("click", '.cancel-btn', function() {
				orderDialog.close();
				clickNum = 0
			});
			/**
			 *进入查看详情
			 *@param 
			 **/
			$uiOrderTab.on("click", '.toLink', function() {
				var _this = $(this),
					_id = _this.attr('data-id');
				bui.load({
					url: 'pages/userCenter/myOrder/myOrderDetails.html',
					param: {
						orderId: _id
					}
				})
			})
		},
		/**改变状态**/
		initStatus: function() {
			$orderDialog.find('.bui-dialog-head').addClass('order-modal-title');
			$orderDialog.find('.bui-dialog-main').hide();
			$orderDialog.find('.cancel-btn').hide();
			clickNum = 1;
			if (orderTab.index() == 0) {
				$('#myorderAll').find('.bui-list').empty();
				allList.init()
			} else if (orderTab.index() == 1) {
				$('#myorderWait').find('.bui-list').empty();
				waitList.init()
			} else {
				$('#myorderHas').find('.bui-list').empty();
				hasList.init()
			}
		},
		/*
		 *全部订单
		 */
		allData: function() {
			allList = common.List({
				id: "#myorderAll",
				url: myOrderUrl,
				data: {
					type: 'all'
				},
				field: {
					data: 'returnValue'
				},
				template: localview.template
			});
		},
		/*
		 * 待确认
		 */
		waitData: function() {
			waitList = common.List({
				id: "#myorderWait",
				url: myOrderUrl,
				data: {
					type: 'wait'
				},
				field: {
					data: 'returnValue'
				},
				template: localview.template
			});
		},
		/*
		 *已确认
		 */
		hasData: function() {
			hasList = common.List({
				id: "#myorderHas",
				url: myOrderUrl,
				data: {
					type: 'has'
				},
				field: {
					data: 'returnValue'
				},
				template: localview.template
			});
		},
		template: function(data) {
			var data = data || [];
			var html = '';
			data.forEach(function(item) {
				html += '<div class="order-item">';
				html += '<div class="order-item-code">订单标号：<span class="code">' + item.purshaseId + '</span>';
				if (item.isDelete == 0) {
					html += '<b class="bui-right not-submit">未提交</b>';
				} else if (item.isDelete == 1) {
					html += '<b class="bui-right not-submit">已提交待确认</b>';
				} else {
					html += '<b class="bui-right has-submit">已提交待处理</b>';
				}
				html += '</div>';
				html += '<div class="bui-box bui-btn product-info">';
				html += '<div class="product-img bui-align-center"><img src="' + item.GOODSID + '" alt=""></div>';
				html += '<div class="span1">';
				html += '<h6 class="product-name">' + item.GNAME + '</h6>';
				html += '<p class="product-type">商品规格：' + item.APEC + '</p>';
				html += '</div></div>';
				html += '<div class="wrap-order-info">';
				html += '<div class="order-info bui-align-right"><span>共' + item.qutity + '件商品</span>';
				html += '<span class="price">总额：￥' + item.PRICE + '</span></div>';
				html += '<div class="myOrder-page-operate bui-align-right">';
				html += '<button type="text" class="bui-btn btn toLink" data-id="' + item.purshaseId + '">详情</button>';
				if (item.isDelete != 2) {
					html += '<button type="text" class="bui-btn not-sure" data-operate="cancel" data-id="' + item.purshaseId + '">取消</button>';
					html += '<button type="text" data-id="' + item.purshaseId + '" data-operate="sure" class="bui-btn sure-btn">确认</button>';
				}
				html += '</div></div>';
				html += '</div>';
			})
			return html;
		}
	}
	pageview.init = function() {
		localview.bind();
		var params = router.getPageParams();
		if (params.tabIndex) {
			orderTab.to(params.tabIndex);
			if (params.tabIndex == 1) {
				localview.waitData();
			}
		} else {
			localview.allData()
		}



	}
	pageview.init();
});