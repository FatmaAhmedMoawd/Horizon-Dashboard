const luminance = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
const contrast = (hex1, hex2) => {
  const rgb1 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1);
  const rgb2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2);
  const lum1 = luminance(parseInt(rgb1[1], 16), parseInt(rgb1[2], 16), parseInt(rgb1[3], 16));
  const lum2 = luminance(parseInt(rgb2[1], 16), parseInt(rgb2[2], 16), parseInt(rgb2[3], 16));
  const b = Math.max(lum1, lum2);
  const d = Math.min(lum1, lum2);
  return (b + 0.05) / (d + 0.05);
}
console.log('red-500 (#f53939) on navy-800:', contrast('#f53939', '#111c44'));
console.log('orange-500 (#f97316) on navy-800:', contrast('#f97316', '#111c44'));
console.log('green-500 (#22c55e) on navy-800:', contrast('#22c55e', '#111c44'));
