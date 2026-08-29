import json
import re
import os

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"

# Read education-data.ts
ts_file = os.path.join(root_dir, "src", "lib", "education-data.ts")
with open(ts_file, "r", encoding="utf-8") as f:
    ts_content = f.read()

# Extract certificates from ts file
cert_blocks = re.findall(r'\{\s*id:\s*"([^"]+)",\s*title:\s*"([^"]+)",(?:.*?titleRu:\s*"([^"]+)",)?(?:.*?issuer:\s*"([^"]+)",)?(?:.*?platform:\s*"([^"]+)",)?(?:.*?category:\s*"([^"]+)",)?(?:.*?year:\s*([^,\n]+),)?(?:.*?url:\s*"([^"]+)",)?', ts_content, re.DOTALL)

ts_certs = []
for m in cert_blocks:
    c_id, title, title_ru, issuer, platform, category, year, url = m
    ts_certs.append({
        'id': c_id,
        'title': title,
        'titleRu': title_ru,
        'issuer': issuer,
        'platform': platform,
        'category': category,
        'year': year.strip().strip('"'),
        'url': url
    })

print(f"Total certificates in education-data.ts: {len(ts_certs)}")
ts_urls = {c['url'].strip().rstrip('/'): c for c in ts_certs if c['url']}
ts_titles = {c['title'].lower().strip(): c for c in ts_certs}

# Load sheets
for sheet_idx in [1, 2, 3]:
    sheet_file = os.path.join(root_dir, f"scripts_output_sheet_{sheet_idx}.json")
    if not os.path.exists(sheet_file):
        continue
    with open(sheet_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n==========================================")
    print(f"SHEET {sheet_idx}: {data.get('sheet_name')} (rows: {len(data.get('rows', []))})")
    print(f"==========================================")
    
    matched = 0
    unmatched = []
    
    for r in data['rows']:
        row_num = r['row']
        cols = r['cols']
        # Extract title and link
        col_vals = {k: v['val'] for k, v in cols.items()}
        col_links = {k: v['link'] for k, v in cols.items() if v.get('link')}
        
        # In sheet 2: A=Title, B=Issuer, C=Cert type, D=Link
        title = col_vals.get('A', '').strip()
        issuer = col_vals.get('B', '').strip()
        cert_type = col_vals.get('C', '').strip()
        link_val = col_vals.get('D', '').strip()
        
        # Find any link in columns
        found_links = [v['link'] for k, v in cols.items() if v.get('link')]
        
        if not title or title.startswith("Название") or title.startswith("Пройденные"):
            continue
            
        # Match by URL or Title
        is_matched = False
        match_info = None
        for lk in found_links:
            clean_lk = lk.strip().rstrip('/')
            if clean_lk in ts_urls:
                is_matched = True
                match_info = f"URL match: {ts_urls[clean_lk]['id']}"
                break
        
        if not is_matched:
            # Try fuzzy title match
            t_lower = title.lower()
            for t_k, c in ts_titles.items():
                if t_k in t_lower or t_lower in t_k or (len(t_lower) > 10 and (t_lower[:20] in t_k or t_k[:20] in t_lower)):
                    is_matched = True
                    match_info = f"Title fuzzy match: {c['id']} ('{c['title']}')"
                    break
        
        if is_matched:
            matched += 1
        else:
            unmatched.append({
                'row': row_num,
                'title': title,
                'issuer': issuer,
                'cert_type': cert_type,
                'links': found_links,
                'col_vals': col_vals
            })
            
    print(f"Matched in education-data.ts: {matched}")
    print(f"Unmatched / Not directly mapped: {len(unmatched)}")
    
    # Save unmatched to file for detailed review
    out_unmatched = os.path.join(root_dir, f"audit_unmatched_sheet_{sheet_idx}.json")
    with open(out_unmatched, "w", encoding="utf-8") as out:
        json.dump(unmatched, out, ensure_ascii=False, indent=2)
    print(f"Saved unmatched to {out_unmatched}")
