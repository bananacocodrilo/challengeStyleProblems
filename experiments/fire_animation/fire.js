/**
 * @file fire.js
 * @author Bananacocodrilo
 * @brief Ported the Fire animation from FastLed to [BenTo](https://bkuperberg.gitbook.io/bento-docs/software/scripting)
 * @version 0.1
 * @date 2020-03-25
 *
 * No copyright, no license, do whatever you want with this, just don't ask me anything because I truly don't know what's going on, ask my roommate instead.
 * All I can say is that I see lots of lights flashing around me everytime I push something here and he seems super happy about it.
 *
 */
var MAX_TEMP = 300;
var MAX_SPARKING = 300;

script.addFloatParameter("anim_fps", "", 70, 10, 100);
script.addIntParameter("spark_area", "", 5, 1, 10);
script.addFloatParameter("cooling", "", 55, 10, 200);
script.addFloatParameter("sparking", "", 120, 10, MAX_SPARKING);
script.addFloatParameter("alpha", "", 100, 0, 255);
script.addBoolParameter("reverse_direction", "", false);

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function heatColor(temp) {
  var color = {
    r: 0,
    g: 0,
    b: 0,
  };

  if (temp > MAX_TEMP) {
    temp = MAX_TEMP;
  }

  // now figure out which third of the spectrum we're in:
  if (temp > (2 * MAX_TEMP) / 3) {
    // we're in the hottest third
    color.r = 1; // full red
    color.g = 1; // full green
    color.b = (0.01 + temp - (2 * MAX_TEMP) / 3) / 100; // ramp up blue
  } else if (temp > MAX_TEMP / 3) {
    // we're in the middle third
    color.r = 1; // full red
    color.g = (temp - MAX_TEMP / 3) / 100; // ramp up green
    color.b = 0; // no blue
  } else {
    // we're in the coolest third
    color.r = temp / 100; // ramp up red
    color.g = 0; // no green
    color.b = 0; // no blue
  }

  return color;
}

function recalculateTemperature(heat) {
  // Step 1.  Calculate temperature and cool down every cell a little
  for (var i = 0; i < heat.length; i++) {
    heat[i].temperature =
      heat[i].temperature -
      getRandom(0, (params.cooling * 10) / heat.length + 2);

    if (heat[i].temperature < 0) {
      heat[i].temperature = 0;
    }
  }

  // Step 2.  Heat from each cell drifts 'up' and diffuses a little
  for (var k = heat.length - 1; k >= 2; k--) {
    heat[k].temperature =
      (heat[k - 1].temperature + 2 * heat[k - 2].temperature) / 3;
  }

  // Step 3.  Randomly ignite new 'sparks' of heat near the bottom
  if (getRandom(0, MAX_SPARKING) < params.sparking) {
    var y = getRandom(0, params.spark_area);
    var spark = getRandom((4 * MAX_TEMP) / 5, MAX_TEMP);

    if (heat[y].temperature < spark) {
      heat[y].temperature = spark;
    }
  }

  // Step 4.  Map from heat cells to LED colors
  for (var j = 0; j < heat.length; j++) {
    var color = heatColor(heat[j].temperature);
    var pixelnumber;

    if (params.reverse_direction) {
      pixelnumber = heat.length - 1 - j;
    } else {
      pixelnumber = j;
    }
    heat[pixelnumber].r = color.r;
    heat[pixelnumber].g = color.g;
    heat[pixelnumber].b = color.b;
  }
}

var next_frame = [];
var id;
var global_heat = [[]];

function updateColors(colours, id, resolution, time, params) {
  // Support N props at the same time
  while (global_heat.length < id + 1) {
    global_heat.push([]);
    next_frame.push(0);
  }

  // Unknown prop size
  while (global_heat[id].length < resolution) {
    var pixel = {
      r: 0,
      g: 0,
      b: 0,
      temp: 0,
    };

    global_heat[id].push(pixel);
  }

  if (time > next_frame[id]) {
    next_frame[id] = time + 1 / params.anim_fps;
    recalculateTemperature(global_heat[id]);
  }

  for (var i = 0; i < resolution; i++) {
    colours.set(
      i,
      global_heat[id][i].r,
      global_heat[id][i].g,
      global_heat[id][i].b,
      1
    );
  }
}
