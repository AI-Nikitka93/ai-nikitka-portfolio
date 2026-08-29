# scripts/refine_education_dataset.py
import json
import os
import re

base_dir = r"m:\Projects\sites\ai-nikitka-portfolio"
cleaned_certs_path = os.path.join(base_dir, "cleaned_certs.json")
output_ts_path = os.path.join(base_dir, "src", "lib", "education-data.ts")

with open(cleaned_certs_path, 'r', encoding='utf-8') as f:
    certs = json.load(f)

print(f"Loaded {len(certs)} certificates from {cleaned_certs_path}")

def clean_issuer_concise(raw_issuer):
    raw = raw_issuer.strip()
    raw = re.sub(r'\s+', ' ', raw)
    
    # Remove any trailing "платформа Coursera" / "платформа edX" artifacts
    raw = re.sub(r'\s*\(?платформа\s+[СC]oursera\)?.*$', '', raw, flags=re.IGNORECASE)
    raw = re.sub(r'\s*\(?платформа\s+edX\)?.*$', '', raw, flags=re.IGNORECASE)
    raw = re.sub(r'\(Stepik[^\)]*\)', '', raw, flags=re.IGNORECASE)
    raw = raw.strip()

    raw_l = raw.lower()

    if "vanderbilt" in raw_l:
        return "Vanderbilt University"
    if "harvard" in raw_l:
        return "Harvard University"
    if "stanford" in raw_l:
        return "Stanford Medicine"
    if "massachusetts institute of technology" in raw_l or raw_l == "mit":
        return "MIT"
    if "ibm" in raw_l:
        return "IBM"
    if "google" in raw_l and "analytics" not in raw_l:
        return "Google"
    if "delft" in raw_l or "tu delft" in raw_l:
        return "Delft University of Technology (TU Delft)"
    if "rochester institute of technology" in raw_l or "rit" in raw_l:
        return "Rochester Institute of Technology (RIT)"
    if "dartmouth" in raw_l:
        return "Dartmouth College (Ivy League)"
    if "tecnológico de monterrey" in raw_l or "monterrey" in raw_l:
        return "Tecnológico de Monterrey"
    if "johns hopkins" in raw_l:
        return "Johns Hopkins University"
    if "uc davis" in raw_l or "california, davis" in raw_l:
        return "UC Davis (University of California)"
    if "colorado boulder" in raw_l or "boulder" in raw_l:
        return "University of Colorado Boulder"
    if "buffalo" in raw_l or "new york in buffalo" in raw_l:
        return "University at Buffalo (SUNY)"
    if "glasgow" in raw_l:
        return "University of Glasgow"
    if "helsinki" in raw_l:
        return "University of Helsinki"
    if "edinburgh" in raw_l:
        return "University of Edinburgh"
    if "london" in raw_l and "city" not in raw_l:
        return "University of London"
    if "michigan" in raw_l:
        return "University of Michigan"
    if "intel" in raw_l:
        return "Intel"
    if "hugging face" in raw_l:
        return "Hugging Face"
    if "anthropic" in raw_l:
        return "Anthropic"
    if "cisco" in raw_l:
        return "Cisco Networking Academy"
    if "united nations volunteers" in raw_l or "unv" in raw_l or "добровольцев оон" in raw_l:
        return "United Nations Volunteers (UNV)"
    if "undss" in raw_l or "департамент по вопросам охраны и безопасности оон" in raw_l or "департамент безопасности оон" in raw_l:
        return "Департамент безопасности ООН (UNDSS)"
    if "world health organization" in raw_l or "who" in raw_l or "всемирная организация здравоохранения" in raw_l or "воз" in raw_l:
        return "Всемирная организация здравоохранения (ВОЗ / WHO)"
    if "unicef" in raw_l or "юнисеф" in raw_l:
        return "ЮНИСЕФ (UNICEF / ООН)"
    if "fema" in raw_l or "emergency management institute" in raw_l:
        return "FEMA (Emergency Management Institute)"
    if "яндекс" in raw_l or "yandex" in raw_l:
        return "Академия Яндекса"
    if "juran" in raw_l or "six sigma" in raw_l:
        return "Juran Global / Lean Six Sigma Institute"
    if "schneider" in raw_l:
        return "Schneider Electric (Energy University)"
    if "city business school" in raw_l:
        return "City Business School"
    if "нетология" in raw_l or "netology" in raw_l:
        return "Центр «Нетология»"
    if "пронавыки" in raw_l or "ит-планета" in raw_l:
        return "Центр «ИТ-Планета» // ПРОНАВЫКИ (Microsoft)"
    if "интуит" in raw_l:
        return "Национальный Открытый Университет «ИНТУИТ»"
    if "geekbrains" in raw_l:
        return "GeekBrains"
    if "двфу" in raw_l or "дальневосточный" in raw_l:
        return "Дальневосточный федеральный университет (ДВФУ)"
    if "ранхигс" in raw_l or "вшгу" in raw_l:
        return "ВШГУ РАНХиГС (Президентская академия)"
    if "рудн" in raw_l:
        return "Российский университет дружбы народов (РУДН)"
    if "омгту" in raw_l or "омский" in raw_l:
        return "Омский государственный технический университет (ОмГТУ)"
    if "книту" in raw_l:
        return "КНИТУ-КАИ им. А.Н. Туполева"
    if "тпу" in raw_l or "томский" in raw_l:
        return "Томский политехнический университет (ТПУ)"
    if "мади" in raw_l:
        return "МАДИ (Московский автомобильно-дорожный ГТУ)"
    if "мип" in raw_l or "психоанализа" in raw_l:
        return "Московский институт психоанализа (МИП)"
    if "бфу" in raw_l or "канта" in raw_l:
        return "Балтийский федеральный университет им. И. Канта"
    if "тимирязев" in raw_l or "меха" in raw_l:
        return "РГАУ-МСХА им. К.А. Тимирязева"
    if "жилком" in raw_l:
        return "ГЦПК «ЖИЛКОМ»"
    if "рцтту" in raw_l or "технического творчества" in raw_l:
        return "Республиканский Центр технического творчества (РЦТТУ)"
    if "мгксо" in raw_l or "сферы обслуживания" in raw_l:
        return "Минский государственный колледж сферы обслуживания (МГКСО)"
    if raw.lower() in ["coursera", "платформа coursera"]:
        return "Coursera"

    return raw

def extract_accurate_skills(title, title_ru, inst, cat, platform):
    combined = f"{title} {title_ru or ''} {inst} {platform}".lower()
    skills = []

    # 1. AI & ML
    if re.search(r'\bprompt\b|prompting|промпт', combined):
        skills.append("Prompt Engineering")
    if re.search(r'\bchatgpt\b|\bgpt-4\b|\bgpt\b', combined):
        skills.append("ChatGPT")
    if "generative ai" in combined or "генеративн" in combined or re.search(r'\bgenai\b', combined):
        skills.append("Generative AI")
    if "fine-tuning" in combined or "fine tuning" in combined or "дообучение" in combined or "настройки llm" in combined:
        skills.append("Fine-Tuning")
    if "foundation model" in combined or "базовые модели" in combined:
        skills.append("Foundation Models")
    if re.search(r'\bllm\b|\bllms\b', combined) or "large language" in combined:
        skills.append("LLMs")
    if re.search(r'\bagent\b|\bagents\b|агент', combined):
        skills.append("AI Agents")
    if re.search(r'\bclaude\b|\banthropic\b', combined):
        skills.append("Claude Code")
    if "hugging face" in combined or "transformers" in combined:
        skills.append("Hugging Face")
    if "trustworthy" in combined or re.search(r'\bethics\b|\bэтик', combined):
        skills.append("AI Ethics")
    if "machine learning" in combined or "машинное обучение" in combined or re.search(r'\bml\b', combined):
        skills.append("Machine Learning")
    if "computer vision" in combined or "компьютерное зрение" in combined:
        skills.append("Computer Vision")
    if "data analysis" in combined or "анализ данных" in combined:
        skills.append("Data Analysis")

    # 2. Programming & Tech
    if re.search(r'\bcs50\b', combined):
        skills.extend(["Computer Science", "Algorithms"])
    if re.search(r'\bpascal\b|паскаль', combined):
        skills.extend(["Turbo Pascal 7.0", "Algorithms"])
    if re.search(r'\bpython\b|питон', combined):
        skills.append("Python")
    if re.search(r'\bhtml\b|\bcss\b|верстк', combined):
        skills.extend(["HTML5", "CSS3"])
    if re.search(r'\bc#\b|\bcsharp\b', combined):
        skills.append("C#")
    if "bitrix" in combined or "битрикс" in combined:
        skills.append("1С-Битрикс")
    if "wordpress" in combined:
        skills.append("WordPress")
    if "cybersecurity" in combined or "кибербезопасн" in combined or "информационная безопасность" in combined:
        skills.append("Cybersecurity")
    if "networking" in combined or "сетев" in combined or re.search(r'\bcisco\b', combined):
        skills.append("Computer Networks")
    if re.search(r'\bdatabase\b|\bsql\b|базы данных', combined):
        skills.append("SQL & Databases")
    if re.search(r'\bcloud\b|облачн|snowflake', combined):
        skills.append("Cloud Computing")

    # 3. Engineering & Energy
    if "lean" in combined or "six sigma" in combined or "шесть сигм" in combined or "кайдзен" in combined or re.search(r'\b5s\b', combined):
        skills.append("Lean Six Sigma")
    if "electric cars" in combined or "electric vehicle" in combined or "электромобил" in combined:
        skills.append("Electric Vehicles")
    if "microgrid" in combined or "smart grid" in combined or "микросет" in combined or "умные сети" in combined:
        skills.append("Smart Grids")
    if re.search(r'\benergy\b|энергоэффективност|энергети', combined):
        skills.append("Energy Management")
    if re.search(r'\belectrical\b|электротехник|электромеханик|электрооборудован|силовые цепи', combined):
        skills.append("Электротехника")
    if "automation" in combined or "автоматизац" in combined or "асу" in combined:
        skills.append("Industrial Automation")

    # 4. Marketing & Design
    if "метрика" in combined or "metrika" in combined:
        skills.append("Яндекс.Метрика")
    if "директ" in combined or "direct" in combined:
        skills.append("Яндекс.Директ")
    if "google analytics" in combined or re.search(r'\bga4\b', combined):
        skills.append("Google Analytics")
    if "photoshop" in combined or "фотошоп" in combined:
        skills.append("Photoshop")
    if "figma" in combined or "фигма" in combined:
        skills.append("Figma")
    if "canva" in combined or "канва" in combined:
        skills.append("Canva")
    if re.search(r'\bsmm\b|\bсмм\b', combined):
        skills.append("SMM")
    if "marketing" in combined or "маркетинг" in combined:
        skills.append("Digital Marketing")
    if "storytelling" in combined or "сторителлинг" in combined or "копирайтинг" in combined:
        skills.append("Content Strategy")
    if re.search(r'\bexcel\b|эксель', combined):
        skills.append("MS Excel")

    # 5. Management & Leadership
    if re.search(r'\bleadership\b|лидерств|руководств', combined):
        skills.append("Leadership")
    if "remote environment" in combined or "распределенн" in combined or "удаленн" in combined:
        skills.append("Remote Team Management")
    if re.search(r'\bmanagement\b|менеджмент|управлен', combined) and not re.search(r'energy|emergency', combined):
        skills.append("Management")
    if re.search(r'\bproject\b|\bagile\b|\bscrum\b|управление проектами', combined):
        skills.append("Project Management")
    if re.search(r'\bstrategy\b|стратег', combined):
        skills.append("Strategy")
    if re.search(r'\bgovernance\b|государственн', combined):
        skills.append("Public Governance")

    # 6. Global Health & Safety (STRICT MATCHING)
    if "bsafe" in combined or re.search(r'\bundss\b|полевой безопасности', combined):
        skills.append("UN Field Security")
    if "unicef" in combined or "юнисеф" in combined:
        skills.append("UNICEF Guidelines")
    if ("united nations" in combined or re.search(r'\bоон\b', combined) or "unv" in combined or "un volunteer" in combined) and cat == "global-health-safety":
        skills.append("UN Protocols")
    if (re.search(r'\bwho\b|\bвоз\b|\bcovid\b|здравоохран|эпидемиолог', combined) or "public health" in combined) and cat == "global-health-safety":
        skills.append("Public Health")
    if (re.search(r'\bfema\b|чрезвычайн|disaster|emergency', combined)) and cat == "global-health-safety":
        skills.append("Emergency Management")
    if ("humanitarian" in combined or "права человека" in combined or "human rights" in combined) and cat == "global-health-safety":
        skills.append("Humanitarian Standards")
    if ("climate" in combined or "климат" in combined or "устойчивое развитие" in combined or "sustainable development" in combined) and cat == "global-health-safety":
        skills.append("Climate & Sustainability")

    # Fallbacks based on category if empty
    if not skills:
        if cat == "ai-ml":
            skills = ["Machine Learning", "Generative AI"]
        elif cat == "programming-web":
            skills = ["Software Engineering", "Web Tech"]
        elif cat == "marketing-design":
            skills = ["Digital Marketing", "Analytics"]
        elif cat == "engineering-energy":
            skills = ["Engineering", "Energy Systems"]
        elif cat == "management-leadership":
            skills = ["Management", "Leadership"]
        elif cat == "global-health-safety":
            skills = ["Global Standards", "Safety Protocols"]
        else:
            skills = ["Professional Skills"]

    # Deduplicate and limit to 4
    deduped = list(dict.fromkeys(skills))[:4]
    return deduped

# Process all certificates
refined_certs = []
for c in certs:
    clean_inst = clean_issuer_concise(c['issuer'])
    title = c['title']
    title_ru = c.get('titleRu', '')
    cat = c['category']
    platform = c['platform']
    
    # Extract accurate skills
    skills = extract_accurate_skills(title, title_ru, clean_inst, cat, platform)
    
    refined_entry = dict(c)
    refined_entry['issuer'] = clean_inst
    refined_entry['skills'] = skills
    refined_certs.append(refined_entry)

# Compute priority and sort
def compute_priority(cert):
    title_l = cert['title'].lower()
    inst_l = cert['issuer'].lower()
    platform = cert['platform']
    is_spec = cert.get('isSpecialization', False)
    is_flag = cert.get('isFlagship', False)

    # Tier 1 (90-100)
    if "vanderbilt" in inst_l or "prompt engineering" in title_l: return 100
    if "ibm" in inst_l and (is_spec or "generative ai" in title_l or "foundation models" in title_l or "fine-tuning" in title_l): return 98
    if "harvard" in inst_l or platform == "Harvard" or "cs50" in title_l: return 97
    if "google" in inst_l and ("ai essentials" in title_l or is_flag): return 95
    if "anthropic" in inst_l or "claude" in title_l: return 95
    if "hugging face" in inst_l or "ai agents" in title_l: return 94
    if "bsafe" in title_l or "undss" in inst_l or "департамент безопасности оон" in inst_l: return 94
    if "stanford" in inst_l: return 93
    if "six sigma black belt" in title_l or "juran" in inst_l: return 92
    if "delft" in inst_l or "electric cars" in title_l: return 91
    if is_flag and is_spec: return 90

    # Tier 2 (75-89)
    if "mit" in inst_l or "massachusetts" in inst_l: return 88
    if "rochester" in inst_l or "rit" in inst_l: return 86
    if "monterrey" in inst_l: return 85
    if "dartmouth" in inst_l: return 85
    if "ibm" in inst_l and is_spec: return 84
    if "who" in inst_l or "воз" in inst_l or "unicef" in inst_l or "fema" in inst_l: return 83
    if "яндекс" in inst_l and ("метрика" in title_l or "директ" in title_l or "эксперт" in title_l): return 82
    if "cisco" in title_l or "cisco" in inst_l: return 78
    if "рцтту" in inst_l: return 76
    if is_flag: return 75

    # Tier 3 (55-74)
    if "uc davis" in inst_l: return 74
    if "glasgow" in inst_l: return 72
    if "helsinki" in inst_l or "elements of ai" in title_l: return 71
    if "michigan" in inst_l or "johns hopkins" in inst_l or "edinburgh" in inst_l: return 68
    if "london" in inst_l or "colorado" in inst_l or "buffalo" in inst_l: return 65
    if any(k in inst_l for k in ["двфу", "ранхигс", "рудн", "книту", "омгту", "мфти", "вшэ", "тпу", "мади"]): return 62
    if platform in ["Coursera", "edX"]: return 58

    # Tier 4 (30-54)
    if any(k in inst_l for k in ["пронавыки", "ит-планета", "црэб"]): return 52
    if platform == "Netology" or "нетология" in inst_l: return 46
    if platform == "GeekBrains" or "geekbrains" in inst_l: return 44
    if "sendpulse" in inst_l or "appbooster" in inst_l: return 40
    if "интуит" in inst_l or platform == "Stepik": return 36

    return 30

refined_certs.sort(key=lambda c: (compute_priority(c), 1 if c.get('isFlagship') else 0, 1 if c.get('isSpecialization') else 0), reverse=True)

# Generate src/lib/education-data.ts
ts_content = '''export type CertificateCategory =
  | "ai-ml"
  | "programming-web"
  | "marketing-design"
  | "engineering-energy"
  | "management-leadership"
  | "global-health-safety";

export type CertificatePlatform =
  | "Coursera"
  | "edX"
  | "Stepik"
  | "Harvard"
  | "IBM"
  | "Google"
  | "Yandex"
  | "Netology"
  | "GeekBrains"
  | "UN / WHO"
  | "Other";

export type EducationCertificate = {
  id: string;
  title: string;
  titleRu?: string;
  issuer: string;
  platform: CertificatePlatform;
  category: CertificateCategory;
  url: string;
  credentialId?: string;
  skills: readonly string[];
  isFlagship?: boolean;
  isSpecialization?: boolean;
  coursesCount?: number;
};

export const CATEGORY_LABELS: Record<CertificateCategory, { label: string; icon: string }> = {
  "ai-ml": { label: "Искусственный интеллект & ML", icon: "🤖" },
  "programming-web": { label: "Программирование & Веб", icon: "💻" },
  "marketing-design": { label: "Маркетинг, Аналитика & Дизайн", icon: "📈" },
  "engineering-energy": { label: "Энергетика, Инженерия & Lean", icon: "⚡" },
  "management-leadership": { label: "Менеджмент & Лидерство", icon: "🏛️" },
  "global-health-safety": { label: "ООН, ВОЗ, Медицина & Безопасность", icon: "🌍" },
};

export const formalEducationList = [
  {
    id: "mgkso",
    title: "Минский государственный колледж сферы обслуживания (МГКСО)",
    qualification: "Техник-электромеханик",
    specialty: "Электрооборудование, киноустановки и аудиовизуальные комплексы",
    years: "2009–2013",
    type: "Государственный диплом",
    description: "Базовое инженерно-техническое образование: физика цепей, электромеханика, звукотехнические и кинопроекционные комплексы, монтаж и диагностика систем.",
    verified: true,
  },
  {
    id: "minskvodokanal",
    title: "УП «Минскводоканал» // ГЦПК «ЖИЛКОМ»",
    qualification: "Электромонтер 5-го разряда",
    specialty: "Ремонт и обслуживание электрооборудования (до и выше 1000В, IV группа допуска)",
    years: "2014–2021 (7 лет стажа)",
    type: "Государственное свидетельство",
    description: "7 лет ежедневной практической работы с распределительными подстанциями, электродвигателями, автоматикой управления и высоковольтными силовыми цепями.",
    verified: true,
  },
  {
    id: "rcttu",
    title: "Республиканский Центр технического творчества учащихся (РЦТТУ)",
    qualification: "Пользователь ПЭВМ, программист Turbo Pascal",
    specialty: "Программирование на Turbo Pascal 7.0, сети, веб-сайты, ремонт и тестирование ПК, CorelDRAW, Photoshop",
    years: "2005–2009",
    type: "Официальная характеристика и свидетельства",
    description: "Ранняя алгоритмическая и компьютерная школа: архитектура железа, низкоуровневая логика, верстка первых сайтов и растровая/векторная графика.",
    verified: true,
  },
] as const;

export const educationCertificates: readonly EducationCertificate[] = [
'''

for c in refined_certs:
    ts_content += "  {\n"
    ts_content += f'    id: {json.dumps(c["id"], ensure_ascii=False)},\n'
    ts_content += f'    title: {json.dumps(c["title"], ensure_ascii=False)},\n'
    if "titleRu" in c and c["titleRu"]:
        ts_content += f'    titleRu: {json.dumps(c["titleRu"], ensure_ascii=False)},\n'
    ts_content += f'    issuer: {json.dumps(c["issuer"], ensure_ascii=False)},\n'
    ts_content += f'    platform: {json.dumps(c["platform"], ensure_ascii=False)},\n'
    ts_content += f'    category: {json.dumps(c["category"], ensure_ascii=False)},\n'
    ts_content += f'    url: {json.dumps(c["url"], ensure_ascii=False)},\n'
    ts_content += f'    skills: {json.dumps(c["skills"], ensure_ascii=False)},\n'
    if c.get("isFlagship"):
        ts_content += '    isFlagship: true,\n'
    if c.get("isSpecialization"):
        ts_content += '    isSpecialization: true,\n'
        if c.get("coursesCount"):
            ts_content += f'    coursesCount: {c["coursesCount"]},\n'
    ts_content += "  },\n"

ts_content += "];\n"

with open(output_ts_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Refinement complete! Wrote {len(refined_certs)} certificates to {output_ts_path}")
