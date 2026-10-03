"""
Extracts the embedded logo and Pandit ji's photo from your OLD html file
and saves them as images/logo.webp and images/pandit.jpg.

Usage:
    python extract_images.py old-index.html
"""
import base64, os, re, sys

src = sys.argv[1] if len(sys.argv) > 1 else "old-index.html"
html = open(src, encoding="utf-8").read()

os.makedirs("images", exist_ok=True)
found = re.findall(r"data:image/(webp|jpeg|jpg|png);base64,([A-Za-z0-9+/=]+)", html)

saved = set()
for fmt, data in found:
    name = "logo.webp" if fmt == "webp" else "pandit.jpg" if fmt in ("jpeg", "jpg") else "image.png"
    if name in saved:
        continue  # the logo appears twice in the old file
    with open(os.path.join("images", name), "wb") as f:
        f.write(base64.b64decode(data))
    saved.add(name)
    print("saved images/" + name)
