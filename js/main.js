// AMC8 Learning Platform - Main JavaScript

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const moduleTabs = document.querySelectorAll('.module-tab');
const tabContents = document.querySelectorAll('.tab-content');
const solutionBtns = document.querySelectorAll('.solution-btn');
const moduleLinks = document.querySelectorAll('.module-btn, .footer-links a[data-module]');
const contactForm = document.getElementById('contactForm');
const emailInput = document.getElementById('emailInput');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('AMC8 Learning Platform loaded successfully!');
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize module tabs
    initModuleTabs();
    
    // Initialize solution toggles
    initSolutionToggles();
    
    // Initialize module navigation
    initModuleNavigation();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Set current year in footer
    setCurrentYear();
});

// Mobile Menu Functionality
function initMobileMenu() {
    if (!mobileMenuBtn || !navLinks) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        const isActive = navLinks.classList.contains('active');
        
        // Toggle menu
        navLinks.classList.toggle('active');
        
        // Update button icon and aria-label
        if (isActive) {
            this.innerHTML = '<i class="fas fa-bars"></i>';
            this.setAttribute('aria-label', 'Open navigation menu');
            this.setAttribute('aria-expanded', 'false');
        } else {
            this.innerHTML = '<i class="fas fa-times"></i>';
            this.setAttribute('aria-label', 'Close navigation menu');
            this.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && 
            !mobileMenuBtn.contains(event.target) &&
            navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

// Module Tabs Functionality
function initModuleTabs() {
    moduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
}

function showTab(tabName) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    moduleTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    const activeContent = document.getElementById(`${tabName}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    // Activate corresponding tab button
    const activeTab = document.querySelector(`.module-tab[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Add animation class
    activeContent.classList.add('fade-in');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        activeContent.classList.remove('fade-in');
    }, 500);
}

// Solution Toggle Functionality
function initSolutionToggles() {
    solutionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const problemId = this.getAttribute('data-problem');
            const solution = document.getElementById(`solution${problemId}`);
            
            if (solution) {
                const isVisible = solution.classList.contains('show');
                
                // Toggle solution visibility
                solution.classList.toggle('show');
                
                // Update button text
                this.textContent = isVisible ? 'Show Solution' : 'Hide Solution';
                
                // Add animation
                if (!isVisible) {
                    solution.classList.add('fade-in');
                    setTimeout(() => {
                        solution.classList.remove('fade-in');
                    }, 500);
                }
            }
        });
    });
}

// Module Navigation Functionality
function initModuleNavigation() {
    moduleLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (this.hash === '#details') {
                event.preventDefault();
                
                const module = this.getAttribute('data-module');
                if (module) {
                    showTab(module);
                    
                    // Scroll to details section
                    const detailsSection = document.getElementById('details');
                    if (detailsSection) {
                        detailsSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (!emailInput) return;
        
        const email = emailInput.value.trim();
        
        // Simple email validation
        if (!email || !isValidEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Simulate form submission
        simulateFormSubmission(email);
    });
    
    // Add input validation
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            this.classList.remove('error');
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(email) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showAlert(`Thank you! Learning resources have been sent to ${email}`, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Log to console (for demo)
        console.log(`Email subscribed: ${email}`);
    }, 1500);
}

function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.alert-message');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert-message ${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideUp 0.3s ease;
        max-width: 300px;
    `;
    
    // Set color based on type
    if (type === 'success') {
        alertDiv.style.background = '#4CAF50';
    } else if (type === 'error') {
        alertDiv.style.background = '#F44336';
    } else {
        alertDiv.style.background = '#2196F3';
    }
    
    // Add to page
    document.body.appendChild(alertDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 5000);
}

// Scroll Effects
function initScrollEffects() {
    // Update header on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }
        
        // Add active class to current section in view
        highlightCurrentSection();
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                event.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    closeMobileMenu();
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Utility Functions
function setCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Add current year to copyright in footer
const copyrightParagraphs = document.querySelectorAll('.copyright p');
if (copyrightParagraphs.length > 0) {
    const firstParagraph = copyrightParagraphs[0];
    const currentYear = new Date().getFullYear();
    
    // Replace hardcoded year with current year
    firstParagraph.innerHTML = firstParagraph.innerHTML.replace('2023', currentYear);
}

// Initialize module navigation from URL hash
window.addEventListener('hashchange', function() {
    if (window.location.hash === '#details') {
        // Check for module parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        const moduleParam = urlParams.get('module');
        
        if (moduleParam && ['arithmetic', 'algebra', 'geometry', 'combinatorics'].includes(moduleParam)) {
            showTab(moduleParam);
        }
    }
});

// Check initial hash on page load
if (window.location.hash === '#details') {
    const urlParams = new URLSearchParams(window.location.search);
    const moduleParam = urlParams.get('module');
    
    if (moduleParam && ['arithmetic', 'algebra', 'geometry', 'combinatorics'].includes(moduleParam)) {
        // Small delay to ensure DOM is fully loaded
        setTimeout(() => {
            showTab(moduleParam);
        }, 100);
    }
}

// Export functions for debugging (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showTab,
        closeMobileMenu,
        isValidEmail
    };
}