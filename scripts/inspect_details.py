import json
import os

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"

out_lines = []
for s_idx in [1, 2, 3]:
    unmatched_file = os.path.join(root_dir, f"audit_unmatched_sheet_{s_idx}.json")
    if not os.path.exists(unmatched_file):
        continue
    with open(unmatched_file, "r", encoding="utf-8") as f:
        items = json.load(f)
    out_lines.append(f"\n=======================================================")
    out_lines.append(f"UNMATCHED ITEMS IN SHEET {s_idx} (Total: {len(items)})")
    out_lines.append(f"=======================================================")
    for idx, it in enumerate(items, 1):
        out_lines.append(f"{idx}. Row {it['row']}:")
        out_lines.append(f"   Title: {it['title']}")
        out_lines.append(f"   Issuer: {it['issuer']}")
        out_lines.append(f"   Links: {it['links']}")
        out_lines.append(f"   Col vals: {json.dumps(it['col_vals'], ensure_ascii=False)}")

with open(os.path.join(root_dir, "scripts_unmatched_summary_utf8.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(out_lines))
print("Wrote scripts_unmatched_summary_utf8.txt")
