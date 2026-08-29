import json
import re

with open('all_parsed_certificates.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

print(f"Total certs in all_parsed: {len(certs)}")

for i, c in enumerate(certs):
    cid = c.get('id', '')
    title = c.get('title', '')
    issuer = c.get('issuer', '')
    plat = c.get('platform', '')
    if any(k in (title + ' ' + issuer).lower() for k in ['hugging', 'anthropic', 'vanderbilt', 'harvard', 'google ai', 'bsafe', 'stanford', 'ibm']):
        print(f"[{i}] {cid} | {plat} | {issuer[:35]} | {title[:45]}")
