// Generates responsive AVIF/WebP variants + LQIP placeholders from assets-src/.
// Run once with `npm run images`; outputs are committed (public/img, src/data/images.json).
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/img';
const WIDTHS = [480, 960, 1440, 2000];

// name -> { widths cap, focal crop hints are handled in CSS via object-position }
const SKIP = new Set(['logo-source.jpg']);
// Source-specific crops (e.g. remove the grey frame baked into the churrascos plate shot)
const PREP = {
  'churrascos.png': (img, m) => img.extract({ left: Math.round(m.width * 0.045), top: Math.round(m.height * 0.05), width: Math.round(m.width * 0.91), height: Math.round(m.height * 0.9) }),
};
const load = async (file) => {
  const img = sharp(path.join(SRC, file)).rotate();
  if (!PREP[file]) return img;
  const m = await img.metadata();
  return sharp(await PREP[file](img, m).toBuffer());
};

await fs.mkdir(OUT, { recursive: true });
const manifest = {};
for (const file of (await fs.readdir(SRC)).sort()) {
  if (SKIP.has(file)) continue;
  const name = file.replace(/\.[^.]+$/, '');
  const input = await load(file);
  const meta = await input.metadata();
  const widths = WIDTHS.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, 2000));
  const uniq = [...new Set(widths)];
  await Promise.all(
    uniq.flatMap((w) => {
      const base = input.clone().resize({ width: w });
      return [
        base.clone().avif({ quality: 52, effort: 2 }).toFile(`${OUT}/${name}-${w}.avif`),
        base.clone().webp({ quality: 74, effort: 4 }).toFile(`${OUT}/${name}-${w}.webp`),
      ];
    }),
  );
  const lqip = await input.clone().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[name] = {
    w: meta.width,
    h: meta.height,
    widths: uniq,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  console.log(name, meta.width, meta.height, uniq.join(','));
}
// Social share image (1200x630) from the plating photograph
await sharp(path.join(SRC, 'prep-detail.jpg')).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 78 }).toFile('public/og-image.jpg');
await fs.writeFile('src/data/images.json', JSON.stringify(manifest, null, 1));
