$(function() {
	returnTop('return-top', 500);

	/*回滚按钮
	 *btn:按钮的class名
	 *speed:执行时间ms
	 */
	function returnTop(btn, speed) {
		var $btn = $('.' + btn);
		var $speed = speed;
		$(window).scroll(function() {
			if ($(window).scrollTop() > 0) {
				$btn.fadeIn('normal');
			} else {
				$btn.fadeOut('normal');
			}
		});
		$btn.click(function() {
			$('body,html').stop().animate({
				scrollTop: 0
			}, $speed, function() {
				$btn.fadeOut('normal');
			})
		})
	}

})