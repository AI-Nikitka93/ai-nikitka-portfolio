# scripts/reconcile_and_build_complete_ts.py
import json
import re

with open('sheet2_full_extracted.json', 'r', encoding='utf-8') as f:
    rows = json.load(f)

print(f"Total rows in sheet2: {len(rows)}")

def determine_platform(inst, title, link):
    link_l = link.lower()
    inst_l = inst.lower()
    title_l = title.lower()

    if "coursera.org" in link_l or "coursera" in inst_l:
        if "ibm" in inst_l or "ibm" in title_l:
            return "IBM"
        if "google" in inst_l or "google" in title_l:
            return "Google"
        return "Coursera"
    if "edx.org" in link_l or "edx" in inst_l:
        if "harvard" in inst_l or "harvard" in title_l:
            return "Harvard"
        if "ibm" in inst_l:
            return "IBM"
        return "edX"
    if "stepik.org" in link_l or "stepik" in inst_l:
        return "Stepik"
    if "harvard" in inst_l or "harvard" in title_l:
        return "Harvard"
    if "ibm" in inst_l:
        return "IBM"
    if "google" in inst_l:
        return "Google"
    if "yandex" in inst_l or "яндекс" in inst_l:
        return "Yandex"
    if "netology" in inst_l or "нетология" in inst_l:
        return "Netology"
    if "geekbrains" in inst_l or "gb.ru" in link_l:
        return "GeekBrains"
    if any(k in inst_l for k in ["un ", "оон", "who", "воз", "unicef", "юнисеф", "undss", "iaea", "магатэ", "unesco", "юнеско", "unssc", "un ocha", "unoda", "un cc:learn", "unv", "un volunteers"]):
        return "UN / WHO"
    return "Other"

def determine_category(title, inst):
    t = title.lower()
    i = inst.lower()

    # AI & ML
    if any(k in t for k in ["prompt", "gpt", "generative ai", "искусственн", "нейро", "machine learning", "ии", "ai ", "ai:", "ai0", "claude", "agent", "llm", "firefly", "hugging face", "elements of ai"]):
        return "ai-ml"
    
    # Global / Health / Safety / UN
    if any(k in t or k in i for k in ["covid", "who", "воз", "оон", "un ", "unicef", "юнисеф", "undss", "fema", "dementia", "деменци", "safety", "безопасност", "disaster", "humanitarian", "climate", "климат", "human rights", "права человека", "fire", "пожарн", "cpr", "реанимац", "iaea", "магатэ", "world bank", "всемирный банк", "water", "санитари", "animals", "животн", "lifestyle medicine", "psychology", "психолог", "психоанализ", "spiritual", "acting", "актерск", "civil rights"]):
        if "fire" in t and "energy" in i:
            return "engineering-energy"
        return "global-health-safety"

    # Engineering / Energy
    if any(k in t or k in i for k in ["energy", "энерг", "electric", "электр", "lean", "six sigma", "six-sigma", "кайдзен", "5s", "microgrid", "микросет", "power", "grid", "schneider", "grundfos", "материаловедение", "автомобил", "дрон", "бпла", "производств", "electronics"]):
        return "engineering-energy"

    # Programming & Web / Tech
    if any(k in t or k in i for k in ["cs50", "pascal", "паскаль", "html", "css", "c#", "csharp", "python", "programming", "программирован", "сетев", "сетей", "networking", "битрикс", "bitrix", "wordpress", "cybersecurity", "кибербезопасн", "it support", "техподдержк", "hardware", "пэвм", "компьютер", "operating system", "базы данных", "database", "cloud", "облачн", "snowflake", "ит-администрирование"]):
        return "programming-web"

    # Marketing, Design, Content
    if any(k in t or k in i for k in ["marketing", "маркетинг", "smm", "смм", "контент", "content", "photoshop", "фотошоп", "дизайн", "design", "figma", "фигма", "canva", "канва", "яндекс.метрика", "яндекс.директ", "google analytics", "google ads", "реклам", "коллаж", "фотограф", "photo", "camera", "сторителлинг", "storytelling", "текст", "маркетплейс", "cpa", "арбитраж", "печать", "ratatype", "tilda", "тильда", "excel", "туризм", "tourism", "журналистик"]):
        return "marketing-design"

    # Management, Leadership, Business
    if any(k in t or k in i for k in ["leadership", "лидерств", "management", "управлен", "mba", "бизнес", "business", "hr", "персонал", "governance", "public policy", "risk", "риск", "коммуникац", "communication", "entrepreneur", "предпринимател", "интеллектуальн", "эпоха цифрового", "civil war", "продаж", "стрессоустойчивость", "эмоционального интеллекта", "финансовая грамотность"]):
        return "management-leadership"

    return "management-leadership"

def extract_skills(title, inst, cat):
    skills = []
    t = title.lower()
    
    if "prompt" in t: skills.append("Prompt Engineering")
    if "chatgpt" in t or "gpt" in t: skills.append("ChatGPT")
    if "generative ai" in t: skills.append("Generative AI")
    if "fine-tuning" in t: skills.append("Fine-Tuning")
    if "claude" in t: skills.append("Claude Code")
    if "agent" in t: skills.append("AI Agents")
    if "cs50" in t: skills.extend(["Computer Science", "Algorithms"])
    if "pascal" in t: skills.extend(["Turbo Pascal 7.0", "Алгоритмы"])
    if "html" in t or "css" in t: skills.extend(["HTML5", "CSS3"])
    if "c#" in t: skills.append("C#")
    if "bitrix" in t or "битрикс" in t: skills.append("1С-Битрикс")
    if "wordpress" in t: skills.append("WordPress")
    if "кибербезопасн" in t or "cybersecurity" in t: skills.append("Cybersecurity")
    if "сетев" in t or "networking" in t: skills.append("Computer Networks")
    if "метрика" in t: skills.append("Яндекс.Метрика")
    if "директ" in t: skills.append("Яндекс.Директ")
    if "google analytics" in t: skills.append("Google Analytics")
    if "photoshop" in t: skills.append("Photoshop")
    if "figma" in t: skills.append("Figma")
    if "canva" in t: skills.append("Canva")
    if "smm" in t: skills.append("SMM")
    if "электр" in t or "electrical" in t: skills.append("Электротехника")
    if "lean" in t or "six sigma" in t: skills.append("Lean Six Sigma")
    if "leadership" in t or "лидерств" in t: skills.append("Leadership")
    if "covid" in t: skills.append("Public Health")
    if "un" in t or "оон" in t: skills.append("UN Protocols")
    if "excel" in t: skills.append("MS Excel")

    if not skills:
        if cat == "ai-ml": skills = ["Machine Learning", "AI Tools"]
        elif cat == "programming-web": skills = ["Software Engineering", "Web Tech"]
        elif cat == "marketing-design": skills = ["Digital Marketing", "Analytics"]
        elif cat == "engineering-energy": skills = ["Engineering", "Industrial Automation"]
        elif cat == "management-leadership": skills = ["Management", "Leadership"]
        else: skills = ["Global Standards", "Safety Protocols"]

    return list(dict.fromkeys(skills))[:4]

valid_entries = []
seen_urls = set()

for idx, r in enumerate(rows):
    if idx < 2: # Skip header
        continue
    
    title = r.get('B', {}).get('text', '').strip()
    inst = r.get('C', {}).get('text', '').strip()
    cert_type = r.get('D', {}).get('text', '').strip()
    
    # Check link in column E, D, C, B, A
    link = (r.get('E', {}).get('link', '') or 
            r.get('D', {}).get('link', '') or 
            r.get('C', {}).get('link', '') or 
            r.get('B', {}).get('link', '') or 
            r.get('A', {}).get('link', ''))
    
    # If link is not in cell hyperlink, check text
    if not link:
        for col in ['E', 'D', 'C', 'B']:
            cell_text = r.get(col, {}).get('text', '')
            m = re.search(r'https?://[^\s\)\]]+', cell_text)
            if m:
                link = m.group(0)
                break

    if not title or not link:
        continue

    # Skip 5th rank electrician and formal college if already in formalEducationList, or include as verified entry
    title_clean = re.sub(r'^\d+\.\s*', '', title).strip()
    title_clean = title_clean.replace('\n', ' ').strip()
    inst_clean = inst.replace('\n', ' ').strip()

    if link in seen_urls:
        continue
    seen_urls.add(link)

    category = determine_category(title_clean, inst_clean)
    platform = determine_platform(inst_clean, title_clean, link)
    skills = extract_skills(title_clean, inst_clean, category)

    is_flagship = False
    is_spec = False
    courses_count = None

    if any(k in title_clean.lower() for k in ["specialization", "специализация", "professional certificate", "xseries"]):
        is_spec = True
        is_flagship = True

    if any(k in title_clean.lower() for k in ["vanderbilt", "cs50", "ibm technical support", "bsafe", "six sigma", "prompt engineering", "google ai essentials", "claude code", "elements of ai", "яндекс.метрике", "яндекс.директу"]):
        is_flagship = True

    safe_title = re.sub(r'[^a-zA-Z0-9]+', '-', title_clean.lower())[:30].strip('-')
    cert_id = f"cert-{idx}-{safe_title}"

    entry = {
        "id": cert_id,
        "title": title_clean,
        "issuer": inst_clean,
        "platform": platform,
        "category": category,
        "url": link,
        "skills": skills,
    }
    if is_flagship:
        entry["isFlagship"] = True
    if is_spec:
        entry["isSpecialization"] = True
        entry["coursesCount"] = 3

    valid_entries.append(entry)

print(f"Extracted {len(valid_entries)} clean valid certificate records from spreadsheet!")

with open('all_parsed_certificates.json', 'w', encoding='utf-8') as f:
    json.dump(valid_entries, f, ensure_ascii=False, indent=2)

print("Saved all_parsed_certificates.json")
