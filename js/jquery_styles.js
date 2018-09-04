var transform_styles = ["-webkit-transform", "-ms-transform", "transform"];

$.get("https://pakstan-new-api.herokuapp.com/api/time", function(data) {
  var rotation = data * 9;
  var fill_rotation = rotation;
  var fix_rotation = rotation * 2;
  $(".minutes h1").html(data);
  for (i in transform_styles) {
    $(".circle .fill, .circle .mask.full").css(
      transform_styles[i],
      "rotate(" + fill_rotation + "deg)"
    );
    $(".circle .fill.fix").css(
      transform_styles[i],
      "rotate(" + fix_rotation + "deg)"
    );
  }
});

setInterval(() => {
  $.get("https://pakstan-new-api.herokuapp.com/api/time", function(data) {
    $(".minutes h1").html(data);
    for (i in transform_styles) {
      $(".circle .fill, .circle .mask.full").css(
        transform_styles[i],
        "rotate(" + data * 9 + "deg)"
      );
      $(".circle .fill.fix").css(
        transform_styles[i],
        "rotate(" + data * 9 * 2 + "deg)"
      );
    }
  });
}, 60000);
