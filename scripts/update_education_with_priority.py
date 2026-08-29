# scripts/update_education_with_priority.py
import json
import re

with open('cleaned_certs.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

print(f"Loaded {len(certs)} cleaned certificates.")

def get_normalized_institution_key(issuer):
    """Normalizes issuer string to a canonical institutional key for diversity grouping."""
    low = issuer.lower()
    if "vanderbilt" in low: return "vanderbilt"
    if "harvard" in low: return "harvard"
    if "ibm" in low: return "ibm"
    if "google" in low: return "google"
    if "hugging face" in low or "huggingface" in low: return "huggingface"
    if "anthropic" in low: return "anthropic"
    if "undss" in low or "безопасности оон" in low or "department of safety" in low: return "undss"
    if "stanford" in low: return "stanford"
    if "delft" in low: return "delft"
    if "juran" in low or "six sigma" in low: return "juran"
    if "mit" in low or "massachusetts" in low: return "mit"
    if "uc davis" in low or "california, davis" in low: return "uc_davis"
    if "johns hopkins" in low: return "johns_hopkins"
    if "helsinki" in low: return "helsinki"
    if "dartmouth" in low: return "dartmouth"
    if "rochester" in low or "rit" in low: return "rit"
    if "monterrey" in low: return "monterrey"
    if "who" in low or "воз" in low or "world health" in low: return "who"
    if "яндекс" in low or "yandex" in low: return "yandex"
    if "cisco" in low: return "cisco"
    if "unicef" in low or "юнисеф" in low: return "unicef"
    if "fema" in low: return "fema"
    if "glasgow" in low: return "glasgow"
    if "edinburgh" in low: return "edinburgh"
    if "london" in low: return "london"
    if "michigan" in low: return "michigan"
    return low

def compute_priority(cert):
    cid = cert.get('id', '')
    title_l = cert['title'].lower()
    inst_l = cert['issuer'].lower()
    platform = cert['platform']
    is_spec = cert.get('isSpecialization', False)
    is_flag = cert.get('isFlagship', False)

    # ---------------------------------------------------------
    # TOP SHOWCASE TIER (Strict Hierarchy for Distinct Showcase)
    # ---------------------------------------------------------
    # 1. Vanderbilt University (Prompt Engineering Specialization)
    if "vanderbilt" in inst_l and (is_spec or "prompt engineering" in title_l):
        return 100

    # 2. Harvard University (CS50: Introduction to Computer Science)
    if "cs50" in title_l and ("harvard" in inst_l or platform == "Harvard"):
        return 99

    # 3. IBM (Generative AI Fundamentals Specialization)
    if "ibm" in inst_l and is_spec and "generative ai" in title_l:
        return 98

    # 4. Google (Google AI Essentials)
    if ("google ai essentials" in title_l or is_flag) and ("google" in inst_l or platform == "Google"):
        return 97

    # 5. Hugging Face / Anthropic (AI Agents Fundamentals)
    if "ai agents fundamentals" in title_l or "hugging face" in inst_l or "anthropic" in inst_l:
        return 96

    # 6. UNDSS (BSAFE Field Security & Safety Certification)
    if "bsafe" in title_l or "департамент безопасности оон" in inst_l or "undss" in inst_l:
        return 95

    # ---------------------------------------------------------
    # TIER 1 NEXT ELITE INSTITUTIONS (Diverse Global Champions)
    # ---------------------------------------------------------
    # 7. Stanford Medicine
    if "stanford" in inst_l or "covid-19 training for healthcare" in title_l:
        return 94

    # 8. TU Delft (Electric Cars)
    if "delft" in inst_l or "electric cars" in title_l:
        return 93

    # 9. Juran Global / Lean Six Sigma Black Belt
    if "six sigma black belt" in title_l or "juran" in inst_l:
        return 92

    # 10. Harvard University (Leading in a Remote Environment Specialization)
    if ("harvard" in inst_l or platform == "Harvard") and is_spec:
        return 91

    # 11. UC Davis (AI Agents)
    if "uc davis" in inst_l or "california, davis" in inst_l or "ai agents: from prompts" in title_l:
        return 90

    # 12. Johns Hopkins University
    if "johns hopkins" in inst_l or "covid-19 contact tracing" in title_l:
        return 89

    # 13. University of Helsinki (Elements of AI)
    if "helsinki" in inst_l or "elements of ai" in title_l:
        return 88

    # 14. MIT & Ivy League / Top Global
    if "massachusetts institute of technology" in inst_l or re.search(r'\bmit\b', inst_l):
        return 87
    if "dartmouth" in inst_l:
        return 86
    if "rochester institute of technology" in inst_l or re.search(r'\brit\b', inst_l):
        return 85
    if "tecnológico de monterrey" in inst_l or "monterrey" in inst_l:
        return 84

    # 15. WHO / UN / FEMA
    if "world health organization" in inst_l or "who" in inst_l or "воз" in inst_l or "unicef" in inst_l or "fema" in inst_l:
        return 83

    # 16. Yandex & Cisco
    if "яндекс" in inst_l and ("метрика" in title_l or "директ" in title_l or "эксперт" in title_l):
        return 82
    if "cisco" in title_l or "it essentials" in title_l or "cisco" in inst_l:
        return 80

    # ---------------------------------------------------------
    # SUB-COURSES OF MASTER SPECIALIZATIONS & GENERAL COURSES
    # (Must be lower than flagship specializations to prevent monopolization)
    # ---------------------------------------------------------
    if is_flag and is_spec:
        return 79
    if is_flag:
        return 76

    # Specific IBM sub-courses (nested under GenAI specialization)
    if "ibm" in inst_l:
        if "fine-tuning" in title_l or "models and platforms" in title_l or "impact, ethics" in title_l:
            return 68
        if "introduction to artificial intelligence" in title_l:
            return 67
        return 65

    # Harvard sub-courses
    if "harvard" in inst_l or platform == "Harvard":
        return 66

    # Tier 3 Global Universities
    if "glasgow" in inst_l: return 64
    if "edinburgh" in inst_l: return 63
    if "michigan" in inst_l: return 62
    if "university of london" in inst_l or "illinois" in inst_l or "babson" in inst_l: return 60
    if any(k in inst_l for k in ["двфу", "ранхигс", "рудн", "книту-каи", "омгту", "мфти", "вшэ", "тпу", "мади"]): return 58
    if platform in ["Coursera", "edX"]: return 55

    # Tier 4 Regional / Vocational Platforms
    if any(k in inst_l for k in ["пронавыки", "ит-планета", "црэб"]): return 50
    if platform == "Netology" or "нетология" in inst_l: return 45
    if platform == "GeekBrains" or "geekbrains" in inst_l: return 42
    if "sendpulse" in inst_l or "appbooster" in inst_l: return 38
    if "интуит" in inst_l or platform == "Stepik": return 35

    return 30

# Calculate base priority for all certificates
for c in certs:
    c['_priority'] = compute_priority(c)

# ---------------------------------------------------------
# DIVERSITY RANKING ALGORITHM (Maximal Institutional Diversity)
# ---------------------------------------------------------
# 1. Sort initial pool by priority descending
sorted_pool = sorted(certs, key=lambda c: (
    c['_priority'],
    1 if c.get('isSpecialization') else 0,
    1 if c.get('isFlagship') else 0,
    c.get('coursesCount', 0)
), reverse=True)

# 2. Select Top 6 distinct institutions strictly
final_list = []
seen_issuers_top6 = set()

# Targeted priority order for initial 6 showcase cards:
# 1. Vanderbilt University
# 2. Harvard University
# 3. IBM
# 4. Google
# 5. Hugging Face
# 6. UNDSS / ООН
target_top_issuers = ["vanderbilt", "harvard", "ibm", "google", "huggingface", "undss"]

for target in target_top_issuers:
    for c in sorted_pool:
        inst_key = get_normalized_institution_key(c['issuer'])
        if inst_key == target and c['id'] not in [x['id'] for x in final_list]:
            final_list.append(c)
            seen_issuers_top6.add(inst_key)
            break

print("=== TOP 6 SHOWCASE CARDS (VERIFICATION) ===")
for i, c in enumerate(final_list):
    print(f"#{i+1}: [{c['issuer']}] -> {c['title']} (ID: {c['id']}, Priority: {c['_priority']})")

# 3. Multi-pass Institutional Diversity Dispersal for the remainder of the registry
remaining = [c for c in sorted_pool if c['id'] not in [x['id'] for x in final_list]]

# Round-robin dispersal across priority tiers to avoid consecutive duplicate issuers
# We maintain a sliding window of recent issuers to maximize diversity throughout
window_size = 3
recent_issuers = [get_normalized_institution_key(c['issuer']) for c in final_list[-window_size:]]

while remaining:
    best_candidate_idx = None
    
    # Try to find candidate from an issuer not in the recent window
    for idx, c in enumerate(remaining):
        inst_key = get_normalized_institution_key(c['issuer'])
        if inst_key not in recent_issuers:
            best_candidate_idx = idx
            break
            
    # If all remaining are in recent window (e.g. at the tail), pick the highest priority
    if best_candidate_idx is None:
        best_candidate_idx = 0
        
    chosen = remaining.pop(best_candidate_idx)
    final_list.append(chosen)
    chosen_inst_key = get_normalized_institution_key(chosen['issuer'])
    recent_issuers.append(chosen_inst_key)
    if len(recent_issuers) > window_size:
        recent_issuers.pop(0)

# Remove internal _priority helper before serializing
for c in final_list:
    if '_priority' in c:
        del c['_priority']

print(f"\nTotal prioritized certificates ready for export: {len(final_list)}")

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

for c in final_list:
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

print(f"Successfully generated prioritized and diversified education dataset with {len(final_list)} records!")
