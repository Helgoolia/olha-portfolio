"""
Build the collapsed preview of a full-page image for CaseGallery `page` blocks.

The fade to the card colour is computed in float and dithered (TPDF, ±1 level)
before quantising, so it is smooth on every screen — no CSS mask, no banding,
no visible grain.

usage: python3 scripts/make_page_preview.py <full-page.png> <out.webp>
"""
import sys
import numpy as np
from PIL import Image

CARD = np.array([21.7, 21.7, 21.7])  # bg-secondary/50 over background
CONTAINER = 1084                      # card inner width at desktop, css px
COLLAPSED = 1200                      # visible height when collapsed, css px
FADE = 0.38                           # bottom share of the preview that fades

src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGBA")
w = im.width
h = round(COLLAPSED / CONTAINER * w)
im = im.crop((0, 0, w, min(h, im.height)))
h = im.height

a = np.asarray(im).astype(np.float64)
rgb, alpha = a[..., :3], a[..., 3:4] / 255.0
rgb = rgb * alpha + CARD * (1 - alpha)  # flatten any transparency onto the card

y = np.linspace(0, 1, h)[:, None, None]
t = np.clip((y - (1 - FADE)) / FADE, 0, 1)
k = t * t * (3 - 2 * t)                 # smoothstep: soft start, soft end
rgb = rgb * (1 - k) + CARD * k

rng = np.random.default_rng(1)
noise = rng.random(rgb.shape) - rng.random(rgb.shape)  # TPDF in (-1, 1)
rgb = np.clip(np.round(rgb + noise), 0, 255).astype(np.uint8)

Image.fromarray(rgb, "RGB").save(out, "WEBP", quality=95, method=6)
print(out, rgb.shape)
