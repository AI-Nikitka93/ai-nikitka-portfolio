# scripts/inspect_top_certs.py
import json

with open('all_parsed_certificates.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

for idx, c in enumerate(certs[:25]):
    print(f"[{idx+1}] ID: {c['id']}")
    print(f"    TITLE: {c['title']}")
    print(f"    ISSUER: {c['issuer']}")
    print(f"    PLATFORM: {c['platform']}")
    print(f"    CATEGORY: {c['category']}")
    print(f"    URL: {c['url']}")
    print("-" * 60)
