import { initialProducts, categories, certificates, blogs, translations } from '../data.js';

class CorporateApp {
    constructor() {
        this.lang = 'tr';
        
        // Load data from localStorage or use initial data
        // Always load compressed local WebP products from data.js
        this.products = [...initialProducts];
        
        const savedCats = localStorage.getItem('kraften_categories_corp');
        this.categories = savedCats ? JSON.parse(savedCats) : [...categories];
        
        this.currentFilter = 'all';
        this.isAdminOpen = window.location.hash === '#/ek';

        this.init();
    }

    init() {
        this.initLoader();
        this.initCursor();
        this.initScrollReveal();
        this.initHeader();
        this.bindEvents();
        
        this.renderCategories();
        this.renderProducts();
        this.renderCertificates();
        this.renderBlogs();
        this.applyTranslations();
        
        if (this.isAdminOpen) {
            this.openAdminModal();
        }
    }

    initLoader() {
        const hideLoader = () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if(loader) loader.classList.add('hidden');
                setTimeout(() => this.triggerReveals(), 100);
            }, 1000);
        };

        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }
    }

    initCursor() {
        // Skip custom cursor on touch/mobile devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 900) return;
        const dot = document.querySelector('.cursor-dot');
        const outline = document.querySelector('.cursor-outline');
        if(!dot || !outline) return;

        window.addEventListener('mousemove', (e) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            outline.style.left = `${e.clientX}px`;
            outline.style.top = `${e.clientY}px`;
        });

        // Global Event Delegation for hover effects anywhere (including inside modals)
        document.addEventListener('mouseover', (e) => {
            const isClickable = e.target.closest('a, button, .btn-close, .corp-card, .blog-card, .cert-card, .modal-thumb, input, select');
            if (isClickable) {
                outline.style.transform = 'translate3d(-50%, -50%, 0) scale(1.5)';
                outline.style.backgroundColor = 'rgba(194, 150, 104, 0.25)';
                outline.style.borderColor = '#C29668';
            } else {
                outline.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
                outline.style.backgroundColor = 'transparent';
                outline.style.borderColor = '#0A1A12';
            }
        });
    }

    initHeader() {
        const header = document.getElementById('main-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    initScrollReveal() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
    }

    triggerReveals() {
        document.querySelectorAll('.reveal-up:not(.active)').forEach(el => {
            this.observer.observe(el);
        });
    }

    bindEvents() {
        // Luxury Lang Switcher Dropdown (TR | EN | DE | FR)
        const langMenuBtn = document.getElementById('lang-menu-btn');
        const langDropdown = document.getElementById('lang-dropdown-menu');
        const flagMap = { tr: '🇹🇷', en: '🇬🇧', de: '🇩🇪', fr: '🇫🇷' };

        if (langMenuBtn && langDropdown) {
            langMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                langDropdown.classList.toggle('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.lang-switcher-wrapper')) {
                    langDropdown.classList.add('hidden');
                }
            });

            langDropdown.querySelectorAll('.lang-option').forEach(opt => {
                opt.addEventListener('click', () => {
                    const targetLang = opt.dataset.lang;
                    this.lang = targetLang;

                    document.getElementById('current-lang-flag').textContent = flagMap[targetLang] || '🌐';
                    document.getElementById('current-lang-code').textContent = targetLang.toUpperCase();

                    langDropdown.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
                    opt.classList.add('active');
                    langDropdown.classList.add('hidden');

                    this.applyTranslations();
                    this.renderCategories();
                    this.renderProducts();
                    this.renderBlogs();
                    this.triggerReveals();
                });
            });
        }

        // Hash Routing for Admin
        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#/ek') {
                this.openAdminModal();
            } else {
                document.getElementById('admin-modal').classList.add('hidden');
            }
        });

        // Modals Close
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('product-modal').classList.add('hidden');
        });
        
        const closeBlogBtn = document.getElementById('close-blog-modal');
        if (closeBlogBtn) {
            closeBlogBtn.addEventListener('click', () => {
                document.getElementById('blog-modal').classList.add('hidden');
            });
        }
        document.getElementById('close-admin')?.addEventListener('click', () => {
            window.location.hash = ''; // removes hash, triggers close
        });
        
        // Sample Request Modal
        const sampleModal = document.getElementById('sample-modal');
        const openSampleBtn = document.getElementById('btn-hero-sample');
        const closeSampleBtn = document.getElementById('close-sample-modal');
        const sampleForm = document.getElementById('sample-form');

        if (openSampleBtn && sampleModal) {
            openSampleBtn.addEventListener('click', () => sampleModal.classList.remove('hidden'));
        }
        if (closeSampleBtn && sampleModal) {
            closeSampleBtn.addEventListener('click', () => sampleModal.classList.add('hidden'));
        }
        if (sampleForm) {
            sampleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const company = document.getElementById('sample-company').value;
                const name = document.getElementById('sample-name').value;
                const phone = document.getElementById('sample-phone').value;
                const product = document.getElementById('sample-product').value;
                const address = document.getElementById('sample-address').value;

                const message = `*KRAFTEN AMBALAJ - ÜCRETSİZ NUMUNE TALEBİ*\n\n🏢 *Firma:* ${company}\n👤 *Yetkili:* ${name}\n📞 *Telefon:* ${phone}\n📦 *Ürün:* ${product}\n📍 *Adres:* ${address}`;
                const waUrl = `https://wa.me/905415019478?text=${encodeURIComponent(message)}`;
                
                alert("Numune talebiniz başarıyla oluşturuldu! WhatsApp ile müşteri temsilcimize aktarılıyor.");
                window.open(waUrl, '_blank');
                sampleModal.classList.add('hidden');
                sampleForm.reset();
            });
        }



        // Modal Outside Click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if(e.target === overlay) {
                    overlay.classList.add('hidden');
                    if(overlay.id === 'admin-modal') window.location.hash = '';
                }
            });
        });

        // Admin Save Events
        document.getElementById('btn-save-cat')?.addEventListener('click', () => this.saveCategory());
        document.getElementById('btn-save-prod')?.addEventListener('click', () => this.saveProduct());
        document.getElementById('btn-reset-data')?.addEventListener('click', () => {
            if(confirm("Tüm verileri varsayılana sıfırlamak istediğinize emin misiniz?")) {
                localStorage.removeItem('kraften_products_corp');
                localStorage.removeItem('kraften_categories_corp');
                location.reload();
            }
        });
    }

    t(key) {
        return translations[this.lang][key] || key;
    }

    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.lang] && translations[this.lang][key]) {
                if(el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
                    el.setAttribute('placeholder', translations[this.lang][key]);
                } else {
                    el.innerHTML = translations[this.lang][key]; // HTML used for <br>
                }
            }
        });
    }

    // --- CATEGORIES & FILTERING ---
    renderCategories() {
        const filterContainer = document.getElementById('category-filters');
        if(!filterContainer) return;
        filterContainer.innerHTML = '';

        this.categories.forEach(cat => {
            const name = this.lang === 'tr' ? cat.nameTr : cat.nameEn;
            const btn = document.createElement('button');
            btn.className = `filter-btn ${this.currentFilter === cat.id ? 'active' : ''}`;
            btn.textContent = name;
            btn.addEventListener('click', () => {
                this.currentFilter = cat.id;
                this.renderCategories(); // update active class
                this.renderProducts();
            });
            filterContainer.appendChild(btn);
        });
        
        // Admin dropdown
        const adminSelect = document.getElementById('prod-category');
        if(adminSelect) {
            adminSelect.innerHTML = this.categories.filter(c => c.id !== 'all').map(c => 
                `<option value="${c.id}">${c.nameTr}</option>`
            ).join('');
        }
    }

    // --- PRODUCTS ---
    renderProducts() {
        const grid = document.getElementById('product-grid');
        if(!grid) return;
        grid.innerHTML = '';

        const filtered = this.currentFilter === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === this.currentFilter);

        filtered.forEach((prod, index) => {
            const title = this.lang === 'tr' ? prod.titleTr : prod.titleEn;
            const desc = this.lang === 'tr' ? prod.descTr : prod.descEn;
            const delay = (index % 3) * 0.1;
            const imgSrc = prod.imgMain.startsWith('http') ? prod.imgMain : `./${prod.imgMain}`;
            
            const card = document.createElement('div');
            card.className = 'corp-card reveal-up';
            card.style.transitionDelay = `${delay}s`;
            
            card.innerHTML = `
                <div class="corp-img-wrapper">
                    <img src="${imgSrc}" alt="${title}" class="corp-img" loading="lazy" decoding="async">
                </div>
                <h3 class="corp-title">${title}</h3>
                <p class="corp-desc">${desc}</p>
                <div class="corp-meta">
                    <span class="text-accent">${prod.volume}</span>
                    <span>${this.t('boxQty')}: ${prod.specs.boxQty}</span>
                </div>
            `;
            
            card.addEventListener('click', () => this.openProductModal(prod));
            
            // Re-bind cursor specifically
            card.addEventListener('mouseenter', () => {
                document.querySelector('.cursor-outline').style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            card.addEventListener('mouseleave', () => {
                document.querySelector('.cursor-outline').style.transform = 'translate(-50%, -50%) scale(1)';
            });

            grid.appendChild(card);
            this.observer.observe(card);
        });
    }

    openProductModal(prod) {
        const title = this.lang === 'tr' ? prod.titleTr : prod.titleEn;
        const desc = this.lang === 'tr' ? prod.descTr : prod.descEn;
        
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-desc').textContent = desc;
        
        const mainImg = document.getElementById('modal-img-main');
        mainImg.src = prod.imgMain.startsWith('http') ? prod.imgMain : `./${prod.imgMain}`;
        
        // Thumbnails
        const thumbContainer = document.getElementById('modal-thumbnails');
        thumbContainer.innerHTML = '';
        
        const imgs = [prod.imgMain];
        if (prod.imgSub) imgs.push(prod.imgSub);
        
        imgs.forEach((imgSrc, i) => {
            const finalSrc = imgSrc.startsWith('http') ? imgSrc : `./${imgSrc}`;
            const thumb = document.createElement('img');
            thumb.src = finalSrc;
            thumb.className = `modal-thumb ${i === 0 ? 'active' : ''}`;
            thumb.addEventListener('click', () => {
                mainImg.src = finalSrc;
                document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
            thumbContainer.appendChild(thumb);
        });

        // Specs
        document.getElementById('modal-volume').textContent = prod.volume;
        document.getElementById('modal-top-diameter').textContent = prod.specs.topDiameter;
        document.getElementById('modal-bottom-diameter').textContent = prod.specs.bottomDiameter;
        document.getElementById('modal-height').textContent = prod.specs.height;
        document.getElementById('modal-box-qty').textContent = prod.specs.boxQty;
        document.getElementById('modal-box-dimensions').textContent = prod.specs.dimensions;

        // WhatsApp
        const waText = this.lang === 'tr' 
            ? `Merhaba, "${title}" ürünü hakkında toptan fiyat ve sipariş bilgisi almak istiyorum.` 
            : `Hello, I would like to get wholesale price and order information about the product "${title}".`;
        
        document.getElementById('modal-whatsapp-btn').href = `https://wa.me/905398292857?text=${encodeURIComponent(waText)}`;

        // Open Modal
        document.getElementById('product-modal').classList.remove('hidden');
    }

    // --- CERTIFICATES ---
    renderCertificates() {
        const grid = document.getElementById('certificates-grid');
        if(!grid) return;
        
        certificates.forEach((cert, i) => {
            const title = this.lang === 'tr' ? cert.titleTr : cert.titleEn;
            const card = document.createElement('div');
            card.className = 'cert-card reveal-up';
            card.style.transitionDelay = `${(i % 4) * 0.1}s`;
            card.innerHTML = `
                <img src="${cert.img}" alt="${title}" class="cert-img" loading="lazy" decoding="async">
                <div class="cert-title">${title}</div>
            `;
            grid.appendChild(card);
            this.observer.observe(card);
        });
    }

    // --- BLOGS ---
    renderBlogs() {
        const grid = document.getElementById('blog-grid');
        if(!grid) return;
        grid.innerHTML = '';
        
        // Show top 3 blogs on main page
        blogs.slice(0, 3).forEach((blog, i) => {
            const title = this.lang === 'tr' ? blog.titleTr : blog.titleEn;
            const summary = this.lang === 'tr' ? blog.summaryTr : blog.summaryEn;
            
            const card = document.createElement('div');
            card.className = 'blog-card reveal-up';
            card.style.transitionDelay = `${(i % 3) * 0.1}s`;
            card.innerHTML = `
                <div class="blog-img-wrapper">
                    <img src="${blog.img}" alt="${title}" class="blog-img" loading="lazy" decoding="async">
                </div>
                <div class="blog-meta">${blog.date} | ${blog.author}</div>
                <h3 class="blog-title">${title}</h3>
                <p class="blog-summary">${summary}</p>
                <div class="blog-read-more" style="color: var(--color-accent); font-weight: 600; margin-top: 10px; font-size: 0.85rem;" data-i18n="readMore">Devamını Oku →</div>
            `;
            card.addEventListener('click', () => this.openBlogModal(blog));
            grid.appendChild(card);
            this.observer.observe(card);
        });
    }

    openBlogModal(blog) {
        const modal = document.getElementById('blog-modal');
        if(!modal) return;
        
        const title = this.lang === 'tr' ? blog.titleTr : blog.titleEn;
        const content = this.lang === 'tr' ? blog.contentTr : blog.contentEn;
        
        document.getElementById('blog-modal-img').src = blog.img;
        document.getElementById('blog-modal-title').textContent = title;
        document.getElementById('blog-modal-meta').textContent = `${blog.date} | ${blog.author}`;
        document.getElementById('blog-modal-content').textContent = content;
        
        modal.classList.remove('hidden');
    }

    // --- ADMIN ---
    openAdminModal() {
        document.getElementById('admin-modal').classList.remove('hidden');
    }

    saveCategory() {
        const id = document.getElementById('cat-id').value;
        const nameTr = document.getElementById('cat-tr').value;
        const nameEn = document.getElementById('cat-en').value;

        if (id && nameTr && nameEn) {
            this.categories.push({ id, nameTr, nameEn });
            localStorage.setItem('kraften_categories_corp', JSON.stringify(this.categories));
            alert('Kategori eklendi!');
            this.renderCategories();
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    }

    saveProduct() {
        const id = document.getElementById('prod-id').value;
        const titleTr = document.getElementById('prod-title-tr').value;
        const titleEn = document.getElementById('prod-title-en').value;
        const category = document.getElementById('prod-category').value;
        const volume = document.getElementById('prod-volume').value;
        const imgMain = document.getElementById('prod-img').value;

        if (id && titleTr && titleEn && category && imgMain) {
            this.products.push({
                id, titleTr, titleEn, category, volume, imgMain,
                descTr: "Yeni eklenen ürün.",
                descEn: "Newly added product.",
                specs: {
                    topDiameter: "-", bottomDiameter: "-", height: "-", boxQty: "-", dimensions: "-"
                }
            });
            localStorage.setItem('kraften_products_corp', JSON.stringify(this.products));
            alert('Ürün eklendi!');
            this.renderProducts();
        } else {
            alert('Lütfen zorunlu alanları doldurun.');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new CorporateApp();
});
