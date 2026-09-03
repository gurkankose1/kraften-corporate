import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import html
import re
import json
import os
import datetime

# RSS Feed sources
RSS_FEEDS = [
    "https://news.google.com/rss/search?q=sustainable+food+packaging&hl=en-US&gl=US&ceid=US:en",
    "https://news.google.com/rss/search?q=paper+food+packaging+containers&hl=en-US&gl=US&ceid=US:en",
    "https://news.google.com/rss/search?q=ambalaj+sekt%C3%B6r%C3%BC+g%C4%B1da&hl=tr&gl=TR&ceid=TR:tr"
]

# Image pool for articles to prevent identical images
IMAGE_POOL = [
    "https://degisimpack.com/images/blogs/blog1.jpg",
    "https://degisimpack.com/images/blogs/blog2.jpg",
    "https://degisimpack.com/images/blogs/blog4.jpg",
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
]

DATA_JS_PATH = os.path.join(os.path.dirname(__file__), "..", "data.js")

def clean_html(raw_html):
    clean_text = re.sub(r'<.*?>', '', raw_html)
    return html.unescape(clean_text).strip()

def slugify(text):
    text = text.lower()
    text = re.sub(r'[çç]', 'c', text)
    text = re.sub(r'[ğğ]', 'g', text)
    text = re.sub(r'[ıIİi]', 'i', text)
    text = re.sub(r'[öö]', 'o', text)
    text = re.sub(r'[şş]', 's', text)
    text = re.sub(r'[üü]', 'u', text)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def fetch_latest_rss_item():
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    # Read existing content to check existing IDs
    existing_content = ""
    if os.path.exists(DATA_JS_PATH):
        with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
            existing_content = f.read()

    for url in RSS_FEEDS:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp:
                xml_data = resp.read()
                root = ET.fromstring(xml_data)
                channel = root.find('channel')
                items = channel.findall('item')
                for item in items:
                    title_elem = item.find('title')
                    desc_elem = item.find('description')
                    if title_elem is not None and title_elem.text:
                        title = clean_html(title_elem.text)
                        desc = clean_html(desc_elem.text) if desc_elem is not None and desc_elem.text else title
                        slug = slugify(title[:40])
                        
                        # Only return if not already in data.js
                        if f"autonews-{slug}" not in existing_content and slug not in existing_content:
                            return title, desc
        except Exception as e:
            print(f"Error fetching feed {url}: {e}")
    return None, None

def generate_article_with_gemini(title, desc, api_key):
    prompt = f"""
Sektörel gıda ambalaj firması "Kraften Ambalaj" için aşağıdaki haber konusundan %100 özgün, 300-400 kelimelik, ilgi çekici ve Google SEO uyumlu zengin bir blog makalesi üret.

Haber Başlığı: {title}
Haber Detayı: {desc}

Kuralları takip et:
1. Makale en az 3-4 paragraftan oluşmalı.
2. Sektörel terimler, çevre standartları (FSC, ISO 22000, gıda teması) ve Kraften Ambalaj vurgusu içermeli.
3. Çıktıyı SADECE geçerli bir JSON nesnesi olarak ver (markdown veya kod bloğu olmadan):

{{
  "id": "slug-formatinda-id",
  "category": "surdurulebilirlik veya trendler veya hijyen",
  "titleTr": "Türkçe Başlık (Özgün ve Kurumsal)",
  "titleEn": "English Title (Original & Corporate)",
  "summaryTr": "Türkçe 2 cümlelik özet.",
  "summaryEn": "English 2 sentence summary.",
  "contentTr": "Türkçe 3-4 paragraf detaylı, profesyonel kurumsal makale metni. Paragraflar arasında n\\n olsun.",
  "contentEn": "English 3-4 paragraph detailed, professional corporate article content."
}}
"""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    req = urllib.request.Request(
        url,
        data=json.dumps({"contents": [{"parts": [{"text": prompt}]}]}).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            text = data['candidates'][0]['content']['parts'][0]['text']
            # Clean JSON codeblock delimiters if present
            text = re.sub(r'^```json\s*', '', text)
            text = re.sub(r'\s*```$', '', text)
            return json.loads(text)
    except Exception as e:
        print(f"Gemini API error: {e}")
        return None

def fallback_article_generator(title, desc):
    slug = slugify(title[:40])
    today_str = datetime.datetime.now().strftime("%d %B %Y")
    months_tr = {"January": "Ocak", "February": "Şubat", "March": "Mart", "April": "Nisan", "May": "Mayıs", "June": "Haziran", "July": "Temmuz", "August": "Ağustos", "September": "Eylül", "October": "Ekim", "November": "Kasım", "December": "Aralık"}
    for en, tr in months_tr.items():
        today_str = today_str.replace(en, tr)

    # Pick image based on title hash for variety
    img_idx = abs(hash(title)) % len(IMAGE_POOL)
    selected_img = IMAGE_POOL[img_idx]

    # Clean title from source site suffix like "- Issuewire.com" or "- Global Atlanta"
    clean_title = re.sub(r'\s*-\s*[A-Za-z0-9\.]+$', '', title).strip()

    return {
        "id": f"autonews-{slug}",
        "titleTr": "Küresel Gıda Ambalajı ve Sürdürülebilir Karton Kap Trendleri",
        "titleEn": f"Food Packaging Insights: {clean_title}",
        "titleDe": f"Trends bei Lebensmittelverpackungen: {clean_title}",
        "titleFr": f"Tendances de l'Emballage Alimentaire : {clean_title}",
        "date": today_str,
        "author": "Kraften Ar-Ge",
        "category": "trendler",
        "img": selected_img,
        "summaryTr": "Gıda sektöründe çevre dostu karton kase ve sızdırmaz ambalaj çözümlerindeki en yeni uluslararası gelişmeler.",
        "summaryEn": f"Latest global food packaging insights and developments on {clean_title}.",
        "summaryDe": f"Neueste globale Erkenntnisse und Entwicklungen im Bereich Lebensmittelverpackungen.",
        "summaryFr": "Dernières informations et développements mondiaux sur l'emballage alimentaire.",
        "contentTr": "Küresel gıda ambalajı sektöründe doğa dostu ve sürdürülebilir kap çözümleri hızla ön plana çıkmaktadır. Restoranların ve gıda üreticilerinin kağıt ham maddeli kaplara yönelimi hem çevreyi korumakta hem de marka güvenilirliğini artırmaktadır.\n\nSon dönemde yürürlüğe giren uluslararası çevre regülasyonları, tek kullanımlık plastiklerin yerine geri dönüştürülebilir ve gıdaya uygun sertifikalı karton kapların kullanılmasını şart koşmaktadır.\n\nKraften Ambalaj olarak, gıda temasına %100 uygun sertifikalı karton kaselerimiz ve sızdırmaz kaplarımızla işletmelerin bu sürdürülebilirlik dönüşümüne öncülük ediyoruz.",
        "contentEn": f"In the global food packaging sector, sustainable container solutions are rapidly coming to the forefront. The transition of restaurants towards eco-friendly paperboard containers protects the environment while boosting customer trust.\n\nRecent environmental regulations necessitate replacing single-use plastics with certified, recyclable paperboard raw materials.\n\nAt Kraften Packaging, we lead this sustainability transformation with 100% food-contact certified paper bowls and leak-proof containers."
    }

def inject_seo_internal_links(article):
    content_tr = article.get("contentTr", "")
    links_map = [
        (r'\b(kraft salata kasesi|kraft salata kabı)\b', r'<a href="./kraft-salata-kasesi.html" style="color: var(--color-accent); font-weight: bold;">\1</a>'),
        (r'\b(bowl kase|poké bowl)\b', r'<a href="./bowl-kase.html" style="color: var(--color-accent); font-weight: bold;">\1</a>'),
        (r'\b(toptan karton kase|karton kase)\b', r'<a href="./toptan-karton-kase.html" style="color: var(--color-accent); font-weight: bold;">\1</a>'),
        (r'\b(sızdırmaz gıda kabı|sızdırmaz kap)\b', r'<a href="./sizdirmaz-gida-kabi.html" style="color: var(--color-accent); font-weight: bold;">\1</a>')
    ]
    for pattern, replacement in links_map:
        content_tr = re.sub(pattern, replacement, content_tr, count=1, flags=re.IGNORECASE)
    article["contentTr"] = content_tr
    return article

def append_to_data_js(new_article):
    new_article = inject_seo_internal_links(new_article)
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # Check for duplicate id
    if new_article["id"] in content:
        print(f"Article with id '{new_article['id']}' already exists. Skipping.")
        return False

    new_article["date"] = new_article.get("date", datetime.datetime.now().strftime("%d Ağustos %Y"))
    new_article["author"] = new_article.get("author", "Kraften Ar-Ge")
    
    # Ensure image from pool if not set
    if "img" not in new_article or not new_article["img"]:
        img_idx = abs(hash(new_article.get("titleTr", ""))) % len(IMAGE_POOL)
        new_article["img"] = IMAGE_POOL[img_idx]

    article_json = json.dumps(new_article, ensure_ascii=False, indent=6)

    # Insert into export const blogs = [ ... ];
    target = "export const blogs = ["
    if target in content:
        pos = content.find(target) + len(target)
        updated_content = content[:pos] + "\n    " + article_json + "," + content[pos:]
        with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
            f.write(updated_content)
        print(f"Successfully added new article: {new_article['titleTr']}")
        return True
    else:
        print("Target blogs array not found in data.js")
        return False

def main():
    title, desc = fetch_latest_rss_item()
    if not title:
        print("No RSS news item found.")
        return

    api_key = os.environ.get("GEMINI_API_KEY")
    article = None
    if api_key:
        print("Generating article using Gemini API...")
        article = generate_article_with_gemini(title, desc, api_key)

    if not article:
        print("Using smart fallback article generator...")
        article = fallback_article_generator(title, desc)

    append_to_data_js(article)

if __name__ == "__main__":
    main()
