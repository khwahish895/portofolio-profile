// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const scrollTopBtn = document.getElementById('scrollTop');
const loadingScreen = document.getElementById('loading-screen');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const closeNotification = document.getElementById('closeNotification');
const contactForm = document.getElementById('contactForm');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const downloadCVBtn = document.getElementById('downloadCV');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Navigation and Section Switching
function showSection(targetSection) {
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const target = document.getElementById(targetSection);
    if (target) {
        target.classList.add('active');
    }
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === targetSection) {
            link.classList.add('active');
        }
    });
    
    // Close mobile menu
    navMenu.classList.remove('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = link.dataset.section;
        showSection(targetSection);
    });
});

// Button navigation handlers
document.querySelectorAll('[data-section]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.tagName === 'BUTTON') {
            e.preventDefault();
            const targetSection = btn.dataset.section;
            showSection(targetSection);
        }
    });
});

// Keyboard Navigation (1-7 keys for sections)
document.addEventListener('keydown', (e) => {
    // Prevent section navigation if focused on input or textarea
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
        return;
    }
    const keyMap = {
        '1': 'home',
        '2': 'about',
        '3': 'education',
        '4': 'skills',
        '5': 'projects',
        '6': 'certificates',
        '7': 'contact'
    };
    
    if (keyMap[e.key]) {
        showSection(keyMap[e.key]);
    }
});

// Project Tabs
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.dataset.width;
                skillBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialize skills animation
animateSkills();

// Download CV functionality
downloadCVBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create a temporary link element
    const link = document.createElement('a');
    
    // You can replace this with your actual CV file path
    // For now, I'll create a sample CV content
    const cvContent = `
KHWAHISH SINGH
DevOps Engineer & Full Stack Developer

Contact Information:
Email: khwahishsingh2005@gmail.com
Phone: 7424988589
LinkedIn: https://www.linkedin.com/in/khwahish-singh-997628295
GitHub: https://github.com/khwahish895

Education:
• B.Tech Computer Science - Jaipur Engineering College & Research Centre (Pursuing)
• 12th Grade - TGM Public Sr. Sec. School (RBSE) - 65.20%
• 10th Grade - IGM Public Sr. Sec. School (RBSE) - 93%

Technical Skills:
• Programming: Python, JavaScript, HTML, CSS, PHP, SQL
• DevOps & Cloud: Docker, Kubernetes, Jenkins, AWS, GitHub Actions
• AI & ML: Streamlit, Generative AI, Machine Learning, Data Analysis
• Tools: Linux/RHEL 9, Git, Bash, Terraform, React, Node.js

Experience:
• Internship at Linux World - Docker, Jenkins, Gen-technologies

Certifications:
• Android App Development
• Data Science
• Python Programming
• Cyber Security
• MySQL Database
• And more...

Projects:
• Streamlit Data Visualization App
• Gradio + Gemini AI Integration
• College Website
• Various Games (Tic-Tac-Toe, Snake, etc.)
• And many more...
    `;
    
    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    link.href = url;
    link.download = 'Khwahish_Singh_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show notification
    showNotification('CV downloaded successfully! 📄');
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link with proper formatting
    const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:khwahishsingh2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
    
    // Open email client
    try {
        window.open(mailtoLink, '_blank');
    } catch (error) {
        // Fallback for mobile devices
        window.location.href = mailtoLink;
    }
    
    // Show notification
    showNotification('📧 Email client opened! Please send the email from your email application.');
    
    // Reset form
    contactForm.reset();
});

// Notification System
function showNotification(message) {
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

closeNotification.addEventListener('click', () => {
    notification.classList.remove('show');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Check if href is valid (not just '#' or empty)
        if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            // If href is just '#', scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation to external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        showNotification('Opening external link...');
    });
});

// Typing animation for name
function animateName() {
    const nameElement = document.querySelector('.animated-name');
    if (nameElement) {
        // Add additional animation classes
        nameElement.style.animationDelay = '0.5s';
    }
}

// Initialize name animation
setTimeout(animateName, 1000);

// Enhanced name animation with right-to-left and circular rotation
function enhancedNameAnimation() {
    const nameElement = document.getElementById('animatedName');
    if (nameElement) {
        // Add the enhanced animation classes
        nameElement.style.animation = 'slideInRightToLeft 2s ease-out, circularRotation 2s ease-out, textGlow 3s ease-in-out infinite alternate';
    }
}

// Scroll animations for section titles
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all section titles
    document.querySelectorAll('.scroll-animate').forEach(title => {
        observer.observe(title);
    });
}

// Particle animation
function createParticles() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        
        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        
        // Random animation delay
        particle.style.animationDelay = (index * 0.5) + 's';
    });
}

// Initialize particles
createParticles();

// Resize handler
window.addEventListener('resize', () => {
    createParticles();
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add hover effects to certificate cards
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) rotateY(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateY(0deg)';
    });
});

// Add click animation to buttons
document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-link').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button, .btn-primary, .btn-secondary, .btn-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show home section by default
    showSection('home');
    
    // Initialize enhanced animations
    enhancedNameAnimation();
    initScrollAnimations();
    
    // Add smooth transitions
    document.body.style.transition = 'all 0.3s ease';
    
    console.log('🚀 Khwahish Singh Portfolio Loaded Successfully!');
    console.log('💡 Use keyboard shortcuts 1-7 to navigate between sections');
    console.log('🎨 Enjoy the neon-themed experience!');
});
