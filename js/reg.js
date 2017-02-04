$(function(){
	$('.captcha-show').html(randomCode());

	myYoho();
	// 顶部MY有货弹出
	function myYoho(){
		$('.tool-options').mouseenter(function(){
			$('.tool-select').stop().fadeIn();
		})
		$('.tool-options').mouseleave(function(){
			$('.tool-select').stop().fadeOut();
		})

		reg();
		// 注册判断
		function reg(){
			var phonenumCheck = false;
			var randomCheck = false;
			var magCheck = false;
			var pwdCheck = false;
			$('#region option').click(function(){
				// 手机号输入框变红
				$('#phone-num').css('border-color','red');
				// 提示：请输入手机号
				$('#err-tip').show().find('span').html('请输入手机号码');
				$('err-tip').css({
					'left': '815.5px',
					'top': '210px'
				});
				// 更改号码框默认开头
				$('#country-code').html($(this).val());
			});

			$('#phone-num').keyup(function(){
				 // 手机号输入框变红
				 $(this).css('border-color','red');
				 var $num = $('#phone-num').val();
				 var numreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				 $('#err-tip').css({
				 	'left': '815.5px',
				 	'top': '210px'
				 });
				 if($num.length == 0) {
				 	$('#err-tip').show().find('span').html('请输入手机号码');
				 	phonenumCheck = false;
				 }else if($num.length != 11 || !numreg.test($num)){
				 	$('#err-tip').show().find('span').html('手机号码格式不正确，请重新输入');
				 	phonenumCheck = false;
				 }else {
				 	$('#err-tip').hide();
				 	$(this).css('border-color','#dbdbdb');
				 	phonenumCheck = true;
				 }

				 if(phonenumCheck && randomCheck){
				 	showMsg();
				 }else{
				 	hideMsg();
				 }
				 unlockRegBtn();
			});

			$('.captcha-change').click(function(){
				$('.captcha-show').html(randomCode());
			});

			$('.captcha').keyup(function(){
				$(this).css('border-color','red');
				var $inputCode = $(this).val();
				$('#err-tip').css({
					'left': '759.5px',
					'top': '280px'
				});
				var $randomCode = $('.captcha-show').html();
				if($inputCode.length != 4){
					$('#err-tip').show().find('span').html('图形验证码为4位');
					randomCheck = false;
				}else if($inputCode.length == 4 && $inputCode != $randomCode){
					$('#err-tip').show().find('span').html('图形验证码错误');
					randomCheck = false;
				}else{
					$('#err-tip').hide();
					$(this).css('border-color','#dbdbdb');
					randomCheck = true;
				}

				if(phonenumCheck && randomCheck){
					showMsg();
				}else{
					hideMsg();
				}
				unlockRegBtn();
			})

			$('#msg-captcha').keyup(function(){
				$(this).css('border-color','red');
				var msgcode = $(this).val();
				$('#err-tip').css({
					'left': '759.5px',
					'top': '350px'
				});
				if(msgcode.length != 4){
					$('#err-tip').show().find('span').html('短信验证码错误');
					magCheck = false;
				}else{
					$('#err-tip').hide();
					$(this).css('border-color','#dbdbdb');
					magCheck = true;
				}
				unlockRegBtn();
			})

			$('#pwd').focus(function(){
				$('#pwd-tips').removeClass('hide');
			})

			$('#pwd').blur(function(){
				$('#pwd-tips').addClass('hide');
			})

			$('#pwd').keyup(function(){
				var pwdcode = $(this).val();
				var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
				$(this).css('border-color','red');
				if(reg.test(pwdcode)){
					$(this).css('border-color','#dbdbdb');
					pwdCheck = true;
				}else{
					$(this).css('border-color','red');
					pwdCheck = false;
				}
				unlockRegBtn();
			})

			function unlockRegBtn(){
				if(phonenumCheck && randomCheck && magCheck && pwdCheck){
					$('#register-btn').removeClass('disable');
					$('#register-btn').click(function(){
						var account = $('#phone-num').val();
						var pwd = $('#pwd').val();
						setCookies('account', account.toString(), 7);
						setCookies('pwd', pwd, 7);
						window.location.href = 'signin.html';
					})
				}else{
					$('#register-btn').addClass('disable');
					$('#register-btn').unbind('click');
				}
			}


			function showMsg(){
				$('#send-captcha').css('background','#ff1901');
				$('#send-captcha').click(function(){
					$('#send-captcha').val('短信已发送');
					$('#msg-tip').removeClass('hide');
					hideMsg();
				})
			}


			function hideMsg(){
				$('#send-captcha').css('background','#555');
				$('#send-captcha').unbind('click');
			}
		}
		
	}

	
	/*随机生成数字*/
	function randomCode(){
		var str = '';
		var leng = 4;
		var cnt = 0;
		while(cnt < leng){
			var num = Math.floor(Math.random() * 75 + 48);
			if((num < 57) || (num >= 65 && num <= 90) || num >= 97){
				var code = String.fromCharCode(num);
				str += code;
				cnt ++;
			}
		}
		return str;
	}
})