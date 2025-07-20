// Unified App Controller
// Manages navigation between different micro apps

// Global app state
let currentApp = 'welcome';
let isLoading = false;

// App instances (will be populated when apps are loaded)
let appsLoaded = {
    lines: false,
    starfield: false,
    matrix: false
};

// Initialize the unified app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Unified Micro Apps - Initializing...');
    
    // Hide loading overlay after a short delay
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.display = 'none';
    }, 1000);
    
    // Add global keyboard shortcuts
    document.addEventListener('keydown', handleGlobalKeyboard);
    
    // Add window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    console.log('✅ Unified App initialized successfully');
});

// Navigation function to switch between apps
function showApp(appName) {
    if (isLoading) return;
    
    console.log(`🔄 Switching to app: ${appName}`);
    
    // Update navigation buttons
    document.querySelectorAll('.app-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event?.target?.classList.add('active') || 
    document.querySelector(`[onclick="showApp('${appName}')"]`)?.classList.add('active');
    
    // Hide all app content
    document.querySelectorAll('.app-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected app content
    const appContent = document.getElementById(appName);
    if (appContent) {
        appContent.classList.add('active');
    }
    
    // Update theme based on app
    updateTheme(appName);
    
    // Load app if not already loaded
    if (appName !== 'welcome' && !appsLoaded[appName]) {
        loadApp(appName);
    }
    
    // Update current app
    currentApp = appName;
    
    // Handle p5.js canvas switching
    if (window.currentP5Instance) {
        window.currentP5Instance.remove();
        window.currentP5Instance = null;
    }
    
    // Initialize the selected app
    setTimeout(() => {
        initializeApp(appName);
    }, 100);
}

// Update theme based on current app
function updateTheme(appName) {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('matrix-theme', 'starfield-theme', 'lines-theme');
    
    // Add appropriate theme class
    switch (appName) {
        case 'matrix':
            body.classList.add('matrix-theme');
            break;
        case 'starfield':
            body.classList.add('starfield-theme');
            break;
        case 'lines':
        default:
            // Default theme (lines theme)
            break;
    }
}

// Load app resources if needed
function loadApp(appName) {
    console.log(`📦 Loading app: ${appName}`);
    appsLoaded[appName] = true;
}

// Initialize specific app
function initializeApp(appName) {
    switch (appName) {
        case 'lines':
            if (typeof initializeLinesApp === 'function') {
                initializeLinesApp();
            }
            break;
        case 'starfield':
            if (typeof initializeStarfieldApp === 'function') {
                initializeStarfieldApp();
            }
            break;
        case 'matrix':
            if (typeof initializeMatrixApp === 'function') {
                initializeMatrixApp();
            }
            break;
    }
}

// Handle global keyboard shortcuts
function handleGlobalKeyboard(event) {
    // Don't interfere with app-specific shortcuts when an app is active
    if (currentApp !== 'welcome') return;
    
    switch (event.code) {
        case 'Digit1':
            showApp('lines');
            break;
        case 'Digit2':
            showApp('starfield');
            break;
        case 'Digit3':
            showApp('matrix');
            break;
        case 'Home':
        case 'Escape':
            showApp('welcome');
            break;
    }
}

// Handle window resize
function handleWindowResize() {
    // Notify active app about resize
    switch (currentApp) {
        case 'lines':
            if (typeof linesWindowResized === 'function') {
                linesWindowResized();
            }
            break;
        case 'starfield':
            if (typeof starfieldWindowResized === 'function') {
                starfieldWindowResized();
            }
            break;
        case 'matrix':
            if (typeof matrixWindowResized === 'function') {
                matrixWindowResized();
            }
            break;
    }
}

// Utility function to show loading state
function showLoading() {
    isLoading = true;
    document.getElementById('loadingOverlay').style.display = 'flex';
}

// Utility function to hide loading state
function hideLoading() {
    isLoading = false;
    document.getElementById('loadingOverlay').style.display = 'none';
}

// App performance monitor
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
    }
    
    update() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round(this.frameCount * 1000 / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Update FPS display for current app
            this.updateFPSDisplay();
        }
    }
    
    updateFPSDisplay() {
        const fpsElement = document.getElementById(`${currentApp}FpsDisplay`);
        if (fpsElement) {
            fpsElement.textContent = this.fps;
        }
    }
}

// Global performance monitor
const performanceMonitor = new PerformanceMonitor();

// Fullscreen utilities
function requestFullscreen() {
    const element = document.documentElement;
    
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Touch/mobile support
function addTouchSupport() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Swipe gestures for navigation
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                // Swipe right - next app
                navigateNext();
            } else if (deltaX < -50) {
                // Swipe left - previous app
                navigatePrevious();
            }
        }
    });
}

// Navigation helpers
function navigateNext() {
    const apps = ['welcome', 'lines', 'starfield', 'matrix'];
    const currentIndex = apps.indexOf(currentApp);
    const nextIndex = (currentIndex + 1) % apps.length;
    showApp(apps[nextIndex]);
}

function navigatePrevious() {
    const apps = ['welcome', 'lines', 'starfield', 'matrix'];
    const currentIndex = apps.indexOf(currentApp);
    const prevIndex = (currentIndex - 1 + apps.length) % apps.length;
    showApp(apps[prevIndex]);
}

// Add touch support when page loads
document.addEventListener('DOMContentLoaded', addTouchSupport);

// URL hash navigation support
function handleHashChange() {
    const hash = window.location.hash.slice(1);
    const validApps = ['welcome', 'lines', 'starfield', 'matrix'];
    
    if (validApps.includes(hash)) {
        showApp(hash);
    }
}

window.addEventListener('hashchange', handleHashChange);
window.addEventListener('load', handleHashChange);

// Analytics and usage tracking (privacy-friendly)
class UsageTracker {
    constructor() {
        this.sessionStart = Date.now();
        this.appUsage = {};
        this.interactions = 0;
    }
    
    trackAppSwitch(appName) {
        if (!this.appUsage[appName]) {
            this.appUsage[appName] = {
                visits: 0,
                timeSpent: 0,
                lastVisit: Date.now()
            };
        }
        
        this.appUsage[appName].visits++;
        this.appUsage[appName].lastVisit = Date.now();
    }
    
    trackInteraction() {
        this.interactions++;
    }
    
    getSessionStats() {
        return {
            sessionDuration: Date.now() - this.sessionStart,
            appUsage: this.appUsage,
            totalInteractions: this.interactions
        };
    }
}

// Global usage tracker
const usageTracker = new UsageTracker();

// Export functions for use by individual apps
window.unifiedApp = {
    showApp,
    updateTheme,
    performanceMonitor,
    usageTracker,
    requestFullscreen,
    exitFullscreen
};

console.log('📱 Unified App Controller loaded successfully');
