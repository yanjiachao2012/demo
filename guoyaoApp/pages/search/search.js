loader.define(function(require, exports, module) {

    var pageview = {};
    var $searchBtn = $("#searchBtn"),
        $searchHistory = $("#searchHistory"),
        $historyBox = $("#historyBox"),
        $searchList = $("#searchList"),
        $searchNo = $("#searchNo"),
        $searchInput = $("#searchInput"),
        $removeBtn = $("#removeBtn");

    var searchUrl = pathSite + '/goodsData/searchGoodsApp';
    var searchTitleUrl = pathSite + '/goodsData/searchGoodsNameApp';

    var _storage = common.storage();

    /*
     *@param 历史记录表
     *
     **/
    pageview.history = function() {
        var html = '';
        var historyData = _storage.get('historyList');
        if (historyData.length > 0) {
            historyData.forEach(function(item) {
                html += '<li class="bui-btn" data-word="' + item.title + '"><div class="span1">' + item.title + '</div></li>';
            })
            $searchHistory.find('.bui-list').html(html);
        }
    }

    /**
     *@param 设置本地缓存
     **/
    pageview.setHistory = function($val) {
        _storage.set('historyList', {
            'title': $val
        }, 'title')
    }
    /**
     *@param 控制隐藏
     **/
    pageview.showMain = function($id, $display) {
        if ($display == 'block') {
            $($id).show();
        } else {
            $($id).hide();
        }
    }
    /**
     *@param 此处为控制不同div的显示
     *@param history为历史记录盒子显示，
     *@param list为有结果盒子显示
     *@param no 为无结果盒子显示
     **/
    pageview.showFn = function($type) {
        if ($type == 'history') {
            pageview.showMain($searchHistory, 'block')
            pageview.showMain($searchList)
            pageview.showMain($searchNo)
        } else if ($type == 'list') {
            pageview.showMain($searchHistory)
            pageview.showMain($searchList, 'block')
            pageview.showMain($searchNo)
        } else {
            pageview.showMain($searchHistory)
            pageview.showMain($searchList)
            pageview.showMain($searchNo, 'block')
        }
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
        });
        /**点击搜索按钮**/
        $searchBtn.on("click", function() {
            var _val = $searchInput.val();
            if (_val.length > 0) {
                pageview.setHistory(_val);
                pageview.dataList(_val)
            } else {
                hint({
                    html: '请输入搜索内容'
                })
            }
        });
        /**
         *检测输入框搜索
         **/
        $searchInput.on('input', function() {
            var _val = $searchInput.val()
            pageview.showMain($historyBox)
            if (_val.length > 0) {
                pageview.shortList(_val)
            }
        });

        /**
         *输入框点击显示历史
         **/
        $searchInput.on('click', function() {
            pageview.showFn('history');
        });


        /**
         *@param 删除缓存
         **/
        $removeBtn.on('click', function() {
            _storage.remove('historyList')
            $searchHistory.find('.bui-list').empty();
        });

        /**
         *@param 点击简单列表获取数据
         **/
        $searchHistory.on("click", '.bui-btn', function() {
            var _this = $(this),
                _word = _this.attr('data-word');
            pageview.setHistory(_word)
            pageview.dataList(_word);
            $searchInput.val(_word);
        });


        /**
         *@param 跳转去详情
         **/
        $searchList.on('click', '.toLink', function() {
            var _this = $(this),
                _id = _this.attr('data-id');
            bui.load({
                url: 'pages/product/productDetails.html',
                param: {
                    id: _id
                }

            })
        });

        /**
         *@param 可购商品，全部商品点击事件
         **/
        $searchList.find('.search-result').on("click", '.span1', function() {
            var _this = $(this),
                _type = _this.attr('data-type');
            _this.addClass('active-item').siblings('.active-item').removeClass('active-item');
            var _val = $searchInput.val();
            if (_val.length > 0) {
                pageview.dataList(_val);
            }
        });
        /**
         *加入购物车
         *@param id为此商品id
         */
        $searchList.on("click", '.add', function() {
            var _this = $(this),
                _id = _this.attr('data-id');
            hint({
                html: '加入购物车成功'
            })
            common.dataAjax({
                url: '',
                data: {
                    id: _id
                }
            }).done(function() {

            }).fail(function() {

            })
        });
        /**
         *立即购买
         *@param id为此商品id
         */
        $searchList.on("click", '.shop', function() {
            var _this = $(this),
                _id = _this.attr('data-id');
            router.load({
                url: 'pages/product/productDetails.html',
                param: {
                    id: _id
                }
            })
        });
    }

    /**
     *@param 标题型的查询列表
     **/
    pageview.shortList = function($val) {
        common.dataAjax({
            url: searchTitleUrl + "?drugname=" + $val,
            data: {
                word: $val
            },
            method: 'post'
        }).done(function(res) {
            var data = res.returnValue;
            if (data.length > 0) {
                var html = '';
                data.forEach(function(item) {
                    html += '<li class="bui-btn" data-word="' + item.drugname + '"><div class="span1">' + item.drugname + '</div></li>';
                })
                $searchHistory.find('.bui-list').html(html);

            } else {
                pageview.showFn('no')
            }

        }).fail(function(res) {})
        pageview.showFn('history')
    }

    /**
     *@param 结果页数据请求
     **/
    pageview.dataList = function($word) {
        pageview.showFn('list');
        $searchList.find('.bui-list').empty();
        var cstid = "";
        var saledeptid = "";
        var ownerid = "";
        var type = 2;
        if (typeof(userobj) != "undefined") {
            cstid = userobj["cstid"];
            saledeptid = userobj["saledeptid"];
            ownerid = userobj["ownerid"];
            type = $searchList.find('.active-item').attr('data-type');
        }
        common.List({
            id: "#searchScroll",
            url: searchUrl + "?drugname=" + $word + "&cstid=" + cstid + "&saledeptid=" + saledeptid + "&ownerid=" + ownerid + "&isRot=" + type,
            data: {
                word: $word
            },
            // 如果分页的字段名不一样,通过field重新定义
            field: {
                data: "returnValue"
            },
            template: pageview.template
        });
    }

    /**
     *@param 搜索结果列表
     **/
    pageview.template = function(data) {
        var data = data || [],
            html = '';
        $.each(data, function(index, item) {
            html += '<li class="span6" data-id="' + item.id + '">';
            html += '<div class="showL toLink">';
            html += '<div class="img">';
            html += '<img src="' + item.imgSmall + '" alt="">';
            html += '</div>';
            html += '<h3>' + item.drugname + '</h3>';
            html += '<p>规格：' + item.spec + '</p>';
            html += '<span>￥' + item.promotionPrice + '</span>';
            html += '</div>';
            html += '<div class="bui-box bottomB">';
            html += '<div href="#" class="span6 save"><i class="icon_save"></i>收藏</div>';
            html += '<div href="#" class="span6 shop">立即购买</div>';
            html += '</div>';
            html += '</li>';
        });
        return html;
    }

    pageview.init = function() {
        /***获取参数***/
        var params = router.getPageParams();
        // 绑定事件
        this.bind();
        if (params.word) {
            pageview.dataList(params.word)
            $searchInput.val(params.word)
        } else {
            this.history();
        }
        if (typeof(userobj) == "undefined") {
            $searchList.find('.search-result').hide();
        } else {
            $searchList.find('.search-result').show();
        }
    }


    // 初始化
    pageview.init();

})