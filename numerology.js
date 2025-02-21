// numerology.js
function calculateLifePathNumber(dobString) {
  const dob = new Date(dobString);
  const day = dob.getDate();
  const month = dob.getMonth() + 1; // Months are 0-indexed
  const year = dob.getFullYear();

  const sumDigits = (num) => {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum > 9 ? sumDigits(sum) : sum;
  };

  const total = sumDigits(day) + sumDigits(month) + sumDigits(year);
  return sumDigits(total);
}

function calculateDestinyNumber(name) {
  const letterValues = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  const sum = name
    .toUpperCase()
    .split("")
    .reduce((acc, char) => {
      return acc + (letterValues[char] || 0);
    }, 0);

  return sum > 9 ? calculateDestinyNumber(sum.toString()) : sum;
}

function getColorByNumber(number) {
  const colorMap = {
    1: "#FF6B6B", // Red
    2: "#4ECDC4", // Teal
    3: "#45B7D1", // Blue
    4: "#96CEB4", // Green
    5: "#FFEEAD", // Yellow
    6: "#D4A5A5", // Rose
    7: "#AEC6CF", // Silver
    8: "#B19CD9", // Purple
    9: "#FFB347", // Orange
  };
  return colorMap[number] || "#FFFFFF";
}

function adjustColorByLocation(baseColor, location) {
  // Convert location to numerical value
  const locationSum = location
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hueAdjust = (locationSum % 360) - 180; // -180 to 180 degree adjustment

  // Convert base color to HSL
  let [r, g, b] = baseColor.match(/\w\w/g).map((x) => parseInt(x, 16));
  (r /= 255), (g /= 255), (b /= 255);

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // Adjust hue
  h = ((h * 360 + hueAdjust) % 360) / 360;

  // Convert back to RGB
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) {
    r = g = b = l;
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
