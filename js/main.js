function showMain(){
	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {//选择所有带data-type的元素	
		//attr() 方法设置或返回被选元素的属性值。
		//data() 方法向被选元素附加数据，或者从被选元素获取数据。
		//$(selector).data(name,value)这是向被选元素附加数据。
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){
	
		// Store some variables based on where we are
		var $self = $(this),//这个self代表的是section
			offsetCoords = $self.offset(),//offset() 方法返回或设置匹配元素相对于文档的偏移（位置）
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    $(window).scroll(function() {
	
			// If this section is in view
			//scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置。
			//$window.height()显示浏览器窗口可见部分的高度，不包括状态栏和菜单栏等，只包括显示网页内容的部分，也就是上面说的浏览器客户区
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed')); 
				
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position
				var coords = '50% '+ yPos + 'px';

				// Move the background
				$self.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); // sprites
				
			}; // in view
	
		}); // window scroll
			
	});	// each data-type

} // document ready


function finish(){
            //动画加载完成后的代码 
            if(!loader.isAnimating ){
              $(".container").addClass('show');
              loader.hide();
              showMain();
            }
            else{
              setTimeout(finish,200)
            }
          }
          $(document).ready(function() {
            loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout } );
            loader.show(function(){
              loader.isAnimating =false;
            })
          });
        $(window).load(function() {//加载完成
          finish();
        });
        $(function(){ 
          $(window).scroll(function() {   
            if($(window).scrollTop() >= 100){
              $('.actGotop').fadeIn(300); 
            }else{    
              $('.actGotop').fadeOut(300);    
            }  
          });
          $('.actGotop').click(function(){
            $('html,body').animate({scrollTop: '0px'}, 800);}); 
        });
