# scripts/update_education_with_priority.py
import json

with open('all_parsed_certificates.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

def compute_priority(cert):
    title_l = cert['title'].lower()
    inst_l = cert['issuer'].lower()
    platform = cert['platform']
    is_spec = cert.get('isSpecialization', False)
    is_flag = cert.get('isFlagship', False)

    # Tier 1 (90-100)
    if "vanderbilt" in inst_l or "prompt engineering" in title_l: return 100
    if "ibm" in inst_l and (is_spec or "generative ai fundamentals" in title_l or "fine-tuning" in title_l): return 98
    if "harvard" in inst_l or platform == "Harvard" or "cs50" in title_l: return 97
    if "google" in inst_l and ("ai essentials" in title_l or is_flag): return 95
    if "anthropic" in inst_l or "claude" in title_l: return 95
    if "hugging face" in inst_l or "ai agents" in title_l: return 94
    if "bsafe" in title_l or "department of safety" in inst_l or "undss" in inst_l: return 94
    if "stanford" in inst_l: return 93
    if "six sigma black belt" in title_l or "juran" in inst_l: return 92
    if "delft" in inst_l or "electric cars" in title_l: return 91
    if is_flag and is_spec: return 90

    # Tier 2 (75-89)
    if "massachusetts institute of technology" in inst_l or "mit" in inst_l: return 88
    if "rochester institute of technology" in inst_l or "rit" in inst_l: return 86
    if "tecnológico de monterrey" in inst_l or "monterrey" in inst_l: return 85
    if "dartmouth" in inst_l: return 85
    if "ibm" in inst_l and is_spec: return 84
    if "world health organization" in inst_l or "who" in inst_l or "unicef" in inst_l or "fema" in inst_l: return 83
    if "яндекс" in inst_l and ("метрика" in title_l or "директ" in title_l or "эксперт" in title_l): return 82
    if "cisco" in title_l or "it essentials" in title_l: return 78
    if "рцтту" in inst_l or "республиканский центр" in inst_l: return 76
    if is_flag: return 75

    # Tier 3 (55-74)
    if "uc davis" in inst_l or "california, davis" in inst_l: return 74
    if "glasgow" in inst_l: return 72
    if "helsinki" in inst_l or "elements of ai" in title_l: return 71
    if "michigan" in inst_l or "johns hopkins" in inst_l: return 68
    if "university of london" in inst_l or "illinois" in inst_l or "babson" in inst_l: return 65
    if any(k in inst_l for k in ["двфу", "ранхигс", "рудн", "книту-каи", "омгту", "мфти", "вшэ", "тпу", "мади"]): return 62
    if platform in ["Coursera", "edX"]: return 58

    # Tier 4 (30-54)
    if any(k in inst_l for k in ["пронавыки", "ит-планета", "црэб"]): return 52
    if platform == "Netology" or "нетология" in inst_l: return 46
    if platform == "GeekBrains" or "geekbrains" in inst_l: return 44
    if "sendpulse" in inst_l or "appbooster" in inst_l: return 40
    if "интуит" in inst_l or platform == "Stepik": return 36

    return 30

# Sort certs by priority descending, then flagship, then title
certs.sort(key=lambda c: (compute_priority(c), 1 if c.get('isFlagship') else 0, 1 if c.get('isSpecialization') else 0), reverse=True)

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

for c in certs:
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

with open('src/lib/education-data.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated prioritized education dataset with {len(certs)} records!")
