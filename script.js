// ===== LUCIDE ICONS ===== 
if (window.lucide) {
    lucide.createIcons();
}

// ===== PRELOADER ===== 
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
if (currentTheme === 'light') {
    htmlElement.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== LANGUAGE SWITCH =====
const langSwitch = document.getElementById('langSwitch');
let currentLang = localStorage.getItem('language') || 'uk';

const translations = {
    uk: {
        'about': 'Про мене',
        'stories': 'Історії',
        'music': 'Музика',
        'gallery': 'Галерея',
        'contact': 'Контакти',
        'discover': 'ДІЗНАТИСЯ БІЛЬШЕ',
        'subtitle': 'ІСТОРІЇ • ЗВУКИ • ОБРАЗИ',
        'email': '✉️ Email',
        'twitter': '𝕏 Twitter',
        'instagram': '📷 Instagram',
        'linkedin': '💼 LinkedIn'
    },
    en: {
        'about': 'About',
        'stories': 'Stories',
        'music': 'Music',
        'gallery': 'Gallery',
        'contact': 'Contact',
        'discover': 'DISCOVER MORE',
        'subtitle': 'STORIES • SOUNDS • VISIONS',
        'email': '✉️ Email',
        'twitter': '𝕏 Twitter',
        'instagram': '📷 Instagram',
        'linkedin': '💼 LinkedIn'
    }
};

langSwitch.textContent = currentLang === 'uk' ? 'EN' : 'UK';

langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'uk' ? 'en' : 'uk';
    localStorage.setItem('language', currentLang);
    langSwitch.textContent = currentLang === 'uk' ? 'EN' : 'UK';
    updateLanguage();
});

function updateLanguage() {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// ===== MODAL FUNCTIONALITY =====
const modal = document.getElementById('storyModal');
const modalClose = document.getElementById('modalClose');
const fontSmaller = document.getElementById('fontSmaller');
const fontLarger = document.getElementById('fontLarger');
const modalText = document.getElementById('modalText');
let currentFontSize = 1.1;

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

fontSmaller.addEventListener('click', () => {
    if (currentFontSize > 0.8) {
        currentFontSize -= 0.1;
        modalText.style.fontSize = currentFontSize + 'rem';
    }
});

fontLarger.addEventListener('click', () => {
    if (currentFontSize < 1.5) {
        currentFontSize += 0.1;
        modalText.style.fontSize = currentFontSize + 'rem';
    }
});

// ===== HERO GEOMETRY ANIMATION =====
function createGeometryLines() {
    const heroGeometry = document.getElementById('heroGeometry');
    for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'geo-line';
        line.style.top = Math.random() * 100 + '%';
        line.style.animation = `slideIn ${3 + i}s ease-in-out infinite`;
        heroGeometry.appendChild(line);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
createGeometryLines();

// ===== SCROLL TO SECTION SMOOTH =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== GALLERY FILTER FUNCTIONALITY =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryGrid = document.getElementById('galleryGrid');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        // Gallery filtering logic can be added here
    });
});

// ===== INITIALIZE =====
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    const text = link.textContent;
    link.setAttribute('data-lang', text.toLowerCase().replace(/[^a-z]/g, ''));
});

console.log('Portfolio website loaded successfully!');