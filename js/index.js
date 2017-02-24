$(function(){

	// 判断cookies
	if(document.cookie.length > 1){
		var cookie = getCookies().account.split('');
		cookie.splice(3,4,'****');
		var userName = cookie.join('');
		$('.loginbox').hide();
		$('.userName').text(userName);
	}else{
		$('.loginbox').show();
		$('.userName').hide();
	}
	$('.logOut').on('click',function(){
		window.location.href = '../index.html';
	})

	banner();
	brandMove();
	brandChange();
	voteBack();
	$.ajax({
		type: "get",
		url: "json/index_floor.json",
		async: true,
		success: function(data){
			var $floorDate = data;
			for(var i=0; i<$floorDate.length; i++){
				//popular-products add pic
				if($floorDate[i].floor == '人气单品'){
					for(var j=0; j<$floorDate[i].pic.length; j++){
						// console.log($floorDate[i].pic[j].url);
						$('#popular-products-list li').eq(j).find('.lazy').attr('src','images/' + $floorDate[i].pic[j].url);
					}
					$('.popular-products-floor .floor-ad').find('.lazy').attr('src','images/' + $floorDate[i].adurl);
				}
				//preference-brand add pic
				if($floorDate[i].floor == '优选品牌'){
					for(var j=0; j<$floorDate[i].pic_page1.length; j++){
						$('.logo-brand .logo-brand-page1').not('.logo-brand-switch, .logo-brand-more').eq(j).find('.lazy').attr('src','images/' + $floorDate[i].pic_page1[j].url);
					}
					for(var j=0; j<$floorDate[i].pic_page1.length; j++){
						$('.logo-brand .logo-brand-page2').not('.logo-brand-switch, .logo-brand-more').eq(j).find('.lazy').attr('src','images/' + $floorDate[i].pic_page2[j].url);
					}
				}
				//new-report add pic
				if($floorDate[i].floor == '最新速报'){
					for(var j=0; j<$floorDate[i].pic.length; j++){
						$('.report-list li').eq(j).find('.lazy').attr('src','images/' + $floorDate[i].pic[j].url);
					}
					$('.report-last-item').find('.lazy').attr('src','images/' + $floorDate[i].lasturl);
					$('.floor-ad').find('.lazy').attr('src','images/' + $floorDate[i].adurl);
				}
				//clsz add pic
				if($floorDate[i].floor == '潮流上装'){
					for(var j=0; j<$floorDate[i].pic.length; j++){
						$('.clsz .lazy')[j].src = 'images/' + $floorDate[i].pic[j].url;
					}
				}
				//clxz add pic
 				if ($floorDate[i].floor == "潮流下装") {
 					for (var j = 0; j < $floorDate[i].pic.length; j++) {
 						$('.clxz .lazy')[j].src = 'images/' + $floorDate[i].pic[j].url;
 					}
 				}
				//ssxl add pic
 				if ($floorDate[i].floor == "时尚鞋履") {
 					for (var j = 0; j < $floorDate[i].pic.length; j++) {
 						$('.ssxl .lazy')[j].src = 'images/' + $floorDate[i].pic[j].url;
 					}
 				}

 				//crps add pic
 				if ($floorDate[i].floor == "潮人配饰") {
 					for (var j = 0; j < $floorDate[i].pic.length; j++) {
 						$('.crps .lazy')[j].src = 'images/' + $floorDate[i].pic[j].url;
 					}
 				}

 				//newarrivals add info
 				if ($floorDate[i].floor == "最新上架") {
 					for (var j = 0; j < $floorDate[i].info.length; j++) {
 						$('.newarrivals .lazy')[j].src = 'images/' + $floorDate[i].info[j].url;

 						$($('.newarrivals .good-detail-text')[j]).find('a').html($floorDate[i].info[j].name);
 						$($('.newarrivals .good-detail-text')[j]).find('span').html($floorDate[i].info[j].price);
 					}
 				}
			}
		}
	})

	function banner(){ //图片轮播
		var $bannerLi = $('.slide-container li');
		var $bannerIndex = 0;
		var $bannerTimer = setInterval(move, 4000);
		function move() {
			$bannerLi.eq($bannerIndex).fadeIn(500).siblings().fadeOut(500);
			$('.thumb-pagination a').removeClass().eq($bannerIndex).addClass('focus');
			$bannerIndex++;
			if ($bannerIndex > 7) {
 				$bannerIndex = 0;
 			}
 			if ($bannerIndex < 0) {
 				$bannerIndex = 7;
 			}
		}
		$('.banner a').hover(function() {
 			clearInterval($bannerTimer);
 		}, function() {
 			$bannerTimer = setInterval(move, 4000);
 		})
 		$('#bannerNext').click(function() {
 			move();
 		});
 		$('#bannerPrev').click(function() {
 			$bannerIndex -= 2;
 			move();
 		});
 		$('.thumb-pagination li').mouseenter(function() {
 			$bannerIndex = $(this).index();
 			move();
 		});
	};

	function brandMove(){
		var w = 1158;
		var leftVal = 0;
		var timer = null;
		var flag = true;
		for(var i=0; i<3; i++){
			$('.img-brand-list li').eq(i).clone().appendTo('.img-brand-list')
		}
		timer = setInterval(Move,3000);
		$('.img-brand').hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(Move,3000)
		});

		function Move(){
			if(leftVal == -3 * w){
				$('.img-brand-list').css({
					'left':0
				});
				leftVal = 0;
			}
			leftVal -= w;
			$('.img-brand-list').stop().animate({
				'left': leftVal
			},500)
		};
		$('#brand_next').click(function(){
			Move();
		});
		$('#brand-prev').click(function(){
			if(leftVal == 0){
				$('img-brand-list').css({
					'left': -3 * w
				});
				leftVal = -3 * w;
			}
			leftVal += w;
			$('.img-brand-list').stop().animate({
				'left': leftVal
			},500)
		});
	};

	function brandChange(){
		$('.logo-brand .iconfont').click(function(){
			if($('.logo-brand-page1').is(':hidden')){
				$('.logo-brand-page1').stop().slideDown();
			}else{
				$('.logo-brand-page1').stop().slideUp();
			}

			if($('.logo-brand-page2').is(':hidden')){
				$('.logo-brand-page2').stop().slideDown();
			}else{
				$('.logo-brand-page2').stop().slideUp();
			}
		});
	};

	function voteBack(){
		$('#feed-back-page span').each(function(i){
			$(this).click(function(){
				$(this).addClass('cur').siblings().removeClass('cur');
				$('.vote li').eq(i).removeClass('hide').siblings().addClass('hide');
			});
		})
	};
})