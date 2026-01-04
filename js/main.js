// Modern UI Functions
document.addEventListener('DOMContentLoaded', function() {
    // Dynamic year
    document.getElementById('yr').textContent = new Date().getFullYear();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    nav.appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Video player controls
    const videoPlayers = document.querySelectorAll('.video-player');
    videoPlayers.forEach(player => {
        const video = player.querySelector('video');
        const playBtn = player.querySelector('.play-btn');
        const progress = player.querySelector('.progress');
        
        if (playBtn && video) {
            playBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playBtn.innerHTML = '⏸';
                } else {
                    video.pause();
                    playBtn.innerHTML = '▶';
                }
            });
            
            video.addEventListener('timeupdate', function() {
                if (progress) {
                    progress.value = (video.currentTime / video.duration) * 100;
                }
            });
        }
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate subscription
            alert(`Thank you for subscribing with email: ${email}`);
            this.reset();
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('form[action*="formspree"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Comment system
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const comment = this.querySelector('textarea[name="comment"]').value;
            
            if (name && comment) {
                addComment(name, comment);
                this.reset();
            }
        });
    }

    // Gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });

    // Download functionality
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fileUrl = this.getAttribute('data-file');
            const fileName = this.getAttribute('data-name');
            
            // Simulate download
            const link = document.createElement('a');
            link.href = fileUrl || '#';
            link.download = fileName || 'download';
            link.click();
            
            alert(`Downloading: ${fileName}`);
        });
    });

    // Parallax effect for hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.getElementById('hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Helper functions
function addComment(name, comment) {
    const commentsContainer = document.querySelector('.comments-container');
    if (commentsContainer) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div class="comment-author">${name}</div>
            <div class="comment-date">${new Date().toLocaleDateString()}</div>
            <div class="comment-text">${comment}</div>
        `;
        commentsContainer.insertBefore(commentDiv, commentsContainer.firstChild);
    }
}

function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="Gallery Image">
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
}

// Email functionality
function sendEmail(to, subject, body) {
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Notes functionality
function saveNote(noteId, content) {
    localStorage.setItem(`note_${noteId}`, content);
    alert('Note saved successfully!');
}

function loadNote(noteId) {
    return localStorage.getItem(`note_${noteId}`) || '';
}
