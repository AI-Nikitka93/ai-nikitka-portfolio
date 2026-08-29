import os
import glob
import zipfile
import xml.etree.ElementTree as ET
import json

root_dir = r"m:\Projects\sites\ai-nikitka-portfolio"
xlsx_files = glob.glob(os.path.join(root_dir, "**", "*.xlsx"), recursive=True)
print(f"Found xlsx files: {xlsx_files}")

for xlsx_path in xlsx_files:
    print(f"\n--- Reading {xlsx_path} ---")
    with zipfile.ZipFile(xlsx_path, 'r') as z:
        # Read shared strings
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in ss_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                text = "".join(si.itertext())
                shared_strings.append(text)
        print(f"Shared strings count: {len(shared_strings)}")
        
        # Check sheets
        workbook_tree = ET.fromstring(z.read('xl/workbook.xml'))
        sheets = workbook_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheets/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet')
        
        for idx, sheet in enumerate(sheets, 1):
            sheet_name = sheet.attrib.get('name')
            sheet_file = f'xl/worksheets/sheet{idx}.xml'
            rels_file = f'xl/worksheets/_rels/sheet{idx}.xml.rels'
            
            # Read rels (hyperlinks)
            hyperlinks = {}
            if rels_file in z.namelist():
                rels_tree = ET.fromstring(z.read(rels_file))
                for rel in rels_tree.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                    r_id = rel.attrib.get('Id')
                    target = rel.attrib.get('Target')
                    hyperlinks[r_id] = target
            
            print(f"\nSheet: {sheet_name} (hyperlinks rels count: {len(hyperlinks)})")
            
            sheet_tree = ET.fromstring(z.read(sheet_file))
            
            # Extract hyperlink tags in sheet
            cell_links = {}
            for hl in sheet_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}hyperlinks/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}hyperlink'):
                ref = hl.attrib.get('ref')
                r_id = hl.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                location = hl.attrib.get('location')
                target = hyperlinks.get(r_id, location)
                cell_links[ref] = target
            
            # Parse rows
            rows_data = []
            for row in sheet_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
                row_num = row.attrib.get('r')
                cols = {}
                for c in row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                    ref = c.attrib.get('r') # e.g. A1, B1
                    col_letter = ''.join([ch for ch in ref if ch.isalpha()])
                    t = c.attrib.get('t')
                    v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                    val = v.text if v is not None else ""
                    if t == 's' and val.isdigit():
                        val = shared_strings[int(val)]
                    link = cell_links.get(ref)
                    cols[col_letter] = {'val': val, 'link': link, 'ref': ref}
                rows_data.append({'row': row_num, 'cols': cols})
            
            print(f"Total rows in sheet '{sheet_name}': {len(rows_data)}")
            # Output summary
            out_file = os.path.join(root_dir, f"scripts_output_sheet_{idx}.json")
            with open(out_file, "w", encoding="utf-8") as out:
                json.dump({'sheet_name': sheet_name, 'rows': rows_data}, out, ensure_ascii=False, indent=2)
            print(f"Saved to {out_file}")
