// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.height = scrolled + '%';
});

// Smooth reveal animations for elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('section:not(.hero)').forEach((section) => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Grid animation on scroll
window.addEventListener('scroll', () => {
    const gridLines = document.querySelectorAll('.grid-line');
    gridLines.forEach(line => {
        const rect = line.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            line.classList.add('scroll-animate');
        } else {
            line.classList.remove('scroll-animate');
        }
    });
});

// Binary rain effect
function createBinaryRain() {
    const rain = document.createElement('div');
    rain.className = 'binary-rain';
    document.body.appendChild(rain);

    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'binary-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDuration = `${Math.random() * 3 + 2}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.textContent = Math.random() > 0.5 ? '1' : '0';
        rain.appendChild(drop);
    }
}

// Minecraft category filter
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active button
        document.querySelectorAll('.category-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter projects
        document.querySelectorAll('.minecraft-project').forEach(project => {
            const shouldShow = category === 'all' || project.dataset.category === category;
            project.style.display = shouldShow ? 'block' : 'none';
            // Don't interfere with link clicks when project is visible
            if (shouldShow) {
                project.style.pointerEvents = 'auto';
            } else {
                project.style.pointerEvents = 'none';
            }
        });
    });
});

// Initialize effects
createBinaryRain();

document.addEventListener('DOMContentLoaded', () => {
    // Highlight active menu item based on scroll position
    const sections = document.querySelectorAll('section, header, .minecraft-categories');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Handle smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
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
            }
        });
    });

    // Category buttons scroll handling
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            // Existing category filter code...
            
            // Scroll to the projects section
            const projectsSection = document.querySelector('#minecraft-projects');
            if (projectsSection) {
                const headerOffset = 100;
                const elementPosition = projectsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    animateNumbers();
});

function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50; // Adjust speed here
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateNumber);
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.disconnect();
            }
        });
        
        observer.observe(stat);
    });
}

// Plugin category filter with smooth transitions
document.querySelectorAll('.plugin-categories .category-button').forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.plugin-categories .category-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter plugins
        const category = button.dataset.category;
        const plugins = document.querySelectorAll('.plugin-card');
        
        plugins.forEach(plugin => {
            // Reset expanded state and details view when switching categories
            plugin.classList.remove('expanded');
            const details = plugin.querySelector('.plugin-details');
            if (details) {
                details.classList.remove('active');
            }
            
            if (category === 'all' || plugin.dataset.category === category) {
                plugin.style.display = 'block';
                setTimeout(() => {
                    plugin.style.opacity = '1';
                    plugin.style.transform = 'translateY(0)';
                }, 50);
            } else {
                plugin.style.opacity = '0';
                plugin.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    plugin.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Handle view details button clicks
document.querySelectorAll('.view-details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = button.closest('.plugin-card');
        const details = card.querySelector('.plugin-details');
        
        if (!details.classList.contains('active')) {
            // Show details
            details.style.display = 'block';
            setTimeout(() => {
                details.classList.add('active');
            }, 10);
            button.textContent = 'Hide Details';
        } else {
            // Hide details
            details.classList.remove('active');
            setTimeout(() => {
                details.style.display = 'none';
            }, 300);
            button.textContent = 'View Details';
        }
    });
}); 