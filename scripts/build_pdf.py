import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

# Color Palette matching Kraften Web System
PRIMARY_COLOR = colors.HexColor('#0A1A12')   # Dark Forest Green
ACCENT_COLOR = colors.HexColor('#C29668')    # Kraft Gold
BG_KRAFT = colors.HexColor('#F8F5F0')        # Light Kraft Beige
TEXT_DARK = colors.HexColor('#1D2939')       # Dark Charcoal
WHITE = colors.HexColor('#FFFFFF')

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page header/footer

        self.saveState()
        # Top Header Line
        self.setStrokeColor(ACCENT_COLOR)
        self.setLineWidth(1)
        self.line(40, 800, 555, 800)
        
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(PRIMARY_COLOR)
        self.drawString(40, 806, "KRAFTEN AMBALAJ | 2026 ÜRÜN KATALOĞU")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor('#667085'))
        self.drawRightString(555, 806, "www.kraftenambalaj.com")

        # Bottom Footer Line
        self.setStrokeColor(colors.HexColor('#EAECF0'))
        self.line(40, 45, 555, 45)
        
        self.setFont("Helvetica", 8)
        self.drawString(40, 30, "Musteri Hizmetleri: 0541 501 94 78 | info@kraftenambalaj.com")
        self.drawRightString(555, 30, f"Sayfa {self._pageNumber} / {page_count}")
        self.restoreState()

def build_pdf():
    pdf_path = os.path.join(os.path.dirname(__file__), "..", "kraften_2026_katalog.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=55,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=PRIMARY_COLOR,
        alignment=1
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=ACCENT_COLOR,
        alignment=1
    )

    h1_style = ParagraphStyle(
        'H1Style',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=PRIMARY_COLOR,
        spaceAfter=10
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=TEXT_DARK
    )

    elements = []

    # ---------------------------------------------------------
    # PAGE 1: COVER PAGE
    # ---------------------------------------------------------
    elements.append(Spacer(1, 100))
    elements.append(Paragraph("K R A F T E N", subtitle_style))
    elements.append(Spacer(1, 15))
    elements.append(Paragraph("2026 ÜRÜN KATALOĞU", title_style))
    elements.append(Spacer(1, 10))
    elements.append(Paragraph("Endüstriyel Sızdırmaz Gıda Kapları & Karton Ambalaj Çözümleri", subtitle_style))
    elements.append(Spacer(1, 40))
    
    elements.append(HRFlowable(width="80%", thickness=2, color=ACCENT_COLOR, spaceBefore=20, spaceAfter=40))
    
    cover_text = """
    <b>Kraften Ambalaj</b> olarak %100 geri dönüştürülebilir, gıda ile temasa uygun sertifikalı yüksek gramajlı karton salata ve çorba kaselerimizle restoran zincirlerine, otellere ve ihracatçılara özel premium ambalaj çözümleri sunuyoruz.
    """
    elements.append(Paragraph(cover_text, ParagraphStyle('CoverText', parent=body_style, alignment=1, fontSize=11, leading=16)))
    elements.append(Spacer(1, 80))

    contact_info = """
    <b>Kraften Ambalaj San. ve Tic. A.Ş.</b><br/>
    <b>Yetkili:</b> Emirhan KÖSE (0541 501 94 78) | Nuri KÖSE (0532 274 49 60)<br/>
    <b>E-Posta:</b> info@kraftenambalaj.com | <b>Web:</b> www.kraftenambalaj.com
    """
    elements.append(Paragraph(contact_info, ParagraphStyle('ContactText', parent=body_style, alignment=1, fontSize=9, textColor=PRIMARY_COLOR)))
    elements.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 2: SALAD BOWLS PRODUCT RANGE (550 CC & 750 CC)
    # ---------------------------------------------------------
    elements.append(Paragraph("1. PREMIUM SALATA KASELERİ (550 CC & 750 CC)", h1_style))
    elements.append(Paragraph("Orta ve standart boy porsiyonlar için sızdırmaz PET/PP kapak uyumlu gıda kaseleri.", body_style))
    elements.append(Spacer(1, 15))

    products_p1 = [
        {
            "code": "550-WHITE",
            "name": "550 CC Salata Kabı (Beyaz)",
            "cat": "Beyaz Seri",
            "top": "150 mm", "bot": "128 mm", "h": "45 mm", "box": "300 Adet", "dim": "46x31x45 cm",
            "desc": "%99 geri dönüştürülebilir yapısıyla çevre dostu ve hijyenik ambalaj."
        },
        {
            "code": "550-KRAFT",
            "name": "550 CC Kraft Salata Kabı",
            "cat": "Doğal Kraft Seri",
            "top": "150 mm", "bot": "128 mm", "h": "45 mm", "box": "300 Adet", "dim": "46x31x45 cm",
            "desc": "Doğal kraft dokusuyla üst düzey sunum sağlayan ekolojik kase."
        },
        {
            "code": "750-WHITE",
            "name": "750 CC Salata Kabı (Beyaz)",
            "cat": "Beyaz Seri",
            "top": "150 mm", "bot": "128 mm", "h": "60 mm", "box": "300 Adet", "dim": "46x31x55 cm",
            "desc": "Orta boy porsiyon salatalar ve meze sunumları için ideal beyaz kase."
        },
        {
            "code": "750-KRAFT",
            "name": "750 CC Kraft Salata Kabı",
            "cat": "Doğal Kraft Seri",
            "top": "150 mm", "bot": "128 mm", "h": "60 mm", "box": "300 Adet", "dim": "46x31x55 cm",
            "desc": "Ekolojik duyarlılığa sahip restoranlar için şık ve sızdırmaz tasarım."
        }
    ]

    table_data = [
        [Paragraph("<b>Ürün Adı</b>", ParagraphStyle('TH', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Kategori</b>", ParagraphStyle('TH', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Ağız Çapı</b>", ParagraphStyle('TH', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Yükseklik</b>", ParagraphStyle('TH', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Koli İçi</b>", ParagraphStyle('TH', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Koli Ölçüsü</b>", ParagraphStyle('TH', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold'))]
    ]

    for p in products_p1:
        table_data.append([
            Paragraph(f"<b>{p['name']}</b>", body_style),
            Paragraph(p['cat'], body_style),
            Paragraph(p['top'], body_style),
            Paragraph(p['h'], body_style),
            Paragraph(p['box'], body_style),
            Paragraph(p['dim'], body_style),
        ])

    t1 = Table(table_data, colWidths=[150, 85, 65, 60, 65, 90])
    t1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, BG_KRAFT]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#EAECF0')),
    ]))

    elements.append(t1)
    elements.append(Spacer(1, 30))

    # Product Feature Box
    feat_text = """
    <b>Sertifikasyon ve Standartlar:</b><br/>
    • <b>ISO 22000:</b> Gıda Güvenliği Yönetim Sistemi Standartları.<br/>
    • <b>FSC Sertifikası:</b> Sürdürülebilir ve korunan orman ham maddesi.<br/>
    • <b>Sızdırmazlık Garantisi:</b> Soslu ve yağlı salatalarda yumuşama yapmayan özel iç kaplama.
    """
    elements.append(Paragraph(feat_text, ParagraphStyle('FeatText', parent=body_style, backColor=BG_KRAFT, borderPadding=12, borderWidth=1, borderColor=ACCENT_COLOR)))
    
    elements.append(PageBreak())

    # ---------------------------------------------------------
    # PAGE 3: LARGE PORTION BOWLS (32 OZ & 38 OZ)
    # ---------------------------------------------------------
    elements.append(Paragraph("2. BÜYÜK BOY KASELER (32 OZ & 38 OZ / 1000 CC - 1200 CC)", h1_style))
    elements.append(Paragraph("Toplu gıda paket servisi ve doyurucu büyük boy porsiyonlar için geliştirilmiş ekstra dayanıklı serimiz.", body_style))
    elements.append(Spacer(1, 15))

    products_p2 = [
        {
            "code": "32OZ-WHITE",
            "name": "32 OZ Salata Kabı (Beyaz)",
            "cat": "Beyaz Seri",
            "top": "185 mm", "bot": "160 mm", "h": "53 mm", "box": "300 Adet", "dim": "57x38x56 cm",
            "desc": "Büyük porsiyon salatalar ve sıcak yemekler için beyaz estetik tasarım."
        },
        {
            "code": "32OZ-KRAFT",
            "name": "32 OZ Kraft Salata Kabı",
            "cat": "Doğal Kraft Seri",
            "top": "185 mm", "bot": "160 mm", "h": "53 mm", "box": "300 Adet", "dim": "57x38x56 cm",
            "desc": "Yüksek gramajlı gıda kartonu sayesinde ekstra mukavemet."
        },
        {
            "code": "38OZ-WHITE",
            "name": "38 OZ Salata Kabı (Beyaz)",
            "cat": "Beyaz Seri",
            "top": "185 mm", "bot": "160 mm", "h": "60 mm", "box": "300 Adet", "dim": "57x38x56 cm",
            "desc": "En büyük hacimli beyaz kase modelimiz. Catering ve sunum servisine özel."
        },
        {
            "code": "38OZ-KRAFT",
            "name": "38 OZ Kraft Salata Kabı",
            "cat": "Doğal Kraft Seri",
            "top": "185 mm", "bot": "160 mm", "h": "60 mm", "box": "300 Adet", "dim": "57x38x56 cm",
            "desc": "Geniş kapasitesi ve doğal görünümüyle lüks restoranların bir numaralı tercihi."
        }
    ]

    table_data2 = [
        [Paragraph("<b>Ürün Adı</b>", ParagraphStyle('TH2', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Kategori</b>", ParagraphStyle('TH2', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Ağız Çapı</b>", ParagraphStyle('TH2', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Yükseklik</b>", ParagraphStyle('TH2', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Koli İçi</b>", ParagraphStyle('TH2', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold')),
         Paragraph("<b>Koli Ölçüsü</b>", ParagraphStyle('TH2', parent=body_style, textColor=WHITE, fontName='Helvetica-Bold'))]
    ]

    for p in products_p2:
        table_data2.append([
            Paragraph(f"<b>{p['name']}</b>", body_style),
            Paragraph(p['cat'], body_style),
            Paragraph(p['top'], body_style),
            Paragraph(p['h'], body_style),
            Paragraph(p['box'], body_style),
            Paragraph(p['dim'], body_style),
        ])

    t2 = Table(table_data2, colWidths=[150, 85, 65, 60, 65, 90])
    t2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_COLOR),
        ('TEXTCOLOR', (0,0), (-1,0), WHITE),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [WHITE, BG_KRAFT]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#EAECF0')),
    ]))

    elements.append(t2)
    elements.append(Spacer(1, 40))

    # Corporate Call to Action
    cta_box = """
    <b>ÖZEL LOGO BASKILI ÜRETİM VE NUMUNE TALEBİ</b><br/><br/>
    İşletmenizin kurumsal logosuna özel baskılı ambalaj üretimi gerçekleştiriyoruz.<br/>
    Kağıt gramajımızı ve kapak oturuş kalitemizi deneyimlemek için <b>ücretsiz numune kiti</b> isteyebilirsiniz.<br/><br/>
    <b>Müşteri Temsilcisi & Sipariş Hattı:</b><br/>
    • Emirhan KÖSE: <b>0541 501 94 78</b><br/>
    • Nuri KÖSE: <b>0532 274 49 60</b><br/>
    • E-Posta: <b>info@kraftenambalaj.com</b>
    """
    elements.append(Paragraph(cta_box, ParagraphStyle('CTABox', parent=body_style, backColor=PRIMARY_COLOR, textColor=WHITE, borderPadding=16, leading=18)))

    doc.build(elements, canvasmaker=NumberedCanvas)
    print("Successfully built:", pdf_path)

if __name__ == '__main__':
    build_pdf()
