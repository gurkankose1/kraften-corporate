import asyncio, os, base64
from playwright.async_api import async_playwright

def get_b64(path, fmt='jpeg'):
    with open(path, 'rb') as f:
        return f'data:image/{fmt};base64,' + base64.b64encode(f.read()).decode()

html_template = """<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Kraften Ambalaj - 2026 Ürün Kataloğu</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        @page { size: A4 portrait; margin: 0; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; color: #1D2939; background: #FFFFFF; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .page { width: 210mm; height: 297mm; padding: 18mm 15mm; position: relative; page-break-after: always; background: #FFFFFF; overflow: hidden; }
        .cover-page { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #F8F5F0 0%, #EFE8DC 100%); border: 12px solid #0A1A12; }
        .cover-logo { width: 100px; height: 100px; border-radius: 50%; margin-bottom: 20px; box-shadow: 0 10px 25px rgba(194, 150, 104, 0.3); }
        .cover-sub { font-family: 'Inter', sans-serif; font-size: 13px; letter-spacing: 4px; color: #C29668; font-weight: 700; text-transform: uppercase; }
        .cover-title { font-family: 'Cinzel', serif; font-size: 34px; color: #0A1A12; margin: 12px 0; font-weight: 700; letter-spacing: 1px; }
        .cover-desc { font-size: 13px; color: #475467; max-width: 82%; line-height: 1.6; margin-bottom: 25px; }
        .divider { width: 100px; height: 3px; background: #C29668; margin: 15px auto; }
        .highlights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 90%; margin-top: 25px; }
        .hl-box { background: #FFFFFF; border: 1px solid #C29668; padding: 12px; border-radius: 8px; text-align: center; }
        .hl-title { font-size: 12px; font-weight: 700; color: #0A1A12; }
        .hl-sub { font-size: 10px; color: #667085; margin-top: 4px; }
        .cover-footer { position: absolute; bottom: 20mm; font-size: 11px; color: #0A1A12; line-height: 1.8; }
        .page-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #C29668; padding-bottom: 8px; margin-bottom: 16px; }
        .page-header-title { font-family: 'Cinzel', serif; font-size: 13px; font-weight: 700; color: #0A1A12; }
        .page-header-web { font-size: 11px; color: #667085; }
        .section-title { font-family: 'Cinzel', serif; font-size: 18px; color: #0A1A12; margin-bottom: 14px; border-left: 4px solid #C29668; padding-left: 10px; }
        .product-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .product-card { display: flex; align-items: center; background: #F8F5F0; border: 1px solid #EAECF0; border-radius: 10px; padding: 10px 15px; gap: 16px; }
        .product-img { width: 110px; height: 90px; object-fit: contain; background: #FFFFFF; border-radius: 8px; padding: 5px; border: 1px solid #E4E7EC; }
        .product-info { flex: 1; }
        .product-name { font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 700; color: #0A1A12; }
        .product-cat { display: inline-block; font-size: 10px; font-weight: 600; color: #C29668; text-transform: uppercase; margin-top: 2px; margin-bottom: 6px; }
        .specs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px 10px; font-size: 10.5px; background: #FFFFFF; padding: 8px 10px; border-radius: 6px; border: 1px solid #EAECF0; }
        .spec-item span:first-child { color: #667085; }
        .spec-item span:last-child { font-weight: 600; color: #1D2939; }
        .page-footer { position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; border-top: 1px solid #EAECF0; padding-top: 8px; font-size: 10.5px; color: #667085; }
        .cta-box { background: #0A1A12; color: #FFFFFF; padding: 25px; border-radius: 12px; margin-top: 15px; border-left: 6px solid #C29668; }
        .cta-title { font-family: 'Cinzel', serif; font-size: 20px; color: #C29668; margin-bottom: 12px; }
        .cta-list { line-height: 1.9; font-size: 12.5px; }
    </style>
</head>
<body>
    <div class="page cover-page">
        <img src="LOGO_PATH" class="cover-logo">
        <div class="cover-sub">KRAFTEN AMBALAJ</div>
        <h1 class="cover-title">2026 ÜRÜN KATALOĞU</h1>
        <div class="divider"></div>
        <p class="cover-desc">Endüstriyel Sızdırmaz Gıda Kapları & Doğa Dostu Karton Ambalaj Çözümleri.<br>%100 geri dönüştürülebilir, gıda ile temasa uygun sertifikalı yüksek gramajlı ürünlerimizle restoran zincirlerine ve gıda ihracatçılarına özel premium hizmet.</p>
        <div class="highlights-grid">
            <div class="hl-box"><div class="hl-title">%99 Geri Dönüştürülebilir</div><div class="hl-sub">Doğa Dostu Ham Madde</div></div>
            <div class="hl-box"><div class="hl-title">ISO 22000 & FSC</div><div class="hl-sub">Uluslararası Akreditasyon</div></div>
            <div class="hl-box"><div class="hl-title">30+ Ülkeye İhracat</div><div class="hl-sub">Global Lojistik Ağı</div></div>
        </div>
        <div class="cover-footer">
            <strong>Kraften Ambalaj San. ve Tic. A.Ş.</strong><br>
            Yetkili: Emirhan KÖSE (0541 501 94 78) | Nuri KÖSE (0532 274 49 60)<br>
            E-Posta: info@kraftenambalaj.com | Web: www.kraftenambalaj.com
        </div>
    </div>
    <div class="page">
        <div class="page-header"><div class="page-header-title">KRAFTEN AMBALAJ | 2026 KATALOĞU</div><div class="page-header-web">www.kraftenambalaj.com</div></div>
        <h2 class="section-title">1. Premium Salata Kaseleri (550 CC & 750 CC)</h2>
        <div class="product-grid">
            <div class="product-card">
                <img src="IMG_550_WHITE" class="product-img">
                <div class="product-info">
                    <div class="product-name">550 CC Salata Kabı (Beyaz)</div>
                    <div class="product-cat">Beyaz Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>150 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>128 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>45 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>46x31x45 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>150mm PET/PP</span></div>
                    </div>
                </div>
            </div>
            <div class="product-card">
                <img src="IMG_550_KRAFT" class="product-img">
                <div class="product-info">
                    <div class="product-name">550 CC Kraft Salata Kabı</div>
                    <div class="product-cat">Doğal Kraft Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>150 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>128 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>45 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>46x31x45 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>150mm PET/PP</span></div>
                    </div>
                </div>
            </div>
            <div class="product-card">
                <img src="IMG_750_WHITE" class="product-img">
                <div class="product-info">
                    <div class="product-name">750 CC Salata Kabı (Beyaz)</div>
                    <div class="product-cat">Beyaz Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>150 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>128 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>60 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>46x31x55 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>150mm PET/PP</span></div>
                    </div>
                </div>
            </div>
            <div class="product-card">
                <img src="IMG_750_KRAFT" class="product-img">
                <div class="product-info">
                    <div class="product-name">750 CC Kraft Salata Kabı</div>
                    <div class="product-cat">Doğal Kraft Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>150 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>128 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>60 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>46x31x55 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>150mm PET/PP</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-footer"><div>Müşteri Hizmetleri: 0541 501 94 78 | info@kraftenambalaj.com</div><div>Sayfa 2 / 4</div></div>
    </div>
    <div class="page">
        <div class="page-header"><div class="page-header-title">KRAFTEN AMBALAJ | 2026 KATALOĞU</div><div class="page-header-web">www.kraftenambalaj.com</div></div>
        <h2 class="section-title">2. Büyük Boy Kaseler (32 OZ & 38 OZ / 1000-1200 CC)</h2>
        <div class="product-grid">
            <div class="product-card">
                <img src="IMG_32OZ_WHITE" class="product-img">
                <div class="product-info">
                    <div class="product-name">32 OZ Salata Kabı (Beyaz)</div>
                    <div class="product-cat">Beyaz Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>185 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>160 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>53 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>57x38x56 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>185mm PET/PP</span></div>
                    </div>
                </div>
            </div>
            <div class="product-card">
                <img src="IMG_32OZ_KRAFT" class="product-img">
                <div class="product-info">
                    <div class="product-name">32 OZ Kraft Salata Kabı</div>
                    <div class="product-cat">Doğal Kraft Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>185 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>160 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>53 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>57x38x56 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>185mm PET/PP</span></div>
                    </div>
                </div>
            </div>
            <div class="product-card">
                <img src="IMG_38OZ_WHITE" class="product-img">
                <div class="product-info">
                    <div class="product-name">38 OZ Salata Kabı (Beyaz)</div>
                    <div class="product-cat">Beyaz Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>185 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>160 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>60 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>57x38x56 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>185mm PET/PP</span></div>
                    </div>
                </div>
            </div>
            <div class="product-card">
                <img src="IMG_38OZ_KRAFT" class="product-img">
                <div class="product-info">
                    <div class="product-name">38 OZ Kraft Salata Kabı</div>
                    <div class="product-cat">Doğal Kraft Seri</div>
                    <div class="specs-grid">
                        <div class="spec-item"><span>Ağız Çapı:</span> <span>185 mm</span></div>
                        <div class="spec-item"><span>Taban Çapı:</span> <span>160 mm</span></div>
                        <div class="spec-item"><span>Yükseklik:</span> <span>60 mm</span></div>
                        <div class="spec-item"><span>Koli İçi Adet:</span> <span>300 Adet</span></div>
                        <div class="spec-item"><span>Koli Ölçüsü:</span> <span>57x38x56 cm</span></div>
                        <div class="spec-item"><span>Uyumlu Kapak:</span> <span>185mm PET/PP</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-footer"><div>Müşteri Hizmetleri: 0541 501 94 78 | info@kraftenambalaj.com</div><div>Sayfa 3 / 4</div></div>
    </div>
    <div class="page">
        <div class="page-header"><div class="page-header-title">KRAFTEN AMBALAJ | 2026 KATALOĞU</div><div class="page-header-web">www.kraftenambalaj.com</div></div>
        <h2 class="section-title">3. Kurumsal İmalat & Özel Logo Baskı Rehberi</h2>
        <div class="cta-box">
            <div class="cta-title">ÖZEL LOGO BASKILI ÜRETİM VE NUMUNE HİZMETİ</div>
            <div class="cta-list">
                ✔ <strong>Markanıza Özel Flexo Baskı:</strong> Gıda temasına %100 uygun su bazlı kokusuz mürekkeplerle logonuz kaseye basılır.<br>
                ✔ <b>Sızdırmaz İç Kaplama:</b> Sıcak çorbalardan asitli ve yağlı salatalara kadar sos sızdırmayan PE/PLA iç bariyer.<br>
                ✔ <strong>Ücretsiz Kurumsal Numune Kiti:</strong> Kağıt gramajımızı ve kapak oturma hassasiyetimizi adrese kargoluyoruz.<br>
                ✔ <strong>Uluslararası Akreditasyon:</strong> ISO 22000 Gıda Güvenliği ve FSC Sürdürülebilir Orman Sertifikalı üretim.<br><br>
                <strong>SİPARİŞ VE MÜŞTERİ HİZMETLERİ HATTI:</strong><br>
                📞 Emirhan KÖSE (CEO): <strong>0541 501 94 78</strong><br>
                📞 Nuri KÖSE: <strong>0532 274 49 60</strong><br>
                ✉ E-Posta: <strong>info@kraftenambalaj.com</strong><br>
                🌐 Web Sitemiz: <strong>www.kraftenambalaj.com</strong>
            </div>
        </div>
        <div class="page-footer"><div>Müşteri Hizmetleri: 0541 501 94 78 | info@kraftenambalaj.com</div><div>Sayfa 4 / 4</div></div>
    </div>
</body>
</html>"""

async def main():
    html = html_template.replace("LOGO_PATH", get_b64("logo.png", "png"))
    html = html.replace("IMG_550_WHITE", get_b64("pdf_img/550_white.jpg"))
    html = html.replace("IMG_550_KRAFT", get_b64("pdf_img/550_kraft.jpg"))
    html = html.replace("IMG_750_WHITE", get_b64("pdf_img/750_white.jpg"))
    html = html.replace("IMG_750_KRAFT", get_b64("pdf_img/750_kraft.jpg"))
    html = html.replace("IMG_32OZ_WHITE", get_b64("pdf_img/32oz_white.jpg"))
    html = html.replace("IMG_32OZ_KRAFT", get_b64("pdf_img/32oz_kraft.jpg"))
    html = html.replace("IMG_38OZ_WHITE", get_b64("pdf_img/38oz_white.jpg"))
    html = html.replace("IMG_38OZ_KRAFT", get_b64("pdf_img/38oz_kraft.jpg"))

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_content(html)
        await page.emulate_media(media="print")
        pdf_path = os.path.abspath("kraften_2026_katalog.pdf")
        await page.pdf(path=pdf_path, format="A4", print_background=True, margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
        await browser.close()
        print("EMBEDDED BASE64 PLAYWRIGHT PDF SUCCESS:", pdf_path, f"({os.path.getsize(pdf_path)} bytes)")

if __name__ == "__main__":
    asyncio.run(main())
