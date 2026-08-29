import re
import json
import os

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"
ts_file = os.path.join(root_dir, "src", "lib", "education-data.ts")

with open(ts_file, "r", encoding="utf-8") as f:
    ts_content = f.read()

# Let's count items accurately by scanning { id: ... } blocks
blocks = re.split(r'\n\s*\{\s*\n\s*id:\s*"', ts_content)[1:]
print(f"Total structured certificate blocks in education-data.ts: {len(blocks)}")

ts_list = []
for b in blocks:
    lines = b.split('\n')
    c_id = lines[0].split('"')[0]
    title_m = re.search(r'title:\s*"([^"]+)"', b)
    issuer_m = re.search(r'issuer:\s*"([^"]+)"', b)
    platform_m = re.search(r'platform:\s*"([^"]+)"', b)
    category_m = re.search(r'category:\s*"([^"]+)"', b)
    year_m = re.search(r'year:\s*([^,\n]+)', b)
    url_m = re.search(r'url:\s*"([^"]+)"', b)
    flagship_m = re.search(r'isFlagship:\s*true', b)
    spec_m = re.search(r'isSpecialization:\s*true', b)
    
    ts_list.append({
        'id': c_id,
        'title': title_m.group(1) if title_m else "",
        'issuer': issuer_m.group(1) if issuer_m else "",
        'platform': platform_m.group(1) if platform_m else "",
        'category': category_m.group(1) if category_m else "",
        'year': year_m.group(1).strip().strip('"') if year_m else "",
        'url': url_m.group(1) if url_m else "",
        'isFlagship': bool(flagship_m),
        'isSpecialization': bool(spec_m)
    })

print(f"Parsed {len(ts_list)} items.")
cat_counts = {}
for item in ts_list:
    cat_counts[item['category']] = cat_counts.get(item['category'], 0) + 1
print("Counts by category in TS file:")
for k, v in cat_counts.items():
    print(f"  {k}: {v}")
