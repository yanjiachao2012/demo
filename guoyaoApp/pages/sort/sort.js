loader.define(function(require, exports, module) {
	var pageview = {};
	var $sortLeft = $("#sortLeft"),
		$sortRight = $("#sortRight");
	var tempData = []; //临时保存右边数据



	// 事件类定义
	pageview.bind = function() {

		/**
		 *@param 点击左边数据切换
		 **/
		$sortLeft.on("click", '.left-sort', function() {
			var _this = $(this),
				_index = _this.attr('data-index'),
				html = "";
			html += '<li class="item-title">';
			html += '<div class="item-banner"><img class="banner-pic" src="' + tempData[_index].sortBanner + '"/></div>';
			html += '<h6 class="title-name">' + tempData[_index].sortTitle + '</h6></li>';
			tempData[_index].infoDetails.forEach(function(item) {
				html += pageview.listRight(item, _this.text());
			})
			$sortRight.html(html);
			$sortRight.find('.pic').on('error', function() {
				$(this).attr('src', '../images/icon-error.png');
			})
			_this.addClass('left-sort-active').siblings('.left-sort').removeClass('left-sort-active');
		});
		/***
		 *@param 跳转链接
		 **/
		$sortRight.on('click', '.sort-item', function() {
			var _this = $(this),
				_word = _this.attr('data-word'),
				_mainclass = _this.attr('data-mainclass');
			bui.load({
				url: 'pages/search/search.html',
				param: {
					word: _word,
					mainclass: _mainclass
				}

			})
		})
	}
	/***
	 *@param 初始化数据
	 **/
	pageview.initData = function() {
		common.dataAjax({
			//url: pathSite + '/guoyao/sortList',
			url: 'json/sort.json',
			method: 'get',
			data: {
				aa: '1'
			}
		}).done(function(res) {

			var htmlObject = pageview.tempData(res.returnValue);
			$sortLeft.html(htmlObject.htmlLeft);
			$sortRight.html(htmlObject.htmlRight);
			$sortRight.find('.pic').on('error', function(event) {
				console.log(event)
				$(this).attr('src', '../images/icon-error.png');
			})
		}).fail(function(res) {

		})
	}

	/***
	 *@param 模板数据
	 **/
	pageview.tempData = function(data) {
		var data = data || [];
		var htmlLeft = '',
			htmlRight = '';
		data.forEach(function(item, index) {
			var sortInfo = item.sortInfo;
			if (index == 0) {
				htmlLeft += '<li class="left-sort left-sort-active" data-index=' + index + '>' + item.bigName + '</li>';
				htmlRight += '<li class="item-title">';
				htmlRight += '<div class="item-banner"><img class="banner-pic" src="' + sortInfo.sortBanner + '"/></div>';
				htmlRight += '<h6 class="title-name">' + sortInfo.sortTitle + '</h6></li>';
				sortInfo.infoDetails.forEach(function(items) {
					htmlRight += pageview.listRight(items, item.bigName);
				})
			} else {
				htmlLeft += '<li class="left-sort" data-index=' + index + '>' + item.bigName + '</li>';
			}
			tempData.push(sortInfo)
		})
		return {
			htmlLeft: htmlLeft,
			htmlRight: htmlRight
		}
	}
	/**
	 *@param 右边数据
	 **/
	pageview.listRight = function(data, bigName) {
		var html = '<li class="sort-item" data-word="' + data.sortname + '" data-mainclass="' + bigName + '">';
		html += '<div class="sort-pic"><img class="pic"  src=' + data.sortpic + '/></div>';
		html += '<span class="sort-name bui-text-hide">' + data.sortname + '</span></li>';
		return html;
	};

	pageview.bind();
	pageview.initData();

	onerror = handleErr;

	function handleErr(msg, url, line, colno, error) {
		var txt = '';
		txt += "Error: " + msg + "\n"
		txt += "URL: " + url + "\n"
		txt += "Line: " + line + "\n\n"
		txt += "col: " + colno + "\n\n"
		txt += "error: " + error + "\n\n"

		return true
	}

	//window.onload = function() {
	setTimeout(function() {
		throw new Error('啦啦啦')
	}, 1000)

	//}
})