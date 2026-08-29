# scripts/clean_and_enhance_certificates.py
import json
import re

with open('all_parsed_certificates.json', 'r', encoding='utf-8') as f:
    certs = json.load(f)

print(f"Total raw certs: {len(certs)}")

def clean_issuer_name(raw_issuer):
    raw = raw_issuer.strip()
    raw = re.sub(r'\s+', ' ', raw)
    
    # Standardize prestigious institutions with strict word boundaries or exact substrings
    if "vanderbilt" in raw.lower():
        return "Vanderbilt University (Университет Вандербильта)"
    if "harvard" in raw.lower():
        return "Harvard University (Гарвардский университет)"
    if "stanford" in raw.lower():
        return "Stanford Medicine (Стэнфордский университет)"
    if "undss" in raw.lower() or "department of safety" in raw.lower() or "безопасности оон" in raw.lower() or "united nations department" in raw.lower():
        return "Департамент безопасности ООН (UNDSS)"
    if "ibm" in raw.lower() or "international business machines" in raw.lower():
        return "IBM (International Business Machines)"
    if "hugging face" in raw.lower() or "huggingface" in raw.lower():
        return "Hugging Face"
    if "anthropic" in raw.lower():
        return "Anthropic"
    if "google" in raw.lower() and "analytics" not in raw.lower():
        return "Google"
    if "google analytics" in raw.lower():
        return "Google Analytics Academy"
    if "delft" in raw.lower():
        return "Delft University of Technology (TU Delft, Нидерланды)"
    if "massachusetts institute of technology" in raw.lower() or re.search(r'\bmit\b', raw, re.IGNORECASE):
        return "MIT (Массачусетский технологический институт)"
    if "rochester institute of technology" in raw.lower() or re.search(r'\brit\b', raw, re.IGNORECASE):
        return "Rochester Institute of Technology (RIT, США)"
    if "dartmouth" in raw.lower():
        return "Dartmouth College (Дартмутский колледж, Ivy League)"
    if "tecnológico de monterrey" in raw.lower() or "monterrey" in raw.lower():
        return "Tecnológico de Monterrey (Мексика)"
    if "johns hopkins" in raw.lower():
        return "Johns Hopkins University (Университет Джонса Хопкинса)"
    if "uc davis" in raw.lower() or "california, davis" in raw.lower():
        return "University of California, Davis (UC Davis)"
    if "glasgow" in raw.lower():
        return "University of Glasgow (Университет Глазго, Великобритания)"
    if "helsinki" in raw.lower():
        return "University of Helsinki (Хельсинкский университет, Финляндия)"
    if "edinburgh" in raw.lower():
        return "University of Edinburgh (Эдинбургский университет)"
    if "london" in raw.lower():
        return "University of London (Лондонский университет)"
    if "michigan" in raw.lower():
        return "University of Michigan (Мичиганский университет)"
    if "cisco" in raw.lower():
        return "Cisco Networking Academy"
    if "world health organization" in raw.lower() or re.search(r'\bwho\b', raw, re.IGNORECASE) or re.search(r'\bвоз\b', raw, re.IGNORECASE):
        return "Всемирная организация здравоохранения (ВОЗ / WHO)"
    if "unicef" in raw.lower() or "юнисеф" in raw.lower():
        return "ЮНИСЕФ (UNICEF / ООН)"
    if "fema" in raw.lower():
        return "FEMA (Emergency Management Institute, США)"
    if "яндекс" in raw.lower() or "yandex" in raw.lower():
        return "Яндекс (Академия Яндекса)"
    if "juran" in raw.lower() or "six sigma" in raw.lower():
        return "Juran Global / Lean Six Sigma Institute"
    if "schneider" in raw.lower():
        return "Schneider Electric (Energy University)"
    if "city business school" in raw.lower():
        return "City Business School"
    if "нетология" in raw.lower() or "netology" in raw.lower():
        return "Центр онлайн-образования «Нетология»"
    if "пронавыки" in raw.lower() or "ит-планета" in raw.lower():
        return "Центр «ИТ-Планета» // ПРОНАВЫКИ (Microsoft)"
    if "интуит" in raw.lower():
        return "Национальный Открытый Университет «ИНТУИТ»"
    if "geekbrains" in raw.lower():
        return "GeekBrains"
    if "двфу" in raw.lower() or "дальневосточный" in raw.lower():
        return "Дальневосточный федеральный университет (ДВФУ)"
    if "ранхигс" in raw.lower() or "вшгу" in raw.lower():
        return "ВШГУ РАНХиГС (Президентская академия)"
    if "рудн" in raw.lower():
        return "Российский университет дружбы народов (РУДН)"
    if "омгту" in raw.lower() or "омский" in raw.lower():
        return "Омский государственный технический университет (ОмГТУ)"
    if "книту" in raw.lower():
        return "КНИТУ-КАИ им. А.Н. Туполева"
    if "тпу" in raw.lower() or "томский" in raw.lower():
        return "Томский политехнический университет (ТПУ)"
    if "мади" in raw.lower():
        return "МАДИ (Московский автомобильно-дорожный ГТУ)"
    if "мип" in raw.lower() or "психоанализа" in raw.lower():
        return "Московский институт психоанализа (МИП)"
    if "бфу" in raw.lower() or "канта" in raw.lower():
        return "Балтийский федеральный университет им. И. Канта"
    if "тимирязев" in raw.lower() or "меха" in raw.lower():
        return "РГАУ-МСХА им. К.А. Тимирязева"
    if "жилком" in raw.lower():
        return "ГЦПК «ЖИЛКОМ» (Министерство ЖКХ РБ)"
    if "рцтту" in raw.lower() or "технического творчества" in raw.lower():
        return "Республиканский Центр технического творчества учащихся (РЦТТУ)"

    # Clean "(Stepik - ...)" suffix
    raw = re.sub(r'\(Stepik[^\)]*\)', '', raw).strip()
    return raw

def clean_title_and_extract_ru(raw_title):
    # Remove leading numbered items like "1. ", "2. "
    t = raw_title.strip()
    t = re.sub(r'^\d+\.\s*', '', t)
    t = re.sub(r'\s+', ' ', t)

    title_en = t
    title_ru = None

    # Handle Vanderbilt prompt engineering
    if "prompt engineering (специализация)" in t.lower() or ("prompt engineering" in t.lower() and "chatgpt" in t.lower()) or "prompt engineering specialization" in t.lower():
        title_en = "Prompt Engineering Specialization"
        title_ru = "Специализация: Промпт-инжиниринг и генеративный ИИ (3 курса: Prompt Engineering for ChatGPT, ChatGPT Advanced Data Analysis, Trustworthy GenAI)"
        return title_en, title_ru

    # Handle IBM GenAI
    if "generative ai fundamentals" in t.lower() or "generative ai: prompt engineering" in t.lower():
        title_en = "Generative AI Fundamentals Specialization"
        title_ru = "Специализация: Основы генеративного ИИ (5 курсов: Prompt Engineering, Foundation Models, Ethics, Business Transformation)"
        return title_en, title_ru

    # Handle CS50
    if "cs50" in t.lower():
        title_en = "CS50: Introduction to Computer Science"
        title_ru = "Введение в компьютерные науки и алгоритмы (Гарвардский курс CS50)"
        return title_en, title_ru

    # Handle Harvard Remote Leadership
    if "exercising leadership" in t.lower() or "remote environment" in t.lower() or "leading in a remote" in t.lower() or "professional certificate: leading" in t.lower():
        title_en = "Leading in a Remote Environment & Exercising Leadership"
        title_ru = "Лидерство в распределенных и удаленных командах (Harvard Professional Certificate)"
        return title_en, title_ru

    # Handle Google AI Essentials
    if "google ai essentials" in t.lower() or ("ai essentials" in t.lower() and "google" in t.lower()):
        title_en = "Google AI Essentials"
        title_ru = "Основы прикладного использования ИИ в рабочих процессах"
        return title_en, title_ru

    # Handle Hugging Face AI Agents
    if "ai agents fundamentals" in t.lower() or ("ai agents" in t.lower() and "hugging" in t.lower()):
        title_en = "AI Agents Fundamentals"
        title_ru = "Основы разработки ИИ-агентов и рабочих процессов LLM"
        return title_en, title_ru

    # Handle UNDSS BSAFE
    if "bsafe" in t.lower():
        title_en = "BSAFE Field Security & Safety Certification"
        title_ru = "Официальная сертификация полевой безопасности сотрудников ООН"
        return title_en, title_ru

    # Handle Stanford COVID-19
    if "covid-19 training for healthcare" in t.lower():
        title_en = "COVID-19 Training for Healthcare Workers"
        title_ru = "Клиническая подготовка и протоколы безопасности медработников"
        return title_en, title_ru

    # Handle Six Sigma Black Belt
    if "six sigma black belt" in t.lower():
        title_en = "Lean Six Sigma Black Belt (Parts 1 & 2)"
        title_ru = "Черный пояс Lean Six Sigma: Управление качеством и оптимизация процессов"
        return title_en, title_ru

    # Handle Delft Electric Cars
    if "electric cars" in t.lower():
        title_en = "Electric Cars: Technology, Business & Smart Grids"
        title_ru = "Электромобили, микросети и чистая энергетика"
        return title_en, title_ru

    # General extraction of English / Russian in parenthesis
    m = re.match(r'^(.*?)\s*\((.*?)\)$', t)
    if m:
        p1 = m.group(1).strip()
        p2 = m.group(2).strip()
        if re.search(r'[а-яА-ЯёЁ]', p2) and not re.search(r'[а-яА-ЯёЁ]', p1):
            title_en = p1
            title_ru = p2
        elif re.search(r'[а-яА-ЯёЁ]', p1) and not re.search(r'[а-яА-ЯёЁ]', p2):
            title_en = p2
            title_ru = p1

    return title_en, title_ru

cleaned_certs = []
for c in certs:
    issuer_clean = clean_issuer_name(c['issuer'])
    title_clean, title_ru = clean_title_and_extract_ru(c['title'])
    
    entry = dict(c)
    entry['title'] = title_clean
    entry['issuer'] = issuer_clean
    if title_ru:
        entry['titleRu'] = title_ru
    elif 'titleRu' in entry and entry['titleRu']:
        pass
    
    # Normalize flagship & specialization flags
    if entry.get('id') in ['cert-237-prompt-engineering-1-prompt-en', 'cert-241-generative-ai-prompt-engineeri', 'cert-129-professional-certificate-leadi', 'cert-214-cs50-technology', 'cert-242-google-ai-essentials-google', 'cert-243-google-ai-essentials', 'cert-257-ai-agents-fundamentals', 'cert-87-bsafe', 'cert-78-covid-19-training-for-healthca', 'cert-236-electric-cars-technology-busines', 'cert-234-lean-six-sigma-black-belt-parts-']:
        entry['isFlagship'] = True

    if entry.get('id') in ['cert-237-prompt-engineering-1-prompt-en', 'cert-241-generative-ai-prompt-engineeri', 'cert-129-professional-certificate-leadi']:
        entry['isSpecialization'] = True

    # Ensure Hugging Face skills and platform
    if 'hugging face' in issuer_clean.lower() or entry.get('id') == 'cert-257-ai-agents-fundamentals':
        entry['issuer'] = 'Hugging Face'
        entry['skills'] = ['AI Agents', 'LLM Workflows', 'Python']
        entry['category'] = 'ai-ml'

    # Ensure Google AI Essentials category & platform
    if 'google ai essentials' in title_clean.lower():
        entry['issuer'] = 'Google'
        entry['platform'] = 'Google'
        entry['category'] = 'ai-ml'
        entry['skills'] = ['AI Tools', 'Generative AI', 'Prompt Engineering']

    # Ensure UNDSS BSAFE category & platform
    if entry.get('id') == 'cert-87-bsafe' or 'bsafe' in title_clean.lower():
        entry['issuer'] = 'Департамент безопасности ООН (UNDSS)'
        entry['platform'] = 'UN / WHO'
        entry['category'] = 'global-health-safety'
        entry['skills'] = ['Global Standards', 'Safety Protocols', 'Crisis Response']

    cleaned_certs.append(entry)

print(f"Cleaned {len(cleaned_certs)} certs!")

# Save to cleaned_certs.json
with open('cleaned_certs.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned_certs, f, ensure_ascii=False, indent=2)

print("Saved cleaned_certs.json")
