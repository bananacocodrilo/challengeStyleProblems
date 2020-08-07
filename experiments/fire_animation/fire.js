/**
 * Fire animation for [BenTo](https://bkuperberg.gitbook.io/)
 * I don't even know what this is tbh. I wrote some basic fire animation using the api provided in that link for my hippie roommate
 */

const MAX_TEMP = 300;
const DEFAULT_ALPHA = 100;
const MAX_SPARKING = 300;
let heat;
let initialized = false;

// COOLING: How much does the air cool as it rises?
// Less cooling = taller flames.  More cooling = shorter flames.
// Default 50, suggested range 20-100
script.addIntParameter("cooling", "", 55, 10, 200);

// SPARKING: What chance (out of 255) is there that a new spark will be lit?
// Higher chance = more roaring fire.  Lower chance = more flickery fire.
// Default 120, suggested range 50-200.
script.addIntParameter("sparking", "", 120, 10, MAX_SPARKING);

script.addIntParameter("alpha", "", 100, 0, 255);

script.addBoolParameter("reverse_direction", "", false);

function updateColors(colours, id, resolution, time, params) {
  if (!initialized) {
    initialized = true;
    heat = [resolution];
  }

  fireAnimation(colours, resolution, params);
}

function fireAnimation(pixels, num_pixels, params) {
  // Step 1.  Calculate temperature and cool down every cell a little
  for (let i = 0; i < num_pixels; i++) {
    heat[i] = heat[i] - getRandom(0, (params.cooling * 10) / num_pixels + 2);

    if (heat[i] < 0) {
      heat[i] = 0;
    }
  }

  // Step 2.  Heat from each cell drifts 'up' and diffuses a little
  for (let k = num_pixels - 1; k >= 2; k--) {
    heat[k] = (heat[k - 1] + heat[k - 2] + heat[k - 2]) / 3;
  }

  // Step 3.  Randomly ignite new 'sparks' of heat near the bottom
  if (getRandom(0, SPARKING) < SPARKING) {
    let y = getRandom(0, 7);
    let spark = getRandom(160, 255);
    if (heat[y] > spark) {
      heat[i] = spark;
    }
  }

  // Step 4.  Map from heat cells to LED colors
  for (let j = 0; j < num_pixels; j++) {
    let color = heatColor(heat[j]);
    let pixelnumber;
    if (params.reverse_direction) {
      pixelnumber = num_pixels - 1 - j;
    } else {
      pixelnumber = j;
    }

    leds[pixelnumber] = setcolor;
    pixels.set(pixelnumber, color.r, color.g, color.b, params.alpha);
  }
}

let getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

let heatColor = (temperature) => {
  const temp_spectrum = [(2 * MAX_TEMP) / 3, MAX_TEMP / 3, 0];

  let heatcolor = {
    r: 0,
    g: 0,
    b: 0,
  };

  if (temp > MAX_TEMP) {
    temp = MAX_TEMP;
  }

  // now figure out which third of the spectrum we're in:
  if (temp > temp_spectrum[2]) {
    // we're in the hottest third
    heatcolor.r = 255; // full red
    heatcolor.g = 255; // full green
    heatcolor.b = 255 * ((temp - temp_spectrum[2]) / (MAX_TEMP / 3)); // ramp up blue
  } else if (temp > temp_spectrum[1]) {
    // we're in the middle third
    heatcolor.r = 255; // full red
    heatcolor.g = 255 * ((temp - temp_spectrum[1]) / (MAX_TEMP / 3)); // ramp up green
    heatcolor.b = 0; // no blue
  } else {
    // we're in the coolest third
    heatcolor.r = 255 * (temp / (MAX_TEMP / 3)); // ramp up red
    heatcolor.g = 0; // no green
    heatcolor.b = 0; // no blue
  }

  return heatcolor;
};
