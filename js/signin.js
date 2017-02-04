$(function(){
// 顶部MY有货弹出
myYoho();
function myYoho(){
	$('.tool-options').mouseenter(function(){
		$('.tool-select').stop().fadeIn();
	})
	$('.tool-options').mouseleave(function(){
		$('.tool-select').stop().fadeOut();
	})
}

// 地址选择
$('#country-code').click(function(event){
	$('#country-list').slideDown();
	event.stopPropagation();
})
$('#country-list li').click(function(event){
	$('#country-code i:first-child').html($(this).html());
	$('#country-list').slideUp();
	event.stopPropagation();
})
$('body').click(function(){
	$('#country-list').slideUp();
})

// 切换登陆方式
$('.switch .left').click(function(){
	$(this).addClass('selected');
	$('.switch .right').removeClass('selected');
	$('.password-login').removeClass('hide');
	$('.sms-login').addClass('hide');
})
$('.switch .right').click(function(){
	$(this).addClass('selected');
	$('.switch .left').removeClass('selected');
	$('.password-login').addClass('hide');
	$('.sms-login').removeClass('hide');
})

// 邮箱手机号码登陆框
var ac1 = null;
$('#account1').blur(function(){
	var $account = $(this).val();
	var numreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if($account.length == 0){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('请输入帐户名');
		ac1 = false;
	}else if($account.length != 11 || !numreg.test($account)){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('输入信息出错');
		ac1 = false;
	}else if($account != getCookies('account')){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('您输入的手机号码尚未注册');
		ac1 = false;
	}else if($account == getCookies('account')){
		$(this).css('border-color','#dbdbdb');
		$(this).next().addClass('hide');
		ac1 = true;
	}
})


//密码框
var pass = null;
$('#password').blur(function(){
	var $pwd = $(this).val();
	var reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	console.log($pwd);
		console.log(reg.test($pwd));
	if($pwd.length == 0){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('请输入密码');
		pass = false;
	}else if(!reg.test($pwd)){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('请输入长度为6-20字符的密码');
		pass = false;
	}else if(reg.test($pwd) && $pwd != getCookies('pwd')){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('密码输入错误');
		pass = false;
	}else if($pwd == getCookies('pwd')){
		$(this).css('border-color','#dbdbdb');
		$(this).next().addClass('hide');
		pass = true;
	}
})


//手机短信验证账号
var ac2= null;
$('#account2').blur(function(){
	var $account = $(this).val();
	var numreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))\d{8})$/;
	if($account.length == 0){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('请输入账号');
		ac2 = false;
	}else if($account.length != 11 || !numreg.test($account)){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('输入信息出错');
		ac2 = false;
	}else if($account != getCookies('account')){
		$(this).css('border-color','red');
		$(this).next().removeClass('hide');
		$(this).next().find('em').html('您输入的手机号码尚未注册');
		ac2 = false;
	}else if($account == getCookies('account')){
		$(this).css('border-color','#dbdbdb');
		$(this).next().addClass('hide');
		ac2 = true;
	}
})


// 验证码
var sms = null;
$('.change-captcha-sms').click(function(){
	$(this).html('短信已发送');
	$(this).css('background','#555');
	$('#captcha-sms').css('border-color','red');
	$('#captcha-sms').blur(function(){
		var msgcode = $(this).val();
		if(msgcode.length != 4){
			$('#captcha-sms').css('border-color','red');
			$(this).siblings('.err-tip').removeClass('hide').find('em').html('请输入长度为4字符的验证码');
			sms = false;
		}else{
			$('#captcha-sms').css('border-color','#dbdbdb');
			$(this).siblings('.err-tip').addClass('hide');
			sms = true;
		}
	})
})

$('#login-btn').click(function(){
	if((ac1 && pass) || (ac2 && sms)){
		//判断是否登陆成功，成功传入一个确认的cookie
		if((ac1 && pass)){
			var accountLogin = $('#account1').val();
		}else if((ac2 && sms)){
			var accountLogin = $('#account2').val();
		}
		setCookies('accountLogin', accountLogin.toString(), 7);
		window.location.href = '../index.html';
	}else {
		return false;
	}
})



















})