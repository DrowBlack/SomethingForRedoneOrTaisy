document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Slight delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Slider Logic
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event Listeners for Slider
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Auto Slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    startInterval();

    // Glitch Text Scramble Effect on Load
    const glitchText = document.querySelector('.glitch');
    const originalText = glitchText.getAttribute('data-text');
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iterations = 0;

    const interval = setInterval(() => {
        glitchText.innerText = originalText
            .split('')
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += 1 / 3;
    }, 30);

    // Music Toggle Logic
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicIcon = musicBtn.querySelector('.music-icon');
    const musicText = musicBtn.querySelector('.music-text');
    let isPlaying = false;

    // Set default volume
    bgMusic.volume = 0.5;

    // Attempt Autoplay on Load
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay started!
            isPlaying = true;
            musicText.innerText = "PAUSE OST";
            musicIcon.innerText = "music_note";
            musicBtn.style.borderColor = "var(--accent-color)";
        }).catch(error => {
            // Autoplay was prevented.
            console.log("Autoplay prevented by browser policy.");
            isPlaying = false;
        });
    }

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicText.innerText = "PLAY OST";
            musicIcon.innerText = "sound_off"; // Basic text representation
            musicBtn.style.borderColor = "var(--primary-color)";
        } else {
            bgMusic.play().then(() => {
                musicText.innerText = "PAUSE OST";
                musicIcon.innerText = "music_note";
                musicBtn.style.borderColor = "var(--accent-color)";
            }).catch(e => {
                console.log("Audio play failed (user interaction needed): ", e);
            });
        }
        isPlaying = !isPlaying;
    });
});