// Advanced Interactions Manager
class InteractionManager {
    constructor() {
        this.likes = new Map();
        this.comments = new Map();
        this.views = new Map();
        this.userInteractions = JSON.parse(localStorage.getItem('userInteractions') || '{}');
        this.init();
    }

    init() {
        this.setupLikeSystem();
        this.setupCommentSystem();
        this.setupShareSystem();
        this.setupViewTracking();
        this.setupKeyboardShortcuts();
        this.setupTouchGestures();
    }

    // Like System
    setupLikeSystem() {
        document.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.like-btn');
            if (likeBtn) {
                e.preventDefault();
                this.handleLike(likeBtn);
            }
        });
    }

    handleLike(button) {
        const contentId = button.dataset.contentId || this.generateContentId(button);
        const countElement = button.querySelector('.interaction-count');
        const currentCount = parseInt(countElement.textContent) || 0;
        
        // Check if user already liked
        const userId = this.getUserId();
        const likeKey = `like_${contentId}_${userId}`;
        const hasLiked = localStorage.getItem(likeKey) === 'true';
        
        if (hasLiked) {
            // Unlike
            this.unlikeContent(button, contentId, countElement, currentCount, likeKey);
        } else {
            // Like
            this.likeContent(button, contentId, countElement, currentCount, likeKey);
        }
        
        // Add visual feedback
        this.addLikeAnimation(button);
    }

    likeContent(button, contentId, countElement, currentCount, likeKey) {
        // Update UI
        button.classList.add('active');
        countElement.textContent = currentCount + 1;
        localStorage.setItem(likeKey, 'true');
        
        // Update local storage
        if (!this.userInteractions.likes) this.userInteractions.likes = {};
        this.userInteractions.likes[contentId] = true;
        this.saveUserInteractions();
        
        // Create floating heart animation
        this.createFloatingHeart(button);
        
        // Haptic feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    unlikeContent(button, contentId, countElement, currentCount, likeKey) {
        // Update UI
        button.classList.remove('active');
        countElement.textContent = Math.max(0, currentCount - 1);
        localStorage.removeItem(likeKey);
        
        // Update local storage
        if (this.userInteractions.likes) {
            delete this.userInteractions.likes[contentId];
            this.saveUserInteractions();
        }
    }

    addLikeAnimation(button) {
        button.style.transform = 'scale(1.2)';
        button.style.color = '#e74c3c';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            if (!button.classList.contains('active')) {
                button.style.color = '';
            }
        }, 200);
    }

    createFloatingHeart(button) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 20px;
            animation: floatUp 2s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
    }

    // Comment System
    setupCommentSystem() {
        document.addEventListener('click', (e) => {
            const commentBtn = e.target.closest('.comment-btn');
            if (commentBtn) {
                e.preventDefault();
                this.showCommentModal(commentBtn);
            }
        });
    }

    showCommentModal(button) {
        const contentId = button.dataset.contentId || this.generateContentId(button);
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Add Comment</h3>
                <div class="existing-comments">
                    ${this.renderExistingComments(contentId)}
                </div>
                <form class="comment-form">
                    <div class="form-group">
                        <label class="form-label">Your Name</label>
                        <input type="text" class="form-input" id="comment-name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Comment</label>
                        <textarea class="form-textarea" id="comment-text" placeholder="Share your thoughts..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Rating</label>
                        <div class="star-rating">
                            ${[1,2,3,4,5].map(i => `
                                <span class="star" data-rating="${i}">☆</span>
                            `).join('')}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupCommentModalEvents(modal, contentId);
    }

    setupCommentModalEvents(modal, contentId) {
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Star rating
        modal.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                modal.querySelectorAll('.star').forEach((s, i) => {
                    s.textContent = i < rating ? '★' : '☆';
                });
                modal.querySelector('.star-rating').dataset.rating = rating;
            });
        });
        
        // Handle form submission
        modal.querySelector('.comment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitComment(modal, contentId);
        });
    }

    submitComment(modal, contentId) {
        const name = modal.querySelector('#comment-name').value;
        const text = modal.querySelector('#comment-text').value;
        const rating = modal.querySelector('.star-rating').dataset.rating || 0;
        const timestamp = new Date().toISOString();
        
        // Create comment object
        const comment = {
            id: this.generateCommentId(),
            contentId,
            name,
            text,
            rating: parseInt(rating),
            timestamp,
            likes: 0
        };
        
        // Store comment
        if (!this.comments.has(contentId)) {
            this.comments.set(contentId, []);
        }
        this.comments.get(contentId).push(comment);
        
        // Update UI
        this.updateCommentCount(contentId);
        
        // Show success message
        modal.innerHTML = `
            <div class="modal-content">
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="color: #4caf50; font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Comment Posted!</h3>
                    <p>Thank you for your contribution.</p>
                </div>
            </div>
        `;
        
        setTimeout(() => modal.remove(), 2000);
        
        // Save to localStorage
        this.saveComments();
    }

    renderExistingComments(contentId) {
        const comments = this.comments.get(contentId) || [];
        if (comments.length === 0) {
            return '<p style="color: #999; text-align: center; margin: 1rem 0;">No comments yet. Be the first to comment!</p>';
        }
        
        return comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <strong>${comment.name}</strong>
                    <span class="comment-rating">${'★'.repeat(comment.rating)}${'☆'.repeat(5-comment.rating)}</span>
                </div>
                <div class="comment-text">${comment.text}</div>
                <div class="comment-footer">
                    <span class="comment-date">${this.formatDate(comment.timestamp)}</span>
                    <button class="comment-like-btn" onclick="interactionManager.likeComment('${comment.id}')">
                        <i class="fas fa-heart"></i> ${comment.likes}
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Share System
    setupShareSystem() {
        document.addEventListener('click', (e) => {
            const shareBtn = e.target.closest('.share-btn');
            if (shareBtn) {
                e.preventDefault();
                this.showShareModal(shareBtn);
            }
        });
    }

    showShareModal(button) {
        const contentId = button.dataset.contentId || this.generateContentId(button);
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Share Content</h3>
                <div class="share-options">
                    <button class="btn btn-outline share-option" data-platform="facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="btn btn-outline share-option" data-platform="twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="btn btn-outline share-option" data-platform="linkedin">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button class="btn btn-outline share-option" data-platform="copy">
                        <i class="fas fa-link"></i> Copy Link
                    </button>
                </div>
                <div class="share-stats">
                    <p>This content has been shared <strong>${this.getShareCount(contentId)}</strong> times</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.setupShareModalEvents(modal, contentId);
    }

    setupShareModalEvents(modal, contentId) {
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Share options
        modal.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const platform = e.currentTarget.dataset.platform;
                this.shareContent(platform, contentId);
                modal.remove();
            });
        });
    }

    shareContent(platform, contentId) {
        const url = window.location.href;
        const title = document.title;
        
        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    this.showCopySuccess();
                });
                break;
        }
        
        // Track share
        this.trackShare(contentId);
    }

    showCopySuccess() {
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Link copied to clipboard!
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }

    // View Tracking
    setupViewTracking() {
        // Use Intersection Observer to track views
        const viewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const contentId = entry.target.dataset.contentId || this.generateContentId(entry.target);
                    this.trackView(contentId);
                    viewObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        // Observe content elements
        document.querySelectorAll('.content-card, .article, .project-card').forEach(el => {
            viewObserver.observe(el);
        });
    }

    trackView(contentId) {
        if (!this.views.has(contentId)) {
            this.views.set(contentId, 0);
        }
        this.views.set(contentId, this.views.get(contentId) + 1);
        
        // Update view count in UI
        const viewElements = document.querySelectorAll(`[data-content-id="${contentId}"] .view-count`);
        viewElements.forEach(el => {
            el.textContent = `${this.views.get(contentId)} views`;
        });
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showSearchModal();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    activeModal.remove();
                }
            }
            
            // Arrow keys for navigation
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.handleArrowNavigation(e.key);
            }
        });
    }

    showSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Search content..." autofocus>
                    <div class="search-results"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const searchInput = modal.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value, modal.querySelector('.search-results'));
        });
        
        // Close on escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });
    }

    performSearch(query, resultsContainer) {
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        // Simulate search results
        const results = [
            { title: 'Physics Overview', type: 'Page', url: '#physics' },
            { title: 'Hydropower Systems', type: 'Article', url: '#hydropower' },
            { title: 'Geology Fundamentals', type: 'Tutorial', url: '#geology' }
        ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        
        resultsContainer.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="window.location='${result.url}'">
                <h4>${result.title}</h4>
                <span class="result-type">${result.type}</span>
            </div>
        `).join('');
    }

    // Touch Gestures
    setupTouchGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipeGesture(touchStartX, touchEndX);
        });
    }

    handleSwipeGesture(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next page
                this.navigateNext();
            } else {
                // Swipe right - previous page
                this.navigatePrevious();
            }
        }
    }

    // Utility Methods
    generateContentId(element) {
        return 'content_' + Math.random().toString(36).substr(2, 9);
    }

    generateCommentId() {
        return 'comment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    getShareCount(contentId) {
        return this.userInteractions.shares?.[contentId] || 0;
    }

    trackShare(contentId) {
        if (!this.userInteractions.shares) this.userInteractions.shares = {};
        this.userInteractions.shares[contentId] = (this.userInteractions.shares[contentId] || 0) + 1;
        this.saveUserInteractions();
    }

    updateCommentCount(contentId) {
        const comments = this.comments.get(contentId) || [];
        const commentButtons = document.querySelectorAll(`[data-content-id="${contentId}"] .comment-btn .interaction-count`);
        commentButtons.forEach(btn => {
            btn.textContent = comments.length;
        });
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }

    saveUserInteractions() {
        localStorage.setItem('userInteractions', JSON.stringify(this.userInteractions));
    }

    saveComments() {
        const commentsObj = {};
        this.comments.forEach((comments, contentId) => {
            commentsObj[contentId] = comments;
        });
        localStorage.setItem('comments', JSON.stringify(commentsObj));
    }

    loadComments() {
        const saved = localStorage.getItem('comments');
        if (saved) {
            const commentsObj = JSON.parse(saved);
            Object.entries(commentsObj).forEach(([contentId, comments]) => {
                this.comments.set(contentId, comments);
            });
        }
    }

    likeComment(commentId) {
        // Find comment and increment likes
        for (let [contentId, comments] of this.comments) {
            const comment = comments.find(c => c.id === commentId);
            if (comment) {
                comment.likes++;
                this.saveComments();
                
                // Update UI
                const likeBtn = document.querySelector(`[onclick="interactionManager.likeComment('${commentId}')"]`);
                if (likeBtn) {
                    likeBtn.innerHTML = `<i class="fas fa-heart"></i> ${comment.likes}`;
                    likeBtn.style.color = '#e74c3c';
                }
                break;
            }
        }
    }
}

// Initialize interaction manager
const interactionManager = new InteractionManager();
interactionManager.loadComments();

// Add CSS for interactions
const interactionStyles = document.createElement('style');
interactionStyles.textContent = `
    .comment-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .comment-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .comment-rating {
        color: #f39c12;
    }
    
    .comment-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #999;
    }
    
    .comment-like-btn {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        transition: color 0.3s ease;
    }
    
    .comment-like-btn:hover {
        color: #e74c3c;
    }
    
    .star-rating {
        font-size: 1.5rem;
        cursor: pointer;
    }
    
    .star {
        color: #ddd;
        transition: color 0.3s ease;
    }
    
    .star:hover,
    .star.active {
        color: #f39c12;
    }
    
    .search-container {
        padding: 1rem;
    }
    
    .search-input {
        width: 100%;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: white;
        font-size: 1rem;
    }
    
    .search-result-item {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: background 0.3s ease;
    }
    
    .search-result-item:hover {
        background: rgba(255, 255, 255, 0.05);
    }
    
    .result-type {
        background: var(--gradient-primary);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        color: white;
    }
    
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(interactionStyles);
