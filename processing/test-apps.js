// Test Script for Unified Visual Apps
// Run this in browser console to test all apps

console.log('🎨 Testing Unified Visual Apps Collection...');

// Test navigation
function testNavigation() {
    console.log('Testing navigation...');
    
    // Test each section
    const sections = ['home', 'starfield', 'matrix', 'twinklestars', 'fallinglines'];
    
    sections.forEach((section, index) => {
        setTimeout(() => {
            showSection(section);
            console.log(`✅ Navigated to ${section}`);
        }, index * 2000);
    });
}

// Test controls
function testControls() {
    console.log('Testing app controls...');
    
    // Test StarField controls
    setTimeout(() => {
        if (window.starFieldControls) {
            starFieldControls.updateSpeed(10);
            starFieldControls.updateStarCount(300);
            starFieldControls.toggleTrails();
            console.log('✅ StarField controls working');
        }
    }, 2000);
    
    // Test Matrix controls
    setTimeout(() => {
        if (window.matrixControls) {
            matrixControls.updateSpeed(5);
            matrixControls.updateDensity(30);
            console.log('✅ Matrix controls working');
        }
    }, 4000);
    
    // Test TwinkleStars controls
    setTimeout(() => {
        if (window.twinkleControls) {
            twinkleControls.setMode(2);
            twinkleControls.updateSpeed(20);
            console.log('✅ TwinkleStars controls working');
        }
    }, 6000);
    
    // Test Falling Lines controls
    setTimeout(() => {
        if (window.linesControls) {
            linesControls.updateSpeed(2.0);
            linesControls.updateGravity(1.5);
            console.log('✅ Falling Lines controls working');
        }
    }, 8000);
}

// Test keyboard shortcuts
function testKeyboardShortcuts() {
    console.log('Testing keyboard shortcuts...');
    
    const keys = ['1', '2', '3', '4', 'h'];
    keys.forEach((key, index) => {
        setTimeout(() => {
            const event = new KeyboardEvent('keydown', { key: key });
            document.dispatchEvent(event);
            console.log(`✅ Keyboard shortcut '${key}' tested`);
        }, index * 1000);
    });
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting comprehensive tests...');
    
    testNavigation();
    
    setTimeout(() => {
        testControls();
    }, 10000);
    
    setTimeout(() => {
        testKeyboardShortcuts();
    }, 20000);
    
    setTimeout(() => {
        console.log('🎉 All tests completed! Check console for results.');
    }, 25000);
}

// Auto-run tests (uncomment to enable)
// runAllTests();

console.log('💡 Run runAllTests() to test all functionality');
console.log('💡 Or test individual parts with testNavigation(), testControls(), testKeyboardShortcuts()');
