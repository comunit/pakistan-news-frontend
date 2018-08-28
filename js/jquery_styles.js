	var transform_styles = ['-webkit-transform', '-ms-transform', 'transform'];
	var minutesUpdated = $(".minutes h1").text();

	console.log(minutesUpdated);
	var rotation = minutesUpdated*9;
	var fill_rotation = rotation;
	var fix_rotation = rotation * 2;
	for(i in transform_styles) {
		$('.circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + fill_rotation + 'deg)');
		// $('.circle .fill, .circle .mask.full').css('transition', 'transform 1s;');
		$('.circle .fill.fix').css(transform_styles[i], 'rotate(' + fix_rotation + 'deg)');
	}