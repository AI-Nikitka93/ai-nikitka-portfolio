import json
import os

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"

with open(os.path.join(root_dir, "sheet2_unmatched_detailed.json"), "r", encoding="utf-8") as f:
    unmatched = json.load(f)

print(f"Total unmatched items: {len(unmatched)}")

categories = {
    'edx_university': [],
    'coursera': [],
    'stepik': [],
    'netology': [],
    'pronavyki_getcourse': [],
    'geekbrains': [],
    'un_fema_who_intl': [],
    'intuit': [],
    'other_with_links': [],
    'no_links': []
}

for item in unmatched:
    row = item['row']
    title = item['title']
    issuer = item['issuer']
    links = item['links']
    date = item['date']
    cert_type = item['cert_type']
    
    entry = {
        'row': row,
        'date': date,
        'title': title,
        'issuer': issuer,
        'cert_type': cert_type,
        'links': links
    }
    
    if not links:
        categories['no_links'].append(entry)
        continue
        
    link_str = " ".join(links).lower()
    
    if 'edx.org' in link_str or 'credentials.edx.org' in link_str:
        categories['edx_university'].append(entry)
    elif 'coursera.org' in link_str:
        categories['coursera'].append(entry)
    elif 'stepik.org' in link_str:
        categories['stepik'].append(entry)
    elif 'netology.ru' in link_str:
        categories['netology'].append(entry)
    elif 'getcourse.ru' in link_str:
        categories['pronavyki_getcourse'].append(entry)
    elif 'gb.ru' in link_str or 'geekbrains' in issuer.lower():
        categories['geekbrains'].append(entry)
    elif 'intuit.ru' in link_str:
        categories['intuit'].append(entry)
    elif any(k in issuer.lower() or k in title.lower() for k in ['un', 'who', 'fema', 'unicef', 'iaea', 'world bank', 'unesco', 'ocha', 'unoda', 'ilo']):
        categories['un_fema_who_intl'].append(entry)
    else:
        categories['other_with_links'].append(entry)

with open(os.path.join(root_dir, "unmatched_categorized.json"), "w", encoding="utf-8") as f:
    json.dump(categories, f, ensure_ascii=False, indent=2)

counts = {k: len(v) for k, v in categories.items()}
print("Categorization counts:")
print(json.dumps(counts, indent=2))
