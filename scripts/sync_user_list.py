# scripts/sync_user_list.py
import re
import json

with open('./Электронные сертификат и обычение за несколько лет.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's extract all URL occurrences with their preceding names
lines = [line.strip() for line in text.split('\n') if line.strip()]
print(f"Total lines in source file: {len(lines)}")

# Let's also read src/lib/education-data.ts
with open('src/lib/education-data.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()

# Find all URLs in source file
urls_in_source = re.findall(r'https?://[^\s\)\]]+', text)
print(f"Total URLs in source file: {len(urls_in_source)}")

# Find all URLs in TS file
urls_in_ts = re.findall(r'https?://[^\s"\'\`]+', ts_content)
print(f"Total URLs in education-data.ts: {len(urls_in_ts)}")

# Clean and dedup
urls_in_source_clean = set(u.rstrip('.,;:)') for u in urls_in_source)
urls_in_ts_clean = set(u.rstrip('.,;:)') for u in urls_in_ts)

print(f"Unique URLs in source: {len(urls_in_source_clean)}")
print(f"Unique URLs in TS: {len(urls_in_ts_clean)}")

missing_urls = urls_in_source_clean - urls_in_ts_clean
print(f"Missing URLs count: {len(missing_urls)}")

with open('missing_urls.txt', 'w', encoding='utf-8') as f:
    for u in sorted(missing_urls):
        f.write(u + '\n')

print("Written missing URLs to missing_urls.txt")
