# scripts/generate_full_education_ts.py
import json

with open('all_parsed_certificates.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

print(f"Total certificates to generate: {len(certs)}")

# Categorization stats
cat_counts = {}
for c in certs:
    cat = c['category']
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

print("Category counts:", cat_counts)

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

print("Successfully wrote complete dataset to src/lib/education-data.ts")
