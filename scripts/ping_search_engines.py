import urllib.request
import urllib.parse
import json

SITEMAP_URL = "https://www.kraftenambalaj.com/sitemap.xml"
HOST = "www.kraftenambalaj.com"
URLS_TO_INDEX = [
    "https://www.kraftenambalaj.com/",
    "https://www.kraftenambalaj.com/blog.html",
    "https://www.kraftenambalaj.com/kraften_2026_katalog.pdf"
]

def ping_search_engines():
    print("=== ARAMA MOTORLARI PİNG PROTOKOLÜ BAŞLATILIYOR ===")
    
    # 1. Google Ping
    try:
        google_url = f"https://www.google.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}"
        req = urllib.request.Request(google_url, headers={'User-Agent': 'Mozilla/5.0 (compatible; KraftenAmbalajBot/1.0)'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"[OK] Google Ping Başarılı (Status: {resp.status})")
    except Exception as e:
        print(f"[INFO] Google Ping: {e}")

    # 2. Bing Ping
    try:
        bing_url = f"https://www.bing.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}"
        req = urllib.request.Request(bing_url, headers={'User-Agent': 'Mozilla/5.0 (compatible; KraftenAmbalajBot/1.0)'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"[OK] Bing Ping Başarılı (Status: {resp.status})")
    except Exception as e:
        print(f"[INFO] Bing Ping: {e}")

    # 3. IndexNow API (Bing, Yandex, Seznam vb.)
    try:
        indexnow_endpoint = "https://api.indexnow.org/indexnow"
        payload = {
            "host": HOST,
            "key": "kraften-indexnow-2026",
            "keyLocation": f"https://{HOST}/indexnow-key.txt",
            "urlList": URLS_TO_INDEX
        }
        req = urllib.request.Request(
            indexnow_endpoint,
            data=json.dumps(payload).encode('utf-8'),
            headers={'Content-Type': 'application/json; charset=utf-8'},
            method='POST'
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            print(f"[OK] IndexNow Gönderimi Başarılı (Status: {resp.status})")
    except Exception as e:
        print(f"[INFO] IndexNow: {e}")

    print("=== PİNG İŞLEMİ TAMAMLANDI ===")

if __name__ == "__main__":
    ping_search_engines()
