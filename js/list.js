$(function() {
	//ajax获取json
	$.ajax({
		type: "get",
		url: "../json/list.json",
		async: true,
		success: function(data) {
			addGoodInfor(data);
		}
	})

	//动态创建商品信息
	function addGoodInfor(data) {
		console.log(data);
		var purl = null;
		var name = null;
		var brand = null;
		var mprice = null;
		var sprice = null;
		var tabs = Math.ceil(data.length / 59); //判断有多少页
		loadGoods(1);
		$('.total').html('共' + (data.length + 1) + '件商品');


		$(".page_pre").click(function() {
			loadGoods(1);
			$('.tab').eq(0).addClass('cur');
			$('.tab').eq(0).siblings('.tab').removeClass('cur');
		})
		$(".page_next").click(function() {
			loadGoods(2);
			$('.tab').eq(1).addClass('cur');
			$('.tab').eq(1).siblings('.tab').removeClass('cur');
		})
		$(".goods-container").click(function() {
			loadGoods(2);
			$('.tab').eq(1).addClass('cur');
			$('.tab').eq(1).siblings('.tab').removeClass('cur');
		})
		$('.tab').eq(0).click(function() {
			loadGoods(1);
			$(this).addClass('cur');
			$(this).siblings('.tab').removeClass('cur');
		})
		$('.tab').eq(1).click(function() {
			loadGoods(2);
			$(this).addClass('cur');
			$(this).siblings('.tab').removeClass('cur');
		})

		function loadGoods(tab) { //输入页数
			$('.goods-container').html("");
			for (var i = (tab - 1) * 59; i < 59 * tab; i++) {
				if (!data[i]) {
					return false;
				}
				purl = data[i].url;
				name = data[i].name;
				brand = data[i].brand;
				if (data[i].mprice) {
					mprice = data[i].mprice;
				} else {
					mprice = "no";
				}
				sprice = data[i].sprice;
				$('.goods-container').append(creatGood(purl, name, brand, mprice, sprice));
				if (i == 58) {
					$('.goods-container').append('<div class="block-next-page"><a href="#"><img src="../images/01fa01614784f6239760f1b749663016f1.jpg" alt=""></a></div>')
				}
			}
		}


		function creatGood(url, name, brand, mprice, sprice) { // 返回生成的字符串
			var $good = "<div class='good-info'><div class='tag-container clearfix'></div><div class='good-detail-img'><a href='detail.html' class='good-thumb'><img src='../images/";
			$good += url;
			$good += " 'alt='' class='lazy'></a></div><div class='good-detail-text'><a href='#''>";
			$good += name;
			$good += "</a><p class='brand'><a href='#''>";
			$good += brand;
			$good += "</a></p><p class='price'>";
			if (mprice == "no") {
				$good += "<span class='sale-price'>" + sprice + "</span>";
			} else {
				$good += "<span class='market-price'>" + mprice + "</span><span class='sale-price'>" + sprice + '</span>';
			}
			$good += "</p></div></div>";
			return $good;
		}
	}

	//侧边栏
	$('.product-list-nav').click(function() {
		if ($(this).find('.sort-child-list').is(':hidden')) {
			$(this).addClass('active');
			$(this).find('.sort-child-list').slideDown();
		} else {
			$(this).removeClass('active');
			$(this).find('.sort-child-list').slideUp();
		}
	})

	$('.goods-num-tips').html(countNum());

	function countNum() {
		var totalNum = 0;
		var arr = getGoods();
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i];
			var gid = getCartCookie(name).gid;
			if (!gid) { //判断是否为商品的cookie
				continue;
			} else {
				var num = getCartCookie(name).num * 1;
				totalNum += num;
			}
		}
		return totalNum;
	}

	userStatus();

	function userStatus() {
		if (getCookie('accountLogin')) {
			$('.loginbox').html('<span class="hi">Hi~</span>' + getCookie("accountLogin") + '[<a href="list.html" class="login-out">退出</a>]')
			$('.login-out').click(function() {
				clearCookie('accountLogin');
			})
		}
	}
})