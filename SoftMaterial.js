(function(window){
  if(window.Package){
    Softmaterial = {};
  } else {
    window.Softmaterial = {};
  }
})(window);


// Unique Random ID
Softmaterial.rand = (function(num) {
	return function(num){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < num; i++ ){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}
})();


;(function($) {
	//'use strict';
	$debug = false;	//debug console
	var version = detectCompatibility();
	
	$mousedown = false;
	var startTime, endTime;
	var colorObj = ['white', 'default', 'purple', 'primary', 'transparent', 'grey', 'pink', 'deepPurle', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'amber', 'orange', 'brown', 'blueGrey'];
	var classes = '\\b(' + colorObj.join('|') + ')\\b', regex = new RegExp(classes, 'i');
	

	if($debug == true){ console.log(window.navigator.userAgent); }
	
	function detectCompatibility(){
		var ua = window.navigator.userAgent;
		var detComp = new Array();
		
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			return 'MSIE, ' + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			var rv = ua.indexOf('rv:');
			return 'Trident, ' + parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			return 'Edge, ' + parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		
		var chrome = ua.indexOf('Chrome/');
		if(chrome > 0){
			return 'Chrome, ' + parseInt(ua.substring(chrome + 7, ua.indexOf('.', chrome)), 10);
		}

		return false;
	}
	
	function validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	function validateHttp(url) {
		var pattern = /(http|ftp|https)?(:\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		return pattern.test(url);
	}
	
	$('.btn').each(function(){
		var elClasses = ' ' + $(this).attr('class').replace(/\s+/, ' ') + ' ';
		if($debug == true) console.log(elClasses, regex);
		if(!regex.test(elClasses)){
			$(this).addClass('default');
		}
	});
	
	function dumpComputedStyles(elem,prop) {
		var cs = window.getComputedStyle(elem,null);
		if (prop) {
			console.log(prop+" : "+cs.getPropertyValue(prop));
			return;
		}
		var len = cs.length;
		for (var i=0;i<len;i++) {
			var style = cs[i];
			console.log(style+" : "+cs.getPropertyValue(style));
		}
	}
	
	Softmaterial.materialButtonMouseDown = function(this_, e){
		var target = this_;

		var rect = target.getBoundingClientRect();
		var ripple = target.querySelector('.ripple');
		
		
		ripple = document.createElement('div');
		ripple.className = 'ripple';

		if(target.classList.contains('white') || target.classList.contains('default') || target.classList.contains('btn-flat') || target.classList.contains('transparent')){
			if(target.classList.contains('btn-flat')){							
				colorObj.forEach(function(entry){
					if(target.classList.contains(entry)){
						//ripple.style.backgroundColor = 'white';//window.getComputedStyle(document.querySelector('.' + entry), '').backgroundColor;
						ripple.classList.add(entry);
					}
				});
			}else{
				ripple.style.background = ' -webkit-radial-gradient(rgba(0,0,0,.4) 0,rgba(0,0,0,.5) 40%,rgba(0,0,0,.6) 50%,rgba(0,0,0,.7) 60%,rgba(0,0,0,0) 70%)';
			}
		}else{
			ripple.style.backgroundColor = 'rgb(255,255,255)';
		}
		target.appendChild(ripple);
		//w/8
		
		var xPosition = e.clientX - target.getBoundingClientRect().left;
		var yPosition = e.clientY - target.getBoundingClientRect().top;
		// in case of a wide border, the boarder-width needs to be considered in the formula above
		ripple.style.left = xPosition + "px";
		ripple.style.top = yPosition + "px";
		ripple.classList.add('ripple_show');
		
		ripple.style.transform = "scale("+ (target.clientWidth / 8 ) +")";
		
		startTime = new Date().getTime();
	};
	
	Softmaterial.materialButtonMouseUp = function(this_, e){
		endTime = new Date().getTime();
		var target = this_;
		var ripple = target.querySelectorAll('.ripple');

		
		if(endTime - startTime < 250){
			$mousedown = false;
			setTimeout(function(){
				$(ripple).removeClass('ripple_show').addClass("ripple_hide");
				setTimeout(function(){
					$(ripple).remove();
					//if($debug == true){ console.log('Removed'); }
				}, 250);
			}, 450);
		}else if(endTime - startTime >= 300){
			$mousedown = true;
			$(ripple).removeClass('ripple_show').addClass("ripple_hide");
			setTimeout(function(){
				$(ripple).remove();
				//if($debug == true){ console.log('Removed'); }
			}, 250);
		}
	};
	
	Softmaterial.materialButtonMouseOut = function(this_, e){
		var target = this_;
		var ripple = target.querySelectorAll('.ripple');
		setTimeout(function(){
			$(ripple).removeClass('ripple_show').addClass("ripple_hide");
			setTimeout(function(){
				$(ripple).remove();
				//if($debug == true){ console.log('Removed'); }
			}, 250);
		}, 450);		
	};

	$('.btn').mousedown(function(e){
		Softmaterial.materialButtonMouseDown(this, e);
	}).mouseup(function(e){
		Softmaterial.materialButtonMouseUp(this, e);
	}).mouseout(function(e){
		Softmaterial.materialButtonMouseOut(this, e);
	});
	
	
	$('.input-checkbox').mousedown(function(e){
		var target = this;
		
		var check_ = target.querySelectorAll('input');
		
		if(!$(check_).is(':disabled')){
	
			if(e.button === 2) {
				return false;
			}

			if($(this).find('.ripple_static').length === 0) { 
				$(this).append('<span class="ripple_static"></span>');
			}
			
			var ripple = target.querySelectorAll('.ripple_static');	

			
			console.log(ripple);

			w = $(this).outerWidth();
			h = $(this).outerHeight();
			size = Math.max(w, h);
			$(ripple).css({'width': size, 'height': size});
			$(ripple).removeClass('ripple_static_hide').addClass('ripple_static_show');

			$(this).on('mouseup', function() {
				setTimeout(function () {
					$(ripple).removeClass('ripple_static_show').addClass('ripple_static_hide');
				}, 250);
			});
		}
	});
	
	$('.input-radio').mousedown(function(e){	
		var target = this;
		
		var check_ = target.querySelectorAll('input');
		
		if(!$(check_).is(':disabled')){
	
			if(e.button === 2) {
				return false;
			}

			if($(this).find('.ripple_static').length === 0) { 
				$(this).append('<span class="ripple_static"></span>');
			}
			
			var ripple = target.querySelectorAll('.ripple_static');	


			w = $(this).outerWidth();
			h = $(this).outerHeight();
			size = Math.max(w, h);
			$(ripple).css({'width': size, 'height': size});
			$(ripple).removeClass('ripple_static_hide').addClass('ripple_static_show');

			$(this).on('mouseup', function() {
				setTimeout(function () {
					$(ripple).removeClass('ripple_static_show').addClass('ripple_static_hide');
				}, 250);
			});
		}
	});
	
	$('.toggle-checkbox').mousedown(function(e){
		var target = this;
		
		var check_ = target.querySelectorAll('input');
		
		if(!$(check_).is(':disabled')){
	
			if(e.button === 2) {
				return false;
			}

			if($(this).find('.ripple_static').length === 0) { 
				$(this).append('<span class="ripple_static"></span>');
			}
			
			var ripple = target.querySelectorAll('.ripple_static');	

			w = $(this).outerWidth();
			h = $(this).outerHeight();
			size = Math.max(w, h);
			$(ripple).css({'width': size, 'height': size}); 
			
			$(ripple).removeClass('ripple_static_hide').addClass('ripple_static_show');

			$(this).on('mouseup', function() {
				/*if(!$(check_).is(':checked')){
					$(ripple).animate({left : '10px'}, 100);
				}else{
					$(ripple).animate({left : '-10px'}, 100);
				}*/
				setTimeout(function () {
					$(ripple).removeClass('ripple_static_show').addClass('ripple_static_hide');
				}, 250);
			});
		}
	});
	


	$('.dropdown-button').on('click', function(){
		var DataDropdownMenu = $(this).data('dropdown-id');
		var dataColor = $('#' + DataDropdownMenu).data('color');
		
		if($debug == true){ console.log("DropDown", $('#' + DataDropdownMenu).css('display')); }
		
		if($('#' + DataDropdownMenu).css('visibility') == "hidden"){
			var dtx = parseInt($('#' + DataDropdownMenu).offset().left) + parseInt($('#' + DataDropdownMenu).css('width')) + 20;
			var dty = parseInt($('#' + DataDropdownMenu).offset().top) + parseInt($('#' + DataDropdownMenu).css('height')) + 20;
			var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
			
			if(dtx > screen.width){
				$('#' + DataDropdownMenu).css('right',  "0px");
			}
			if(!(parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().bottom) + parseInt($('#' + DataDropdownMenu).css('height')) + 100 < 0 || parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().top) + parseInt($('#' + DataDropdownMenu).css('height')) - viewHeight >= 0)){
			}else{
				$('#' + DataDropdownMenu).css('top',  "-130px");
			}
			/*if(dty > viewHeight){
				
			}*/
			
			$('#' + DataDropdownMenu).css({'visibility': 'visible', 'opacity': '1', 'transform': 'scale(1)'});
		}
		
		$(this).toggleClass('active');
		
		$('#' +DataDropdownMenu + ' li a').addClass('drp-list');
		
		$('.drp-list').mousedown(function(e){
			var target = this;
			var rect = target.getBoundingClientRect();
			var ripple = target.querySelector('.ripple');
			
			
			ripple = document.createElement('div');
			ripple.className = 'ripple';

			if(target.classList.contains('white') || target.classList.contains('default') || target.classList.contains('btn-flat') || target.classList.contains('transient')){
				if(target.classList.contains('btn-flat')){							
					colorObj.forEach(function(entry){
						if(target.classList.contains(entry)){
							ripple.style.backgroundColor = getComputedStyle(document.querySelector('.' + entry), '').backgroundColor;
						}
					});
					
				}else{
					ripple.style.background = ' -webkit-radial-gradient(rgba(0,0,0,.4) 0,rgba(0,0,0,.5) 40%,rgba(0,0,0,.6) 50%,rgba(0,0,0,.7) 60%,rgba(0,0,0,0) 70%)';
				}
			}else{
				ripple.style.backgroundColor = 'rgba(255,255,255, .3)';
			}
			target.appendChild(ripple);
			//w/8
			
			var xPosition = e.clientX - target.getBoundingClientRect().left;
			var yPosition = e.clientY - target.getBoundingClientRect().top;
			// in case of a wide border, the boarder-width needs to be considered in the formula above
			ripple.style.left = xPosition + "px";
			ripple.style.top = yPosition + "px";
			ripple.classList.add('ripple_show');
			
			ripple.style.transform = "scale("+ (target.clientWidth / 8 ) +")";
			
			startTime = new Date().getTime();
		}).mouseup(function(e){
			endTime = new Date().getTime();
			var target = this;
			var ripple = target.querySelectorAll('.ripple');

			
			if(endTime - startTime < 250){
				$mousedown = false;
				setTimeout(function(){
					$(ripple).removeClass('ripple_show').addClass("ripple_hide");
					setTimeout(function(){
						$(ripple).remove();
						//if($debug == true){ console.log('Removed'); }
					}, 250);
				}, 450);
			}else if(endTime - startTime >= 300){
				$mousedown = true;
				$(ripple).removeClass('ripple_show').addClass("ripple_hide");
				setTimeout(function(){
					$(ripple).remove();
					//if($debug == true){ console.log('Removed'); }
				}, 250);
			}
			
		}).mouseout(function(e){
			var target = this;
			var ripple = target.querySelectorAll('.ripple');
			setTimeout(function(){
				$(ripple).removeClass('ripple_show').addClass("ripple_hide");
				setTimeout(function(){
					$(ripple).remove();
					//if($debug == true){ console.log('Removed'); }
				}, 250);
			}, 450);
		});
		
		$(document).mouseup(function(){
			if($('#' + DataDropdownMenu).css('visibility') == "visible"){
				$('#' + DataDropdownMenu).css({'visibility': 'hidden', 'opacity': '0', 'transform': 'scale(0.9)'});
				$(".dropdown-button").removeClass("active");
				//if($debug == true){ console.log("DropDown", $('#' + DataDropdownMenu).css('display')); }
				
				setTimeout(function(){
					if(dtx < screen.width){ 
						$('#' + DataDropdownMenu).css('right',  "");
					}
					if(!(parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().bottom) + parseInt($('#' + DataDropdownMenu).css('height')) + 100 < 0 || parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().top) + parseInt($('#' + DataDropdownMenu).css('height')) - viewHeight >= 0)){
						$('#' + DataDropdownMenu).css('top',  "");
					}
				}, 250);
			}
		});
	});
	
	$('.input-material').on('keyup', function(){
		input_material($(this));
	});
	$('textarea[data-autoresize]').on('keydown', function(){
		if($(this)[0].nodeName.toLowerCase() == "textarea"){
			var number = function (n) {
				var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
				return reg.test(n)
			}
			var maxlength = '', minlength = 0;
			var offset = this.offsetHeight - this.clientHeight;

			
			if(number($(this).data('maxcharacters')) != undefined || number($(this).data('maxcharacters')) == true){ maxlength = $(this).data('maxcharacters'); $('.characters_count').text($(this).val().length + ' / ' + maxlength); }
			if(number($(this).data('mincharacters')) != undefined || number($(this).data('mincharacters')) == true){ minlength = $(this).data('mincharacters'); }
			
				
			var resizeTextarea = function(el) {
				$(el).css('height', 'auto').css('height', el.scrollHeight + offset);
			};
			$(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
		}
	});
	
	$('.input-material').on('focus', function(){
		
		input_material($(this));
		
	});
	
	$('.input-material').on('change', function(){
		input_material($(this));
	});
	
	
	var input_material = function(e){
		/*if($(this).siblings('label').text($(this)[0].placeholder) == null){
			$(this).siblings('label').text($(this)[0].placeholder);
		}else{
			//$(this)[0].placeholder = (this).siblings('label').text();
		}*/
		
		
		if(e.siblings('label')){
			if(e.val() != ''){
				e.addClass('full'); 
			}else{
				e.removeClass('full');
			}
		}
		if(e[0].type.toLowerCase() == "email"){
			
			if(validateEmail(e.val()) == false){
				e.parent().removeClass("success_input").addClass("error_input");
			}else if(validateEmail(e.val()) == true){
				e.parent().removeClass("error_input").addClass("success_input");
			}
		}else{
			if(e.prop('required') && e.val() == ''){
				e.parent().addClass("error_input");
			}else{
				e.parent().removeClass("error_input");
			}
		}
		
		if(e[0].nodeName.toLowerCase() == "textarea"){
			
			var number = function (n) {
				var reg = new RegExp("^[-]?[0-9]+[\.]?[0-9]+$");
				return reg.test(n)
			}
						
			var maxlength = '', minlength = 0;
			if(number(e.data('maxcharacters')) != undefined || number(e.data('maxcharacters')) == true){ maxlength = e.data('maxcharacters'); }
			if(number(e.data('mincharacters')) != undefined || number(e.data('mincharacters')) == true){ minlength = e.data('mincharacters'); }
			
			
			if(maxlength <= 0 || maxlength != undefined){
				//e.attr('maxlength', maxlength);
				if(e.parent().find(".characters_count").length < 1){
					e.parent().append('<span class="characters_count">' + e.val().length + ' ' + maxlength + '</span>');
				}
				
				$('.characters_count').text(e.val().length + ' / ' + maxlength);
				
				if(e.val().length > maxlength){
					e.parent().find(".characters_count").css({'color': 'red'});
					e.parent().addClass("error_input");
				}else{
					e.parent().find(".characters_count").css({'color': ''});
					e.parent().removeClass("error_input");
				}
			}
			
			
		}
		
	}
	
}(jQuery));	
;(function($) {
	/*
	 *	INPUT FILE MATERIAL	
	 */
	 
	var input_material_file_ = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);

			return this.each(function(i){
				var dataName = $(this).data('name');
				var dataBg = $(this).data('color');
				var placeholder = $(this)[0].placeholder;

				if(placeholder == undefined){
					placeholder = '';
				}

				if($(this).attr('type') == 'file'){
					$(this).after('<div style="display: flex;"><button class="btn btn-shadow ' + dataBg + '">' + dataName + '</button><input type="text" class="input-material file-path" placeholder="' + placeholder + '"/></div>');
					
					$(this).on('change', function(ex){ 
						$(this).parent().children('div').children('input[type="text"].file-path').val(this.files[0].name);
					});
				}
			});
		}
	}
	
	$.fn.input_material_file = function(options){ 
		if(typeof options === 'object' || !options){
			return input_material_file_.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	};
	
	$(document).ready(function(){
		$('input[type="file"]').input_material_file();
	});
	
}(jQuery));	
;(function($) {
	/*
	 *	RANGE
	 */
	 
	var material_range = {
		init : function(options){
			var defaults = {
				range		: false,	//value a & b [0,1]
				step   		: 1	,		//step 1 to 10
				isSingle	: true,		//only 1
				text		: false,	//text info 
				onchange	: $.noop
			};
			options = $.extend(defaults, options);

			return this.each(function(i){
				
				var this_ = this;
				var range__, 
				min = this_.min || 0,
				max = this_.max || 100,
				dif	 = max - min,
				values = [0,1],
				init = false,
				strStep = '' + options.step,
				countPoint = 0, unit = '',
				setValue__ = $(this_).val(),
				colorBg = $(this_).data('color');
				
				var textInfo = '';

				if(colorBg){
					colorBg = $(this_).data('color');
				}else{
					colorBg = 'primary';
				}

				// Create a range slider
				if(!options.range){
					if(options.text){ 
						textInfo = ('<div class="roundTip ' + colorBg + '"><span></span></div>');
					}
					
					range__ = $(this).parent().append("<div class='input-range-container'><div class='range-value '></div>" +
									"<div class='range-con-value " + colorBg + "'></div><div class='range-marker " + colorBg + "'>" + textInfo + "</div></div>")
									.find('.input-range-container');
				}else{
					
					if(options.text){ 
						textInfo = ('<div class="roundTip ' + colorBg + '"><span></span></div>');
					}
					
					range__ = $(this).parent().append("<div class='input-range-container'><div class='range-value '></div>" +
									"<div class='range-con-value " + colorBg + "'></div><div class='range-marker " + colorBg + "' data-marker='--left'>" + textInfo + "</div>" +
									"<div class='range-marker " + colorBg + "' data-marker='--right'>" + textInfo + "</div></div>")
									.find('.input-range-container');
				}

				if(dif < 0){
					console.error(Error());
				} 


				if(strStep.indexOf('.') >= 0){
					countPoint = strStep.length - strStep.indexOf('.') - 1;
				} 

				
				if(options.hasOwnProperty('range')){
					if(!options.isSingle){
						if(options.range.length && options.range.length == 2){
							values[0] = (options.range[0] - min) / dif;
							values[1] = (options.range[1] - min) / dif;
						}
					}else{
						values[1] = (options.range - min) / dif;
					}
				}else{
					if(options.isSingle){
						values[1] = 0.5; 
					}
				}

				var range_markerLeft = $($(this).parent().children('.input-range-container').children('.range-marker')[0]);
				var range_markerRight = options.isSingle ? range_markerLeft : $($(this).parent().children('.input-range-container').children('.range-marker')[1]);
				var selVal = $(this).parent().children('.input-range-container').children('.range-con-value')[0];

				var round = function(value){
					return options.step * Math.round(value / options.step)
				};

				var num2Text = function(number){
					return number.toFixed(countPoint);
				}; 
				
				
				var updateRangeSliders = function(){ 
					if(options.text){
						range_markerRight.children('.roundTip').children('span').text(parseFloat(parseInt(round(values[1] * dif)) + parseInt(min)).toFixed(countPoint) + unit);
						if(!options.isSingle){
							range_markerLeft.children('.roundTip').children('span').text((round(values[0] * dif) + min).toFixed(countPoint) + unit);
						}
					}

					var sliderWidth = $(range__).width(), 
						range_markerLW = range_markerLeft.outerWidth(), 
						range_markerRW = range_markerRight.outerWidth(), 
						realWidth = sliderWidth - (range_markerLW + range_markerRW) / 2;

					$(selVal).css({'left': values[0] * sliderWidth, 'width' : (values[1] - values[0]) * sliderWidth});

					range_markerLeft.css({'left': values[0] * realWidth + range_markerLW / 2, 'margin-left' : -(range_markerLW / 2), 'z-index' : isRight ? 0 : 1});

					range_markerRight.css({'left': values[1] * realWidth + range_markerRW / 2, 'margin-left' : -(range_markerRW / 2),'z-index' : isRight ? 1 : 0});
			
					if(options.isSingle){ 
						$(this_).attr('data-range-left', parseInt(round(values[1] * dif)) + parseInt(min));
					}else{
						$(this_).attr('data-range-left', parseInt(round(values[0] * dif)) + parseInt(min));
						$(this_).attr('data-range-right', parseInt(round(values[1] * dif)) + parseInt(min));
					}
					
					
					if($.isFunction(options.onchange)){
						if(options.isSingle){
							options.onchange(parseInt(round(values[1] * dif)) + parseInt(min));
						}else{
							options.onchange(parseInt(round(values[0] * dif)) + parseInt(min), parseInt(round(values[1] * dif)) + parseInt(min));
						}
					}

				};

				var isRight = true, isDown = false, eventTouch;

				$(range__).on('mousedown touchstart', function(event){
					if(event.originalEvent.touches){
						var eventTouch = event.originalEvent.touches[0];
					}
					var target = event.target;
					var cls = $(target).data('marker');
					var sliderWidth = $(range__).width(), 
					range_markerLW = range_markerLeft.outerWidth(), 
					range_markerRW = range_markerRight.outerWidth(), 
					realWidth = sliderWidth - (range_markerLW + range_markerRW) / 2;
					
					if(event.originalEvent.touches){
						var x = eventTouch.clientX - $(range__).offset().left;
					}else{
						var x = event.pageX - $(range__).offset().left;
					}

					var realX = x - range_markerLW / 2;
           				realX = realX < 0 ? 0 : realX > realWidth ? realWidth : realX;

					if($(this_).prop("disabled")){
						return;
					}
					isDown = true;
					
					if(options.text){
						$(this_).parent().children('.input-range-container').children('.range-marker').addClass('active');
					}

					if(options.isSingle){
						values[1] = realX / realWidth;
						isRight = true;
					}else{
						switch(cls){
							case '--left':
								isRight = false;
								values[0] = realX/realWidth; 
								break;
							case '--right':
								isRight = true;
								values[1] = realX/realWidth;
								break;
							default:
								if(realX < (values[0] + values[1])/2 * realWidth){
									isRight = false;
									values[0] = realX / realWidth;
								}
								else{
									isRight = true;
									values[1] = realX / realWidth;
								}

						}
					}

					updateRangeSliders();
					if(event.preventDefault){
						event.preventDefault();
					}else{
						return false;
					}

				});
								
				if(options.isSingle){	
					if(setValue__ < 100 && setValue__ >= 10){
						values[1] =  '0.' + setValue__;
					}else if(setValue__ < 10){
						values[1] = '0.0' + setValue__; 
					}else{
						values[1] = 1;
					}
					
					updateRangeSliders();
				}

				var onMouseUp = function(){
					if($(this_).prop("disabled")){
						return;
					}
					isDown = false;
					
					if(options.text){
						$(this_).parent().children('.input-range-container').children('.range-marker').removeClass('active');
					}
					
					values[1] = round(values[1] * dif) / dif;
					if(!options.isSingle){
						values[0] = round(values[0] * dif) / dif;
					}
					updateRangeSliders();
				};

				//$(document).mouseup(function(){
				$(range__).on('mouseup touchend', function(event){
					if(isDown){
						onMouseUp();
					}
				});

				$(document).on('mouseup touchend', function(event){
					if(isDown){
						onMouseUp();
					}
				});
				
				$(range__).on('mousemove touchmove', function(event){
					if($(this_).prop("disabled")){
						return;
					}
					if(isDown){	
						if(event.originalEvent.touches){
							var eventTouch = event.originalEvent.touches[0];
						}
						var target = event.target;
						var sliderWidth = $(range__).width(), 
						range_markerLW = range_markerLeft.outerWidth(), 
						range_markerRW = range_markerRight.outerWidth(), 
						realWidth = sliderWidth - (range_markerLW + range_markerRW) / 2;
						
						
						if(event.originalEvent.touches){
							var x = eventTouch.clientX - $(range__).offset().left;
						}else{
							var x = event.pageX - $(range__).offset().left;
						}

						var realX = x - range_markerLW / 2;
							realX = realX < 0 ? 0 : realX > realWidth ? realWidth : realX;
						
						
						if(options.isSingle){
							values[1] = realX / realWidth;
							isRight = true;
						}else{
							if(isRight){
								values[1] = realX / realWidth;
								if(values[1] < values[0]){
									values[1] = values[0];
								}
							}else{
								values[0] = realX / realWidth;
								if(values[0] > values[1]){
									values[0] = values[1];
								}
							}
						}
						
						updateRangeSliders();
					}
					
					if(event.preventDefault){
						event.preventDefault();
					}else{
						return false;
					}
				});
				
				$(document).on('mousemove', function(event){
					if($(this_).prop("disabled")){
						return;
					}
					if(isDown){
						var target = event.target;
						var sliderWidth = $(range__).width(), 
						range_markerLW = range_markerLeft.outerWidth(), 
						range_markerRW = range_markerRight.outerWidth(), 
						realWidth = sliderWidth - (range_markerLW + range_markerRW) / 2;
						
						var x = event.pageX - $(range__).offset().left;

						var realX = x - range_markerLW / 2;
							realX = realX < 0 ? 0 : realX > realWidth ? realWidth : realX;
						
						if(options.isSingle){
							values[1] = realX / realWidth;
							isRight = true;
						}else{
							if(isRight){
								values[1] = realX / realWidth;
								if(values[1] < values[0]){
									values[1] = values[0];
								}
							}else{
								values[0] = realX / realWidth;
								if(values[0] > values[1]){
									values[0] = values[1];
								}
							}
						}
						
						updateRangeSliders();
					}
					
					if(event.preventDefault){
						event.preventDefault();
					}else{
						return false;
					}
				});

				
				$(this_).on('change', function(event){ 
					if($(this)[0].value < 100 && $(this)[0].value >= 10){
						values[1] =  '0.' + $(this)[0].value;
					}else if($(this)[0].value < 10){
						values[1] = '0.0' + $(this)[0].value; 
					}else{
						values[1] = 1;
					}
					
					updateRangeSliders();
				});
				
				
				updateRangeSliders();

				//return $(range__);
			});
		},
		getValue : function(a){
			if(a == 1 || a == 'left'){
				return [this.attr('data-range-left')];
			}else if(a == 2 || a == 'right'){
				return [this.attr('data-range-right')];
			}else{
				return [this.attr('data-range-left'), this.attr('data-range-right')];
			}
		}
	};
	
	$.fn.range = function(options){ 
		if(material_range[options]){
			return material_range[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof options === 'object' || !options){
			return material_range.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	};
	
	$(document).ready(function(){
		//$('input[type="range"]').range();
	});
	
}(jQuery));	
;(function($) {
	/*
	 *	TAB	
	 */
	 
	var NavTabs = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);

			return this.each(function(i){
				//variables
				var i;
				var this_ = $(this);
				var links = $(this).find('li.link-tab a');
				var contains_tab;
				var old_contains_tab;
				var back_activity = 0;
				var activity = 0; 
				var active_object = $(links.filter('[href="'+location.hash+'"]'));
								
				if(active_object.length === 0){
					active_object = $(this).find('li.link-tab.active a').first();
				}
				if(active_object.length === 0){
					active_object = $(this).find('li.link-tab a').first();
				}
				
				active_object.parent().addClass('active');
				activity = links.index(active_object); 
				if(activity < 0){
					activity = 0;
				}
				
				if(active_object[0] !== undefined){
					contains_tab = $('.contains-tab .tab' + active_object[0].hash);
					if(active_object.parent().hasClass('disabled')){
						//hide tabs
					}else{
						contains_tab.addClass('active');
						setTimeout(function(){
							contains_tab.addClass('in');
						}, 150);
					}
				}
				
				$(this).off('click.nav-tabs').on('click.nav-tabs', 'a', function(e) {
					e.preventDefault();
					
					if($(this).parent().hasClass('disabled')){
						return true;
					}
					
					active_object.parent().removeClass('active');
					var old_contains_tab = contains_tab;
					
					active_object = $(this);
					contains_tab = $('.contains-tab .tab' + this.hash.replace( /(:|\.|\[|\]|,|=)/g, "\\$1" ));
					links = this_.find('li.link-tab a');
					var activeRect = active_object.position();
					
					active_object.parent().addClass('active');
					back_activity = activity;
					activity = links.index($(this));
					if(activity < 0){
						activity = 0;
					}
					
					if(contains_tab !== undefined){ 
						setTimeout(function(){
							contains_tab.addClass('in');
						}, 150);
						contains_tab.addClass('active');
					}
					
					if(old_contains_tab !== undefined && !old_contains_tab.is(contains_tab)){ 
						contains_tab.removeClass('in');
						old_contains_tab.removeClass('active');
					}
					
				});
			});
		}
	};
	
	$.fn.navTab = function(options){ 
		if(typeof options === 'object' || !options){
			return NavTabs.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	};
	
	$(document).ready(function(){
		$('.nav-tabs').navTab();
	});
	
}(jQuery));	
;(function($) {
	/*
	 *	TOOLTIPS	
	 */
	 
	//'use strict';
	$debug = false;	//debug console
	var version = detectCompatibility();
	
	$mousedown = false;
	var startTime, endTime;
	var colorObj = ['white', 'default', 'purple', 'primary', 'transparent', 'grey', 'pink', 'deepPurle', 'indigo', 'blue', 'lightBlue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'amber', 'orange', 'brown', 'blueGrey'];
	var classes = '\\b(' + colorObj.join('|') + ')\\b', regex = new RegExp(classes, 'i');
	
	
	/*if(version.split(",")[0] == 'MSIE'){
		alert('IE ' + version.split(",")[1]);
	}else if(version.split(",")[0] == 'Trident') {
		alert('IE ' + version.split(",")[1]);
	}else if(version.split(",")[0] == 'Edge') {
		alert('Edge ' + version.split(",")[1]);
	}else if(version.split(",")[0] == 'Chrome'){
		alert('Chrome ' + version.split(",")[1]);
	}else{
		alert('Other ' + version);
	}*/
	

	if($debug == true) console.log(window.navigator.userAgent);
	
	function detectCompatibility(){
		var ua = window.navigator.userAgent;
		var detComp = new Array();
		
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			return 'MSIE, ' + parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			var rv = ua.indexOf('rv:');
			return 'Trident, ' + parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			return 'Edge, ' + parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		
		var chrome = ua.indexOf('Chrome/');
		if(chrome > 0){
			return 'Chrome, ' + parseInt(ua.substring(chrome + 7, ua.indexOf('.', chrome)), 10);
		}

		return false;
	}
	 
	var ToolTips = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);

			return this.each(function(i){
				//variables
				var this_ = $(this);
				var delay = 50;
				var tooltipstitle = $(this).attr('data-title');//$(this).find('[data-title]').context.dataset.title;
				var tooltipsposition = $(this).attr('data-position');//$(this).find('[data-title]').context.dataset.position;
				
				

				$(this).off('mouseenter').on('mouseenter', function(e) {
					var tooltip = document.querySelectorAll('.tooltip');	
					var objectWidth = ($(this)[0].clientWidth / 2), objectHeight = ($(this)[0].clientHeight * 2);
					var objectpositionY = $(this)[0].offsetTop;
					var objectpositionX = $(this)[0].offsetLeft;
					
					//create tooltip object
					var tooltip = $('<div class="tooltip"></div>');
					var tooltipTitle = $('<span></span>').text(tooltipstitle);
					tooltip.append(tooltipTitle).appendTo($('body'));
					
					
					if(tooltipsposition == "top"){ 
						$(tooltip)[0].style.top = (objectpositionY - objectHeight / 2 ) + "px";
						$(tooltip)[0].style.left = (objectpositionX + objectWidth / 2 + 5) + "px";
					}else if(tooltipsposition == 'bottom'){
						$(tooltip)[0].style.top = (objectpositionY + objectHeight / 2 + 10) + "px";
						$(tooltip)[0].style.left = (objectpositionX + objectWidth / 2 + 5) + "px";
					}else if(tooltipsposition == 'left'){
						$(tooltip)[0].style.top = (objectpositionY + (objectHeight / 2 ) / 2 - 14.5) + "px";
						$(tooltip)[0].style.left = (objectpositionX - objectWidth) + "px";
					}else if(tooltipsposition == 'right'){
						$(tooltip)[0].style.top = (objectpositionY + (objectHeight / 2 ) / 2 - 14.5) + "px";
						$(tooltip)[0].style.left = (objectpositionX + (objectWidth * 2) + 15) + "px";
					}else{
						console.error('Tooltip position wrong, select one of these [top, bottom, left, right]');
					}
					
					setTimeout(function(){
						if(version.split(",")[0] == 'MSIE' || version.split(",")[0] == 'Trident'){
							$(tooltip).css({'-webkit-transform' : 'scale(1)', 'zoom' : '1', 'transform' : 'scale(1)', 'opacity' : '0.9'});
						}else{
							tooltip.addClass('show');
						}
						
					}, delay);
					
					$(this).on('mouseleave', function(e){
						if(version.split(",")[0] == 'MSIE' || version.split(",")[0] == 'Trident'){
							$(tooltip).css({'-webkit-transform' : 'scale(0)', 'zoom' : '0', 'transform' : 'scale(0)', 'opacity' : '0'});
						}else{
							tooltip.removeClass('show');
						}
						setTimeout(function(){
							$(tooltip).remove();
						}, delay + 500);
					})
					
				});
				
			});
		}
	};
	 
	$.fn.tooltip = function(options){
		if(typeof options === 'object' || !options){
			return ToolTips.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}	
	
	$(document).ready(function(){
		$('[data-title]').tooltip();
	});
	
}(jQuery));	
;(function($) {
	/*
	 *	DIALOG TOAST
	 */
	
	Softmaterial.toast = function(text, delay, position){
		var defaults = {
			message		:	text	||	'',
			delay		:	delay	||	4000,
			className	: 	'',
			position	:	position||	'top|right',
			buttonAction:	'',
			buttonClose	:	'',
			callback	: 	$.noop,
			action		:	$.noop
		};
		var options = $.extend(defaults, text);

		var toast = document.querySelectorAll('.dialog-toast');	
		var prevDialogPositionY, prevDialogPositionX, top_position;
		
		// Insert Array for conjtainer position
		var dividePositionVar = [];
		dividePositionVar = options.position.toLowerCase().split('|');

		//if toast container it does not exist
		if (document.getElementsByClassName(dividePositionVar[0] + '-' + dividePositionVar[1]).length == 0)
			$('<div id="toast-container" class="' + dividePositionVar[0] + '-' + dividePositionVar[1] + '">').appendTo('body');
		
		var container = document.querySelector('#toast-container');
		
		//create tooltip object
		var toast = document.createElement('div');
		toast.setAttribute('class', 'dialog-toast');
		if(options.buttonClose != ''){
			var btnClose = '<button class="btn btn-light btn-small white-text close-toast">' + options.buttonClose + '</button>';
		}else{ var btnClose = ''; }
		if(options.buttonAction != ''){
			var btnAct = '<button class="btn btn-flat primary primary-text action-toast">' + options.buttonAction + '</button>';
		}else{ var btnAct = ''; }
		toast.innerHTML = ('<span>' + options.message + '</span>' + btnAct + btnClose);
		toast.classList.add("toast-animation");
		if(options.className != ''){
			toast.classList.add(options.className);
		}
		document.getElementsByClassName(dividePositionVar[0] + '-' + dividePositionVar[1])[0].appendChild(toast);
		
		// If container position is Top or Bottom abd Right or Left
		if(dividePositionVar[0] == "top" || dividePositionVar[0] == "bottom"){
			if(dividePositionVar[1] == "right" || dividePositionVar[1] == "left"){
				//set position
				//settings position Y = dividePositionVar[0], X = dividePositionVar[1]
				var top = 0, bottom = 0, left = 0, right = 0;
				prevDialogPositionY = toast.clientHeight;
				prevDialogPositionX = toast.clientWidth;
				
				toast.classList.add("show");
			}else{
				console.error('Error Tooltip position wrong, select one of these [left, right]');
			}
		}else{
			console.error('Error Tooltip position wrong, select one of these [top, bottom]');
		}
		
		$('.action-toast').on('click', function(){
			if($.isFunction(options.action)) options.action();
		});
		
		$('.close-toast').on('click', function(){
			// Remove class for hide effect
			var $this = $(this);
			$this.parent().removeClass('show');
			
			// Remove Toast and container when animation as compleat whit 300 delay
			var clearAll = setTimeout(function(){ 
				$this.parent().remove(); //Remove toast

				if($.isFunction(options.callback)) options.callback();
				
				clearTimeout(clearAll);
			}, 300);
		});
		
		var timeouttoast = setTimeout(function(){
			// Remove class for hide effect
			toast.classList.remove('show');
			
			// Remove Toast and container when animation as compleat whit 300 delay
			var clearAll = setTimeout(function(){ 
				$(toast).remove(); //Remove toast
				if($.isFunction(options.callback)) options.callback();
				
				clearTimeout(timeouttoast);
			}, 300);
			
		}, options.delay);
		
		
		$('.close-toast, .action-toast').mousedown(function(e){
			Softmaterial.materialButtonMouseDown(this, e);
		}).mouseup(function(e){
			Softmaterial.materialButtonMouseUp(this, e);
		}).mouseout(function(e){
			Softmaterial.materialButtonMouseOut(this, e);
		});
	};

}(jQuery));	
;(function($) {
	/*
	 *	SIDENAV
	 */
	
	var SideNav = {
		init : function(options){
			var defaults = {
				sideWidth				:	320,
				direction				:	'left',
				tapClose				: 	true,
				draggable				:	true,
				drag_target				:	10,
				moveSpeed				:	0.2,
				elementMaxWidth			:	0.8,
				opacityBackground		: 	0.8,
				shiftForStart			:	50,
				backgroundFixedScreeen 	:	'#000',
				callback				: 	$.noop
			};
			options = $.extend(defaults, options);
			
			return this.each(function(i){
				var innerWidth_ = window.innerWidth;
				var tchstartx, tchmoveX, open, mainX, side_nav_out,side_nav_block, side_nav_contain, screenblock, submainW, mainW, init = false;
				var sidenavID = $(this).attr('data-sidenav');//$(this)[0].dataset.sidenav;
				var directionX = $(this).attr('data-sidenav-position');
				var menuID = $("#" + sidenavID);
				
				var $this = $(this)[0];
				
				var createElements = function(){
					init = true;
					
					//create elements sidenav screen-block, side-nav-block, sidenav-contain
					menuID = document.getElementById(sidenavID);

					side_nav_block = document.createElement('div');
					$(side_nav_block).addClass('side-nav-block');
					
					if(options.direction == 'left' || options.direction == 'right'){
						if(options.direction == 'left'){
							$(side_nav_block).addClass('left-show');
						}else{
							$(side_nav_block).addClass('right-show');
						}
					}else{
						console.error('Error SideNav position wrong, select one of these [left, right]');
					}
					
					side_nav_contain = document.createElement('div');
					$(side_nav_contain).addClass('side-nav-contain');
					
					if(options.tapClose == true){
						screenblock = document.createElement('div');
						$(screenblock).addClass('screen-block');
						screenblock.style.backgroundColor = options.backgroundFixedScreeen;
					}
					

					//if($('.side-nav-block').length == 0){ 
						side_nav_block.appendChild(side_nav_contain);
						menuID.parentNode.insertBefore(side_nav_block, menuID);
						side_nav_contain.appendChild(menuID);
						if(options.tapClose == true){ document.body.insertBefore(screenblock, document.body.lastChild); }
					//}
					
					if(innerWidth_ > 499){
						submainW = options.sideWidth;
					}else{
						submainW = innerWidth_ * options.elementMaxWidth;
					}

					side_nav_contain.style.width = submainW + 'px';
					mainW = submainW + options.drag_target;
					side_nav_block.style.transitionDuration = options.moveSpeed + 's';
					if(options.tapClose == true){ screenblock.style.transitionDuration = options.moveSpeed + 's'};
					
					Close();
				}
				
				// Recalc parameters on resize window
				var parametersRecalc = function(){
					if(open === true){
						Close();
					}
					innerWidth_ = window.innerWidth;
					if(innerWidth_ > 499){
						submainW = options.sideWidth;
					}else{
						submainW = innerWidth_ * options.elementMaxWidth;
					}
					mainW = submainW + options.drag_target;
					side_nav_contain.style.width = submainW + 'px';
					if(options.direction == 'left'){
						side_nav_block.style.transform = 'translateX(' + (-submainW) + 'px)';
					}else if(options.direction == 'right'){
						side_nav_block.style.transform = 'translateX()';
					}
					side_nav_block.style.width = mainW + 'px';
				}
				
				// Start Event Touch
				var touchStart = function(event){
					document.body.style.overflow = 'hidden';
					side_nav_block.style.transitionDuration = '0s';
					if(options.tapClose == true){ 
						screenblock.style.transitionDuration = '0s';
						screenblock.style.zIndex = '';
					}
					mainX = side_nav_block.getBoundingClientRect().left;
					tchstartx = event.changedTouches[0].clientX;
				}
				
				// Start Event Move in touch
				var touchMove = function(event){ 
					tchmoveX = event.changedTouches[0].clientX;
					var elMainCoordX0New = tchmoveX - (tchstartx - mainX);

					if(options.direction == 'left'){
						
						if((elMainCoordX0New) <= 0){
							if(tchstartx > submainW){
								elMainCoordX0New = elMainCoordX0New + (tchstartx - submainW);
							}
							if(tchmoveX <= submainW && tchmoveX > 0){ 
								side_nav_block.style.transform = 'translateX(' + elMainCoordX0New + 'px)';
							} 
							var elBgOpacity = tchmoveX / submainW;
							if(elBgOpacity > 0 && elBgOpacity < 1){
								if(elBgOpacity >= options.opacityBackground){
									if(options.tapClose == true) screenblock.style.opacity = options.opacityBackground;
								}else{
									if(options.tapClose == true) screenblock.style.opacity = elBgOpacity;								
								}
							}
						}
					}else if(options.direction == 'right'){

						if((elMainCoordX0New) >= 0){ 
							if(tchstartx < submainW){
								elMainCoordX0New = elMainCoordX0New - (tchstartx + submainW);
							} 
							
							//if(tchmoveX >= submainW && tchmoveX > 0){ //console.log(touchStartCoords, touchEndCoords);
								side_nav_block.style.transform = 'translateX(' + (event.changedTouches[0].pageX ) + 'px)';
							//} 

							var elBgOpacity = Math.abs((tchmoveX - innerWidth_) / options.sideWidth);
							if(elBgOpacity > 0 && elBgOpacity < 1){ 

								if(elBgOpacity < 0.50){
									side_nav_out = true;
								}else{
									side_nav_out = false;
								}
							
								if(elBgOpacity >= options.opacityBackground){
									if(options.tapClose == true) screenblock.style.opacity = options.opacityBackground;
								}else{
									if(options.tapClose == true) screenblock.style.opacity = elBgOpacity;								
								}
							}
						}
						
					}
				}
				
				// ------ Touch Event End
				var touchEnd = function(){
					var touchendCoordX = event.changedTouches[0].clientX;
					document.body.style.overflow = '';
					if(options.direction == 'left'){
						side_nav_block.style.transitionDuration = options.moveSpeed + 's';
						if(options.tapClose == true) screenblock.style.transitionDuration = options.moveSpeed + 's';
						if(!open && touchendCoordX > tchstartx){
							if(Math.abs(tchstartx - touchendCoordX) > options.shiftForStart){
								Open();
							}else{
								Close();
							}
						}else if(open && (touchendCoordX < tchstartx) && (touchendCoordX <= submainW)){ 
							if((tchstartx > submainW) && (touchendCoordX < (submainW - options.shiftForStart)) || (tchstartx < submainW) && (Math.abs(tchstartx - touchendCoordX) > options.shiftForStart)) {
								Close();
							}else{
								Open();
							}
						}
					}else if(options.direction == 'right'){
						
						side_nav_block.style.transitionDuration = options.moveSpeed + 's';
						if(options.tapClose == true) screenblock.style.transitionDuration = options.moveSpeed + 's'; 
						
						var rightPos = touchendCoordX - options.sideWidth / 2;
						if(rightPos < 0){
							rightPos = 0;
						}
						
						if(side_nav_out){
							Close();
						}else{
							Open(); 
						}
					}
					
				}
				
				// Change State on Open 
				var Open = function(){
					if(options.tapClose == true) screenblock.style.opacity = options.opacityBackground;
					if(options.tapClose == true) side_nav_block.style.width = innerWidth_ + 'px';
					side_nav_block.style.transform = 'translateX(0px)';
					$(side_nav_block).removeClass('sidenav--close');
					$(side_nav_block).addClass('sidenav--open');
					if(options.tapClose == true){
						$(screenblock).removeClass('screen-block--close');
						$(screenblock).addClass('screen-block--open');
						screenblock.style.zIndex = '';
					}
					open = true;
					if($debug == true) console.info("Menu " + sidenavID + " opened");
				}
				
				// Change State on Close
				var Close = function(){ 
					document.body.style.overflow = '';
					if(options.tapClose == true) screenblock.style.opacity = 0;
					side_nav_block.style.width = mainW + 'px';
					if(options.direction == 'left'){
						side_nav_block.style.transform = 'translateX(' + (-submainW) + 'px)';
					}else if(options.direction == 'right'){ 
						side_nav_block.style.transform = 'translateX(' + (submainW) + 'px)';
					}

					$(side_nav_block).removeClass('sidenav--open');
					$(side_nav_block).addClass('sidenav--close');
					if(options.tapClose == true){ 
						$(screenblock).removeClass('screen-block--open');
						$(screenblock).addClass('screen-block--close');
						setTimeout(function(){ $(screenblock).css('z-index' , '-998'); }, 100);
					}
					if($debug == true) console.info("Menu " + sidenavID + " closed");
					open = false;
				}
				
				// Button Click Event for Open and Close Sidenav
				var buttonClick = function(event){
					event.stopPropagation();
					if(open === false){
						Open();
					}else{
						Close();
					}
				}
				
				// Close Side Nav for click on screen-block element
				var Click = function(event){ 
					event.stopPropagation();
					var elMainCoordX0ForClick = side_nav_block.getBoundingClientRect().left;
					if(event.clientX > (elMainCoordX0ForClick + submainW)){ 
						Close();
					}
				}
				
				// Clear function for large-width windows
				var Clear = function(){ 
					if((side_nav_block && screenblock) != undefined){
						//side_nav_block.parentNode.insertBefore(Init, side_nav_block);
						//side_nav_block.remove();
						//if(options.tapClose == true) screenblock.remove();
						init = false;
					}
				}
				
				// Resize the page according to the live screen 
				var winOnResizeEngine = function(){
					innerWidth_ = window.innerWidth;
					/*if(innerWidth_ < 1024 && !init){
						//SideNavEngine();
					}else if(innerWidth_ >= 1024 && init){*/
						Clear();
					//}
				}
				
				// Start script engine SideNav
				var SideNavEngine = function(){//console.log(init);
					createElements();
					side_nav_block.addEventListener('resize', parametersRecalc, false);

					//if(innerWidth_ < 1024 && init){
						if(options.draggable == true) side_nav_block.addEventListener('touchstart', touchStart, false);
						if(options.draggable == true) side_nav_block.addEventListener('touchmove', touchMove, false);
						if(options.draggable == true) side_nav_block.addEventListener('touchend', touchEnd, false);
				//	}
					side_nav_block.addEventListener('click', Click, false);
					$this.addEventListener('click', buttonClick, false);
					window.addEventListener('resize', winOnResizeEngine, false);
				}
				
				SideNavEngine();
				
			});
			
			
		},
		show : function(e){
			//this.trigger('click');
			$(this)[0].click();
		},
		hide : function(){ 
			$(this)[0].click();
		}
	}
	
	$.fn.sidenav = function(options){
		if(SideNav[options]){
			return SideNav[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof options === 'object' || !options){
			return SideNav.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}
	
}(jQuery));

;(function($) {
	/*
	 *	COLLAPSE
	 */
	 
	var Collapse = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);
			
			return this.each(function(i){
				var this_ = $(this);
				var thisli = $(this).children();
				//$('.coll-container').hide();
				
				thisli.on('click', function(e){// console.log($(this).children('.coll-container').is(':visible'));

					if(!($(this).children('.coll-container').is(':visible'))){
						$(this_).children('li').removeClass('show');
						$(this_).children('li').children('.coll-container').slideUp();
						$(this).children('.coll-container').slideDown();
						$(this).addClass('show');
					} else {
						$(this_).children('li').children('.coll-container').slideUp();
						$(this).removeClass('show');
					}
				
				});
				
			});
		}
	};
	
	$.fn.collapse = function(options){
		if(typeof options === 'object' || !options){
			return Collapse.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}
	
	$(document).ready(function(){
		$('.collapse').collapse();
	});
}(jQuery));	

;(function($) {
	/*
	 *	COLLAPSE
	 */
	
	var Chips = {
		init : function(options){
			var defaults = {
				tags		:	'',
				autocomplete:	''
			};
			options = $.extend(defaults, options);
			
			return this.each(function(i){
				var this_ = $(this);
				var arrx = [];
				
				if(!options.tags || !(options.tags instanceof Array)){
					options.tags = [];
				}
				
				// If autocomplete is not empty
				if(options.autocomplete || (options.autocomplete instanceof Array)){
					/*var positionInputBox = this_.children('input').position();
					
					// Create a autocomplete box list
					var autocomplete_box = $('<ul class="autocomplete-box"></ul>');
					
					options.autocomplete.tags.forEach(function(elem){
						//console.log(elem);
						autocomplete_box.append('<li><span>' + elem.tag + '</span></li>');
					});
					
					autocomplete_box.appendTo($(this_));
					$(this_).children('.autocomplete-box').css('left' , positionInputBox.left + 'px');
					
					$(this_).children('.autocomplete-box').children('li').on('click.li', function(){
						var positionInputBox = this_.children('input').position();
						
						$(this_).children('.autocomplete-box').css({'visibility' : 'hidden', 'left' : positionInputBox.left + 'px'});
						
						$('<div class="chip" style="opacity: 0;transform: translateY(-5px);"><span>' + $(this).children('span').text() + '</span> <i class="material-icons close">close</i></div>').insertBefore($(this_).children('.input-chip'));
						$(this_).children('.input-chip').val('');
						$(this_).children('.chip').css({'opacity' : '1', 'transform' : 'translateY(0px)'});
						
						// Delete chip 
						$(this_).children('.chip').children('i.close').on('click', function(ex){
							//ex.preventDefault();
							deleteChip($(this));
							var textChild = $(this).parent().children('span').text();
							
							options.autocomplete.tags.forEach(function(elem){
								if(elem.tag == textChild){
									
									if(arrx.indexOf(elem.tag)){
										arrx.push(elem.tag);
									}
									console.log(arrx);
									autocomplete_box.append('<li><span>' + elem.tag + '</span></li>');
								}
							});
							//autocomplete_box.append('<li><span>' +  + '</span></li>');
						});
						
						// Delete li auocomplete
						$(this).remove();
					});*/
					
				}
				
				options.tags.forEach(function(elem){
					$('<div class="chip" style="opacity: 0;transform: translateY(-5px);"><span>' + elem.tag + '</span> <i class="material-icons close">close</i></div>').insertBefore($(this_).children('.input-chip'));
					$(this_).children('.input-chip').val('');
					
					$(this_).children('.chip').css({'opacity' : '1', 'transform' : 'translateY(0px)'});
					// Delete chip 
					$(this_).children('.chip').children('i.close').on('click', function(ex){
						deleteChip($(this));
					});
				});
				
				this_.on('click', function(){
					//if user click on chips box, this make a focus event in i nput box
					$(this_).children('.input-chip').focus();
					$(this_).addClass('--focused');
					$(this_).children('.autocomplete-box').css({'display': 'block', 'visibility' : 'visible'});
				});
				
				//if user send the info on input box 
				this_.on('keydown.input-chip', function(e){
					//e.preventDefault();
					var KCD = e.keyCode || e.which;
					var textInfo = $(this_).children('.input-chip').val();

					if(KCD === 13){
						createChild(textInfo);
					}

					// If press Send Key
					if(KCD === 27){
						$(this_).children('.input-chip').val('');
						$(this_).children('.input-chip').blur();
						$(this_).removeClass('--focused');
					}
					
					// If press key back to delete a chips, only if the input box is empty
					if(KCD === 8){
						if(!$(this).children('input.input-chip').val().replace(/\s/g, '')){
							var lastChip = $(this).children('.chip').last();
							lastChip.css({'opacity' : '0', 'transform' : 'translateY(-5px)'});
							
							var animation = setTimeout(function(){
								lastChip.remove();
								clearTimeout(animation);
							}, 200);
						}
					}
					
					// Delete chip 
					$(this_).children('.chip').children('i.close').on('click', function(ex){
						deleteChip($(this));
					});
					
				});
				
				$('body').on('focusout.chips', '.chips input', function(e){
					$(this_).removeClass('--focused');
					//$(this_).children('.autocomplete-box').css({'display': 'none', 'visibility' : 'hidden'});
				});
				
				function createChild(textInfo){
					// If the user sends the text, create the box item
					if(textInfo.replace(/\s/g, '')){
						$('<div class="chip" style="opacity: 0;transform: translateY(-5px);"><span>' + textInfo + '</span> <i class="material-icons close">close</i></div>').insertBefore($(this_).children('.input-chip'));
						$(this_).children('.input-chip').val('');
						$(this_).children('.chip').css({'opacity' : '1', 'transform' : 'translateY(0px)'});
					}
				}
				
				function deleteChip(chip_delete){
					//var chip_delete = $(this);
					chip_delete.parent().css({'opacity' : '0', 'transform' : 'translateY(-5px)'});
					
					var animation = setTimeout(function(){
						chip_delete.parent().remove();
						clearTimeout(animation);
					}, 200);
				}
				
			});
		},
		data : function(event){
			var array = new Array();

			var chips = this.children('.chip').children('span');			
			
			for(var i = 0; i < chips.length; i++) {
				var defaults = {'tag' : chips[i].innerText};
				array.push($.extend(0, defaults));
			}
			
			return array;
		}
	}
	
	$.fn.chips = function(options){
		if(Chips[options]){
			return Chips[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof options === 'object' || !options){
			return Chips.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}
	
	$(document).ready(function(){
		//$('.chips').chips();
	});
}(jQuery));	

;(function($) {
	/*
	 *	COLLAPSE
	 */
	
	var select_object = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);
			
			return this.each(function(i){
				var this_ = $(this);
				var class_selcted;

				// If data-select = material, make a material dropdown
				if(this_.data('select') == 'material'){
					this_.css('display', 'none');
					
					var option = this_.children('option');	
					
					var randID = Softmaterial.rand(40);
					var dropdown = $('<div class="dropdown"></div>');
					dropdown.append('<input type="text" readonly="true" class="input-material" data-dropdown-id="' + randID + '" /><i class="material-icons">arrow_drop_down</i>');
					dropdown.appendTo(this_.parent());
					var dropdown_menu = $('<ul class="dropdown-menu" id="' + randID + '" data-color="'+ this_.data('material-color') +'"></ul>');
					for(var i = 0; i < option.length; i++) {
						if(option[i].selected){
							class_selcted = 'selected';
							dropdown_menu.append('<li class="dropdown-header">' + option[i].innerText + '</li>');
							$('input[data-dropdown-id="' + randID + '"]').val(option[0].innerText);
						}else{
							class_selcted = '';
							dropdown_menu.append('<li><a class="' + class_selcted + '">' + option[i].innerText + '</a></li>');
						}
					}
					dropdown_menu.appendTo(dropdown);
					
					
					//Open Dropdown Menu
					$('.input-material[data-dropdown-id="' + randID + '"]').on('click', function(){
						var DataDropdownMenu = $(this).data('dropdown-id');
						var dataColor = $('#' + DataDropdownMenu).data('color');
						
						if($debug == true){ console.log("DropDown", $('#' + DataDropdownMenu).css('display')); }
						
						if($('#' + DataDropdownMenu).css('visibility') == "hidden"){
							var dtx = parseInt($('#' + DataDropdownMenu).offset().left) + parseInt($('#' + DataDropdownMenu).css('width')) + 20;
							var dty = parseInt($('#' + DataDropdownMenu).offset().top) + parseInt($('#' + DataDropdownMenu).css('height')) + 20;
							var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
							
							if(dtx > screen.width){
								$('#' + DataDropdownMenu).css('right',  "0px");
							}
							
							if(!(parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().bottom) + parseInt($('#' + DataDropdownMenu).css('height')) + 100 < 0 || parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().top) + parseInt($('#' + DataDropdownMenu).css('height')) - viewHeight >= 0)){
								
							}else{
								$('#' + DataDropdownMenu).css('top',  "-130px");
							}
							
							$('#' + DataDropdownMenu).css({'visibility': 'visible', 'opacity': '1', 'transform': 'scale(1)'});
						}
						
						$('#' + randID + ' li a').on('click', function(){
							$(this).parent().parent().children('li').children('a').removeClass('selected');
							$(this).addClass('selected');
							$('input[data-dropdown-id="' + randID + '"]').val($(this).text());
						});
						
						$(document).mouseup(function(){
							if($('#' + DataDropdownMenu).css('visibility') == "visible"){
								$('#' + DataDropdownMenu).css({'visibility': 'hidden', 'opacity': '0', 'transform': 'scale(0.9)'});
								$(".dropdown-button").removeClass("active");
								//if($debug == true){ console.log("DropDown", $('#' + DataDropdownMenu).css('display')); }
								
								setTimeout(function(){
									if(dtx < screen.width){ 
										$('#' + DataDropdownMenu).css('right',  "");
									}
									if(!(parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().bottom) + parseInt($('#' + DataDropdownMenu).css('height')) + 100 < 0 || parseInt(document.getElementById(DataDropdownMenu).getBoundingClientRect().top) + parseInt($('#' + DataDropdownMenu).css('height')) - viewHeight >= 0)){
										$('#' + DataDropdownMenu).css('top',  "");
									}
								}, 250);
							}
						});
						
					});
				}
				
			});
		},
		data : function(){
			var array = new Array();

			var chips = $(this).parent().children('.dropdown').children('ul').children('li').children('a');			
			
			for(var i = 0; i < chips.length; i++) {
				
				if(chips[i].className == 'selected'){
					var defaults = {'value' : chips[i].text};
					array.push($.extend(0, defaults));
				}
			}
			
			return array;
			
		},
		val : function(option){
			var addValue = $(this).parent().children('select').val(option);
			var valueText = $(this).parent().children('select').children('option')[option].text;
			
			$(this).parent().children('.dropdown').children('input').val(valueText)
			
			$(this).parent().children('.dropdown').children('ul').children('li').children('a').removeClass('selected');
			
			var list = $(this).parent().children('.dropdown').children('ul').children('li').children('a');
			
			for(var i = 0; i < list.length; i++) {
				if(list[i].text == valueText) {
					$(list[i]).addClass('selected');
				}
			}
			
			return;
		}
	};
	
	$.fn.select = function(options){
		if(select_object[options]){
			return select_object[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof options === 'object' || !options){
			return select_object.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}
	
	$(document).ready(function(){
		$('select[data-select]').select();
	});
}(jQuery));

;(function($) {
	/*
	 *	CAROUSEL
	 */
	
	var swipeable = {
		init : function(options){
			var defaults = {
				infinite : 0,
				duration : 300,
				rewindOnResize: true,
				snapBackSpeed : 200,
			};
			options = $.extend(defaults, options);
			
			return this.each(function(i){
				var this_ = $(this);
				var sliderCount = this_.children('.carousel-track').children('.carousel-slider').length;
				var isDown = false, touchStat = {}, coordinate = {}, pageX, pageY, slides = 0, maxOffset,
					slideContainer, position = {}, index = 0, maxOffset, prefixes = {};
				
				var slice = Array.prototype.slice;
				for(var x = 0; x < sliderCount; x++){
					var offsetWidth_ = this_.children('.carousel-track').children('.carousel-slider')[x].offsetWidth;
					this_.children('.carousel-track').css('width' , (offsetWidth_ * sliderCount) + 'px');
					this_.children('.carousel-track').children('.carousel-slider').css('width' , (offsetWidth_) + 'px');
				}
				
				/**
				*	Resize Screen
				**/
				var resize = function(){ 
					if(window.innerWidth < 1111){
						for(var x = 0; x < sliderCount; x++){
							var offsetWidth_ = this_.children('.carousel-track').children('.carousel-slider')[x].offsetWidth;
							this_.children('.carousel-track').css('width' , (window.innerWidth * sliderCount) + 'px');
							this_.children('.carousel-track').children('.carousel-slider').css('width' , (window.innerWidth) + 'px');
						}
					}
				}
				
				function movement(to, duration, ease) {
					var style = this_.children('.carousel-track') && this_.children('.carousel-track')[0].style;
					var me = this_.children('.carousel-track') && this_.children('.carousel-track');
			
					if (style) {
						me.css({
							'transform' : 'translate3d(' + to + 'px, 0, 0)', 
							'transition-duration' : duration + 'ms', 
							'transition-timing-function' : 'ease'
						});
					}
				}
				
				function start(){
					slideContainer = this_.children('.carousel-track').children('.carousel-slider');
					
					position = {
						x: slideContainer.offsetLeft,
						y: slideContainer.offsetTop
					}
					
					slides = slice.call(slideContainer);
					
					prefixes = {
						hasTranslate3d:true,
						transform:"transform",
						transition:"transition",
						transitionEnd:"transitionend"
					};
					
				
					if (options.rewindOnResize) {
						index = 0;
					} else {
						var ease = null;
						var rewindSpeed = 0;
					}

					if (options.infinite) {
						movement(slides[index + options.infinite ].offsetLeft * -1, 0, null);

						index = index + options.infinite ;
						position.x = slides[index].offsetLeft * -1;
					} else {
						movement(slides[index].offsetLeft * -1, rewindSpeed, ease);
						position.x = slides[index].offsetLeft * -1;
					}
					
				}
				
				function swipeable(nextIndex, direction){
					slidesToScroll = 1;
					
					var nextSlide = direction ? index + 1 : index - 1;
					
					if (direction) {
						nextIndex = index + slidesToScroll;
					}else{
						nextIndex = index - slidesToScroll;
					}
		
					nextIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);
					
					var maxOffset = Math.round(slides[nextIndex].offsetWidth * slides.length);

					
					var nextOffset = Math.min(Math.max(slides[nextIndex].offsetLeft * -1, maxOffset * -1), 0);
					
					movement(nextOffset, options.duration, 'ease');
					
					position.x = nextOffset;
					
					if (slides[nextIndex].offsetLeft <= maxOffset) {
						index = nextIndex;
					}
				}
				
				/**
				* Event MouseDown & TouchStart
				**/
				var startDown = function(event){
					// If event is Touch 
					if(event.originalEvent.touches){
						var touchobj = event.originalEvent.changedTouches[0];
					}else{
						var touchobj = event.originalEvent; 
					}
					
					pageX = touchobj.clientX;
					pageY = touchobj.clientY;
					isDown = true;
					
					touchStat = {
						x: pageX,
						y: pageY,
						time: Date.now()
					};
					
					coordinate = {}; 
				}
				
				/**
				* Event MouseMove & TouchMove
				**/
				var move = function(event){
					if(isDown){
					
						// If event is Touch 
						if(event.originalEvent.touches){
							var touchobj = event.originalEvent.changedTouches[0];
						}else{
							var touchobj = event.originalEvent;
						}
						 
						pageX = touchobj.clientX;
						pageY = touchobj.clientY;
						
						
						coordinate = {
							x: pageX - touchStat.x,
							y: pageY - touchStat.y
						};

						if(touchStat){
							event.preventDefault();
							movement(position.x + coordinate.x, 0, null);
						}
					
					}
				}
				
				/**
				* Event MouseUp & TouchEnd
				**/
				var endUp = function(){
					event.preventDefault();
					
					var duration = touchStat ? Date.now() - touchStat.time : undefined;
					var isValid = Number(duration) < 300 && Math.abs(coordinate.x) > 25 || Math.abs(coordinate.x) > offsetWidth_ / 3;
					var bounds = !index && coordinate.x > 0 || index === slides.length - 1 && coordinate.x < 0;
					var direction = coordinate.x < 0;
	
					if (isValid && !bounds) {
						swipeable(false, direction);
					} else {
						movement(position.x, options.snapBackSpeed);
					}
					
					touchStat = undefined;
					
					isDown = false;
				}
				
				
				$(this_.children('.carousel-track')).on('touchstart mousedown', startDown);
				$(this_.children('.carousel-track')).on('touchmove mousemove', move);
				$(this_.children('.carousel-track')).on('touchend', endUp);
				$(window).on('resize', resize);
				$(document).on('mousemove', move);
				$(document).on('mouseup', endUp);
				
				start();
			});
		}
	};
	
	$.fn.carousel = function(options){
		if(swipeable[options]){
			return swipeable[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof options === 'object' || !options){
			return swipeable.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}
	
	$(document).ready(function(){
		$('.carousel').carousel();
	});
}(jQuery));

;(function($) {
	/*
	 *	MEDIA RESPONSIVE IMAGE
	 */
	
	var mediaImage = {
		init : function(options){
			var defaults = {};
			options = $.extend(defaults, options);
			
			return this.each(function(i){
				var this_ = $(this);
				var imageOpened = false, imageStat = {}, screenSize = {}, imageStatFull = {};
				// Calcolate screen width & height, and divide to 50% image
				screenSize = {
					width : $(window).width(),
					height: $(window).height()
				};

				function getOriginalWidth(img) { 
				 
					var originalImg = img.clone(); 
					$('body').append(originalImg); 
				  
					originalImg.removeAttr("width") 
						.removeAttr("max-width") 
						.removeAttr("min-width") 
						.css({ 
							"width": "", 
							"max-width": "", 
							"min-width": "" 
						}); 
				  
					currentImageWidth = originalImg.width(); 
					originalImg.remove(); 
				  
					return currentImageWidth; 
				} 
				 
				function getOriginalHeigth(img) { 
				  
					var clone = img.clone(); 
					$('body').append(clone); 
				  
					clone.removeAttr("height") 
						.removeAttr("max-height") 
						.removeAttr("min-height") 
						.css({ 
							"height": "", 
							"max-height": "", 
							"min-height": "" 
						}); 
				  
					currentImageHeight = clone.height(); 
					clone.remove(); 
				  
					return currentImageHeight; 
				}
				
				
				var createBg = function(){ 
					if(document.getElementsByClassName('bg-media-image').length === 0){
						imageOpened = true;
						
						var bg = $('<div class="bg-media-image"></div>');
						bg.appendTo(this_.parent('.media-pictures'));
						
						// Set old position image
						imageStat = {
							x: this_[0].clientLeft,
							y: this_[0].clientTop,
							width: this_[0].clientWidth,
							height: this_[0].clientHeight
						}
						
						this_.parent('.media-pictures').css({
							'left' 	: imageStat.x,
							'top'	: imageStat.y,
							'width' : imageStat.width,
							'height': imageStat.height,
						});
						
						bg.on('click', function(event){
							closeMediaImage(event);
						});
						
						
						var widthPercent = imageStat.width / screenSize.width;
						var heightPercent = imageStat.height / screenSize.height;
						var newWidth = 0, newHeight = 0;
						
						if(widthPercent > heightPercent){ 
							newWidth = screenSize.width;
							newHeight = screenSize.width * 0.9 * (imageStat.height / imageStat.width);
						}else{
							newWidth = screenSize.height * 0.9 * (imageStat.width / imageStat.height);
							newHeight = screenSize.height ;
						}
						
						//<--[Screen Size]--> / 2 | <--[Img Size]--> / 2  centered  screeen						
						/*this_.css('position', 'absolute').animate({
							width: newWidth,
							height: newHeight,
							left: $(document).scrollLeft() + screenSize.width / 2 - this_.parent('.media-pictures').offset().left - newWidth / 2,
							top: $(document).scrollTop() + screenSize.width / 2 - this_.parent('.media-pictures').offset().top 
						}, 300);*/
						console.log(screenSize.height / 2 , this_.css('height'));
						this_.css('position', 'absolute').animate({
							width: newWidth,
							height: newHeight,
							left: $(document).scrollLeft() + screenSize.width / 2 - this_.parent('.media-pictures').offset().left - newWidth / 2,
							top: -screenSize.height / 2  
						}, 300); 
						
					}
					var timeOut = setTimeout(function(){
						$('.bg-media-image').addClass('active');
						clearInterval(timeOut);
					}, 0);
				}
				
				var deleteBg = function(){
					if(document.getElementsByClassName('bg-media-image').length !== 0){
						$('.bg-media-image').removeClass('active');
						//this_.removeClass('active');
						
						this_.css('position', 'absolute').animate({
							width: this_.parent('.media-pictures')[0].offsetWidth,
							height: this_.parent('.media-pictures')[0].offsetHeight,
							left: 0,
							top: 0
						},300);
						
						var timeOut = setTimeout(function(){
							$('.bg-media-image').remove();
							clearInterval(timeOut);
						}, 200);
					}
				}
				
				var closeMediaImage = function(event){
					imageOpened = false;
					deleteBg();
				}
				
				this_.on('click', function(event){
					
					if(imageOpened){
						closeMediaImage(event);
					}else{
						createBg();
					}
					
				});
				
				$(window).on('resize', function(event){
					screenSize = {
						width : $(window).width(),
						height: $(window).height()
					};
				});
				
				$(document).on('scroll', function(event){
					if(imageOpened){
						closeMediaImage(event);
					}
				});
			});
		}
	};
	
	$.fn.mediaImg = function(options){
		if(mediaImage[options]){
			return mediaImage[options].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if(typeof options === 'object' || !options){
			return mediaImage.init.apply(this, arguments);
		}else{
			console.error('This method is not recognized [' + options + ']');
		}
	}
	
	$(document).ready(function(){
		$('.media-pictures img').mediaImg();
	});
}(jQuery));
