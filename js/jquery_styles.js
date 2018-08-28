	var transform_styles = ['-webkit-transform', '-ms-transform', 'transform'];
	var minutesUpdated = $(".minutes h1").text();

	var rotation = minutesUpdated * 9;
	var fill_rotation = rotation;
	var fix_rotation = rotation * 2;
	for(i in transform_styles) {
		$('.circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + fill_rotation + 'deg)');
		$('.circle .fill.fix').css(transform_styles[i], 'rotate(' + fix_rotation + 'deg)');
	}

	setInterval(() => {
			$.get("https://pakstan-new-api.herokuapp.com/api/time", function(data){
				  var parseDate = new Date(data);
					var updatedMinutes = moment().diff(parseDate, 'minutes');
			  	console.log(parseDate);
					$(".minutes h1").html(updatedMinutes);
					for(i in transform_styles) {
						$('.circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + updatedMinutes * 9 + 'deg)');
						$('.circle .fill.fix').css(transform_styles[i], 'rotate(' + updatedMinutes* 9 * 2 + 'deg)');
					}
			});
	}, 60000);