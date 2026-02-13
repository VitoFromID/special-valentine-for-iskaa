// Variable untuk track berapa kali tombol "Tidak" diklik
let noClickCount = 0;

// Array pesan "pls mau" yang makin desperate
const pleaMessages = [
    "Pls mau 🥺",
    "Pls mau dong 🥺",
    "Pls mau ya 🥺💕",
    "Pls mau dong sayang 🥺❤️",
    "Pls mau please 🥺💖",
    "Ayolah pls mau 🥺✨",
    "Aku mohon pls mau 🥺💝",
    "Pls mau ya sayangku 🥺💗",
    "Jangan gitu dong, pls mau 🥺💘",
    "Ayo dong pls mau 🥺💓"
];

// Create floating hearts
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Calculate days together
function calculateDays() {
    const startDate = new Date('2025-09-20');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Animate counter
function animateCounter(target) {
    const counter = document.getElementById('dayCounter');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 30);
}

// Show counter
function showCounter() {
    document.getElementById('initialContent').style.display = 'none';
    document.getElementById('counterContainer').style.display = 'block';
    const days = calculateDays();
    animateCounter(days);
}

// Move "No" button randomly dan tampilkan pesan
function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const pleaText = document.getElementById('pleaText');
    const container = document.querySelector('.button-container');
    
    // Tampilkan pesan "pls mau" yang semakin desperate
    const messageIndex = Math.min(noClickCount, pleaMessages.length - 1);
    pleaText.textContent = pleaMessages[messageIndex];
    pleaText.style.animation = 'none';
    setTimeout(() => {
        pleaText.style.animation = 'bounce 0.5s ease';
    }, 10);
    
    noClickCount++;
    
    // Set tombol ke absolute positioning setelah klik pertama
    if (noClickCount === 1) {
        noBtn.style.position = 'absolute';
    }
    
    // Ukuran area untuk tombol berpindah
    const containerRect = container.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - buttonRect.width - 20;
    const maxY = containerRect.height - buttonRect.height - 20;
    
    // Generate posisi random
    let randomX = Math.random() * maxX - maxX/2;
    let randomY = Math.random() * maxY - maxY/2;
    
    // Pastikan tidak overlapping dengan tombol Yes
    const yesBtn = document.querySelector('.yes-btn');
    const yesBtnRect = yesBtn.getBoundingClientRect();
    
    // Pindahkan tombol
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Tambah efek scale saat dipindah
    noBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 200);
    
    // Setelah 5x klik, tombol "Tidak" jadi sangat kecil
    if (noClickCount >= 5) {
        noBtn.style.transform = 'scale(0.5)';
        noBtn.textContent = 'Tidak 🥺';
    }
    
    // Setelah 8x klik, tombol "Ya" jadi lebih besar
    if (noClickCount >= 8) {
        yesBtn.style.transform = 'scale(1.3)';
        yesBtn.textContent = 'YA DONG! ❤️❤️';
    }
}

// Initialize saat halaman dimuat
window.addEventListener('load', () => {
    createHearts();
});
        
