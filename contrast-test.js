const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const luminance = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const contrast = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

const bg = '#111c44'; // navy-800
console.log('gray-600 (#a3aed0):', contrast('#a3aed0', bg));
console.log('gray-500 (#adb5bd):', contrast('#adb5bd', bg));
console.log('gray-400 (#a0aec0):', contrast('#a0aec0', bg));
console.log('white (#ffffff):', contrast('#ffffff', bg));
console.log('brand-500 (#422AFB):', contrast('#422AFB', bg));
console.log('brand-400 (#7551FF):', contrast('#7551FF', bg));
console.log('green-600 (#17ad37):', contrast('#17ad37', bg));
console.log('orange-500 (#f97316):', contrast('#f97316', bg));
console.log('red-600 (#ea0606):', contrast('#ea0606', bg));
