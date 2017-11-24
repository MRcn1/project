$(function(){
	var i=0;
	var timer=null;

	function shijian(){
			timer=setInterval(function(){
			i++
			if (i>2) {i=0}
			$('.last_ul li').eq(i).addClass('red').siblings().removeClass('red');
			$('#sybg .first_ul li').eq(i).fadeIn(200).siblings().fadeOut(200);

		},3700)
	}

	shijian()
	

	$('.last_ul li').hover(function(){
		clearInterval(timer)
	},function(){
		shijian()
	})

	$('.last_ul li').click(function(){
		$(this).addClass('red').siblings().removeClass('red');
		i=$(this).index();
		$('#sybg .first_ul li').eq(i).fadeIn(200).siblings().fadeOut(200);
	})



});


$(function(){
	var i=0;
	var num=($('#snew div').length)-1
	$('.xuanxiangka ul li').eq(0).click(function(){
		i--
		if (i<0) {i=num}
		$('#snew div').eq(i).addClass('new_right_b').siblings().removeClass('new_right_b')
	})	

	$('.xuanxiangka ul li').eq(1).click(function(){
		i++
		if (i>num) {i=0}
		$('#snew div').eq(i).addClass('new_right_b').siblings().removeClass('new_right_b')
	})	
});


