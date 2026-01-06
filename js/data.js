// Data Management System
class DataManager {
    constructor() {
        this.cache = new Map();
        this.apiEndpoints = {
            content: '/api/content',
            interactions: '/api/interactions',
            analytics: '/api/analytics'
        };
        this.init();
    }

    init() {
        this.setupCache();
        this.loadInitialData();
    }

    setupCache() {
        // Set up cache with TTL (Time To Live)
        this.cache = new Map();
        this.cacheTTL = 5 * 60 * 1000; // 5 minutes
    }

    // Content Management
    async getContent(type, id = null) {
        const cacheKey = `content_${type}_${id || 'all'}`;
        
        if (this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            // Simulate API call
            const data = await this.simulateApiCall(type, id);
            
            // Cache the data
            this.setCache(cacheKey, data);
            
            return data;
        } catch (error) {
            console.error('Error fetching content:', error);
            return this.getFallbackData(type, id);
        }
    }

    async simulateApiCall(type, id) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
        
        // Return mock data based on type
        return this.generateMockData(type, id);
    }

    generateMockData(type, id) {
        const mockData = {
            'articles': {
                'physics-101': {
                    id: 'physics-101',
                    title: 'Introduction to Physics',
                    content: 'Physics is the fundamental science that seeks to understand the nature of the universe...',
                    author: 'Dr. Smith',
                    date: '2024-01-15',
                    tags: ['physics', 'science', 'education'],
                    difficulty: 'beginner',
                    readTime: 15,
                    likes: 42,
                    views: 234,
                    comments: 15
                },
                'hydrology-basics': {
                    id: 'hydrology-basics',
                    title: 'Water Cycle and Hydrology',
                    content: 'Hydrology is the scientific study of the movement, distribution, and management of water...',
                    author: 'Prof. Johnson',
                    date: '2024-01-10',
                    tags: ['hydrology', 'water', 'environment'],
                    difficulty: 'intermediate',
                    readTime: 20,
                    likes: 38,
                    views: 189,
                    comments: 12
                }
            },
            'projects': {
                'solar-panel-efficiency': {
                    id: 'solar-panel-efficiency',
                    title: 'Solar Panel Efficiency Analysis',
                    description: 'A comprehensive study of solar panel efficiency under different conditions...',
                    status: 'completed',
                    progress: 100,
                    team: ['Alice', 'Bob', 'Charlie'],
                    startDate: '2023-06-01',
                    endDate: '2023-12-01',
                    budget: 50000,
                    likes: 67,
                    views: 456,
                    comments: 23
                },
                'water-treatment-system': {
                    id: 'water-treatment-system',
                    title: 'Smart Water Treatment System',
                    description: 'Development of an IoT-based water treatment monitoring system...',
                    status: 'in-progress',
                    progress: 75,
                    team: ['David', 'Eve', 'Frank'],
                    startDate: '2023-09-01',
                    endDate: '2024-03-01',
                    budget: 75000,
                    likes: 54,
                    views: 321,
                    comments: 18
                }
            },
            'research': {
                'quantum-mechanics': {
                    id: 'quantum-mechanics',
                    title: 'Quantum Mechanics Applications',
                    abstract: 'Exploring practical applications of quantum mechanics in modern technology...',
                    researchers: ['Dr. Quantum', 'Prof. Particle'],
                    institution: 'University of Science',
                    publishDate: '2024-01-01',
                    doi: '10.1234/abcd.5678',
                    citations: 23,
                    likes: 89,
                    views: 567,
                    comments: 34
                },
                'climate-modeling': {
                    id: 'climate-modeling',
                    title: 'Climate Change Modeling',
                    abstract: 'Advanced computational models for predicting climate change impacts...',
                    researchers: ['Dr. Climate', 'Prof. Weather'],
                    institution: 'Climate Research Institute',
                    publishDate: '2023-12-15',
                    doi: '10.1234/efgh.9012',
                    citations: 45,
                    likes: 76,
                    views: 432,
                    comments: 28
                }
            }
        };

        if (id && mockData[type] && mockData[type][id]) {
            return mockData[type][id];
        } else if (mockData[type]) {
            return Object.values(mockData[type]);
        } else {
            return this.getGenericData(type);
        }
    }

    getGenericData(type) {
        const genericData = {
            title: `Generic ${type}`,
            content: `This is generic content for ${type}. More detailed information coming soon...`,
            likes: Math.floor(Math.random() * 100),
            views: Math.floor(Math.random() * 1000),
            comments: Math.floor(Math.random() * 50)
        };
        
        return genericData;
    }

    getFallbackData(type, id) {
        // Return cached data if available, otherwise return generic data
        const cacheKey = `content_${type}_${id || 'all'}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        return this.getGenericData(type);
    }

    // Cache Management
    setCache(key, data) {
        const cacheItem = {
            data: data,
            timestamp: Date.now()
        };
        this.cache.set(key, cacheItem);
    }

    getCache(key) {
        const cacheItem = this.cache.get(key);
        return cacheItem ? cacheItem.data : null;
    }

    isCacheValid(key) {
        const cacheItem = this.cache.get(key);
        if (!cacheItem) return false;
        
        const isValid = (Date.now() - cacheItem.timestamp) < this.cacheTTL;
        if (!isValid) {
            this.cache.delete(key);
        }
        
        return isValid;
    }

    clearCache() {
        this.cache.clear();
    }

    // Analytics and Tracking
    trackEvent(eventType, data) {
        const event = {
            type: eventType,
            data: data,
            timestamp: Date.now(),
            userId: this.getUserId()
        };
        
        // Store locally
        this.storeAnalytics(event);
        
        // Send to analytics service (simulate)
        this.sendAnalytics(event);
    }

    storeAnalytics(event) {
        const analytics = this.getLocalData('analytics') || [];
        analytics.push(event);
        this.setLocalData('analytics', analytics);
    }

    sendAnalytics(event) {
        // Simulate sending to analytics service
        console.log('Analytics Event:', event);
        
        // In a real application, this would send to Google Analytics, Mixpanel, etc.
        // fetch(this.apiEndpoints.analytics, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(event)
        // });
    }

    // User Management
    getUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    getUserProfile() {
        const defaultProfile = {
            id: this.getUserId(),
            name: 'Guest User',
            preferences: {
                theme: 'dark',
                language: 'en',
                notifications: true
            },
            achievements: [],
            progress: {}
        };
        
        const stored = localStorage.getItem('userProfile');
        return stored ? JSON.parse(stored) : defaultProfile;
    }

    updateUserProfile(updates) {
        const profile = this.getUserProfile();
        const updatedProfile = { ...profile, ...updates };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        return updatedProfile;
    }

    // Progress Tracking
    trackProgress(contentId, progress) {
        const userProfile = this.getUserProfile();
        if (!userProfile.progress) userProfile.progress = {};
        
        userProfile.progress[contentId] = {
            progress: progress,
            lastAccessed: Date.now()
        };
        
        this.updateUserProfile(userProfile);
        
        // Check for achievements
        this.checkAchievements(userProfile);
    }

    checkAchievements(userProfile) {
        const achievements = {
            'firstSteps': {
                condition: (profile) => Object.keys(profile.progress || {}).length >= 1,
                reward: 'First Steps Badge'
            },
            'explorer': {
                condition: (profile) => Object.keys(profile.progress || {}).length >= 5,
                reward: 'Explorer Badge'
            },
            'scholar': {
                condition: (profile) => {
                    const progress = profile.progress || {};
                    return Object.values(progress).some(p => p.progress >= 100);
                },
                reward: 'Scholar Badge'
            }
        };
        
        Object.entries(achievements).forEach(([key, achievement]) => {
            if (achievement.condition(userProfile) && !userProfile.achievements.includes(key)) {
                userProfile.achievements.push(key);
                this.showAchievementNotification(achievement.reward);
            }
        });
        
        this.updateUserProfile(userProfile);
    }

    showAchievementNotification(reward) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-content">
                <h4>Achievement Unlocked!</h4>
                <p>${reward}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Search and Filtering
    searchContent(query, filters = {}) {
        const allContent = this.getAllContent();
        let results = [];
        
        // Search across all content types
        Object.entries(allContent).forEach(([type, content]) => {
            if (Array.isArray(content)) {
                content.forEach(item => {
                    if (this.matchesSearch(item, query, filters)) {
                        results.push({ ...item, contentType: type });
                    }
                });
            } else if (this.matchesSearch(content, query, filters)) {
                results.push({ ...content, contentType: type });
            }
        });
        
        // Sort by relevance
        results.sort((a, b) => {
            const scoreA = this.calculateRelevanceScore(a, query);
            const scoreB = this.calculateRelevanceScore(b, query);
            return scoreB - scoreA;
        });
        
        return results;
    }

    matchesSearch(item, query, filters) {
        const searchText = query.toLowerCase();
        const searchableFields = ['title', 'content', 'description', 'tags', 'author'];
        
        // Check if query matches any searchable field
        const matchesQuery = searchableFields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(searchText);
        });
        
        // Apply filters
        const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;
            return item[key] === value;
        });
        
        return matchesQuery && matchesFilters;
    }

    calculateRelevanceScore(item, query) {
        let score = 0;
        const searchText = query.toLowerCase();
        
        // Title match (highest weight)
        if (item.title && item.title.toLowerCase().includes(searchText)) {
            score += 10;
        }
        
        // Exact title match
        if (item.title && item.title.toLowerCase() === searchText) {
            score += 5;
        }
        
        // Content match
        if (item.content && item.content.toLowerCase().includes(searchText)) {
            score += 3;
        }
        
        // Tags match
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => {
                if (tag.toLowerCase().includes(searchText)) {
                    score += 2;
                }
            });
        }
        
        // Boost popular content
        if (item.views) score += Math.min(item.views / 100, 5);
        if (item.likes) score += Math.min(item.likes / 10, 3);
        
        return score;
    }

    getAllContent() {
        const content = {};
        const contentTypes = ['articles', 'projects', 'research', 'journal'];
        
        contentTypes.forEach(type => {
            content[type] = this.getCache(`content_${type}_all`) || this.generateMockData(type);
        });
        
        return content;
    }

    // Local Storage Helpers
    getLocalData(key) {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : null;
    }

    setLocalData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // Data Export/Import
    exportUserData() {
        const userData = {
            profile: this.getUserProfile(),
            interactions: this.getLocalData('userInteractions'),
            analytics: this.getLocalData('analytics'),
            timestamp: Date.now()
        };
        
        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `journey-universe-data-${Date.now()}.json`;
        link.click();
    }

    importUserData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validate data structure
                    if (data.profile) {
                        this.updateUserProfile(data.profile);
                    }
                    if (data.interactions) {
                        this.setLocalData('userInteractions', data.interactions);
                    }
                    if (data.analytics) {
                        this.setLocalData('analytics', data.analytics);
                    }
                    
                    resolve('Data imported successfully');
                } catch (error) {
                    reject('Invalid data format');
                }
            };
            reader.onerror = () => reject('Error reading file');
            reader.readAsText(file);
        });
    }

    // Real-time Updates (WebSocket simulation)
    setupRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.simulateRealTimeUpdate();
        }, 30000); // Every 30 seconds
        
        // Listen for visibility changes to pause/resume updates
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseRealTimeUpdates();
            } else {
                this.resumeRealTimeUpdates();
            }
        });
    }

    simulateRealTimeUpdate() {
        // Simulate likes, views, comments updates
        const contentTypes = ['articles', 'projects', 'research'];
        const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
        
        // This would typically come from a WebSocket connection
        const update = {
            type: 'interaction_update',
            contentType: randomType,
            contentId: Math.random().toString(36).substr(2, 9),
            likes: Math.floor(Math.random() * 5),
            views: Math.floor(Math.random() * 20),
            comments: Math.floor(Math.random() * 3)
        };
        
        this.handleRealTimeUpdate(update);
    }

    handleRealTimeUpdate(update) {
        // Update UI elements
        const contentElements = document.querySelectorAll(`[data-content-type="${update.contentType}"]`);
        contentElements.forEach(element => {
            if (element.dataset.contentId === update.contentId) {
                // Update counts
                const likeElement = element.querySelector('.like-count');
                const viewElement = element.querySelector('.view-count');
                const commentElement = element.querySelector('.comment-count');
                
                if (likeElement) likeElement.textContent = update.likes;
                if (viewElement) viewElement.textContent = update.views;
                if (commentElement) commentElement.textContent = update.comments;
            }
        });
    }

    pauseRealTimeUpdates() {
        this.realTimePaused = true;
    }

    resumeRealTimeUpdates() {
        this.realTimePaused = false;
    }

    // Initial data loading
    async loadInitialData() {
        try {
            // Load user profile
            const userProfile = this.getUserProfile();
            
            // Load cached content
            const contentTypes = ['articles', 'projects', 'research'];
            for (const type of contentTypes) {
                const cached = this.getCache(`content_${type}_all`);
                if (!cached) {
                    const data = await this.getContent(type);
                    this.setCache(`content_${type}_all`, data);
                }
            }
            
            console.log('Initial data loaded successfully');
        } catch (error) {
            console.error('Error loading initial data:', error);
        }
    }
}

// Initialize data manager
const dataManager = new DataManager();

// Add CSS for achievement notifications
const achievementStyles = document.createElement('style');
achievementStyles.textContent = `
    .achievement-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease-out;
    }
    
    .achievement-notification.show {
        transform: translateX(0);
    }
    
    .achievement-icon {
        font-size: 2rem;
    }
    
    .achievement-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    }
    
    .achievement-content p {
        margin: 0;
        opacity: 0.9;
    }
`;
document.head.appendChild(achievementStyles);
