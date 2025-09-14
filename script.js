// ===========================================
// GLOBAL VARIABLES & INITIALIZATION
// ===========================================

const isMobile = window.innerWidth <= 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    if (!isMobile) initCustomCursor();
    initLoadingScreen();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initSkillBars();
    initStats();
    initProjectCards();
    initContactForm();
    initParticleSystem();
    initTypingEffect();
    initTiltEffect();
    initSmoothScrolling();
    
    console.log('🚀 Portfolio initialized successfully!');
}

// ===========================================
// CUSTOM CURSOR
// ===========================================

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        dotX += (mouseX - dotX) * 0.15;
        dotY += (mouseY - dotY) * 0.15;

        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        cursorDot.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
}

// ===========================================
// LOADING SCREEN
// ===========================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500); // Show loading for at least 1.5s
    });
}

// ===========================================
// NAVIGATION
// ===========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink?.classList.add('active');
            }
        });
    });
}

// ===========================================
// HERO ANIMATIONS
// ===========================================

function initHeroAnimations() {
    // Animate hero particles
    const particles = document.querySelectorAll('.hero-particle');
    
    particles.forEach((particle, index) => {
        particle.style.animationDelay = `${index * 2}s`;
    });

    // Animate floating icons
    const icons = document.querySelectorAll('.icon-item');
    
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index}s`;
    });
}

// ===========================================
// TYPING EFFECT
// ===========================================

function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const phrases = [
        'Frontend Developer',
        'UI/UX Enthusiast',
        'Creative Coder',
        'Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next phrase
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Fade in observer
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Text reveal observer
    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    document.querySelectorAll('.slide-left').forEach(el => fadeObserver.observe(el));
    document.querySelectorAll('.slide-right').forEach(el => fadeObserver.observe(el));
    document.querySelectorAll('.reveal-text').forEach(el => textObserver.observe(el));

    // Staggered animation for multiple elements
    const staggerElements = document.querySelectorAll('.skill-card, .project-card');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    staggerElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        staggerObserver.observe(el);
    });
}

// ===========================================
// SKILL PROGRESS BARS
// ===========================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = `${width}%`;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===========================================
// ANIMATED STATISTICS
// ===========================================

function initStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateNumber(entry.target, 0, target, 2000);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOutCubic);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// ===========================================
// PROJECT CARDS
// ===========================================

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

// ===========================================
// TILT EFFECT
// ===========================================

function initTiltEffect() {
    if (isMobile) return;

    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===========================================
// CONTACT FORM
// ===========================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await simulateFormSubmission(data);
            
            // Success
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            // Error
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

function validateForm(data) {
    return data.name && data.email && data.message && isValidEmail(data.email);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function simulateFormSubmission(data) {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 2000);
    });
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ===========================================
// PARTICLE SYSTEM
// ===========================================

function initParticleSystem() {
    if (prefersReducedMotion || isMobile) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 4 + 2;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 10 + 15;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, ${opacity});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: floatUp ${duration}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createParticle, 2000);
}

// ===========================================
// SMOOTH SCROLLING
// ===========================================

function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================================
// PERFORMANCE MONITORING
// ===========================================

function initPerformanceMonitoring() {
    // Monitor FPS
    let lastTime = performance.now();
    let frames = 0;
    let fps = 0;

    function calculateFPS() {
        const now = performance.now();
        frames++;
        
        if (now >= lastTime + 1000) {
            fps = Math.round((frames * 1000) / (now - lastTime));
            frames = 0;
            lastTime = now;
            
            // Reduce animations if FPS is low
            if (fps < 30) {
                document.documentElement.classList.add('reduce-motion');
            } else {
                document.documentElement.classList.remove('reduce-motion');
            }
        }
        
        requestAnimationFrame(calculateFPS);
    }
    
    // Start FPS monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        calculateFPS();
    }
}

// ===========================================
// ADVANCED INTERACTIONS
// ===========================================

function initAdvancedInteractions() {
    // Magnetic button effect
    const magneticElements = document.querySelectorAll('.btn, .project-link');
    
    magneticElements.forEach(el => {
        if (isMobile) return;
        
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // Parallax scrolling effect
    initParallaxScrolling();
    
    // Dynamic background colors
    initDynamicBackgrounds();
    
    // Code animation in about section
    initCodeAnimation();
    
    // 3D card hover effects
    init3DCardEffects();
}

function initParallaxScrolling() {
    if (prefersReducedMotion) return;
    
    const parallaxElements = document.querySelectorAll('.hero-particle, .floating-icons');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${rate}px)`;
        });
    });
}

function initDynamicBackgrounds() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                document.body.className = `section-${sectionId}`;
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => sectionObserver.observe(section));
}

function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    
    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                codeLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.5 });
    
    // Initially hide code lines
    codeLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        line.style.transition = 'all 0.5s ease';
    });
    
    const codePreview = document.querySelector('.code-preview');
    if (codePreview) {
        codeObserver.observe(codePreview);
    }
}

function init3DCardEffects() {
    if (isMobile) return;
    
    const cards = document.querySelectorAll('.skill-card, .contact-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (x - centerX) / centerX * 5;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// ===========================================
// THEME SYSTEM
// ===========================================

// function initThemeSystem() {
//     const themeToggle = document.createElement('button');
//     themeToggle.className = 'theme-toggle';
//     themeToggle.innerHTML = '🌙';
//     themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
//     themeToggle.style.cssText = `
//         position: fixed;
//         top: 50%;
//         right: 20px;
//         width: 50px;
//         height: 50px;
//         border-radius: 50%;
//         background: var(--gradient-primary);
//         border: none;
//         color: white;
//         font-size: 1.2rem;
//         cursor: pointer;
//         z-index: 1000;
//         transform: translateY(-50%);
//         transition: all 0.3s ease;
//         box-shadow: var(--shadow-lg);
//     `;
    
//     document.body.appendChild(themeToggle);
    
//     // Check for saved theme preference
//     const savedTheme = localStorage.getItem('theme') || 
//                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
//     document.documentElement.setAttribute('data-theme', savedTheme);
//     updateThemeIcon(savedTheme);
    
//     themeToggle.addEventListener('click', () => {
//         const currentTheme = document.documentElement.getAttribute('data-theme');
//         const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
//         document.documentElement.setAttribute('data-theme', newTheme);
//         localStorage.setItem('theme', newTheme);
//         updateThemeIcon(newTheme);
        
//         // Animate theme change
//         document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
//         setTimeout(() => {
//             document.body.style.transition = '';
//         }, 300);
//     });
    
//     function updateThemeIcon(theme) {
//         themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
//     }
// }

// ===========================================
// ACCESSIBILITY FEATURES
// ===========================================

function initAccessibilityFeatures() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.prepend(skipLink);
    
    // Add main content ID
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
    
    // Focus management for mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('active');
        if (isOpen) {
            navMenu.querySelector('a').focus();
        }
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            hamburger.focus();
        }
    });
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    `;
    
    document.body.appendChild(announcer);
    
    // Announce section changes
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    announcer.textContent = `Now viewing: ${sectionTitle.textContent}`;
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.observe(section);
    });
}

// ===========================================
// ERROR HANDLING & DEBUGGING
// ===========================================

function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        
        // Show user-friendly error message in development
        if (window.location.hostname === 'localhost') {
            showNotification(`Error: ${event.error.message}`, 'error');
        }
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        event.preventDefault();
    });
    
    // Console welcome message
    console.log(`
    🎉 Welcome to K.Shanmukha Sai's Portfolio!
    
    Built with:
    • HTML5 (Semantic markup)
    • CSS3 (Advanced animations & layouts)
    • Vanilla JavaScript (Performance optimized)
    
    Features:
    • Responsive design
    • Accessibility compliant
    • Performance optimized
    • Modern animations
    • Custom cursor effects
    • Smooth scrolling
    • Form validation
    • Theme switching
    
    Contact: shanmukhasai.dev@gmail.com
    `);
}

// ===========================================
// EASTER EGGS & FUN FEATURES
// ===========================================

function initEasterEggs() {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activatePartyMode();
        }
    });
    
    // Click counter easter egg
    let clickCount = 0;
    const logo = document.querySelector('.nav-logo');
    
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 7) {
            showSecretMessage();
            clickCount = 0;
        }
    });
}

function activatePartyMode() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    showNotification('🎉 Party mode activated! 🎉', 'success');
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);
}

function showSecretMessage() {
    const messages = [
        "You found the secret! 🕵️‍♂️",
        "Curiosity is a developer's best friend! 🔍",
        "You're persistent, I like that! 💪",
        "Hidden features are the best features! ✨",
        "You've unlocked developer mode! 🚀"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'success');
}

// ===========================================
// LAZY LOADING & PERFORMANCE
// ===========================================

function initLazyLoading() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    preloadCriticalResources();
}

function preloadCriticalResources() {
    // Preload fonts
    const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap',
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap'
    ];
    
    fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// ===========================================
// INITIALIZE ALL FEATURES
// ===========================================

// Add advanced features to initialization
function initializeApp() {
    // Core features
    if (!isMobile) initCustomCursor();
    initLoadingScreen();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initSkillBars();
    initStats();
    initProjectCards();
    initContactForm();
    initParticleSystem();
    initTypingEffect();
    initTiltEffect();
    initSmoothScrolling();
    
    // Advanced features
    initAdvancedInteractions();
    initThemeSystem();
    initAccessibilityFeatures();
    initErrorHandling();
    initEasterEggs();
    initLazyLoading();
    initPerformanceMonitoring();
    
    console.log('🚀 Portfolio initialized with all advanced features!');
    
    // Mark as loaded for analytics
    window.dispatchEvent(new CustomEvent('portfolioLoaded', {
        detail: { timestamp: Date.now() }
    }));
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Get random number between min and max
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Export functions for testing (if in development)
if (window.location.hostname === 'localhost') {
    window.portfolioUtils = {
        debounce,
        throttle,
        isInViewport,
        formatNumber,
        getRandomNumber,
        showNotification
    };
}