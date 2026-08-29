import json
import os
import re

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"
ts_file = os.path.join(root_dir, "src", "lib", "education-data.ts")

with open(ts_file, "r", encoding="utf-8") as f:
    ts_content = f.read()

blocks = re.split(r'\n\s*\{\s*\n\s*id:\s*"', ts_content)[1:]
for b in blocks:
    category_m = re.search(r'category:\s*"([^"]+)"', b)
    if not category_m:
        print("Block without category:")
        print(b[:200])
        print("---")
