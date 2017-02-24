

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
	// 图片轮播
	var newArrival = $('.new-arrival');
	var recommend = $('.recommend');
	changeImg(newArrival);
	changeImg(recommend);
	function changeImg(select){
		var num = 0;
		var NewArrivalNext = select.find('.next');
		var NewArrivalPre = select.find('.pre');	
		var NewArrivalUl = select.find('ul');
		var NewArrivalLis = select.find('li');
		var NewArrivalLiLength = NewArrivalLis[0].offsetWidth;
		var changeNum = Math.floor(NewArrivalLis.length/(select.width()/NewArrivalLiLength));
		NewArrivalUl.width(NewArrivalLis.length * NewArrivalLiLength);
		NewArrivalNext.on('click',function(){
			var that = $(this);
			imgClick(that);
		})
		NewArrivalPre.on('click',function(){
			var that = $(this);
			imgClick(that);
		})
		
		function imgClick(that){
			if(that.hasClass('next')){
				num ++;
				if(num > 0) {
					that.siblings().removeClass('no-visible');
				}
				if(num >= changeNum){
					that.addClass('no-visible');
					num = changeNum;
				}
			}else if(that.hasClass('pre')){
				num --;
				if(num <= 0) {
					that.addClass('no-visible');
					num = 0;
				}
				if(num < changeNum){
					that.siblings().removeClass('no-visible');
				}
			}

			that.parent().parent().parent().find('ul').animate({
				marginLeft:-NewArrivalLiLength * 5 * num
			})
		}

	}
	// var num = 0;
	// var NewArrivalNext = $(".new-arrival").find('.next');
	// var NewArrivalPre = $(".new-arrival").find('.pre');
	// var NewArrivalUl = $(".new-arrival").find('ul');
	// var NewArrivalLis = $(".new-arrival").find('li');
	// var NewArrivalLiLength = NewArrivalLis[0].offsetWidth;
	// NewArrivalNext.on('click',function(){
	// 	num ++;
	// 	if(num > 0) {
	// 		$(this).siblings().removeClass('no-visible');
	// 	}
	// 	if(num >= 2){
	// 		$(this).addClass('no-visible');
	// 		num = 2;
	// 	}
	// 	$(this).parent().parent().parent().find('ul').animate({
	// 		marginLeft:-NewArrivalLiLength * 5 * num
	// 	})
	// })
	// NewArrivalPre.on('click',function(){
	// 	num --;
	// 	if(num <= 0) {
	// 		$(this).addClass('no-visible');
	// 		num = 0;
	// 	}
	// 	if(num < 2){
	// 		$(this).siblings().removeClass('no-visible');
	// 	}
	// 	$(this).parent().parent().parent().find('ul').animate({
	// 		marginLeft:-NewArrivalLiLength * 5 * num
	// 	})
	// })
	// NewArrivalUl.width(NewArrivalLis.length * NewArrivalLiLength);
})
function getCookies(name){
	if(document.cookie){
		var coo = document.cookie;
		var arr1 = coo.split('; ');
		var arr2 = [];
		for(var i=0; i<arr1.length; i++){
			arr2.push(arr1[i].split('='));
		}
		if(name){
			for(var j=0; j<arr2.length; j++){
				if(arr2[j][0] == name){
					return unescape(arr2[j][1]);
				}
			}
		}else{
			var obj = {};
			for(var j=0; j<arr2.length; j++){
				obj[arr2[j][0]] = unescape(arr2[j][1]);
			}
			return obj;
		}
	}else{
		return false;
	}
};
function clearCookies(name){
	setCookies(name,'',-1);
};