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

    bindEvents() {
        // Language Toggle
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                this.lang = this.lang === 'tr' ? 'en' : 'tr';
                langBtn.textContent = this.lang === 'tr' ? 'EN' : 'TR';
                this.applyTranslations();
                this.renderArticles();
            });
        }

        // Category Filter
        document.querySelectorAll('#blog-categories .filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('#blog-categories .filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.cat;
                this.renderArticles();
            });
        });

        // Search Input
        const searchInput = document.getElementById('blog-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.renderArticles();
            });
        }

        // Modal Close
        const closeBtn = document.getElementById('close-blog-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.getElementById('blog-modal').classList.add('hidden');
            });
        }
        
        const modalOverlay = document.getElementById('blog-modal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    modalOverlay.classList.add('hidden');
                }
            });
        }
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
                    <img src="${blog.img}" alt="${title}" class="blog-img">
                </div>
                <div class="blog-meta">${blog.date} | ${blog.author}</div>
                <h3 class="blog-title">${title}</h3>
                <p class="blog-summary">${summary}</p>
                <div class="blog-read-more" style="color: var(--color-accent); font-weight: 600; margin-top: 12px; font-size: 0.9rem;">${this.lang === 'tr' ? 'Devamını Oku →' : 'Read More →'}</div>
            `;
            card.addEventListener('click', () => this.openBlogModal(blog));
            grid.appendChild(card);
        });
    }

    openBlogModal(blog) {
        const modal = document.getElementById('blog-modal');
        if (!modal) return;

        const title = this.lang === 'tr' ? blog.titleTr : blog.titleEn;
        const content = this.lang === 'tr' ? blog.contentTr : blog.contentEn;

        document.getElementById('blog-modal-img').src = blog.img;
        document.getElementById('blog-modal-title').textContent = title;
        document.getElementById('blog-modal-meta').textContent = `${blog.date} | ${blog.author}`;
        
        const badgeBox = `\n\n<div style="margin-top: 30px; padding: 20px; background: #F9FAFB; border-radius: 8px; border: 1px solid #E5E7EB; text-align: center;">\n  <p style="font-size: 0.95rem; color: var(--color-primary); font-weight: 600; margin-bottom: 12px;">Google Aramalarında & AI Yanıtlarında Kraften Ambalaj Makalelerini Öne Çıkarın:</p>\n  <a class="ksr-dugme" href="https://www.google.com/preferences/source?q=kraftenambalaj.com" target="_blank" rel="noopener"><span class="ksr-yildiz"></span><span class="ksr-degis"><span class="ksr-durgun">Google'da Tercih Edilen Kaynak ekle</span><span class="ksr-ustte">Daha fazlası için kraftenambalaj.com</span></span><span class="ksr-guven"><span class="ksr-g"></span></span></a>\n</div>`;
        
        document.getElementById('blog-modal-content').innerHTML = content.replace(/\n/g, '<br>') + badgeBox;

        modal.classList.remove('hidden');
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
