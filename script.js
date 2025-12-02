// ===================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ===================================

let currentLang = 'fr'; // Default language

// Translation data structure
const translations = {
    // All bilingual content is already embedded in HTML with data-fr and data-en attributes
};

// Initialize language toggle
document.addEventListener('DOMContentLoaded', function() {
    initLanguageToggle();
    initSmoothScroll();
    initNavHighlight();
    initScrollAnimations();
    initCardHoverEffects();
});

function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-fr and data-en attributes
    const elements = document.querySelectorAll('[data-fr][data-en]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Check if element is an input or has special handling
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Special handling for experience lists (bullets)
    updateExperienceLists(lang);
}

function updateExperienceLists(lang) {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    experienceCards.forEach(card => {
        const list = card.querySelector('.experience-list');
        if (list) {
            const items = list.querySelectorAll('li');
            items.forEach(item => {
                const text = item.getAttribute(`data-${lang}`);
                if (text) {
                    item.textContent = text;
                }
            });
        }
    });
}

// ===================================
// SMOOTH SCROLL NAVIGATION
// ===================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// NAVIGATION HIGHLIGHT ON SCROLL
// ===================================

function initNavHighlight() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Add shadow to navbar on scroll
        const navbar = document.getElementById('navbar');
        if (window.pageYOffset > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and elements
    const animatedElements = document.querySelectorAll('.card-3d, .timeline-item, .reason-card, .roadmap-step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===================================
// 3D CARD HOVER EFFECTS
// ===================================

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// ===================================
// AVATAR INTERACTION
// ===================================

const avatarCircle = document.querySelector('.avatar-circle');
if (avatarCircle) {
    let mouseX = 0;
    let mouseY = 0;
    let avatarX = 0;
    let avatarY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });
    
    function animateAvatar() {
        avatarX += (mouseX * 20 - avatarX) * 0.05;
        avatarY += (mouseY * 20 - avatarY) * 0.05;
        
        if (avatarCircle) {
            avatarCircle.style.transform = `translate(${avatarX}px, ${avatarY}px)`;
        }
        
        requestAnimationFrame(animateAvatar);
    }
    
    animateAvatar();
}

// ===================================
// DYNAMIC BLOB ANIMATION
// ===================================

function animateBlobs() {
    const blobs = document.querySelectorAll('.blob, .capgemini-blob, .pfe-blob');
    
    blobs.forEach((blob, index) => {
        const speed = 20000 + index * 5000;
        const range = 50 + index * 20;
        
        setInterval(() => {
            const randomX = Math.random() * range - range / 2;
            const randomY = Math.random() * range - range / 2;
            
            blob.style.transition = `transform ${speed}ms ease-in-out`;
            blob.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, speed);
    });
}

animateBlobs();

// ===================================
// PARALLAX EFFECT ON SCROLL
// ===================================

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero blobs
    const heroBlobs = document.querySelectorAll('.hero-background .blob');
    heroBlobs.forEach((blob, index) => {
        const speed = 0.3 + index * 0.1;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// TYPING EFFECT FOR TAGLINE (Optional)
// ===================================

function initTypingEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;
    
    const originalText = tagline.getAttribute('data-fr');
    const originalTextEn = tagline.getAttribute('data-en');
    
    // This can be enhanced to create a typing animation
    // For now, we keep the static text for performance
}

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================

function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// PROGRESS BAR (Optional)
// ===================================

function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(90deg, #0070AD, #12ABDB);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

initProgressBar();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images (if any added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// CONSOLE SIGNATURE
// ===================================

console.log('%c Designed for Capgemini Engineering PFE ', 'background: linear-gradient(135deg, #0070AD, #12ABDB); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Ala HSOUNA - Software & AI Engineer ', 'color: #0070AD; font-size: 14px; font-weight: bold;');
console.log('%c Contact: ala.hassouna.tn@gmail.com ', 'color: #5A6C7D; font-size: 12px;');

// ===================================
// PRESENTATION MODE
// ===================================

let currentSlide = 0;
const slides = ['about', 'capgemini', 'pfe'];

function initPresentationMode() {
    const presentationBtn = document.getElementById('presentationBtn');
    const exitBtn = document.getElementById('exitPresentation');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (presentationBtn) {
        presentationBtn.addEventListener('click', enterPresentationMode);
    }
    
    if (exitBtn) {
        exitBtn.addEventListener('click', exitPresentationMode);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateSlide(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateSlide(1));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!document.body.classList.contains('presentation-mode')) return;
        
        const activeSection = document.querySelector('.section.active-slide');
        
        // Check if we're at the bottom of the current slide
        const isAtBottom = activeSection && 
            activeSection.scrollHeight - activeSection.scrollTop <= activeSection.clientHeight + 50;
        const isAtTop = activeSection && activeSection.scrollTop <= 10;
        
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            navigateSlide(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            navigateSlide(-1);
        } else if (e.key === ' ') {
            // Space bar: scroll down or go to next slide
            e.preventDefault();
            if (isAtBottom) {
                navigateSlide(1);
            } else if (activeSection) {
                activeSection.scrollBy({ top: activeSection.clientHeight * 0.8, behavior: 'smooth' });
            }
        } else if (e.key === 'PageDown') {
            e.preventDefault();
            if (isAtBottom) {
                navigateSlide(1);
            } else if (activeSection) {
                activeSection.scrollBy({ top: activeSection.clientHeight * 0.9, behavior: 'smooth' });
            }
        } else if (e.key === 'PageUp') {
            e.preventDefault();
            if (isAtTop) {
                navigateSlide(-1);
            } else if (activeSection) {
                activeSection.scrollBy({ top: -activeSection.clientHeight * 0.9, behavior: 'smooth' });
            }
        } else if (e.key === 'ArrowDown') {
            // Allow natural scrolling with arrow down
            if (isAtBottom) {
                e.preventDefault();
                navigateSlide(1);
            }
        } else if (e.key === 'ArrowUp') {
            // Allow natural scrolling with arrow up
            if (isAtTop) {
                e.preventDefault();
                navigateSlide(-1);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            exitPresentationMode();
        } else if (e.key === 'Home') {
            e.preventDefault();
            if (activeSection && activeSection.scrollTop > 0) {
                activeSection.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                goToSlide(0);
            }
        } else if (e.key === 'End') {
            e.preventDefault();
            if (activeSection && !isAtBottom) {
                activeSection.scrollTo({ top: activeSection.scrollHeight, behavior: 'smooth' });
            } else {
                goToSlide(slides.length - 1);
            }
        }
    });
}

function enterPresentationMode() {
    document.body.classList.add('presentation-mode');
    currentSlide = 0;
    updateSlides();
    
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
}

function exitPresentationMode() {
    document.body.classList.remove('presentation-mode');
    
    // Exit fullscreen
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    
    // Reset all sections
    slides.forEach(slideId => {
        const section = document.getElementById(slideId);
        if (section) {
            section.classList.remove('active-slide', 'prev-slide');
        }
    });
}

function navigateSlide(direction) {
    const newSlide = currentSlide + direction;
    if (newSlide >= 0 && newSlide < slides.length) {
        currentSlide = newSlide;
        updateSlides();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentSlide = index;
        updateSlides();
    }
}

function updateSlides() {
    // Remove all active/prev classes
    slides.forEach(slideId => {
        const section = document.getElementById(slideId);
        if (section) {
            section.classList.remove('active-slide', 'prev-slide');
            // Reset scroll position
            section.scrollTop = 0;
        }
    });
    
    // Set current slide as active
    const currentSection = document.getElementById(slides[currentSlide]);
    if (currentSection) {
        currentSection.classList.add('active-slide');
        currentSection.classList.add('slide-transition-fade');
        
        // Ensure scroll is at top
        currentSection.scrollTop = 0;
        
        // Monitor scroll for indicator visibility
        monitorScroll(currentSection);
        
        setTimeout(() => {
            currentSection.classList.remove('slide-transition-fade');
        }, 800);
    }
    
    // Update slide indicator
    const currentSlideEl = document.querySelector('.current-slide');
    const totalSlidesEl = document.querySelector('.total-slides');
    
    if (currentSlideEl) {
        currentSlideEl.textContent = currentSlide + 1;
    }
    if (totalSlidesEl) {
        totalSlidesEl.textContent = slides.length;
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = currentSlide === slides.length - 1;
    }
    
    // Update progress bar
    const progress = ((currentSlide + 1) / slides.length) * 100;
    document.body.style.setProperty('--presentation-progress', progress + '%');
    
    // Add CSS variable for progress bar
    const style = document.createElement('style');
    style.textContent = `
        body.presentation-mode::before {
            width: ${progress}%;
        }
    `;
    
    // Remove old progress style
    const oldStyle = document.getElementById('progress-style');
    if (oldStyle) {
        oldStyle.remove();
    }
    style.id = 'progress-style';
    document.head.appendChild(style);
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (!document.body.classList.contains('presentation-mode')) return;
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    if (!document.body.classList.contains('presentation-mode')) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            navigateSlide(1);
        } else {
            // Swipe right - previous slide
            navigateSlide(-1);
        }
    }
}

// Monitor scroll to show/hide scroll indicator
function monitorScroll(section) {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    function checkScroll() {
        if (!document.body.classList.contains('presentation-mode')) return;
        
        const isAtBottom = section.scrollHeight - section.scrollTop <= section.clientHeight + 50;
        
        if (isAtBottom) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
    
    section.addEventListener('scroll', checkScroll);
    checkScroll();
    
    // Add click to scroll down
    scrollIndicator.onclick = function() {
        section.scrollBy({ top: section.clientHeight * 0.8, behavior: 'smooth' });
    };
}

// Mouse wheel navigation disabled - user must use buttons or keyboard
// Navigation only via arrow buttons, keyboard arrows, or manual controls

// Initialize presentation mode
initPresentationMode();

// ===================================
// EXPORT FUNCTIONS (if needed)
// ===================================

window.switchLanguage = switchLanguage;
