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
let currentLang = localStorage.getItem('language') || 'uk';
const langSwitch = document.getElementById('langSwitch');

function updateLanguage() {
    document.querySelectorAll('[data-en][data-uk]').forEach(element => {
        element.textContent = currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-uk');
    });
    lucide.createIcons();
}

langSwitch.addEventListener('click', () => {
    currentLang = currentLang === 'uk' ? 'en' : 'uk';
    localStorage.setItem('language', currentLang);
    langSwitch.textContent = currentLang === 'uk' ? 'EN' : 'УК';
    updateLanguage();
});

langSwitch.textContent = currentLang === 'uk' ? 'EN' : 'УК';

// ===== MODAL FUNCTIONALITY =====
const storyModal = document.getElementById('storyModal');
const storyFormModal = document.getElementById('storyFormModal');
const trackFormModal = document.getElementById('trackFormModal');
const imageFormModal = document.getElementById('imageFormModal');
const modalClose = document.getElementById('modalClose');

// Close buttons
document.getElementById('formClose1').addEventListener('click', () => storyFormModal.classList.remove('active'));
document.getElementById('formClose2').addEventListener('click', () => trackFormModal.classList.remove('active'));
document.getElementById('formClose3').addEventListener('click', () => imageFormModal.classList.remove('active'));
modalClose.addEventListener('click', () => storyModal.classList.remove('active'));

// Close on background click
storyModal.addEventListener('click', (e) => {
    if (e.target === storyModal) storyModal.classList.remove('active');
});
storyFormModal.addEventListener('click', (e) => {
    if (e.target === storyFormModal) storyFormModal.classList.remove('active');
});
trackFormModal.addEventListener('click', (e) => {
    if (e.target === trackFormModal) trackFormModal.classList.remove('active');
});
imageFormModal.addEventListener('click', (e) => {
    if (e.target === imageFormModal) imageFormModal.classList.remove('active');
});

// ===== DATA MANAGEMENT =====
let stories = JSON.parse(localStorage.getItem('stories')) || [];
let tracks = JSON.parse(localStorage.getItem('tracks')) || [];
let images = JSON.parse(localStorage.getItem('images')) || [];

function saveStories() {
    localStorage.setItem('stories', JSON.stringify(stories));
    renderStories();
}

function saveTracks() {
    localStorage.setItem('tracks', JSON.stringify(tracks));
    renderTracks();
}

function saveImages() {
    localStorage.setItem('images', JSON.stringify(images));
    renderGallery();
}

// ===== STORY FUNCTIONS =====
function openStoryForm() {
    storyFormModal.classList.add('active');
}

document.getElementById('storyForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const story = {
        id: Date.now(),
        title: document.getElementById('storyTitle').value,
        text: document.getElementById('storyText').value,
        image: document.getElementById('storyImage').value || 'https://placehold.co/400x300/1a1a1a/c9a84c?text=Story'
    };
    stories.push(story);
    saveStories();
    document.getElementById('storyForm').reset();
    storyFormModal.classList.remove('active');
});

function renderStories() {
    const grid = document.getElementById('storiesGrid');
    if (stories.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;"><div class="empty-state-icon">📖</div><p>' + (currentLang === 'en' ? 'Stories coming soon' : 'Історії скоро будуть додані') + '</p></div>';
        return;
    }
    grid.innerHTML = stories.map(story => `
        <div class="story-card">
            <div class="story-cover">
                <img src="${story.image}" alt="${story.title}">
            </div>
            <div class="story-content">
                <h3 class="story-title">${story.title}</h3>
                <p class="story-excerpt">${story.text.substring(0, 150)}...</p>
                <div class="story-actions">
                    <button class="read-btn" onclick="readStory(${story.id})">${currentLang === 'en' ? 'Read' : 'Читати'}</button>
                    <button class="edit-btn" onclick="editStory(${story.id})">${currentLang === 'en' ? 'Edit' : 'Редаг.'}</button>
                    <button class="delete-btn" onclick="deleteStory(${story.id})">${currentLang === 'en' ? 'Delete' : 'Видал.'}</button>
                </div>
            </div>
        </div>
    `).join('');
}

function readStory(id) {
    const story = stories.find(s => s.id === id);
    if (story) {
        document.getElementById('modalTitle').textContent = story.title;
        document.getElementById('modalText').textContent = story.text;
        storyModal.classList.add('active');
    }
}

function editStory(id) {
    const story = stories.find(s => s.id === id);
    if (story) {
        document.getElementById('storyTitle').value = story.title;
        document.getElementById('storyText').value = story.text;
        document.getElementById('storyImage').value = story.image;
        deleteStory(id);
        storyFormModal.classList.add('active');
    }
}

function deleteStory(id) {
    stories = stories.filter(s => s.id !== id);
    saveStories();
}

// ===== TRACK FUNCTIONS =====
function openTrackForm() {
    trackFormModal.classList.add('active');
}

document.getElementById('trackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const track = {
        id: Date.now(),
        title: document.getElementById('trackTitle').value,
        artist: document.getElementById('trackArtist').value,
        url: document.getElementById('trackUrl').value,
        cover: document.getElementById('trackCover').value || 'https://placehold.co/300x300/1a1a1a/c9a84c?text=Track'
    };
    tracks.push(track);
    saveTracks();
    document.getElementById('trackForm').reset();
    trackFormModal.classList.remove('active');
});

function renderTracks() {
    const container = document.getElementById('musicContainer');
    if (tracks.length === 0) {
        container.innerHTML = '<div class="music-empty" style="width: 100%; grid-column: 1 / -1;"><p>🎵 ' + (currentLang === 'en' ? 'Music coming soon' : 'Музичні композиції скоро будуть додані') + '</p></div>';
        return;
    }
    container.innerHTML = tracks.map(track => `
        <div class="track-card">
            <div class="track-cover">
                <img src="${track.cover}" alt="${track.title}">
            </div>
            <h3 class="track-title">${track.title}</h3>
            <p class="track-artist">${track.artist}</p>
            <div class="custom-player">
                <button class="play-btn" onclick="playTrack('${track.url}')">
                    <i data-lucide="play"></i>
                </button>
                <div class="progress-container">
                    <div class="progress-bar"></div>
                </div>
            </div>
            <a href="${track.url}" class="track-link" target="_blank">${currentLang === 'en' ? 'Listen on platform' : 'Слухати'}</a>
            <div class="track-actions">
                <button class="track-delete-btn" onclick="deleteTrack(${track.id})">${currentLang === 'en' ? 'Delete' : 'Видалити'}</button>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

function deleteTrack(id) {
    tracks = tracks.filter(t => t.id !== id);
    saveTracks();
}

function playTrack(url) {
    window.open(url, '_blank');
}

// ===== IMAGE FUNCTIONS =====
function openImageForm() {
    imageFormModal.classList.add('active');
}

document.getElementById('imageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const image = {
        id: Date.now(),
        url: document.getElementById('imageUrl').value,
        category: document.getElementById('imageCategory').value
    };
    images.push(image);
    saveImages();
    document.getElementById('imageForm').reset();
    imageFormModal.classList.remove('active');
});

function renderGallery() {
    const grid = document.getElementById('galleryGrid');
    if (images.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;"><div class="empty-state-icon">🖼️</div><p>' + (currentLang === 'en' ? 'Gallery coming soon' : 'Галерея скоро буде заповнена') + '</p></div>';
        return;
    }
    grid.innerHTML = images.map(image => `
        <div class="gallery-item" data-category="${image.category}">
            <img src="${image.url}" alt="Gallery item">
            <div class="gallery-item-actions">
                <button class="gallery-delete-btn" onclick="deleteImage(${image.id})">${currentLang === 'en' ? 'Delete' : 'Видалити'}</button>
            </div>
        </div>
    `).join('');
}

function deleteImage(id) {
    images = images.filter(img => img.id !== id);
    saveImages();
}

// ===== GALLERY FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===== FONT SIZE CONTROLS =====
let currentFontSize = 1.1;
document.getElementById('fontSmaller').addEventListener('click', () => {
    if (currentFontSize > 0.8) {
        currentFontSize -= 0.1;
        document.getElementById('modalText').style.fontSize = currentFontSize + 'rem';
    }
});

document.getElementById('fontLarger').addEventListener('click', () => {
    if (currentFontSize < 1.5) {
        currentFontSize += 0.1;
        document.getElementById('modalText').style.fontSize = currentFontSize + 'rem';
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

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== INITIAL RENDER =====
renderStories();
renderTracks();
renderGallery();
updateLanguage();

console.log('Portfolio website loaded successfully!');