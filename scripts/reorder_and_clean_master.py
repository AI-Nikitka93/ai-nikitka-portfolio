# scripts/reorder_and_clean_master.py
import json
import re

with open('cleaned_certs.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

for c in certs:
    c['title'] = re.sub(r'^[A-Z0-9]+:\s*', '', c['title']).strip()
    if 'titleRu' in c and c['titleRu']:
        c['titleRu'] = re.sub(r'^[A-Z0-9]+:\s*', '', c['titleRu']).strip()
    
    # Fix skills: remove accidental UN tags from non-UN courses
    if not any(k in c['issuer'].lower() for k in ["undss", "оон", "unicef", "who", "воз"]):
        c['skills'] = [s for s in c['skills'] if "UN" not in s]
        if not c['skills']:
            c['skills'] = ["Machine Learning", "AI Tools"] if c['category'] == 'ai-ml' else ["Leadership", "Management"]

    # Clean redundant platform string from issuer
    c['issuer'] = re.sub(r'\s*Платформа\s+(Coursera|edX|Stepik)', '', c['issuer'], flags=re.IGNORECASE).strip()
    c['issuer'] = re.sub(r'\s*платформа\s+(Coursera|edX|Stepik)', '', c['issuer'], flags=re.IGNORECASE).strip()

vanderbilt_spec = next((c for c in certs if "vanderbilt" in c['issuer'].lower() and "prompt" in c['title'].lower()), None)
if vanderbilt_spec:
    vanderbilt_spec['title'] = "Prompt Engineering Specialization"
    vanderbilt_spec['titleRu'] = "Специализация: Промпт-инжиниринг и прикладной ИИ (ChatGPT, Advanced Data Analysis, Trustworthy GenAI)"
    vanderbilt_spec['issuer'] = "Vanderbilt University"
    vanderbilt_spec['skills'] = ["Prompt Engineering", "ChatGPT", "Generative AI", "Chain of Thought"]
    vanderbilt_spec['isFlagship'] = True
    vanderbilt_spec['isSpecialization'] = True
    vanderbilt_spec['coursesCount'] = 3

harvard_cs50 = next((c for c in certs if "cs50" in c['id'].lower() or "cs50" in c['title'].lower()), None)
if harvard_cs50:
    harvard_cs50['title'] = "CS50: Introduction to Computer Science"
    harvard_cs50['titleRu'] = "Гарвардский курс CS50: Алгоритмы, структуры данных, память C и Python"
    harvard_cs50['issuer'] = "Harvard University"
    harvard_cs50['platform'] = "Harvard"
    harvard_cs50['skills'] = ["Computer Science", "Algorithms", "C & Memory", "Python"]
    harvard_cs50['isFlagship'] = True

ibm_spec = next((c for c in certs if "ibm" in c['issuer'].lower() and "generative ai fundamentals" in c['title'].lower()), None)
if ibm_spec:
    ibm_spec['title'] = "Generative AI Fundamentals Specialization"
    ibm_spec['titleRu'] = "Специализация: Архитектура Foundation Models, этика ИИ и трансформация бизнеса"
    ibm_spec['issuer'] = "IBM"
    ibm_spec['platform'] = "IBM"
    ibm_spec['skills'] = ["Foundation Models", "Generative AI", "Prompt Engineering", "AI Ethics"]
    ibm_spec['isFlagship'] = True
    ibm_spec['isSpecialization'] = True
    ibm_spec['coursesCount'] = 5

google_ai = next((c for c in certs if "google" in c['issuer'].lower() and "ai essentials" in c['title'].lower()), None)
if google_ai:
    google_ai['title'] = "Google AI Essentials"
    google_ai['titleRu'] = "Google AI Essentials: Интеграция генеративных инструментов в продуктовые рабочие процессы"
    google_ai['issuer'] = "Google"
    google_ai['platform'] = "Google"
    google_ai['skills'] = ["Google Gemini", "AI Tools", "Промптинг", "Автоматизация"]
    google_ai['isFlagship'] = True

hugging_face_agents = next((c for c in certs if "hugging face" in c['issuer'].lower() or "ai agents" in c['title'].lower()), None)
if hugging_face_agents:
    hugging_face_agents['title'] = "AI Agents Fundamentals"
    hugging_face_agents['titleRu'] = "Основы автономных ИИ-агентов: ReAct-пайплайны, Tool Calling и мультиагентная логика"
    hugging_face_agents['issuer'] = "Hugging Face"
    hugging_face_agents['platform'] = "Other"
    hugging_face_agents['skills'] = ["AI Agents", "Tool Calling", "ReAct Loop", "smolagents"]
    hugging_face_agents['isFlagship'] = True

undss_bsafe = next((c for c in certs if "bsafe" in c['title'].lower() or "bsafe" in c['id'].lower()), None)
if undss_bsafe:
    undss_bsafe['title'] = "BSAFE Field Security & Safety Certification"
    undss_bsafe['titleRu'] = "Официальная сертификация полевой безопасности и управления рисками ООН"
    undss_bsafe['issuer'] = "Департамент безопасности ООН (UNDSS)"
    undss_bsafe['platform'] = "UN / WHO"
    undss_bsafe['skills'] = ["UN Safety Standards", "Field Security", "Risk Assessment", "Кризисные протоколы"]
    undss_bsafe['isFlagship'] = True

harvard_leadership = next((c for c in certs if "harvard" in c['issuer'].lower() and "leadership" in c['title'].lower()), None)
if harvard_leadership:
    harvard_leadership['title'] = "Leading in a Remote Environment & Exercising Leadership"
    harvard_leadership['titleRu'] = "Профессиональный сертификат: Адаптивное лидерство и управление распределенными командами"
    harvard_leadership['issuer'] = "Harvard University"
    harvard_leadership['platform'] = "Harvard"
    harvard_leadership['skills'] = ["Adaptive Leadership", "Remote Teams", "Crisis Management"]
    harvard_leadership['isFlagship'] = True
    harvard_leadership['isSpecialization'] = True
    harvard_leadership['coursesCount'] = 3

delft_cars = next((c for c in certs if "delft" in c['issuer'].lower() or "electric cars" in c['title'].lower()), None)
if delft_cars:
    delft_cars['title'] = "Electric Cars: Technology, Business & Smart Grids"
    delft_cars['titleRu'] = "Профессиональный сертификат: Электромобили, смарт-сети (V2G) и чистая энергетика"
    delft_cars['issuer'] = "Delft University of Technology (TU Delft)"
    delft_cars['platform'] = "edX"
    delft_cars['category'] = "engineering-energy"
    delft_cars['skills'] = ["Smart Grids & V2G", "Электротехника", "Clean Energy", "Power Electronics"]
    delft_cars['isFlagship'] = True
    delft_cars['isSpecialization'] = True
    delft_cars['coursesCount'] = 3

juran_six_sigma = next((c for c in certs if "six sigma" in c['title'].lower() or "juran" in c['issuer'].lower()), None)
if juran_six_sigma:
    juran_six_sigma['title'] = "Lean Six Sigma Black Belt (Parts 1 & 2)"
    juran_six_sigma['titleRu'] = "Черный пояс Lean Six Sigma: Статистический контроль качества и оптимизация процессов (DMAIC)"
    juran_six_sigma['issuer'] = "Juran Global / Lean Six Sigma Institute"
    juran_six_sigma['platform'] = "edX"
    juran_six_sigma['category'] = "engineering-energy"
    juran_six_sigma['skills'] = ["Lean Six Sigma", "DMAIC", "Statistical Process Control", "Root Cause Analysis"]
    juran_six_sigma['isFlagship'] = True

top_6 = [
    vanderbilt_spec,
    harvard_cs50,
    ibm_spec,
    google_ai,
    hugging_face_agents,
    undss_bsafe
]
top_6 = [c for c in top_6 if c is not None]

tier_2 = [
    harvard_leadership,
    delft_cars,
    juran_six_sigma
]
tier_2 = [c for c in tier_2 if c is not None]

used_ids = set(c['id'] for c in top_6 + tier_2)
remaining_certs = [c for c in certs if c['id'] not in used_ids]

def remaining_priority(c):
    inst = c['issuer'].lower()
    t = c['title'].lower()
    if "stanford" in inst: return 85
    if "mit" in inst: return 84
    if "rit" in inst: return 83
    if "uc davis" in inst: return 82
    if "glasgow" in inst: return 80
    if "helsinki" in inst: return 80
    if "michigan" in inst or "johns hopkins" in inst or "edinburgh" in inst: return 78
    if "dartmouth" in inst or "monterrey" in inst: return 76
    if "who" in inst or "воз" in inst or "unicef" in inst or "fema" in inst: return 75
    if c['platform'] in ["Coursera", "edX"]: return 60
    if any(k in inst for k in ["двфу", "ранхигс", "рудн", "книту", "омгту"]): return 55
    return 40

remaining_certs.sort(key=remaining_priority, reverse=True)

final_ordered_certs = top_6 + tier_2 + remaining_certs

print(f"Total ordered certificates: {len(final_ordered_certs)}")
print("Top 6 verification:")
for idx, c in enumerate(final_ordered_certs[:6]):
    print(f"  #{idx+1}: {c['issuer']} - {c['title']}")

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

for c in final_ordered_certs:
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

print("Successfully generated src/lib/education-data.ts with diversified Top 6!")
