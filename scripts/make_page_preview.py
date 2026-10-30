"""
Build the collapsed preview of a full-page image for CaseGallery `page` blocks.

The fade to the card colour is computed in float. The preview is saved as two
stacked images:
  <out>-top.webp   upper part, full resolution, lossy (small)
  <out>-fade.webp  lower part where the fade is strongest, full resolution,
                   dithered (TPDF ±1 level) and LOSSLESS — lossy WebP wipes out
                   dithering and brings the bands back.
The upper part gets a slightly stronger dither inside the fade, so enough of
it survives lossy compression.

usage: python3 scripts/make_page_preview.py <full-page.png> <out-prefix>
"""
import sys
import numpy as np
from PIL import Image

CARD = np.array([21.7, 21.7, 21.7])  # bg-secondary/50 over background
CONTAINER = 1084                      # card inner width at desktop, css px
COLLAPSED = 1200                      # visible height when collapsed, css px
FADE = 0.38                           # bottom share of the preview that fades
SPLIT = 0.84                          # where the lossless part begins (below content)

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGBA")
w = im.width
h = round(COLLAPSED / CONTAINER * w)
im = im.crop((0, 0, w, min(h, im.height)))
h = im.height

a = np.asarray(im).astype(np.float64)
rgb, alpha = a[..., :3], a[..., 3:4] / 255.0
rgb = rgb * alpha + CARD * (1 - alpha)

y = np.linspace(0, 1, h)[:, None, None]
t = np.clip((y - (1 - FADE)) / FADE, 0, 1)
k = t * t * (3 - 2 * t)
rgb = rgb * (1 - k) + CARD * k

s = int(h * SPLIT)
rng = np.random.default_rng(1)
tpdf = lambda shape: rng.random(shape) - rng.random(shape)

top = rgb[:s] + 2 * tpdf(rgb[:s].shape) * (k[:s] > 0)
top = np.clip(np.round(top), 0, 255).astype(np.uint8)
Image.fromarray(top, "RGB").save(f"{out}-top.webp", "WEBP", quality=95, method=6)

fade = rgb[s:] + tpdf(rgb[s:].shape)
fade = np.clip(np.round(fade), 0, 255).astype(np.uint8)
Image.fromarray(fade, "RGB").save(f"{out}-fade.webp", "WEBP", lossless=True, method=6)
print(top.shape, fade.shape)
