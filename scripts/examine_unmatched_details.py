import json
import os

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"

with open(os.path.join(root_dir, "unmatched_categorized.json"), "r", encoding="utf-8") as f:
    data = json.load(f)

report = []

for category, items in data.items():
    report.append(f"\n=======================================================")
    report.append(f"CATEGORY: {category.upper()} (Total: {len(items)})")
    report.append(f"=======================================================")
    for idx, it in enumerate(items, 1):
        report.append(f"\n[{idx}] Row {it['row']}")
        report.append(f"  Title: {it['title']}")
        report.append(f"  Issuer: {it['issuer']}")
        report.append(f"  Cert Type: {it['cert_type']}")
        report.append(f"  Date: {it['date']}")
        for lk in it['links']:
            report.append(f"  Link: {lk}")

with open(os.path.join(root_dir, "unmatched_report_full.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(report))

print("Generated unmatched_report_full.txt")
