import re

with open('src/lib/education-data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract items
items = re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",(?:.*?titleRu:\s*"([^"]+)",)?(?:.*?issuer:\s*"([^"]+)",)?(?:.*?platform:\s*"([^"]+)",)?(?:.*?category:\s*"([^"]+)",)?', content, re.DOTALL)

print(f"Total items parsed from education-data.ts: {len(items)}\n")
print("=== FIRST 24 CARDS (4 BATCHES OF 6) ===")
for i, item in enumerate(items[:24]):
    cid, title, title_ru, issuer, plat, cat = item
    batch = (i // 6) + 1
    pos_in_batch = (i % 6) + 1
    if pos_in_batch == 1:
        print(f"\n--- BATCH {batch} (Cards {i+1} to {i+6}) ---")
    print(f"#{i+1:02d} [Batch {batch}.{pos_in_batch}]: [{issuer}] -> {title} ({plat} / {cat})")
