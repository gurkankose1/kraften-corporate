import { blogs, translations } from '../data.js';

class BlogPageApp {
    constructor() {
        this.lang = 'tr';
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.initLoader();
        this.initCursor();
        this.bindEvents();
        this.renderArticles();
        this.applyTranslations();
        this.checkDeepLink();
    }

    initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;
        const hideLoader = () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        };
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }
    }

    initCursor() {
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

    checkDeepLink() {
        const params = new URLSearchParams(window.location.search);
        const articleId = params.get('article') || window.location.hash.replace('#', '');
        if (articleId) {
            const blog = blogs.find(b => b.id === articleId || b.id.includes(articleId));
            if (blog) {
                this.openBlogModal(blog, false);
            }
        }
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
                    this.renderArticles();
                });
            });
        }

        document.querySelectorAll('#blog-categories .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#blog-categories .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.cat;
                this.renderArticles();
            });
        });

        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderArticles();
            });
        }

        const closeBtn = document.getElementById('close-blog-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeBlogModal());
        }
        
        const modalOverlay = document.getElementById('blog-modal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeBlogModal();
                }
            });
        }

        window.addEventListener('popstate', () => {
            const params = new URLSearchParams(window.location.search);
            const articleId = params.get('article');
            if (!articleId) {
                this.closeBlogModal(false);
            }
        });
    }

    renderArticles() {
        const grid = document.getElementById('blog-archive-grid');
        if (!grid) return;
        grid.innerHTML = '';

        const filtered = blogs.filter(blog => {
            const matchesCategory = this.currentFilter === 'all' || blog.category === this.currentFilter;
            const title = (this.lang === 'tr' ? blog.titleTr : blog.titleEn).toLowerCase();
            const summary = (this.lang === 'tr' ? blog.summaryTr : blog.summaryEn).toLowerCase();
            const matchesSearch = !this.searchQuery || title.includes(this.searchQuery) || summary.includes(this.searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--color-text-light); padding: 40px;">Aradığınız kriterlere uygun haber bulunamadı.</div>`;
            return;
        }

        filtered.forEach((blog, i) => {
            const title = this.lang === 'tr' ? blog.titleTr : blog.titleEn;
            const summary = this.lang === 'tr' ? blog.summaryTr : blog.summaryEn;

            const card = document.createElement('div');
            card.className = 'blog-card reveal-up active';
            card.style.transitionDelay = `${(i % 3) * 0.1}s`;
            card.innerHTML = `
                <div class="blog-img-wrapper">
                    <img src="${blog.img}" alt="${title}" class="blog-img" loading="lazy" decoding="async">
                </div>
                <div class="blog-meta">${blog.date} | ${blog.author}</div>
                <h3 class="blog-title">${title}</h3>
                <p class="blog-summary">${summary}</p>
                <div class="blog-read-more" style="color: var(--color-accent); font-weight: 600; margin-top: 12px; font-size: 0.9rem;">${this.lang === 'tr' ? 'Devamını Oku →' : 'Read More →'}</div>
            `;
            card.addEventListener('click', () => this.openBlogModal(blog, true));
            grid.appendChild(card);
        });
    }

    openBlogModal(blog, updateHistory = true) {
        const modal = document.getElementById('blog-modal');
        if (!modal) return;

        const title = this.lang === 'tr' ? blog.titleTr : blog.titleEn;
        const content = this.lang === 'tr' ? blog.contentTr : blog.contentEn;
        const shareUrl = `https://www.kraftenambalaj.com/blog.html?article=${blog.id}`;

        if (updateHistory) {
            history.pushState({ articleId: blog.id }, title, `?article=${blog.id}`);
        }

        document.getElementById('blog-modal-img').src = blog.img;
        document.getElementById('blog-modal-title').textContent = title;
        document.getElementById('blog-modal-meta').textContent = `${blog.date} | ${blog.author}`;
        
        const shareBox = `
            <div style="margin-top: 25px; padding: 15px; background: #F3F4F6; border-radius: 8px; display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
                <span style="font-size: 0.9rem; font-weight: 600; color: var(--color-primary);"><i class="fas fa-share-alt" style="color: var(--color-accent); margin-right: 6px;"></i> Makaleyi Paylaş:</span>
                <div style="display: flex; gap: 10px;">
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' - ' + shareUrl)}" target="_blank" rel="noopener nofollow" style="background: #25D366; color: #FFF; padding: 6px 14px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; text-decoration: none;"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                    <button id="btn-copy-share-url" data-url="${shareUrl}" style="background: var(--color-primary); color: #FFF; border: none; padding: 6px 14px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; cursor: pointer;"><i class="fas fa-link"></i> Linki Kopyala</button>
                </div>
            </div>
        `;

        const preferredSourceBadge = `
            <div style="margin-top: 20px; padding: 20px; background: #FFFDFB; border-radius: 8px; border: 1px solid rgba(194, 150, 104, 0.25); text-align: center;">
                <p style="font-size: 0.95rem; color: var(--color-primary); font-weight: 600; margin-bottom: 12px;">Google Aramalarında & AI Yanıtlarında Kraften Ambalaj Makalelerini Öne Çıkarın:</p>
                <a class="ksr-dugme" href="https://www.google.com/preferences/source?q=kraftenambalaj.com" target="_blank" rel="noopener nofollow"><span class="ksr-yildiz"></span><span class="ksr-degis"><span class="ksr-durgun">Google'da Tercih Edilen Kaynak ekle</span><span class="ksr-ustte">Daha fazlası için kraftenambalaj.com</span></span><span class="ksr-guven"><span class="ksr-g"></span></span></a>
            </div>
        `;
        
        document.getElementById('blog-modal-content').innerHTML = content.replace(/\n/g, '<br>') + shareBox + preferredSourceBadge;

        const copyBtn = document.getElementById('btn-copy-share-url');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    copyBtn.innerHTML = `<i class="fas fa-check"></i> Kopyalandı!`;
                    setTimeout(() => {
                        copyBtn.innerHTML = `<i class="fas fa-link"></i> Linki Kopyala`;
                    }, 2000);
                });
            });
        }

        this.injectNewsArticleSchema(blog, shareUrl);
        modal.classList.remove('hidden');
    }

    closeBlogModal(updateHistory = true) {
        const modal = document.getElementById('blog-modal');
        if (modal) modal.classList.add('hidden');
        if (updateHistory) {
            history.pushState({}, '', 'blog.html');
        }
        this.removeNewsArticleSchema();
    }

    injectNewsArticleSchema(blog, shareUrl) {
        this.removeNewsArticleSchema();
        const script = document.createElement('script');
        script.id = 'dynamic-news-article-schema';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": this.lang === 'tr' ? blog.titleTr : blog.titleEn,
            "image": [blog.img],
            "datePublished": "2026-09-02T06:00:00+03:00",
            "dateModified": "2026-09-02T06:00:00+03:00",
            "author": [{
                "@type": "Organization",
                "name": blog.author || "Kraften Ar-Ge",
                "url": "https://www.kraftenambalaj.com"
            }],
            "publisher": {
                "@type": "Organization",
                "name": "Kraften Ambalaj San. ve Tic. A.Ş.",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.kraftenambalaj.com/logo.png"
                }
            },
            "description": this.lang === 'tr' ? blog.summaryTr : blog.summaryEn,
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": shareUrl
            }
        });
        document.head.appendChild(script);
    }

    removeNewsArticleSchema() {
        const existing = document.getElementById('dynamic-news-article-schema');
        if (existing) existing.remove();
    }

    applyTranslations() {
        const dictionary = translations[this.lang];
        if (!dictionary) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (dictionary[key]) {
                if (el.tagName === 'INPUT' && el.type === 'text') {
                    el.placeholder = dictionary[key];
                } else {
                    el.innerHTML = dictionary[key];
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BlogPageApp();
});
