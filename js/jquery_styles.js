var transform_styles = ["-webkit-transform", "-ms-transform", "transform"];

$.get("https://pakstan-new-api.herokuapp.com/api/time", function(data) {
  var initparseDate = new Date(data);
  var initUpdatedMinutes = moment().diff(initparseDate, "minutes");
  var rotation = initUpdatedMinutes * 9;
  var fill_rotation = rotation;
  var fix_rotation = rotation * 2;
  $(".minutes h1").html(initUpdatedMinutes);
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
    var time = moment.utc(data, "ddd MMM D YYYY HH:mm:ss ZZ");
    var updatedMinutes = moment().diff(time, "minutes");
    $(".minutes h1").html(updatedMinutes);
    for (i in transform_styles) {
      $(".circle .fill, .circle .mask.full").css(
        transform_styles[i],
        "rotate(" + updatedMinutes * 9 + "deg)"
      );
      $(".circle .fill.fix").css(
        transform_styles[i],
        "rotate(" + updatedMinutes * 9 * 2 + "deg)"
      );
    }
  });
}, 5000);
