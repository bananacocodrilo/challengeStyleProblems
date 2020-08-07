script.addFloatParameter("Position", "The Position of the point", 0.5, 0, 1);
script.addFloatParameter("Size", "", 0.5, 0, 2);
script.addFloatParameter("Fade", "", 0.5, 0, 1);

script.addFloatParameter("Hue", "", 0.5, 0, 1);
script.addFloatParameter("Saturation", "", 1, 0, 1);
script.addFloatParameter("Value", "", 1, 0, 1);
script.addColorParameter("Color_bg", "", 0xffffffff);

function updateColors(colours, id, resolution, time, params) {
  var minPos = params.position - params.size;
  var maxPos = params.position + params.size;

  var col = params.color_bg;

  colours.fill(col[0], col[1], col[2]);

  for (var i = 0; i < resolution; i++) {
    fac = 1;
    colours.set(i, col[0], col[1], col[2], 1);

    // var fac = 0;
    var rel = (i * 1.0) / resolution;
    var fac = 0;
    if (rel >= minPos && rel <= maxPos) {
      fac = Math.min(
        Math.max(
          1 -
            Math.abs(((rel - params.position) * params.fade * 2) / params.size),
          0
        ),
        1
      );
    }

    // var rnd = Math.random();

    colours.setHSV(i, params.hue * fac, params.saturation, params.value, 1);
  }
}
