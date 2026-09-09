/**
 * KRAFTEN EDITORIAL CATALOG & SALES ENGINE
 * Clean, mature lookbook flow with dual B2B wholesale / B2C retail e-commerce.
 */

const defaultNextgenProducts = [
    // --- KRAFT SALATA KASELERİ ---
    {
        id: 'prod-550-kraft',
        name: '550 CC Kraft Salata Kasesi',
        desc: 'Doğal kraft gıda kartonu, %100 sızdırmaz PE bariyer. Sıcak ve soğuk yemeklere uygun.',
        img: './images/prods/550_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 25,
        packs: [
            { count: 25, price: 120, oldPrice: 150 },
            { count: 50, price: 225, oldPrice: 280 },
            { count: 100, price: 420, oldPrice: 510 }
        ]
    },
    {
        id: 'prod-750-kraft',
        name: '750 CC Kraft Salata Kasesi',
        desc: 'Orta boy doyurucu porsiyonlar için dayanıklı kraft gövde ve sızdırmaz klipsli kapak seçeneği.',
        img: './images/prods/750_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 25,
        packs: [
            { count: 25, price: 140, oldPrice: 170 },
            { count: 50, price: 255, oldPrice: 320 },
            { count: 100, price: 475, oldPrice: 580 }
        ]
    },
    {
        id: 'prod-32oz-kraft',
        name: '32 OZ Kraft Bowl Kase',
        desc: 'Büyük boy poke bowl, salata ve sulu sıcak yemekler için ekstra kalın kraft kase.',
        img: './images/prods/32oz_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 30,
        packs: [
            { count: 25, price: 155, oldPrice: 190 },
            { count: 50, price: 285, oldPrice: 360 },
            { count: 100, price: 530, oldPrice: 650 }
        ]
    },
    {
        id: 'prod-38oz-kraft',
        name: '38 OZ Kraft Mega Bowl Kase',
        desc: 'En büyük hacimli lüks kraft kase. Catering ve toplu menü sunumları için ideal.',
        img: './images/prods/38oz_kraft_main.webp',
        category: 'kraft_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 35,
        packs: [
            { count: 25, price: 175, oldPrice: 215 },
            { count: 50, price: 325, oldPrice: 400 },
            { count: 100, price: 610, oldPrice: 750 }
        ]
    },

    // --- YENİ KARTON KASELER (12OZ, 14OZ, 16OZ) ---
    {
        id: 'prod-12oz-bowl',
        name: '12 OZ Soğuk Gıda Kasesi',
        desc: 'Dondurma, yoğurt, soğuk meze ve tatlılar için çift katmanlı soğuk bariyerli kase.',
        img: './images/prods/bowls_12_14_16.jpg',
        category: 'yeni_kaseler',
        wholesaleBoxQty: 500,
        hasLidOption: true,
        lidPrice: 20,
        packs: [
            { count: 25, price: 110, oldPrice: 135 },
            { count: 50, price: 205, oldPrice: 250 },
            { count: 100, price: 385, oldPrice: 470 }
        ]
    },
    {
        id: 'prod-14oz-bowl',
        name: '14 OZ Karton Kase (Kapak Dahil)',
        desc: 'Çorba ve sıcak sulu yemekler için şeffaf bombeli PET kapağıyla birlikte tam set.',
        img: './images/prods/bowls_12_14_16.jpg',
        category: 'yeni_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 25, price: 165, oldPrice: 195 },
            { count: 50, price: 305, oldPrice: 370 },
            { count: 100, price: 570, oldPrice: 690 }
        ]
    },
    {
        id: 'prod-16oz-bowl',
        name: '16 OZ Karton Kase (Kapak Dahil)',
        desc: 'Geniş hacimli sıcak/soğuk yemek kasesi. Sızdırmaz PET kapağıyla birlikte paket halinde.',
        img: './images/prods/bowls_12_14_16.jpg',
        category: 'yeni_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 25, price: 185, oldPrice: 220 },
            { count: 50, price: 345, oldPrice: 420 },
            { count: 100, price: 640, oldPrice: 780 }
        ]
    },

    // --- KARTON BARDAKLAR (KAPAKSIZ SERİSİ) ---
    {
        id: 'prod-4oz-cup',
        name: '4 OZ Karton Bardak (Kapaksız)',
        desc: 'Espresso, şurup, numune ve tadım ikramları için kalın gramajlı mini karton bardak.',
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 1000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 75, oldPrice: 95 },
            { count: 100, price: 135, oldPrice: 170 },
            { count: 250, price: 295, oldPrice: 370 }
        ]
    },
    {
        id: 'prod-6oz-cup',
        name: '6 OZ Karton Bardak (Kapaksız)',
        desc: 'Geleneksel Türk çayı, flat white ve su servisi için ideal boyutta sızdırmaz bardak.',
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 1000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 85, oldPrice: 105 },
            { count: 100, price: 155, oldPrice: 190 },
            { count: 250, price: 345, oldPrice: 430 }
        ]
    },
    {
        id: 'prod-7oz-cup',
        name: '7 OZ Karton Bardak (Kapaksız)',
        desc: 'Otomat ve ofis kahve makineleri için standart uyumlu pürüzsüz karton bardak.',
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 1000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 95, oldPrice: 120 },
            { count: 100, price: 175, oldPrice: 220 },
            { count: 250, price: 395, oldPrice: 490 }
        ]
    },
    {
        id: 'prod-8oz-cup',
        name: '8 OZ Karton Bardak (Kapaksız)',
        desc: 'Kafelerin ve paket servislerin en çok satan standart sıcak kahve bardağı.',
        img: './images/prods/cups_series.jpg',
        category: 'bardaklar',
        wholesaleBoxQty: 1000,
        hasLidOption: false,
        lidPrice: 0,
        packs: [
            { count: 50, price: 110, oldPrice: 135 },
            { count: 100, price: 195, oldPrice: 245 },
            { count: 250, price: 440, oldPrice: 550 }
        ]
    },

    // --- BEYAZ KARTON KASELER ---
    {
        id: 'prod-550-white',
        name: '550 CC Beyaz Salata Kasesi',
        desc: 'Lüks beyaz estetik, pürüzsüz yüzey ve sızdırmaz PET kapak seçeneği.',
        img: './images/prods/550_white_main.webp',
        category: 'beyaz_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 25,
        packs: [
            { count: 25, price: 125, oldPrice: 155 },
            { count: 50, price: 235, oldPrice: 290 },
            { count: 100, price: 435, oldPrice: 530 }
        ]
    },
    {
        id: 'prod-750-white',
        name: '750 CC Beyaz Salata Kasesi',
        desc: 'Beyaz karton gövde, yüksek bariyerli iç kaplama, prestijli restoran sunumu.',
        img: './images/prods/750_white_main.webp',
        category: 'beyaz_kaseler',
        wholesaleBoxQty: 300,
        hasLidOption: true,
        lidPrice: 25,
        packs: [
            { count: 25, price: 145, oldPrice: 180 },
            { count: 50, price: 265, oldPrice: 330 },
            { count: 100, price: 495, oldPrice: 610 }
        ]
    }
];

class CatalogApp {
    constructor() {
        this.cart = [];
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

                let total = 0;
                this.cart.forEach((it, i) => {
                    const sub = it.price * it.qty;
                    total += sub;
                    msg += `${i+1}) ${it.name} (${it.packCount}'li - ${it.lidText}) x ${it.qty} Adet: ₺${sub}\n`;
                });

                msg += `\n*Toplam Tutar:* ₺${total}\n`;
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
    }

    renderRetailShowcase() {
        const grid = document.getElementById('retail-showcase-grid');
        if (!grid) return;
        grid.innerHTML = '';

        this.products.forEach(prod => {
            const packIdx = this.selectedPacks[prod.id] || 0;
            const currentPack = prod.packs[packIdx];
            const isLidSelected = this.selectedLidOptions[prod.id];

            let finalPrice = currentPack.price;
            let finalOldPrice = currentPack.oldPrice;

            if (prod.hasLidOption && isLidSelected) {
                finalPrice += prod.lidPrice;
                finalOldPrice += prod.lidPrice;
            }

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
                    <div style="font-size: 0.72rem; color: var(--gold); background: rgba(200,169,110,0.12); padding: 4px 8px; border-radius: 4px; text-align: center; margin-bottom: 10px;">
                        ✔ Şeffaf PET Kapak Dahildir
                    </div>
                `;
            }

            card.innerHTML = `
                <img src="${prod.img}" alt="${prod.name}" class="retail-card-img" loading="lazy">
                <h4 class="retail-card-name">${prod.name}</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px;">${prod.desc}</p>
                
                ${lidHtml}

                <div class="retail-pack-row">
                    ${prod.packs.map((p, i) => `
                        <div class="pack-chip ${i === packIdx ? 'active' : ''}" data-idx="${i}">
                            ${p.count}'li
                        </div>
                    `).join('')}
                </div>

                <div class="retail-price-row">
                    <span class="price-main">₺${finalPrice}</span>
                    <span class="price-prev">₺${finalOldPrice}</span>
                </div>

                <button class="btn-card-add" data-id="${prod.id}">
                    <i class="fas fa-cart-plus"></i> Sepete Ekle
                </button>
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
            if (totalEl) totalEl.textContent = '₺0.00';
            return;
        }

        let total = 0;
        list.innerHTML = this.cart.map(item => {
            const sum = item.price * item.qty;
            total += sum;

            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-pack">${item.packCount}'li Paket · <span style="color: var(--accent-green);">${item.lidText}</span></div>
                        <div class="cart-item-price">₺${item.price} x ${item.qty} = ₺${sum}</div>
                    </div>
                    <div class="cart-qty-ctrl">
                        <button class="qty-btn" data-act="dec" data-id="${item.cartItemId}">−</button>
                        <span style="font-size: 0.85rem; font-weight: 700; color: #FFF;">${item.qty}</span>
                        <button class="qty-btn" data-act="inc" data-id="${item.cartItemId}">+</button>
                    </div>
                </div>
            `;
        }).join('');

        if (subtotalEl) subtotalEl.textContent = `₺${total}`;
        if (totalEl) totalEl.textContent = `₺${total}`;

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
        let msg = "Merhaba Kraften Ambalaj, online kataloğunuzdan perakende siparişim:\n\n";
        let total = 0;
        this.cart.forEach((it, i) => {
            const sub = it.price * it.qty;
            total += sub;
            msg += `${i+1}) ${it.name} (${it.packCount}'li - ${it.lidText}) x ${it.qty} Adet: ₺${sub}\n`;
        });
        msg += `\nToplam Tutar: ₺${total}\nAdresime teslimat için yardımcı olabilir misiniz?`;
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
