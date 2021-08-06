
(function($){

	$.fn.rTabs = function(options){

		// Defaults
		var defaultVal = {
			btnClass:'.j-tab-nav',	/*The parent Class of the button*/
			conClass:'.j-tab-con',	/*The parent class of the content*/
			bind:'hover',	/*Event parameter click,hover*/
			animation:'0',	/*Animation direction left,up,fadein,0 No animation*/
			speed:300, 	/*Animation movement speed*/
			delay:200,	/*Tab delay speed*/
			auto:false,	/*Whether to turn on automatic operation true,false*/
			autoSpeed:3000	/*Automatic running speed*/
		};

		// Global variable
		var obj = $.extend(defaultVal, options),
			evt = obj.bind,
			btn = $(this).find(obj.btnClass),
			con = $(this).find(obj.conClass),
			anim = obj.animation,
			conWidth = con.width(),
			conHeight = con.height(),
			len = con.children().length,
			sw = len * conWidth,
			sh = len * conHeight,
			i = 0,
			len,t,timer;

		return this.each(function(){

			// Determine the direction of the animation
			function judgeAnim(){
				var w = i * conWidth,
					h = i * conHeight;
				btn.children().removeClass('current').eq(i).addClass('current');
				switch(anim){
					case '0':
					con.children().hide().eq(i).show();
					break;
					case 'left':
					con.css({position:'absolute',width:sw}).children().css({float:'left',display:'block'}).end().stop().animate({left:-w},obj.speed);
					break;
					case 'up':
					con.css({position:'absolute',height:sh}).children().css({display:'block'}).end().stop().animate({top:-h},obj.speed);
					break;
					case 'fadein':
					con.children().hide().eq(i).fadeIn();
					break;
				}
			}

			// Determine the type of event
			if(evt == "hover"){
				btn.children().hover(function(){
					var j = $(this).index();
					function s(){
						i = j;
						judgeAnim();
					}
					timer=setTimeout(s,obj.delay);
				}, function(){
					clearTimeout(timer);
				})
			}else{
				btn.children().bind(evt,function(){
					i = $(this).index();
					judgeAnim();
				})
			}

			// automatic running
			function startRun(){
				t = setInterval(function(){
					i++;
					if(i>=len){
						switch(anim){
							case 'left':
							con.stop().css({left:conWidth});
							break;
							case 'up':
							con.stop().css({top:conHeight});
						}
						i=0;
					}
					judgeAnim();
				},obj.autoSpeed)
			}

			// If autorun is on，call autorun function
			if(obj.auto){
				$(this).hover(function(){
					clearInterval(t);
				},function(){
					startRun();
				})
				startRun();
			}

		})

	}

})(jQuery);
