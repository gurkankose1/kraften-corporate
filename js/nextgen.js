/**
 * KRAFTEN EDITORIAL CATALOG & SALES ENGINE
 * Clean, mature lookbook flow with dual B2B wholesale / B2C retail e-commerce.
 */

const defaultNextgenProducts = [
    // --- KRAFT SALATA KASELERİ ---
    {
        id: 'prod-550-kraft',
        name: '550 CC Kraft Salata Kasesi',
        desc: 'Doğal saf kraft gıda kartonundan üretilmiş, iç yüzeyindeki sızdırmaz polietilen (PE) bariyer ile zeytinyağlı salatalar, soslu makarnalar ve sıcak başlangıçlar için mükemmel dayanım sağlar. Yağ çekmez, yumuşamaz ve koku yapmaz. Klipsli kristal PET şeffaf kapak ile tam uyumludur.',
        specs: ['150 mm Çap', '500 Adet/Koli', '%100 Sızdırmaz PE', '-20°C / +100°C', 'FSC Sertifikalı'],
        img: './images/prods/550_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: true,
        lidPrice: 35,
        packs: [
            { count: 25, price: 75, oldPrice: 95 },
            { count: 50, price: 140, oldPrice: 175 },
            { count: 100, price: 265, oldPrice: 330 }
        ]
    },
    {
        id: 'prod-750-kraft',
        name: '750 CC Kraft Salata Kasesi',
        desc: 'En çok tercih edilen standart porsiyon salata kasesi. Doyurucu sezar/tavuklu salatalar, sıcak bowl ve pilav üstü menüler için ekstra rijit kraft gövde. Sızdırmaz taban kıvrımı ve güvenli kilitlenen kapak sistemi sayesinde kurye taşımalarında sıfır akma garantilidir.',
        specs: ['150 mm Çap', '500 Adet/Koli', 'Sıcak & Soğuk Menü', 'Mikrodalga Uyumlu', 'Gıdaya Uygun'],
        img: './images/prods/750_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: true,
        lidPrice: 35,
        packs: [
            { count: 25, price: 85, oldPrice: 110 },
            { count: 50, price: 155, oldPrice: 195 },
            { count: 100, price: 295, oldPrice: 370 }
        ]
    },
    {
        id: 'prod-32oz-kraft',
        name: '32 OZ (1100 CC) Kraft Bowl Kase',
        desc: 'Büyük boy poke bowl, etli salatalar, noodle ve sulu sıcak yemekler için geliştirilmiş geniş hacimli profesyonel kraft kase. Kalınlaştırılmış taban ve güçlendirilmiş kenar formu ile paket serviste deforme olmaz, üst üste güvenle istiflenebilir.',
        specs: ['187 mm Ağız', '300 Adet/Koli', '1100 ml Hacim', 'Sıcak Yemek Dayanıklı', 'Sızdırmaz Kilit'],
        img: './images/prods/32oz_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 50,
        packs: [
            { count: 25, price: 105, oldPrice: 130 },
            { count: 50, price: 195, oldPrice: 245 },
            { count: 100, price: 370, oldPrice: 460 }
        ]
    },
    {
        id: 'prod-38oz-kraft',
        name: '38 OZ (1300 CC) Kraft Mega Bowl Kase',
        desc: 'Geniş porsiyonlu aile boyu salatalar, catering ikramları, döner/kebap menüleri ve toplu yemek sunumları için amiral gemisi mega hacim. Ağır soslara ve yüksek ısıya karşı iç çift kat bariyerli, estetik ve sağlam çevre dostu ambalaj.',
        specs: ['187 mm Ağız', '300 Adet/Koli', '1300 ml Mega Hacim', 'Catering & Paket Servis', '%100 Hijyen'],
        img: './images/prods/38oz_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 50,
        packs: [
            { count: 25, price: 115, oldPrice: 145 },
            { count: 50, price: 215, oldPrice: 270 },
            { count: 100, price: 410, oldPrice: 510 }
        ]
    },

    // --- YENİ KARTON KASELER (12OZ, 14OZ, 16OZ) ---
    {
        id: 'prod-12oz-bowl',
        name: '12 OZ Soğuk Gıda & Bardak Kasesi',
        desc: 'Dondurma, donuk yoğurt, soğuk meze, meyve salatası ve soğuk içecekler için çift katmanlı soğuk bariyerli kase/bardak gövdesi. Dış yüzeyde terleme yapmaz, çıtçıtlı bombeli şeffaf kristal kapak seçeneği ile lezzeti taze tutar.',
        specs: ['2.000 Adet/Koli', 'Terleme Yapmaz', 'Soğuk Bariyer', 'Dondurma & Meze', 'Kristal Kapak Uyumlu'],
        img: './images/prods/bowls_12_14_16.jpg',
        category: 'yeni_kaseler',
        wholesaleBoxQty: 2000,
        hasLidOption: true,
        lidPrice: 25,
        packs: [
            { count: 50, price: 75, oldPrice: 95 },
            { count: 100, price: 140, oldPrice: 175 },
            { count: 250, price: 320, oldPrice: 400 }
        ]
    },
    {
        id: 'prod-14oz-bowl',
        name: '14 OZ Karton Çorba Kasesi Seti (Kapak Dahil)',
        desc: 'Sıcak çorba, kuru fasulye, güveç ve sulu tencere yemekleri için tasarlanmış komple set ambalaj. Buhar tahliye kanallı şeffaf bombeli kapağı pakete dahildir; taşırken basınç yapmaz, sızdırmaz ve kapağı fırlamaz. 500 kase + 500 kapak hazır set standardı.',
        specs: ['500 Set/Koli', 'Buhar Tahliyeli Kapak Dahil', 'Sıcak Sulu Yemek', 'El Yakmaz Gövde', 'Klipsli Sızdırmaz'],
        img: './images/prods/bowls_12_14_16.jpg',
        category: 'yeni_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 25, price: 55, oldPrice: 70 },
            { count: 50, price: 100, oldPrice: 125 },
            { count: 100, price: 190, oldPrice: 240 }
        ]
    },
    {
        id: 'prod-16oz-bowl',
        name: '16 OZ Karton Çorba Kasesi Seti (Kapak Dahil)',
        desc: 'Daha büyük hacimli mercimek, kelle paça, işkembe ve sulu menüler için büyük boy çorba kasesi seti. Güçlendirilmiş alt taban kıvrımı ve ısı yalıtımlı gövde yapısı el yakmadan güvenli taşıma sağlar. Kristal buhar tahliyeli kapağıyla set halindedir.',
        specs: ['500 Set/Koli', 'Buhar Tahliyeli Kapak Dahil', '16 OZ (480 ml)', 'Yüksek Isı Yalıtımı', 'Hijyenik Ambalaj'],
        img: './images/prods/bowls_12_14_16.jpg',
        category: 'yeni_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 25, price: 60, oldPrice: 75 },
            { count: 50, price: 110, oldPrice: 140 },
            { count: 100, price: 205, oldPrice: 260 }
        ]
    },

    // --- KARTON BARDAKLAR (KAPAKSIZ SERİSİ) ---
    {
        id: 'prod-4oz-cup',
        name: '4 OZ Karton Bardak (Kapaksız)',
        desc: 'Tek ve duble espresso shot servisleri, mağaza/şarküteri tadım ikramları ve numune dağıtımları için kompakt yüksek gramajlı mini karton bardak. Pürüzsüz dudak kıvrımı ile dökülmeden içim keyfi sunar.',
        specs: ['3.000 Adet/Koli', '62 mm Ağız Çapı', 'Espresso & Tadım', '118 ml Hacim', 'Sıvı Sızdırmaz'],
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 3000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 25, oldPrice: 32 },
            { count: 100, price: 45, oldPrice: 58 },
            { count: 250, price: 105, oldPrice: 135 }
        ]
    },
    {
        id: 'prod-6oz-cup',
        name: '6 OZ Karton Bardak (Kapaksız)',
        desc: 'Türk çayı, su, meyve suyu ve flat white için en ideal orta-küçük hacimli ergonomik bardak. Dayanıklı saf selüloz yapısı sayesinde sıcak içeceklerde bardağın formu bozulmaz ve yumuşama yapmaz.',
        specs: ['3.000 Adet/Koli', '70 mm Ağız Çapı', 'Çay & Su Servisi', '175 ml Hacim', 'Kokusuz Karton'],
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 3000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 28, oldPrice: 36 },
            { count: 100, price: 50, oldPrice: 65 },
            { count: 250, price: 115, oldPrice: 148 }
        ]
    },
    {
        id: 'prod-7oz-cup',
        name: '7 OZ Karton Bardak (Kapaksız)',
        desc: 'Otomat kahve makineleri, kurumsal ofisler, şantiyeler ve toplantı salonları için Türkiye standardı pürüzsüz karton bardak. Otomat raylarına tam uyumlu ölçüler ve sıkışma yapmayan kusursuz istif geometrisi.',
        specs: ['3.000 Adet/Koli', '73 mm Ağız Çapı', 'Otomat & Ofis Uyumlu', '200 ml Hacim', 'Sıkışma Yapmaz'],
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 3000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 32, oldPrice: 42 },
            { count: 100, price: 58, oldPrice: 75 },
            { count: 250, price: 135, oldPrice: 175 }
        ]
    },
    {
        id: 'prod-8oz-cup',
        name: '8 OZ Karton Bardak (Kapaksız)',
        desc: '3. dalga kahve dükkanları, kafeler, pastaneler ve take-away servislerin amiral gemisi sıcak kahve bardağı. Filtre kahve, latte, cappuccino ve bitki çayları için el yakmayan yüksek yoğunluklu karton gövde.',
        specs: ['2.000 Adet/Koli', '80 mm Ağız Çapı', 'Filtre Kahve & Latte', '240 ml Hacim', 'El Yakmayan Gövde'],
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 2000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 60, oldPrice: 78 },
            { count: 100, price: 115, oldPrice: 148 },
            { count: 250, price: 265, oldPrice: 340 }
        ]
    },

    // --- BEYAZ KARTON KASELER ---
    {
        id: 'prod-550-white',
        name: '550 CC Beyaz Salata Kasesi',
        desc: 'Saf beyaz gıda kartonundan üretilen lüks salata kasesi. Minimalist, modern ve temiz restoran konseptleri için leke tutmaz pürüzsüz dış yüzey. Soslu salatalar, makarna ve soğuk gurme mezelerde sıfır sızdırma sağlar.',
        specs: ['150 mm Çap', '500 Adet/Koli', 'Saf Beyaz Prestij', '%100 Sızdırmaz PE', 'Restoran Standardı'],
        img: './images/550-white-kraften.webp',
        category: 'beyaz_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: true,
        lidPrice: 35,
        packs: [
            { count: 25, price: 80, oldPrice: 100 },
            { count: 50, price: 150, oldPrice: 190 },
            { count: 100, price: 285, oldPrice: 360 }
        ]
    },
    {
        id: 'prod-750-white',
        name: '750 CC Beyaz Salata Kasesi',
        desc: 'Gurme restorasyon ve otel mutfakları için saf beyaz estetiğe sahip 750 cc salata kasesi. Ağır salata sosları, zeytinyağlılar ve sıcak menü sunumlarında yüksek mukavemet gösterir. Şeffaf PET kapakla vitrinde premium görünüm.',
        specs: ['150 mm Çap', '500 Adet/Koli', 'Gurme Menü Sunumu', 'Sıcak & Soğuk Dayanımı', 'Klipsli Kapak Uyumlu'],
        img: './images/750-white-kraften.webp',
        category: 'beyaz_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: true,
        lidPrice: 35,
        packs: [
            { count: 25, price: 90, oldPrice: 115 },
            { count: 50, price: 165, oldPrice: 210 },
            { count: 100, price: 315, oldPrice: 395 }
        ]
    }
];

class CatalogApp {
    constructor() {
        this.cart = [];
        this.currentFilter = 'all';
        this.selectedPacks = {};
        this.selectedLidOptions = {};
        this.products = this.loadProducts();

        this.products.forEach(p => {
            this.selectedPacks[p.id] = 0;
            this.selectedLidOptions[p.id] = p.hasLidOption ? true : true;
        });

        this.init();
    }

    loadProducts() {
        try {
            const VERSION_KEY = 'kraften_price_version';
            const CURRENT_VERSION = '2026-09-10-v3';
            const currentVersion = localStorage.getItem(VERSION_KEY);
            if (currentVersion !== CURRENT_VERSION) {
                localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
                localStorage.setItem('kraften_catalog_products', JSON.stringify(defaultNextgenProducts));
                return defaultNextgenProducts;
            }
            const saved = localStorage.getItem('kraften_catalog_products');
            if (saved) return JSON.parse(saved);
        } catch (e) {
            console.warn('Storage error:', e);
        }
        return defaultNextgenProducts;
    }

    saveProducts() {
        localStorage.setItem('kraften_catalog_products', JSON.stringify(this.products));
    }

    init() {
        this.initHeroCarousel();
        this.bindEvents();
        this.renderRetailShowcase();
        this.updateCartUI();
    }

    initHeroCarousel() {
        this.currentSlideIndex = 0;
        this.carouselSlides = document.querySelectorAll('.carousel-slide');
        this.carouselDots = document.querySelectorAll('.indicator-dot');
        const prevBtn = document.getElementById('carousel-prev-btn');
        const nextBtn = document.getElementById('carousel-next-btn');
        const carouselEl = document.getElementById('main-hero-carousel');

        if (!this.carouselSlides.length) return;

        const goToSlide = (idx) => {
            this.carouselSlides[this.currentSlideIndex]?.classList.remove('active');
            this.carouselDots[this.currentSlideIndex]?.classList.remove('active');

            this.currentSlideIndex = (idx + this.carouselSlides.length) % this.carouselSlides.length;

            this.carouselSlides[this.currentSlideIndex]?.classList.add('active');
            this.carouselDots[this.currentSlideIndex]?.classList.add('active');
        };

        const nextSlide = () => goToSlide(this.currentSlideIndex + 1);
        const prevSlide = () => goToSlide(this.currentSlideIndex - 1);

        let autoPlayTimer = null;
        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayTimer = setInterval(nextSlide, 5000);
        };
        const stopAutoPlay = () => {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay();
            });
        }

        this.carouselDots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                goToSlide(idx);
                startAutoPlay();
            });
        });

        if (carouselEl) {
            carouselEl.addEventListener('mouseenter', stopAutoPlay);
            carouselEl.addEventListener('mouseleave', startAutoPlay);

            // Touch swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            carouselEl.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            carouselEl.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                if (touchStartX - touchEndX > 50) {
                    nextSlide();
                    startAutoPlay();
                } else if (touchEndX - touchStartX > 50) {
                    prevSlide();
                    startAutoPlay();
                }
            }, { passive: true });
        }

        startAutoPlay();
    }


    bindEvents() {
        // Cart drawer triggers
        const cartBtn = document.getElementById('btn-open-cart');
        const cartClose = document.getElementById('cart-close-btn');
        const cartOverlay = document.getElementById('cart-drawer-overlay');

        if (cartBtn) cartBtn.addEventListener('click', () => this.toggleCart(true));
        if (cartClose) cartClose.addEventListener('click', () => this.toggleCart(false));
        if (cartOverlay) cartOverlay.addEventListener('click', () => this.toggleCart(false));

        // Checkout triggers
        const btnCheckoutNow = document.getElementById('btn-checkout-now');
        const btnCheckoutWa = document.getElementById('btn-checkout-wa');
        const checkoutModal = document.getElementById('modal-checkout');
        const closeCheckout = document.getElementById('close-checkout-modal');

        if (btnCheckoutNow) {
            btnCheckoutNow.addEventListener('click', () => {
                this.toggleCart(false);
                checkoutModal.classList.add('open');
            });
        }
        if (closeCheckout) {
            closeCheckout.addEventListener('click', () => checkoutModal.classList.remove('open'));
        }
        if (btnCheckoutWa) {
            btnCheckoutWa.addEventListener('click', () => this.dispatchWhatsAppOrder());
        }

        // Mock Credit Card Inputs
        const ccInput = document.getElementById('cc-number');
        const ccName = document.getElementById('cc-name');
        const ccExp = document.getElementById('cc-expiry');

        if (ccInput) {
            ccInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '').substring(0, 16);
                let formatted = val.match(/.{1,4}/g)?.join(' ') || '•••• •••• •••• ••••';
                document.getElementById('card-display-number').textContent = formatted;
            });
        }
        if (ccName) {
            ccName.addEventListener('input', (e) => {
                document.getElementById('card-display-name').textContent = e.target.value.toUpperCase() || 'AD SOYAD';
            });
        }
        if (ccExp) {
            ccExp.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
                e.target.value = val;
                document.getElementById('card-display-exp').textContent = val || 'AA/YY';
            });
        }

        const checkoutForm = document.getElementById('mock-checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.cart.length === 0) {
                    alert('Sepetinizde ürün bulunmuyor!');
                    return;
                }
                const name = document.getElementById('order-name')?.value.trim() || 'Müşteri';
                const phone = document.getElementById('order-phone')?.value.trim() || '';
                const address = document.getElementById('order-address')?.value.trim() || '';
                const payment = document.getElementById('order-payment')?.value || 'Banka Havalesi / EFT';

                let msg = `*KRAFTEN AMBALAJ - YENİ PERAKENDE SİPARİŞİ*\n\n`;
                msg += `👤 *Müşteri:* ${name}\n`;
                msg += `📞 *Telefon:* ${phone}\n`;
                msg += `📍 *Teslimat Adresi:* ${address}\n`;
                msg += `💳 *Ödeme Yöntemi:* ${payment}\n\n`;
                msg += `*Sipariş Edilen Ürünler:*\n`;

                let subtotal = 0;
                this.cart.forEach((it, i) => {
                    const sub = it.price * it.qty;
                    subtotal += sub;
                    msg += `${i+1}) ${it.name} (${it.packCount}'li - ${it.lidText}) x ${it.qty} Adet: ₺${sub} (KDV Hariç)\n`;
                });

                const vatAmount = Math.round(subtotal * 0.20 * 100) / 100;
                const grandTotal = Math.round((subtotal + vatAmount) * 100) / 100;

                msg += `\n📊 *Ödeme Dökümü:*\n`;
                msg += `• Ara Toplam (KDV Hariç): ₺${subtotal.toLocaleString('tr-TR', {minimumFractionDigits: 2})}\n`;
                msg += `• KDV Bedeli (%20): ₺${vatAmount.toLocaleString('tr-TR', {minimumFractionDigits: 2})}\n`;
                msg += `• *GENEL TOPLAM (KDV Dahil): ₺${grandTotal.toLocaleString('tr-TR', {minimumFractionDigits: 2})}*\n`;
                msg += `\nSiparişimin onaylanmasını ve hesap/IBAN bilgilerinizi rica ederim.`;

                window.open(`https://wa.me/905415019478?text=${encodeURIComponent(msg)}`, '_blank');

                alert(`Sayın ${name}, siparişiniz başarıyla oluşturuldu! Sipariş dökümünüz WhatsApp hattımıza iletildi.`);
                this.cart = [];
                this.updateCartUI();
                checkoutModal.classList.remove('open');
            });
        }

        // Admin Panel triggers
        const btnAdmin = document.getElementById('btn-open-admin');
        const modalAdmin = document.getElementById('modal-admin');
        const closeAdmin = document.getElementById('close-admin-modal');

        if (btnAdmin) btnAdmin.addEventListener('click', () => this.openAdminModal());
        if (closeAdmin) closeAdmin.addEventListener('click', () => modalAdmin.classList.remove('open'));

        // Category Filter Tabs
        const filterBtns = document.querySelectorAll('.filter-tab-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentFilter = e.currentTarget.dataset.filter || 'all';
                this.renderRetailShowcase();
            });
        });
    }

    renderRetailShowcase() {
        const grid = document.getElementById('retail-showcase-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const prodsToRender = this.currentFilter === 'all'
            ? this.products
            : this.products.filter(p => p.category === this.currentFilter);

        if (prodsToRender.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Bu kategoride henüz ürün bulunmuyor.</p>`;
            return;
        }

        prodsToRender.forEach(prod => {
            const packIdx = this.selectedPacks[prod.id] || 0;
            const currentPack = prod.packs[packIdx];
            const isLidSelected = this.selectedLidOptions[prod.id];

            let finalPrice = currentPack.price;
            let finalOldPrice = currentPack.oldPrice;

            if (prod.hasLidOption && isLidSelected) {
                finalPrice += prod.lidPrice;
                finalOldPrice += prod.lidPrice;
            }

            const vatAmount = Math.round(finalPrice * 0.20 * 100) / 100;
            const kdvIncluded = Math.round((finalPrice + vatAmount) * 100) / 100;

            const oldVatAmount = Math.round(finalOldPrice * 0.20 * 100) / 100;
            const oldKdvIncluded = Math.round((finalOldPrice + oldVatAmount) * 100) / 100;

            const card = document.createElement('div');
            card.className = 'retail-card';

            let lidHtml = '';
            if (prod.hasLidOption) {
                lidHtml = `
                    <div class="lid-selector-pill">
                        <button class="lid-pill-btn ${isLidSelected ? 'active' : ''}" data-lid="true">
                            Kapaklı (+₺${prod.lidPrice})
                        </button>
                        <button class="lid-pill-btn ${!isLidSelected ? 'active' : ''}" data-lid="false">
                            Kapaksız
                        </button>
                    </div>
                `;
            } else if (prod.category !== 'bardaklar') {
                lidHtml = `
                    <div style="font-size: 0.74rem; font-weight: 700; color: var(--gold-bright); background: rgba(200,169,110,0.14); border: 1px solid rgba(200,169,110,0.3); padding: 6px 10px; border-radius: 6px; text-align: center; margin-bottom: 12px;">
                        ✔ Şeffaf Bombeli PET Kapak Dahildir
                    </div>
                `;
            }

            const waMsg = encodeURIComponent(`Merhaba Kraften Ambalaj, ${prod.name} için firmanıza özel logo baskılı toptan fiyat teklifi almak istiyorum.`);

            card.innerHTML = `
                <img src="${prod.img}" alt="${prod.name}" class="retail-card-img" loading="lazy">
                <h4 class="retail-card-name">${prod.name}</h4>
                <p class="retail-card-desc">${prod.desc}</p>
                
                <div class="retail-specs-chips">
                    ${(prod.specs || []).map(s => `<span class="micro-spec-chip"><i class="fas fa-check"></i> ${s}</span>`).join('')}
                </div>

                ${lidHtml}

                <div class="pack-selection-header">
                    <span class="pack-selection-label">Paket Seçimi:</span>
                    <span class="pack-min-info">Min. ${prod.minQty || prod.packs[0]?.count} Adet</span>
                </div>

                <div class="retail-pack-row">
                    ${prod.packs.map((p, i) => `
                        <div class="pack-chip ${i === packIdx ? 'active' : ''}" data-idx="${i}">
                            ${p.count}'li
                        </div>
                    `).join('')}
                </div>

                <div class="retail-price-box">
                    <div class="price-kdv-row">
                        <span class="price-main">₺${kdvIncluded.toLocaleString('tr-TR', {minimumFractionDigits: 2})}</span>
                        <span class="price-kdv-badge"><i class="fas fa-shield-alt"></i> KDV DAHİL</span>
                        <span class="price-prev">₺${oldKdvIncluded.toLocaleString('tr-TR', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div class="price-kdv-sub">
                        <span class="price-base-text">₺${finalPrice.toLocaleString('tr-TR', {minimumFractionDigits: 2})} KDV Hariç</span>
                        <span class="price-vat-calc">(+%20 KDV: +₺${vatAmount.toLocaleString('tr-TR', {minimumFractionDigits: 2})})</span>
                    </div>
                </div>

                <button class="btn-card-add" data-id="${prod.id}">
                    <i class="fas fa-cart-plus"></i> Sepete Ekle
                </button>

                <a href="https://wa.me/905415019478?text=${waMsg}" target="_blank" class="btn-custom-print-wa" title="Özel firmanızın logosu ile flekso baskılı sipariş vermek için tıklayın">
                    <i class="fab fa-whatsapp"></i> Özel Logo Baskılı Teklif Al
                </a>
            `;

            // Lid button
            if (prod.hasLidOption) {
                card.querySelectorAll('.lid-pill-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.selectedLidOptions[prod.id] = e.currentTarget.dataset.lid === 'true';
                        this.renderRetailShowcase();
                    });
                });
            }

            // Pack button
            card.querySelectorAll('.pack-chip').forEach(chip => {
                chip.addEventListener('click', (e) => {
                    this.selectedPacks[prod.id] = parseInt(e.currentTarget.dataset.idx);
                    this.renderRetailShowcase();
                });
            });

            // Add to cart
            card.querySelector('.btn-card-add').addEventListener('click', () => {
                this.addToCart(prod, this.selectedPacks[prod.id], this.selectedLidOptions[prod.id]);
            });

            grid.appendChild(card);
        });
    }

    addToCart(product, packIndex, isLidSelected) {
        const pack = product.packs[packIndex];
        const withLid = product.hasLidOption ? isLidSelected : (product.category !== 'bardaklar');
        const unitPrice = pack.price + (product.hasLidOption && withLid ? product.lidPrice : 0);
        const lidText = product.hasLidOption ? (withLid ? 'Kapaklı' : 'Kapaksız') : (product.category === 'bardaklar' ? 'Kapaksız' : 'Kapak Dahil');
        const cartItemId = `${product.id}-${pack.count}-${withLid ? 'lid' : 'nolid'}`;

        const existing = this.cart.find(i => i.cartItemId === cartItemId);
        if (existing) {
            existing.qty += 1;
        } else {
            this.cart.push({
                cartItemId,
                name: product.name,
                img: product.img,
                packCount: pack.count,
                lidText: lidText,
                price: unitPrice,
                qty: 1
            });
        }

        this.updateCartUI();
        this.toggleCart(true);
    }

    updateCartUI() {
        const badge = document.getElementById('nav-cart-count');
        const list = document.getElementById('cart-items-list');
        const subtotalEl = document.getElementById('cart-subtotal');
        const vatEl = document.getElementById('cart-vat');
        const totalEl = document.getElementById('cart-total');

        const totalQty = this.cart.reduce((s, i) => s + i.qty, 0);
        if (badge) badge.textContent = totalQty;

        if (!list) return;

        if (this.cart.length === 0) {
            list.innerHTML = `
                <div style="text-align: center; color: var(--text-muted); padding: 40px 0;">
                    <i class="fas fa-shopping-bag" style="font-size: 2.5rem; opacity: 0.25; margin-bottom: 12px;"></i>
                    <p>Sepetinizde ürün bulunmuyor.</p>
                </div>
            `;
            if (subtotalEl) subtotalEl.textContent = '₺0.00';
            if (vatEl) vatEl.textContent = '₺0.00';
            if (totalEl) totalEl.textContent = '₺0.00';
            return;
        }

        let subtotal = 0;
        list.innerHTML = this.cart.map(item => {
            const sum = item.price * item.qty;
            subtotal += sum;

            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-pack">${item.packCount}'li Paket · <span style="color: var(--accent-green);">${item.lidText}</span></div>
                        <div class="cart-item-price">
                            <strong style="color: var(--gold-bright); font-size: 0.95rem;">₺${(Math.round(sum * 1.20 * 100) / 100).toLocaleString('tr-TR', {minimumFractionDigits: 2})}</strong> <span style="font-size: 0.7rem; color: #FFF; font-weight: 600;">(KDV Dahil)</span>
                            <div style="font-size: 0.68rem; color: var(--text-muted);">₺${sum.toLocaleString('tr-TR', {minimumFractionDigits: 2})} KDV Hariç · +₺${(Math.round(sum * 0.20 * 100) / 100).toLocaleString('tr-TR', {minimumFractionDigits: 2})} KDV</div>
                        </div>
                    </div>
                    <div class="cart-qty-ctrl">
                        <button class="qty-btn" data-act="dec" data-id="${item.cartItemId}">−</button>
                        <span style="font-size: 0.85rem; font-weight: 700; color: #FFF;">${item.qty}</span>
                        <button class="qty-btn" data-act="inc" data-id="${item.cartItemId}">+</button>
                    </div>
                </div>
            `;
        }).join('');

        const vatAmount = Math.round(subtotal * 0.20 * 100) / 100;
        const grandTotal = Math.round((subtotal + vatAmount) * 100) / 100;

        if (subtotalEl) subtotalEl.textContent = `₺${subtotal.toLocaleString('tr-TR', {minimumFractionDigits: 2})}`;
        if (vatEl) vatEl.textContent = `+₺${vatAmount.toLocaleString('tr-TR', {minimumFractionDigits: 2})}`;
        if (totalEl) totalEl.textContent = `₺${grandTotal.toLocaleString('tr-TR', {minimumFractionDigits: 2})}`;

        list.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const act = e.currentTarget.dataset.act;
                const it = this.cart.find(x => x.cartItemId === id);
                if (it) {
                    if (act === 'inc') it.qty += 1;
                    else if (act === 'dec') {
                        it.qty -= 1;
                        if (it.qty <= 0) this.cart = this.cart.filter(x => x.cartItemId !== id);
                    }
                    this.updateCartUI();
                }
            });
        });
    }

    toggleCart(open) {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-drawer-overlay');
        if (drawer && overlay) {
            drawer.classList.toggle('open', open);
            overlay.classList.toggle('open', open);
        }
    }

    dispatchWhatsAppOrder() {
        if (this.cart.length === 0) return alert('Sepetiniz boş!');
        let msg = "*KRAFTEN AMBALAJ - ONLINE PERAKENDE SİPARİŞİ*\n\n";
        let subtotal = 0;
        this.cart.forEach((it, i) => {
            const sub = it.price * it.qty;
            subtotal += sub;
            msg += `${i+1}) ${it.name} (${it.packCount}'li - ${it.lidText}) x ${it.qty} Adet: ₺${sub} (KDV Hariç)\n`;
        });
        const vatAmount = Math.round(subtotal * 0.20 * 100) / 100;
        const grandTotal = Math.round((subtotal + vatAmount) * 100) / 100;

        msg += `\n📊 *Ödeme Dökümü:*\n`;
        msg += `• Ara Toplam (KDV Hariç): ₺${subtotal.toLocaleString('tr-TR', {minimumFractionDigits: 2})}\n`;
        msg += `• KDV Bedeli (%20): ₺${vatAmount.toLocaleString('tr-TR', {minimumFractionDigits: 2})}\n`;
        msg += `• *GENEL TOPLAM (KDV Dahil): ₺${grandTotal.toLocaleString('tr-TR', {minimumFractionDigits: 2})}*\n`;
        msg += `\nSiparişimin onaylanmasını ve hesap/IBAN bilgilerinizi rica ederim.`;
        window.open(`https://wa.me/905415019478?text=${encodeURIComponent(msg)}`, '_blank');
    }

    openAdminModal() {
        const modal = document.getElementById('modal-admin');
        const list = document.getElementById('admin-products-list');
        if (!modal || !list) return;

        list.innerHTML = this.products.map(prod => `
            <div class="admin-item-row" data-id="${prod.id}">
                <div>
                    <strong style="color: #FFF; font-size: 0.92rem;">${prod.name}</strong>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">${prod.category}</div>
                </div>
                <div>
                    <label style="font-size: 0.7rem; color: var(--gold); display: block;">Paket 1 (₺)</label>
                    <input type="number" class="admin-p1" value="${prod.packs[0]?.price || 0}" style="width: 100%; padding: 6px; background: #000; border: 1px solid #444; color: #fff; border-radius: 4px;">
                </div>
                <div>
                    <label style="font-size: 0.7rem; color: var(--gold); display: block;">Paket 2 (₺)</label>
                    <input type="number" class="admin-p2" value="${prod.packs[1]?.price || 0}" style="width: 100%; padding: 6px; background: #000; border: 1px solid #444; color: #fff; border-radius: 4px;">
                </div>
                <div>
                    <label style="font-size: 0.7rem; color: var(--gold); display: block;">Kapak Farkı (₺)</label>
                    <input type="number" class="admin-lid" value="${prod.lidPrice || 0}" style="width: 100%; padding: 6px; background: #000; border: 1px solid #444; color: #fff; border-radius: 4px;">
                </div>
            </div>
        `).join('');

        modal.classList.add('open');

        const saveBtn = document.getElementById('btn-admin-save');
        if (saveBtn) {
            saveBtn.onclick = () => {
                document.querySelectorAll('.admin-item-row').forEach(row => {
                    const id = row.dataset.id;
                    const p = this.products.find(x => x.id === id);
                    if (p) {
                        p.packs[0].price = parseFloat(row.querySelector('.admin-p1').value) || p.packs[0].price;
                        if (p.packs[1]) p.packs[1].price = parseFloat(row.querySelector('.admin-p2').value) || p.packs[1].price;
                        p.lidPrice = parseFloat(row.querySelector('.admin-lid').value) || 0;
                    }
                });
                this.saveProducts();
                this.renderRetailShowcase();
                alert('Tüm ürün fiyatları ve kapak farkları güncellendi!');
                modal.classList.remove('open');
            };
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.kraftenCatalog = new CatalogApp();
});
