"""Builds the cinematic hero sequence from official Seviche photography.

Each shot = static pre-crop to the target aspect + slow zoom/pan (zoompan on an
upscaled frame to avoid sub-pixel jitter), joined with soft cross-dissolves.
Outputs H.264 MP4 (VP9 tested larger at equal quality for this footage) for desktop (16:9) and mobile (9:16).
Run: python3 scripts/hero-video.py   (needs ffmpeg)
"""
import subprocess, sys
from PIL import Image

FPS = 25
XF = 0.8  # cross-dissolve seconds
SRC = 'assets-src/'
OUT = 'public/video/'

def shot(img, crop, z0, z1, f0, f1, dur):
    return dict(img=img, crop=crop, z0=z0, z1=z1, f0=f0, f1=f1, dur=dur)

def aspect_crop(img, aspect, cx, cy, scale=1.0):
    W, H = Image.open(SRC + img).size
    if W / H > aspect:
        h = H * scale; w = h * aspect
    else:
        w = W * scale; h = w / aspect
    x = min(max(cx * W - w / 2, 0), W - w)
    y = min(max(cy * H - h / 2, 0), H - h)
    return (int(x), int(y), int(w), int(h))

def build(name, size, shots):
    ow, oh = size
    aspect = ow / oh
    inputs, filters = [], []
    for i, s in enumerate(shots):
        frames = int(s['dur'] * FPS)
        x, y, w, h = s['crop']
        bw = ow * 3  # upscale factor for smooth motion
        bh = oh * 3
        z0, z1 = s['z0'], s['z1']
        (fx0, fy0), (fx1, fy1) = s['f0'], s['f1']
        # eased progress 0..1
        p = f"(0.5-0.5*cos(PI*on/{frames}))"
        z = f"({z0}+({z1}-{z0})*{p})"
        fx = f"({fx0}+({fx1}-{fx0})*{p})"
        fy = f"({fy0}+({fy1}-{fy0})*{p})"
        xe = f"max(0,min(iw-iw/zoom,{fx}*iw-iw/zoom/2))"
        ye = f"max(0,min(ih-ih/zoom,{fy}*ih-ih/zoom/2))"
        inputs += ['-loop', '1', '-framerate', str(FPS), '-t', f"{s['dur']}", '-i', SRC + s['img']]
        filters.append(
            f"[{i}:v]crop={w}:{h}:{x}:{y},scale={bw}:{bh}:flags=lanczos,"
            f"zoompan=z='{z}':x='{xe}':y='{ye}':d=1:s={ow}x{oh}:fps={FPS},"
            f"setsar=1,format=yuv420p,trim=duration={s['dur']}[s{i}]"
        )
    # chain xfades
    last = 's0'; offset = 0.0
    for i in range(1, len(shots)):
        offset += shots[i - 1]['dur'] - XF
        filters.append(f"[{last}][s{i}]xfade=transition=fade:duration={XF}:offset={offset:.2f}[x{i}]")
        last = f'x{i}'
    total = sum(s['dur'] for s in shots) - XF * (len(shots) - 1)
    # grade: gentle warm, slightly lifted blacks -> deep; fade from/to black for a seamless loop
    filters.append(
        f"[{last}]eq=contrast=1.06:saturation=1.05:gamma=0.97,colorbalance=rs=0.03:bs=-0.03:rm=0.02:bm=-0.02,"
        f"fade=t=in:st=0:d=0.9,fade=t=out:st={total-0.9:.2f}:d=0.9[v]"
    )
    fc = ';'.join(filters)
    base = ['ffmpeg', '-y', '-loglevel', 'error', *inputs, '-filter_complex', fc, '-map', '[v]', '-an']
    subprocess.run(base + ['-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-profile:v', 'high',
                           '-pix_fmt', 'yuv420p', '-movflags', '+faststart', OUT + f'{name}.mp4'], check=True)
    print(name, f'{total:.1f}s')

import os
os.makedirs(OUT, exist_ok=True)
D = 16 / 9
desktop = [
    shot('prep-detail.jpg', aspect_crop('prep-detail.jpg', D, .5, .5), 1.0, 1.14, (.5, .5), (.42, .42), 2.9),
    shot('chef-stove.jpg', aspect_crop('chef-stove.jpg', D, .5, .38), 1.05, 1.12, (.5, .25), (.5, .62), 2.9),
    shot('plating.jpg', aspect_crop('plating.jpg', D, .5, .5), 1.16, 1.02, (.55, .45), (.5, .5), 2.9),
    shot('bourbon-cocktail.jpg', aspect_crop('bourbon-cocktail.jpg', D, .3, .5), 1.0, 1.1, (.45, .55), (.5, .5), 2.7),
    shot('chef-guest.jpg', aspect_crop('chef-guest.jpg', D, .5, .44), 1.04, 1.12, (.55, .45), (.5, .5), 3.1),
]
P = 9 / 16
mobile = [
    shot('prep-detail.jpg', aspect_crop('prep-detail.jpg', P, .42, .5), 1.0, 1.12, (.5, .5), (.45, .42), 3.0),
    shot('chef-stove.jpg', aspect_crop('chef-stove.jpg', P, .5, .5), 1.0, 1.12, (.5, .4), (.5, .55), 3.0),
    shot('plating.jpg', aspect_crop('plating.jpg', P, .45, .5), 1.14, 1.0, (.5, .5), (.5, .5), 3.0),
    shot('chef-guest.jpg', aspect_crop('chef-guest.jpg', P, .5, .5), 1.0, 1.1, (.5, .38), (.5, .45), 3.2),
]
which = sys.argv[1:] or ['desktop', 'mobile']
if 'desktop' in which: build('hero-desktop', (1600, 900), desktop)
if 'mobile' in which: build('hero-mobile', (720, 1280), mobile)
