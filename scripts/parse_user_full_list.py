# scripts/parse_user_full_list.py
import re
import json

# Let's read from the transcript to get the exact user message or we can save the raw user prompt
with open('src/lib/education-data.ts', 'r', encoding='utf-8') as f:
    ts_data = f.read()

# Let's inspect the Excel workbook directly using openpyxl or zipfile
import zipfile
import xml.etree.ElementTree as ET

xlsx_path = 'Сертификаты/Дипломы об образовании, пройденные курсы, трудовая книжка, характеристика.xlsx'

wb_zip = zipfile.ZipFile(xlsx_path)
print("Files in xlsx:", wb_zip.namelist())

# Read shared strings
shared_strings = []
if 'xl/sharedStrings.xml' in wb_zip.namelist():
    tree = ET.fromstring(wb_zip.read('xl/sharedStrings.xml'))
    for si in tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
        texts = [t.text for t in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text]
        shared_strings.append(''.join(texts))

print(f"Total shared strings: {len(shared_strings)}")

# Read sheet2 relationships for hyperlinks
sheet2_rels = {}
if 'xl/worksheets/_rels/sheet2.xml.rels' in wb_zip.namelist():
    tree = ET.fromstring(wb_zip.read('xl/worksheets/_rels/sheet2.xml.rels'))
    for rel in tree.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        rId = rel.get('Id')
        target = rel.get('Target')
        sheet2_rels[rId] = target

print(f"Total hyperlinks in sheet2: {len(sheet2_rels)}")

# Parse sheet2 rows
sheet2_tree = ET.fromstring(wb_zip.read('xl/worksheets/sheet2.xml'))
ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

# Find all cell hyperlinks
cell_hyperlinks = {}
for h in sheet2_tree.findall('.//main:hyperlink', ns):
    ref = h.get('ref')
    rId = h.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
    if rId and rId in sheet2_rels:
        cell_hyperlinks[ref] = sheet2_rels[rId]

print(f"Total mapped cell hyperlinks: {len(cell_hyperlinks)}")

# Extract row contents
rows = []
for row in sheet2_tree.findall('.//main:row', ns):
    row_num = row.get('r')
    row_cells = {}
    for c in row.findall('main:c', ns):
        cell_ref = c.get('r')
        cell_type = c.get('t')
        v = c.find('main:v', ns)
        val = ""
        if v is not None and v.text:
            if cell_type == 's':
                idx = int(v.text)
                val = shared_strings[idx] if idx < len(shared_strings) else ""
            else:
                val = v.text
        
        # Check if this cell has hyperlink
        hl = cell_hyperlinks.get(cell_ref, "")
        col_letter = re.match(r'([A-Z]+)', cell_ref).group(1)
        row_cells[col_letter] = {'text': val, 'link': hl, 'ref': cell_ref}
    rows.append(row_cells)

print(f"Extracted {len(rows)} rows from sheet2")

# Save extracted data to json
with open('sheet2_full_extracted.json', 'w', encoding='utf-8') as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)

print("Saved to sheet2_full_extracted.json")
