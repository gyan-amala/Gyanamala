/**
 * GYAN AMALA - THE DIGITAL ORACLE
 * Main Interaction Script
 * * Features:
 * 1. Intersection Observer for Scroll Animations
 * 2. 3D Holographic Tilt Effect for Glass Cards
 * 3. Mouse Parallax for Background Depth
 * 4. Dynamic Date Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all core systems
    initScrollAnimations();
    initHolographicTilt();
    initParallaxBackground();
    setCopyrightYear();
    consoleWelcomeMessage();

});

/**
 * 1. SCROLL ANIMATIONS
 * Uses IntersectionObserver to trigger 'visible' class when sections enter viewport.
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null, // Use the viewport
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all sections that need to fade in
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * 2. 3D HOLOGRAPHIC TILT EFFECT
 * Applies a subtle 3D transform to glass cards based on mouse position.
 * This simulates the "VisionOS" volumetric feel.
 */
function initHolographicTilt() {
    const cards = document.querySelectorAll('.glass-card, .visual-block, .ux-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation values (range: -5deg to 5deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -3; // Invert Y for correct tilt
            const rotateY = ((x - centerX) / centerX) * 3;

            // Apply style
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add a dynamic glare effect using radial gradient
            card.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px, 
                    rgba(255, 255, 255, 0.08), 
                    rgba(255, 255, 255, 0.03) 40%
                )
            `;
        });

        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.background = 'var(--glass-bg)'; // Reset to CSS variable
        });
    });
}

/**
 * 3. PARALLAX BACKGROUND
 * Moves the background particles slightly opposite to mouse movement
 * to create a feeling of vast depth (The Probability Cloud).
 */
function initParallaxBackground() {
    const particles = document.getElementById('particles');
    const glow = document.querySelector('.background-glow');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        // Move particles slightly (opposite direction)
        const moveX = -(mouseX * 20); 
        const moveY = -(mouseY * 20);

        // Move the glow more slowly (deep background)
        const glowX = -(mouseX * 50);
        const glowY = -(mouseY * 50);

        if (particles) {
            particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        if (glow) {
            // Keep the glow centered horizontally but shift it slightly
            glow.style.transform = `translate(calc(-50% + ${glowX}px), ${glowY}px)`;
        }
    });
}

/**
 * 4. UTILITIES
 */
function setCopyrightYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function consoleWelcomeMessage() {
    console.log(
        "%c GYAN AMALA %c \nSYSTEM ONLINE: Local-First Intelligence Active.",
        "color: #00ffd5; background: #02040a; font-size: 24px; font-weight: bold; padding: 10px;",
        "color: #b3b3b3; background: #02040a; font-size: 12px; padding: 5px;"
    );
    console.log("Privacy Protocol: SECURE. No data sent to cloud.");
}
