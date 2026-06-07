const sharp = require("sharp");
const [,, inPath, outPath, thrArg, mode = "dark"] = process.argv;
const threshold = parseInt(thrArg || "60", 10);
// mode "dark"  -> remove dark background (light subject on black)
// mode "light" -> remove light background (dark subject on white)
const isBg = (l) => (mode === "light" ? l > threshold : l < threshold);

(async () => {
  const { data, info } = await sharp(inPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const lum = (i) => 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  const visited = new Uint8Array(width * height);
  const stack = [];
  const seed = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = y * width + x;
    if (visited[p]) return;
    visited[p] = 1;
    const i = p * 4;
    if (isBg(lum(i))) { data[i + 3] = 0; stack.push(x, y); }
  };
  for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height - 1); }
  for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y); }
  while (stack.length) {
    const y = stack.pop(), x = stack.pop();
    seed(x + 1, y); seed(x - 1, y); seed(x, y + 1); seed(x, y - 1);
  }
  let cleared = 0;
  for (let p = 0; p < width * height; p++) if (data[p * 4 + 3] === 0) cleared++;
  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(outPath);
  console.log(`done ${width}x${height} mode=${mode} thr=${threshold} cleared=${(100 * cleared / (width * height)).toFixed(1)}%`);
})();
