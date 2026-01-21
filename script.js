// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
});

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Filter Buttons
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons in the same container
        const container = this.parentElement;
        container.querySelectorAll('.filter-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// Lab Filter Functionality
const labFilters = document.querySelectorAll('.lab-filters .filter-button');
const labCards = document.querySelectorAll('.lab-card');

labFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.textContent.trim();
        
        labCards.forEach(card => {
            if (filterValue === 'All Labs') {
                card.style.display = 'block';
            } else {
                // Simple filtering based on text content (in a real app, this would be more sophisticated)
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(filterValue.toLowerCase()) || filterValue === 'All Labs') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Protocol Filter Functionality
const protocolFilters = document.querySelectorAll('.protocol-filters .filter-button');
const packetCards = document.querySelectorAll('.packet-card');

protocolFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.textContent.trim();
        
        protocolFilters.forEach(btn => btn.classList.remove('active'));
        filter.classList.add('active');
        
        packetCards.forEach(card => {
            if (filterValue === 'All') {
                card.style.display = 'block';
            } else {
                const protocolElement = card.querySelector('.packet-protocol');
                if (protocolElement && protocolElement.textContent === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Search Functionality
const searchInputs = document.querySelectorAll('.search-box input');
searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Simple search implementation
        const cards = document.querySelectorAll('.lab-card, .knowledge-card, .packet-card, .article-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = input.value.trim();
        if (email && email.includes('@')) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.cssText = `
                color: #10b981;
                font-weight: 500;
                margin-top: 1rem;
                padding: 1rem;
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 0.5rem;
                text-align: center;
            `;
            
            form.appendChild(successMessage);
            input.value = '';
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.lab-card, .knowledge-card, .packet-card, .category-card, .pricing-card, .testimonial-card, .discussion-item').forEach(card => {
    observer.observe(card);
});

// Button Click Animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Stats Counter Animation
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                if (!isNaN(finalValue)) {
                    animateValue(stat, 0, finalValue, 2000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stats-bar').forEach(bar => {
    statsObserver.observe(bar);
});

// Tab Functionality (for future use)
function createTabs(tabContainerClass, tabButtonClass, tabPanelClass) {
    const tabButtons = document.querySelectorAll(`.${tabButtonClass}`);
    const tabPanels = document.querySelectorAll(`.${tabPanelClass}`);
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            if (tabPanels[index]) {
                tabPanels[index].classList.add('active');
            }
        });
    });
}

// Initialize any tabs if they exist
createTabs('tab-container', 'tab-button', 'tab-panel');

// Modal Functionality (for future use)
function createModal(triggerSelector, modalSelector) {
    const trigger = document.querySelector(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const closeBtn = modal?.querySelector('.close-btn');
    
    if (trigger && modal) {
        trigger.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Initialize any modals if they exist
createModal('.modal-trigger', '.modal');

// Form Validation
function validateForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        let isValid = true;
        const errors = [];
        
        for (const [key, value] of data) {
            if (value.trim() === '') {
                isValid = false;
                errors.push(`${key} is required`);
            }
        }
        
        if (isValid) {
            // Submit form (in real app, this would send data to server)
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Form submitted successfully!';
            successMessage.style.cssText = `
                color: #10b981;
                font-weight: 500;
                padding: 1rem;
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 0.5rem;
                text-align: center;
                margin-top: 1rem;
            `;
            
            form.appendChild(successMessage);
            form.reset();
            
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } else {
            // Show errors
            const errorDiv = document.createElement('div');
            errorDiv.innerHTML = errors.join('<br>');
            errorDiv.style.cssText = `
                color: #ef4444;
                font-weight: 500;
                padding: 1rem;
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.3);
                border-radius: 0.5rem;
                text-align: center;
                margin-top: 1rem;
            `;
            
            form.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
    });
}

// Initialize any forms if they exist
validateForm('.contact-form');

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Tooltips
function createTooltip() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(15, 23, 42, 0.95);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.375rem;
                font-size: 0.875rem;
                font-weight: 500;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.2s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.bottom + 10 + 'px';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            }, 10);
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    tooltip.remove();
                }, 200);
            }
        });
    });
}

// Initialize tooltips
createTooltip();

// Accordion Functionality
function createAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');
        
        if (header && content && icon) {
            header.addEventListener('click', () => {
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                
                // Close all other accordions
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherContent = otherItem.querySelector('.accordion-content');
                        const otherIcon = otherItem.querySelector('.accordion-icon');
                        otherContent.style.maxHeight = '0';
                        otherContent.style.overflow = 'hidden';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                if (isOpen) {
                    content.style.maxHeight = '0';
                    content.style.overflow = 'hidden';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.overflow = 'visible';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
}

// Initialize accordions if they exist
createAccordion();

// Copy to Clipboard Function
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = buttonElement.textContent;
        buttonElement.textContent = 'Copied!';
        buttonElement.style.background = 'var(--gradient-amber-orange)';
        
        setTimeout(() => {
            buttonElement.textContent = originalText;
            buttonElement.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Add copy functionality to code blocks
document.querySelectorAll('code').forEach(codeBlock => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(30, 41, 59, 0.8);
        color: var(--text-slate-300);
        border: 1px solid var(--border-slate-600);
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
    `;
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(button);
    
    codeBlock.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
    });
    
    codeBlock.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
    });
    
    button.addEventListener('click', () => {
        const code = codeBlock.textContent;
        copyToClipboard(code, button);
    });
});

// Initialize copy functionality for code blocks
document.querySelectorAll('code').forEach(codeBlock => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(30, 41, 59, 0.8);
        color: var(--text-slate-300);
        border: 1px solid var(--border-slate-600);
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
    `;
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(button);
    
    codeBlock.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
    });
    
    codeBlock.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
    });
    
    button.addEventListener('click', () => {
        const code = codeBlock.textContent;
        copyToClipboard(code, button);
    });
});

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
            }, wait);
        };
        return executedFunction;
    };
}

// Optimized scroll handler
const optimizedScroll = debounce(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update header state
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', optimizedScroll);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DeepNet Labs initialized successfully!');
    
    // Add any initialization code here
    console.log('All interactive features loaded and ready!');
});

// Service Worker Registration (for PWA - future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// Performance Monitoring
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        window.performance.mark('fully-loaded');
        window.performance.measure('page-load', 'navigation-start', 'fully-loaded');
        
        // Log performance metrics
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart);
    });
}