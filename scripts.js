document.addEventListener('DOMContentLoaded', function() {
    // Code tabs functionality
    const tabButtons = document.querySelectorAll('.code-tab-btn');
    const tabPanes = document.querySelectorAll('.code-tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation for skill cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply animations to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });

    // Module interactions for ERP diagram
    const moduleItems = document.querySelectorAll('.module-item');
    
    moduleItems.forEach(item => {
        // Touch device support
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                // Toggle popup visibility on mobile
                const popup = this.querySelector('.module-popup');
                const isVisible = popup.style.opacity === '1';
                
                // Hide all popups first
                document.querySelectorAll('.module-popup').forEach(p => {
                    p.style.opacity = '0';
                    p.style.visibility = 'hidden';
                });
                
                if (!isVisible) {
                    popup.style.opacity = '1';
                    popup.style.visibility = 'visible';
                    popup.style.transform = 'translateX(-50%) scale(1)';
                }
            }
        });
    });
    
    // Close popups when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.module-item') && window.innerWidth <= 768) {
            document.querySelectorAll('.module-popup').forEach(popup => {
                popup.style.opacity = '0';
                popup.style.visibility = 'hidden';
            });
        }
    });
});
