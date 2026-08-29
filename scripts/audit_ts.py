import re
import json
import os

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"
ts_file = os.path.join(root_dir, "src", "lib", "education-data.ts")

with open(ts_file, "r", encoding="utf-8") as f:
    ts_content = f.read()

# Parse all certificate items in educationCertificates
# Match object literals
cert_regex = re.compile(r'\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",(?:.*?titleRu:\s*"([^"]+)",)?(?:.*?issuer:\s*"([^"]+)",)?(?:.*?platform:\s*"([^"]+)",)?(?:.*?category:\s*"([^"]+)",)?(?:.*?year:\s*([^,\n]+),)?(?:.*?url:\s*"([^"]+)",)?', re.DOTALL)

items = []
for m in cert_regex.finditer(ts_content):
    c_id, title, titleRu, issuer, platform, category, year, url = m.groups()
    items.append({
        'id': c_id,
        'title': title,
        'titleRu': titleRu,
        'issuer': issuer,
        'platform': platform,
        'category': category,
        'year': year.strip().strip('"') if year else "",
        'url': url if url else ""
    })

print(f"Total certificates in education-data.ts: {len(items)}")

by_category = {}
for it in items:
    cat = it['category']
    by_category.setdefault(cat, []).append(it)

for cat, certs in by_category.items():
    print(f"\nCategory: {cat} (Count: {len(certs)})")
    for c in certs:
        print(f"  - [{c['platform']}] {c['title']} ({c['year']}) -> {c['url'][:45]}...")
