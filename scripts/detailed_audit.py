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

# Load Sheet 2
sheet_file = os.path.join(root_dir, "scripts_output_sheet_2.json")
with open(sheet_file, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"\n==========================================")
print(f"SHEET 2: {data.get('sheet_name')} (rows: {len(data.get('rows', []))})")
print(f"==========================================")

all_sheet_entries = []
matched_entries = []
unmatched_entries = []

for r in data['rows']:
    row_num = r['row']
    cols = r['cols']
    col_vals = {k: v['val'] for k, v in cols.items()}
    found_links = [v['link'] for k, v in cols.items() if v.get('link')]
    
    # In Sheet 2:
    # Col A: Date (or Title in some rows)
    # Col B: Title (or Issuer in some rows)
    # Col C: Issuer
    # Col D: Cert type
    # Col E: Link
    
    val_a = col_vals.get('A', '').strip()
    val_b = col_vals.get('B', '').strip()
    val_c = col_vals.get('C', '').strip()
    val_d = col_vals.get('D', '').strip()
    val_e = col_vals.get('E', '').strip()
    
    if not val_b and not val_a:
        continue
    if "Название курсов" in val_a or "Название курсов" in val_b or "Пройденные" in val_a:
        continue
        
    date_val = val_a
    title_val = val_b if val_b else val_a
    issuer_val = val_c if val_b else val_b
    
    entry = {
        'row': row_num,
        'date': date_val,
        'title': title_val,
        'issuer': issuer_val,
        'cert_type': val_d,
        'links': found_links,
        'col_vals': col_vals
    }
    all_sheet_entries.append(entry)
    
    # Check matching
    is_matched = False
    matched_ts_cert = None
    
    for lk in found_links:
        clean_lk = lk.strip().rstrip('/')
        if clean_lk in ts_urls:
            is_matched = True
            matched_ts_cert = ts_urls[clean_lk]
            break
            
    if not is_matched:
        # Check by title fuzzy
        t_low = title_val.lower()
        for t_k, c in ts_titles.items():
            if t_k == t_low or (len(t_k) > 7 and t_k in t_low) or (len(t_low) > 7 and t_low in t_k):
                is_matched = True
                matched_ts_cert = c
                break
                
    if is_matched:
        matched_entries.append({'sheet': entry, 'ts': matched_ts_cert})
    else:
        unmatched_entries.append(entry)

print(f"Total valid course entries in Sheet 2: {len(all_sheet_entries)}")
print(f"Matched with education-data.ts: {len(matched_entries)}")
print(f"Unmatched (potential additions/missing): {len(unmatched_entries)}")

# Write unmatched out for deep inspection
with open(os.path.join(root_dir, "sheet2_unmatched_detailed.json"), "w", encoding="utf-8") as f:
    json.dump(unmatched_entries, f, ensure_ascii=False, indent=2)

with open(os.path.join(root_dir, "sheet2_matched_detailed.json"), "w", encoding="utf-8") as f:
    json.dump(matched_entries, f, ensure_ascii=False, indent=2)

print("Saved sheet2_unmatched_detailed.json and sheet2_matched_detailed.json")
