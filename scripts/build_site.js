import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProducts, categories, certificates, blogs, translations } from '../data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const SITE_URL = "https://www.kraftenambalaj.com";
const ASSET_VERSION = "20260909";

function slugify(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/İ/g, 'i')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

const PRODUCT_SLUGS = {
    "prod-550-white": "550cc-beyaz-salata-kabi",
    "prod-550-kraft": "550cc-kraft-salata-kabi",
    "prod-750-white": "750cc-beyaz-salata-kabi",
    "prod-750-kraft": "750cc-kraft-salata-kabi",
    "prod-32oz-white": "32oz-beyaz-salata-kabi",
    "prod-32oz-kraft": "32oz-kraft-salata-kabi",
    "prod-38oz-white": "38oz-beyaz-salata-kabi",
    "prod-38oz-kraft": "38oz-kraft-salata-kabi"
};

const CATEGORY_SLUGS = {
    "kraft": "kraft-kaseler",
    "white": "beyaz-kaseler"
};

function getProductUrl(prodId) {
    const slug = PRODUCT_SLUGS[prodId] || slugify(prodId);
    return `/urunler/${slug}.html`;
}

function getCategoryUrl(catId) {
    const slug = CATEGORY_SLUGS[catId] || slugify(catId);
    return `/kategoriler/${slug}.html`;
}

function getBlogUrl(blog) {
    const slug = slugify(blog.titleTr || blog.id);
    return `/blog/${slug}.html`;
}

function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 1. GENERATE PRE-RENDERED PRODUCT CARDS HTML
function generateProductCardsHtml(productsList, lang = 'tr') {
    return productsList.map(prod => {
        const title = lang === 'en' ? prod.titleEn : (lang === 'de' ? (prod.titleDe || prod.titleEn) : (lang === 'fr' ? (prod.titleFr || prod.titleEn) : prod.titleTr));
        const desc = lang === 'en' ? prod.descEn : (lang === 'de' ? (prod.descDe || prod.descEn) : (lang === 'fr' ? (prod.descFr || prod.descEn) : prod.descTr));
        const prodUrl = getProductUrl(prod.id);
        const imgMain = prod.imgMain.replace('./', '/');
        const imgSub = prod.imgSub.replace('./', '/');

        return `
                    <article class="corp-card reveal-up" data-category="${prod.category}">
                        <div class="card-image-wrap">
                            <img src="${imgMain}" alt="${title}" class="main-img" width="400" height="300" loading="lazy">
                            <img src="${imgSub}" alt="${title} detay" class="sub-img" width="400" height="300" loading="lazy">
                            <span class="badge-volume">${prod.volume}</span>
                        </div>
                        <div class="card-body">
                            <span class="card-category">${prod.category === 'kraft' ? 'Kraft Kase' : 'Beyaz Kase'}</span>
                            <h3 class="card-title"><a href="${prodUrl}">${title}</a></h3>
                            <p class="card-desc">${desc}</p>
                            <div class="card-specs-mini">
                                <span><i class="fa-solid fa-arrows-left-right"></i> ${prod.specs.topDiameter}</span>
                                <span><i class="fa-solid fa-box"></i> ${prod.specs.boxQty}</span>
                            </div>
                            <div class="card-actions">
                                <a href="${prodUrl}" class="btn-card-details"><i class="fa-solid fa-circle-info"></i> Detaylar</a>
                                <button class="btn-card-quickview" data-id="${prod.id}"><i class="fa-solid fa-eye"></i> Hızlı İncele</button>
                            </div>
                        </div>
                    </article>`;
    }).join('\n');
}

// 2. GENERATE PRE-RENDERED BLOG CARDS HTML
function generateBlogCardsHtml(blogsList, lang = 'tr') {
    return blogsList.map(blog => {
        const title = lang === 'en' ? blog.titleEn : (lang === 'de' ? (blog.titleDe || blog.titleEn) : (lang === 'fr' ? (blog.titleFr || blog.titleEn) : blog.titleTr));
        const summary = lang === 'en' ? blog.summaryEn : (lang === 'de' ? (blog.summaryDe || blog.summaryEn) : (lang === 'fr' ? (blog.summaryFr || blog.summaryEn) : blog.summaryTr));
        const blogUrl = getBlogUrl(blog);

        return `
                    <article class="blog-card reveal-up" data-category="${blog.category}">
                        <div class="blog-img-wrap">
                            <img src="${blog.img}" alt="${title}" width="600" height="400" loading="lazy">
                            <span class="blog-badge">${blog.category}</span>
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span><i class="fa-regular fa-calendar"></i> ${blog.date}</span>
                                <span><i class="fa-regular fa-user"></i> ${blog.author}</span>
                            </div>
                            <h3 class="blog-title"><a href="${blogUrl}">${title}</a></h3>
                            <p class="blog-summary">${summary}</p>
                            <a href="${blogUrl}" class="blog-read-more">Devamını Oku <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </article>`;
    }).join('\n');
}

// 3. INJECT PRE-RENDERED PRODUCTS INTO INDEX.HTML
function updateIndexHtml() {
    const indexPath = path.join(ROOT_DIR, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf-8');

    // Update asset versioning
    content = content.replace(/css\/main\.css(\?v=\w+)?/g, `css/main.css?v=${ASSET_VERSION}`);
    content = content.replace(/js\/core\.js(\?v=\w+)?/g, `js/core.js?v=${ASSET_VERSION}`);

    // Inject static product cards into product-grid
    const cardsHtml = generateProductCardsHtml(initialProducts, 'tr');
    content = content.replace(
        /<div id="product-grid" class="corporate-product-grid">[\s\S]*?<\/div>/,
        `<div id="product-grid" class="corporate-product-grid">\n${cardsHtml}\n                </div>`
    );

    fs.writeFileSync(indexPath, content, 'utf-8');
    console.log(`[OK] Pre-rendered products injected into index.html`);
}

// 4. INJECT PRE-RENDERED BLOG CARDS INTO BLOG.HTML
function updateBlogHtml() {
    const blogPath = path.join(ROOT_DIR, 'blog.html');
    let content = fs.readFileSync(blogPath, 'utf-8');

    content = content.replace(/css\/main\.css(\?v=\w+)?/g, `css/main.css?v=${ASSET_VERSION}`);
    content = content.replace(/js\/blog\.js(\?v=\w+)?/g, `js/blog.js?v=${ASSET_VERSION}`);

    const cardsHtml = generateBlogCardsHtml(blogs, 'tr');
    content = content.replace(
        /<div id="blog-archive-grid" class="blog-grid"[\s\S]*?>[\s\S]*?<\/div>/,
        `<div id="blog-archive-grid" class="blog-grid" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));">\n${cardsHtml}\n                </div>`
    );

    fs.writeFileSync(blogPath, content, 'utf-8');
    console.log(`[OK] Pre-rendered blog cards injected into blog.html`);
}

// 5. BUILD PRODUCT DETAIL PAGES
function buildProductDetailPages() {
    const prodDir = path.join(ROOT_DIR, 'urunler');
    ensureDir(prodDir);

    initialProducts.forEach(prod => {
        const slug = PRODUCT_SLUGS[prod.id];
        const filePath = path.join(prodDir, `${slug}.html`);
        const pageUrl = `${SITE_URL}/urunler/${slug}.html`;
        const imgMain = `${SITE_URL}${prod.imgMain.replace('./', '/')}`;
        const imgSub = `${SITE_URL}${prod.imgSub.replace('./', '/')}`;

        const related = initialProducts.filter(p => p.id !== prod.id).slice(0, 3);
        const relatedHtml = generateProductCardsHtml(related, 'tr');

        const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2WT6P3QVD"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q2WT6P3QVD');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <title>${prod.titleTr} Toptan Satış & İmalat | Kraften Ambalaj</title>
    <meta name="description" content="${prod.descTr} Fabrikadan doğrudan toptan sipariş ve ücretsiz numune talebi. Ağız Çapı: ${prod.specs.topDiameter}, Koli İçi: ${prod.specs.boxQty}.">
    <meta name="keywords" content="${prod.titleTr}, toptan karton kase, kraft kase imalatçısı, sızdırmaz salata kabı, ${prod.volume} kase">
    <link rel="canonical" href="${pageUrl}" />
    
    <!-- Open Graph -->
    <meta property="og:type" content="product">
    <meta property="og:title" content="${prod.titleTr} | Kraften Ambalaj">
    <meta property="og:description" content="${prod.descTr}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${imgMain}">
    <meta property="og:site_name" content="Kraften Ambalaj">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/main.css?v=${ASSET_VERSION}">

    <!-- Schema.org JSON-LD (Product + BreadcrumbList) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Product",
          "name": "${prod.titleTr}",
          "image": ["${imgMain}", "${imgSub}"],
          "description": "${prod.descTr}",
          "sku": "KRAFTEN-${prod.id.toUpperCase()}",
          "brand": {
            "@type": "Brand",
            "name": "Kraften Ambalaj"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Kraften Ambalaj San. ve Tic. A.Ş.",
            "url": "https://www.kraftenambalaj.com"
          },
          "offers": {
            "@type": "Offer",
            "url": "${pageUrl}",
            "priceCurrency": "TRY",
            "price": "0.00",
            "priceValidUntil": "2027-12-31",
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@type": "Organization",
              "name": "Kraften Ambalaj San. ve Tic. A.Ş."
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Anasayfa",
              "item": "https://www.kraftenambalaj.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Ürünler",
              "item": "https://www.kraftenambalaj.com/#products"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${prod.titleTr}",
              "item": "${pageUrl}"
            }
          ]
        }
      ]
    }
    </script>
</head>
<body>
    <header class="glass-header" id="main-header">
        <div class="header-container">
            <a href="/" class="brand-logo">
                <img src="/logo.png" alt="Kraften Logo" class="logo-img" width="40" height="40">
                <div class="logo-text-group">
                    <span class="logo-title">KRAFTEN</span>
                    <span class="logo-sub">AMBALAJ</span>
                </div>
            </a>
            <nav class="main-nav">
                <a href="/">ANASAYFA</a>
                <a href="/#products" class="active">ÜRÜNLER</a>
                <a href="/#certificates">SERTİFİKALAR</a>
                <a href="/blog.html">BLOG</a>
                <a href="/#contact" class="nav-btn-highlight">İLETİŞİM</a>
            </nav>
        </div>
    </header>

    <main class="product-detail-page" style="padding-top: 130px; min-height: 80vh;">
        <div class="container">
            <!-- Breadcrumbs -->
            <nav class="breadcrumb-trail" style="margin-bottom: 25px; font-size: 0.9rem; color: #666;">
                <a href="/" style="color: var(--color-accent); font-weight: 600;">Anasayfa</a> &gt; 
                <a href="/#products" style="color: var(--color-accent); font-weight: 600;">Ürünler</a> &gt; 
                <span>${prod.titleTr}</span>
            </nav>

            <div class="product-detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start;">
                <!-- Product Gallery -->
                <div class="prod-gallery-wrap">
                    <div class="prod-main-img-box" style="background: #fff; border-radius: 12px; border: 1px solid rgba(194, 150, 104, 0.2); padding: 20px; text-align: center;">
                        <img src="${prod.imgMain.replace('./', '/')}" alt="${prod.titleTr}" id="mainDetailImg" style="max-width: 100%; height: auto; border-radius: 8px;">
                    </div>
                    <div class="prod-thumbs" style="display: flex; gap: 15px; margin-top: 15px;">
                        <img src="${prod.imgMain.replace('./', '/')}" alt="${prod.titleTr} ana görsel" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid var(--color-accent);">
                        <img src="${prod.imgSub.replace('./', '/')}" alt="${prod.titleTr} alt detay" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 1px solid #ccc;">
                    </div>
                </div>

                <!-- Product Info & Specs -->
                <div class="prod-info-wrap">
                    <span class="badge-volume" style="position: static; display: inline-block; margin-bottom: 10px;">${prod.volume}</span>
                    <h1 style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--color-primary); margin-bottom: 15px;">${prod.titleTr}</h1>
                    <p style="font-size: 1.05rem; line-height: 1.7; color: #444; margin-bottom: 25px;">${prod.descTr}</p>

                    <!-- Technical Specs Table -->
                    <div class="specs-table-box" style="background: rgba(10, 26, 18, 0.03); border: 1px solid rgba(194, 150, 104, 0.25); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="font-size: 1.1rem; color: var(--color-primary); margin-bottom: 15px;"><i class="fa-solid fa-list-check"></i> Teknik Özellikler</h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 0.95rem;">
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 8px 0; font-weight: 600;">Ağız Çapı:</td><td style="padding: 8px 0; text-align: right;">${prod.specs.topDiameter}</td></tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 8px 0; font-weight: 600;">Taban Çapı:</td><td style="padding: 8px 0; text-align: right;">${prod.specs.bottomDiameter}</td></tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 8px 0; font-weight: 600;">Yükseklik:</td><td style="padding: 8px 0; text-align: right;">${prod.specs.height}</td></tr>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.08);"><td style="padding: 8px 0; font-weight: 600;">Koli İçi Adet:</td><td style="padding: 8px 0; text-align: right;">${prod.specs.boxQty}</td></tr>
                            <tr><td style="padding: 8px 0; font-weight: 600;">Koli Ölçüsü:</td><td style="padding: 8px 0; text-align: right;">${prod.specs.dimensions}</td></tr>
                        </table>
                    </div>

                    <!-- Action Buttons -->
                    <div class="prod-actions" style="display: flex; gap: 15px; flex-wrap: wrap;">
                        <a href="https://wa.me/905415019478?text=${encodeURIComponent('Merhaba, ' + prod.titleTr + ' ürününüz için toptan fiyat teklifi almak istiyorum.')}" target="_blank" class="btn-primary" style="padding: 14px 28px; background: #25D366; color: #fff; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;">
                            <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i> WhatsApp ile Teklif Al
                        </a>
                        <a href="/kraften_2026_katalog.pdf" target="_blank" class="btn-secondary" style="padding: 14px 28px; border: 1px solid var(--color-accent); color: var(--color-primary); border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 10px;">
                            <i class="fa-solid fa-file-pdf"></i> E-Katalog İndir
                        </a>
                    </div>
                </div>
            </div>

            <!-- Related Products -->
            <section style="margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(0,0,0,0.1);">
                <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-primary); margin-bottom: 25px;">İlgili Ürünlerimiz</h2>
                <div class="product-grid">
                    ${relatedHtml}
                </div>
            </section>
        </div>
    </main>

    <footer class="footer-corporate" style="margin-top: 80px; padding: 40px 0; background: #0A1A12; color: #fff; text-align: center;">
        <div class="container">
            <p>&copy; 2026 Kraften Ambalaj San. ve Tic. A.Ş. Tüm Hakları Saklıdır.</p>
        </div>
    </footer>

    <script type="module" src="/js/core.js?v=${ASSET_VERSION}"></script>
</body>
</html>`;

        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        console.log(`[OK] Product Detail Page built: ${filePath}`);
    });
}

// 6. BUILD CATEGORY PAGES
function buildCategoryPages() {
    const catDir = path.join(ROOT_DIR, 'kategoriler');
    ensureDir(catDir);

    const categoriesList = [
        { id: "kraft", title: "Kraft Karton Salata ve Bowl Kaseleri", slug: "kraft-kaseler", desc: "Doğal kraft kağıt dokusuyla üretilen, gıdaya %100 uygun PE bariyer kaplamalı sızdırmaz kraft salata kaseleri. Fabrikadan toptan satış." },
        { id: "white", title: "Beyaz Karton Salata ve Gıda Kaseleri", slug: "beyaz-kaseler", desc: "Şık beyaz karton yapısıyla restoran ve paket servisler için hijyenik ve estetik gıda kapları. Farklı hacim seçenekleriyle toptan tedarik." }
    ];

    categoriesList.forEach(cat => {
        const filePath = path.join(catDir, `${cat.slug}.html`);
        const pageUrl = `${SITE_URL}/kategoriler/${cat.slug}.html`;
        const filteredProds = initialProducts.filter(p => p.category === cat.id);
        const prodsHtml = generateProductCardsHtml(filteredProds, 'tr');

        const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2WT6P3QVD"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q2WT6P3QVD');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <title>${cat.title} Toptan İmalat | Kraften Ambalaj</title>
    <meta name="description" content="${cat.desc}">
    <link rel="canonical" href="${pageUrl}" />

    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/main.css?v=${ASSET_VERSION}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "name": "${cat.title}",
          "url": "${pageUrl}",
          "description": "${cat.desc}"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Anasayfa",
              "item": "https://www.kraftenambalaj.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "${cat.title}",
              "item": "${pageUrl}"
            }
          ]
        }
      ]
    }
    </script>
</head>
<body>
    <header class="glass-header" id="main-header">
        <div class="header-container">
            <a href="/" class="brand-logo">
                <img src="/logo.png" alt="Kraften Logo" class="logo-img" width="40" height="40">
                <div class="logo-text-group">
                    <span class="logo-title">KRAFTEN</span>
                    <span class="logo-sub">AMBALAJ</span>
                </div>
            </a>
            <nav class="main-nav">
                <a href="/">ANASAYFA</a>
                <a href="/#products" class="active">ÜRÜNLER</a>
                <a href="/#certificates">SERTİFİKALAR</a>
                <a href="/blog.html">BLOG</a>
                <a href="/#contact" class="nav-btn-highlight">İLETİŞİM</a>
            </nav>
        </div>
    </header>

    <main style="padding-top: 130px; min-height: 80vh;">
        <div class="container">
            <nav class="breadcrumb-trail" style="margin-bottom: 20px; font-size: 0.9rem; color: #666;">
                <a href="/" style="color: var(--color-accent); font-weight: 600;">Anasayfa</a> &gt; 
                <span>${cat.title}</span>
            </nav>

            <h1 style="font-family: var(--font-heading); font-size: 2.2rem; color: var(--color-primary); margin-bottom: 15px;">${cat.title}</h1>
            <p style="font-size: 1.1rem; color: #555; max-width: 800px; margin-bottom: 35px; line-height: 1.6;">${cat.desc}</p>

            <div class="product-grid">
                ${prodsHtml}
            </div>
        </div>
    </main>

    <footer class="footer-corporate" style="margin-top: 80px; padding: 40px 0; background: #0A1A12; color: #fff; text-align: center;">
        <div class="container">
            <p>&copy; 2026 Kraften Ambalaj San. ve Tic. A.Ş. Tüm Hakları Saklıdır.</p>
        </div>
    </footer>

    <script type="module" src="/js/core.js?v=${ASSET_VERSION}"></script>
</body>
</html>`;

        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        console.log(`[OK] Category Page built: ${filePath}`);
    });
}

// 7. BUILD BLOG READER PAGES
function buildBlogReaderPages() {
    const blogDir = path.join(ROOT_DIR, 'blog');
    ensureDir(blogDir);

    blogs.forEach(blog => {
        const slug = slugify(blog.titleTr || blog.id);
        const filePath = path.join(blogDir, `${slug}.html`);
        const pageUrl = `${SITE_URL}/blog/${slug}.html`;

        const title = blog.titleTr;
        const summary = blog.summaryTr;
        const contentFormatted = (blog.contentTr || '').split('\n\n').map(p => `<p style="margin-bottom: 18px; line-height: 1.8; font-size: 1.05rem; color: #333;">${p}</p>`).join('\n');

        const related = blogs.filter(b => b.id !== blog.id).slice(0, 3);
        const relatedHtml = generateBlogCardsHtml(related, 'tr');

        const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2WT6P3QVD"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q2WT6P3QVD');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <title>${title} | Kraften Ambalaj Blog</title>
    <meta name="description" content="${summary}">
    <link rel="canonical" href="${pageUrl}" />

    <!-- Open Graph -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${summary}">
    <meta property="og:url" content="${pageUrl}">
    <meta property="og:image" content="${blog.img}">

    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/main.css?v=${ASSET_VERSION}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "headline": "${title}",
          "description": "${summary}",
          "image": "${blog.img}",
          "datePublished": "2026-08-01T08:00:00+03:00",
          "dateModified": "2026-09-03T22:00:00+03:00",
          "author": {
            "@type": "Organization",
            "name": "${blog.author || 'Kraften Ar-Ge'}"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kraften Ambalaj San. ve Tic. A.Ş.",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.kraftenambalaj.com/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${pageUrl}"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Anasayfa",
              "item": "https://www.kraftenambalaj.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://www.kraftenambalaj.com/blog.html"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${title}",
              "item": "${pageUrl}"
            }
          ]
        }
      ]
    }
    </script>
</head>
<body>
    <header class="glass-header" id="main-header">
        <div class="header-container">
            <a href="/" class="brand-logo">
                <img src="/logo.png" alt="Kraften Logo" class="logo-img" width="40" height="40">
                <div class="logo-text-group">
                    <span class="logo-title">KRAFTEN</span>
                    <span class="logo-sub">AMBALAJ</span>
                </div>
            </a>
            <nav class="main-nav">
                <a href="/">ANASAYFA</a>
                <a href="/#products">ÜRÜNLER</a>
                <a href="/#certificates">SERTİFİKALAR</a>
                <a href="/blog.html" class="active">BLOG</a>
                <a href="/#contact" class="nav-btn-highlight">İLETİŞİM</a>
            </nav>
        </div>
    </header>

    <main style="padding-top: 130px; min-height: 80vh;">
        <article class="container" style="max-width: 850px;">
            <nav class="breadcrumb-trail" style="margin-bottom: 20px; font-size: 0.9rem; color: #666;">
                <a href="/" style="color: var(--color-accent); font-weight: 600;">Anasayfa</a> &gt; 
                <a href="/blog.html" style="color: var(--color-accent); font-weight: 600;">Blog</a> &gt; 
                <span>${title}</span>
            </nav>

            <header class="blog-header" style="margin-bottom: 30px;">
                <span style="background: rgba(194, 150, 104, 0.15); color: var(--color-accent); padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 0.85rem; text-transform: uppercase;">${blog.category}</span>
                <h1 style="font-family: var(--font-heading); font-size: 2.3rem; color: var(--color-primary); margin: 15px 0;">${title}</h1>
                <div style="font-size: 0.9rem; color: #666; display: flex; gap: 20px;">
                    <span><i class="fa-regular fa-calendar"></i> ${blog.date}</span>
                    <span><i class="fa-regular fa-user"></i> ${blog.author}</span>
                </div>
            </header>

            <div class="blog-cover" style="margin-bottom: 35px; border-radius: 12px; overflow: hidden;">
                <img src="${blog.img}" alt="${title}" style="width: 100%; max-height: 450px; object-fit: cover;">
            </div>

            <div class="blog-body">
                ${contentFormatted}
            </div>

            <footer style="margin-top: 50px; padding-top: 25px; border-top: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                <a href="/blog.html" class="btn-secondary" style="padding: 10px 20px; border: 1px solid var(--color-accent); border-radius: 6px; text-decoration: none; font-weight: 600; color: var(--color-primary);"><i class="fa-solid fa-arrow-left"></i> Tüm Blog Yazıları</a>
                <a href="https://wa.me/905415019478?text=${encodeURIComponent('Merhaba, ' + title + ' blog yazınızı okudum. Ürünleriniz hakkında teklif almak istiyorum.')}" target="_blank" style="padding: 10px 20px; background: #25D366; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp'tan Sor
                </a>
            </footer>
        </article>

        <section class="container" style="max-width: 1100px; margin-top: 70px;">
            <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--color-primary); margin-bottom: 25px;">Benzer Yazılar</h3>
            <div class="blog-grid">
                ${relatedHtml}
            </div>
        </section>
    </main>

    <footer class="footer-corporate" style="margin-top: 80px; padding: 40px 0; background: #0A1A12; color: #fff; text-align: center;">
        <div class="container">
            <p>&copy; 2026 Kraften Ambalaj San. ve Tic. A.Ş. Tüm Hakları Saklıdır.</p>
        </div>
    </footer>

    <script type="module" src="/js/blog.js?v=${ASSET_VERSION}"></script>
</body>
</html>`;

        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        console.log(`[OK] Blog Reader Page built: ${filePath}`);
    });
}

// 8. BUILD MULTILINGUAL HOMEPAGES (EN, DE, FR)
function buildMultilingualHomepages() {
    ['en', 'de', 'fr'].forEach(lang => {
        const langDir = path.join(ROOT_DIR, lang);
        ensureDir(langDir);
        const filePath = path.join(langDir, 'index.html');
        const pageUrl = `${SITE_URL}/${lang}/`;

        const t = translations[lang] || translations.en;
        const prodsHtml = generateProductCardsHtml(initialProducts, lang);

        const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q2WT6P3QVD"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Q2WT6P3QVD');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <title>${t.brand} | ${t.heroSubtitle}</title>
    <meta name="description" content="${t.heroDesc}">
    <link rel="canonical" href="${pageUrl}" />

    <!-- Hreflang Declarations -->
    <link rel="alternate" hreflang="tr" href="${SITE_URL}/" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/en/" />
    <link rel="alternate" hreflang="de" href="${SITE_URL}/de/" />
    <link rel="alternate" hreflang="fr" href="${SITE_URL}/fr/" />
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />

    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="/css/main.css?v=${ASSET_VERSION}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "Kraften Ambalaj San. ve Tic. A.Ş.",
          "url": "${pageUrl}",
          "logo": "${SITE_URL}/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+905415019478",
            "contactType": "sales"
          }
        }
      ]
    }
    </script>
</head>
<body>
    <header class="glass-header" id="main-header">
        <div class="header-container">
            <a href="/${lang}/" class="brand-logo">
                <img src="/logo.png" alt="Kraften Logo" class="logo-img" width="40" height="40">
                <div class="logo-text-group">
                    <span class="logo-title">${t.brand.split(' ')[0]}</span>
                    <span class="logo-sub">${t.brand.split(' ')[1] || 'PACKAGING'}</span>
                </div>
            </a>
            <nav class="main-nav">
                <a href="/${lang}/">${t.navHome}</a>
                <a href="/${lang}/#products">${t.navProducts}</a>
                <a href="/${lang}/#certificates">${t.navCertificates}</a>
                <a href="/blog.html">${t.navBlog}</a>
                <a href="/${lang}/#contact" class="nav-btn-highlight">${t.navContactBtn}</a>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero-section">
            <div class="container hero-container">
                <div class="hero-content">
                    <span class="hero-subtitle">${t.heroSubtitle}</span>
                    <h1 class="hero-title">${t.heroTitle}</h1>
                    <p class="hero-desc">${t.heroDesc}</p>
                    <div class="hero-actions">
                        <a href="#products" class="btn-primary">${t.heroBtn}</a>
                        <a href="/kraften_2026_katalog.pdf" target="_blank" class="btn-secondary">${t.btnCatalog}</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="products" class="section-products">
            <div class="container">
                <div class="section-header center">
                    <span class="section-sub">${t.prodSub}</span>
                    <h2 class="section-title">${t.prodHeading}</h2>
                    <p class="section-desc">${t.prodDesc}</p>
                </div>
                <div class="product-grid">
                    ${prodsHtml}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer-corporate">
        <div class="container">
            <p>&copy; 2026 Kraften Ambalaj San. ve Tic. A.Ş. All Rights Reserved.</p>
        </div>
    </footer>

    <script type="module" src="/js/core.js?v=${ASSET_VERSION}"></script>
</body>
</html>`;

        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        console.log(`[OK] Multilingual Homepage (${lang}) built: ${filePath}`);
    });
}

// 9. BUILD ALL-IN-ONE SITEMAP.XML
function buildSitemapXml() {
    const urls = [
        { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'daily' },
        { loc: `${SITE_URL}/en/`, priority: '0.9', changefreq: 'weekly' },
        { loc: `${SITE_URL}/de/`, priority: '0.9', changefreq: 'weekly' },
        { loc: `${SITE_URL}/fr/`, priority: '0.9', changefreq: 'weekly' },
        { loc: `${SITE_URL}/blog.html`, priority: '0.8', changefreq: 'daily' },
        { loc: `${SITE_URL}/kraften_2026_katalog.pdf`, priority: '0.7', changefreq: 'monthly' },
        { loc: `${SITE_URL}/kategoriler/kraft-kaseler.html`, priority: '0.8', changefreq: 'weekly' },
        { loc: `${SITE_URL}/kategoriler/beyaz-kaseler.html`, priority: '0.8', changefreq: 'weekly' }
    ];

    initialProducts.forEach(prod => {
        const slug = PRODUCT_SLUGS[prod.id];
        urls.push({
            loc: `${SITE_URL}/urunler/${slug}.html`,
            priority: '0.85',
            changefreq: 'weekly',
            img: `${SITE_URL}${prod.imgMain.replace('./', '/')}`
        });
    });

    blogs.forEach(blog => {
        const slug = slugify(blog.titleTr || blog.id);
        urls.push({
            loc: `${SITE_URL}/blog/${slug}.html`,
            priority: '0.75',
            changefreq: 'monthly',
            img: blog.img
        });
    });

    const todayStr = new Date().toISOString().split('T')[0];

    const sitemapItems = urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.img ? `\n    <image:image><image:loc>${u.img}</image:loc></image:image>` : ''}
  </url>`).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapItems}
</urlset>`;

    const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, xml, 'utf-8');
    console.log(`[OK] Sitemap generated with ${urls.length} URLs at: ${sitemapPath}`);
}

// 10. BUILD LLMS.TXT
function buildLlmsTxt() {
    const prodList = initialProducts.map(p => `- [${p.titleTr}](${SITE_URL}/urunler/${PRODUCT_SLUGS[p.id]}.html): ${p.descTr} (Ağız Çapı: ${p.specs.topDiameter}, Koli: ${p.specs.boxQty})`).join('\n');
    const blogList = blogs.map(b => `- [${b.titleTr}](${SITE_URL}/blog/${slugify(b.titleTr || b.id)}.html): ${b.summaryTr}`).join('\n');

    const content = `# Kraften Ambalaj San. ve Tic. A.Ş. — Kurumsal Bilgi & Ürün İndeksi

> Kraften Ambalaj, uluslararası gıda güvenliği standartlarında (FSC, ISO 22000) toptan kraft salata kasesi, 32oz/38oz bowl kaseler ve sızdırmaz karton gıda kapları imalatçısıdır.

## Kurumsal İletişim Bilgileri
- **Firma Ünvanı:** Kraften Ambalaj San. ve Tic. A.Ş.
- **Web Sitesi:** ${SITE_URL}
- **Genel Müdür:** Emirhan KÖSE (+90 541 501 94 78)
- **Yönetim:** Nuri KÖSE (+90 532 274 49 60)
- **E-Posta:** info@kraftenambalaj.com
- **Üretim & Merkez:** İstanbul, Türkiye

## Ürün Kataloğu & Sayfa Bağlantıları
${prodList}

## Kategori Bağlantıları
- [Kraft Kaseler](${SITE_URL}/kategoriler/kraft-kaseler.html): %100 sızdırmaz PE kaplamalı doğal kraft salata kapları.
- [Beyaz Kaseler](${SITE_URL}/kategoriler/beyaz-kaseler.html): Hijyenik ve estetik beyaz karton gıda kapları.

## Sektörel Makaleler & İncelemeler
${blogList}
`;

    const llmsPath = path.join(ROOT_DIR, 'llms.txt');
    fs.writeFileSync(llmsPath, content, 'utf-8');
    console.log(`[OK] llms.txt generated at: ${llmsPath}`);
}

// EXECUTE ALL BUILD STEPS
function runBuild() {
    console.log("=== STARTING KRAFTEN FULL STATIC BUILD ===");
    updateIndexHtml();
    updateBlogHtml();
    buildProductDetailPages();
    buildCategoryPages();
    buildBlogReaderPages();
    buildMultilingualHomepages();
    buildSitemapXml();
    buildLlmsTxt();
    console.log("=== KRAFTEN STATIC BUILD COMPLETED SUCCESSFULLY ===");
}

runBuild();
