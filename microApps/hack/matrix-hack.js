// Matrix Hack Theme - JavaScript/p5.js Version
// Converted from Processing with enhanced features

// Global variables (converted from Processing)
let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let numbers = ['0','1','2','3','4','5','6','7','8','9'];
let matrixChars = ['ｱ','ｲ','ｳ','ｴ','ｵ','ｶ','ｷ','ｸ','ｹ','ｺ','ｻ','ｼ','ｽ','ｾ','ｿ','ﾀ','ﾁ','ﾂ','ﾃ','ﾄ','ﾅ','ﾆ','ﾇ','ﾈ','ﾉ','ﾊ','ﾋ','ﾌ','ﾍ','ﾎ','ﾏ','ﾐ','ﾑ','ﾒ','ﾓ','ﾔ','ﾕ','ﾖ','ﾗ','ﾘ','ﾙ','ﾚ','ﾛ','ﾜ','ｦ','ﾝ'];
let currentCharSet = letters;

let lCount = 30; // Grid size (converted from Processing)
let txtSize, gap = 4, speed = 50;
let rowNo = 0, colNo = 0;

// Enhanced variables for web version
let isAnimating = true;
let mode = 'grid'; // 'grid', 'rain'
let colorMode = 'classic'; // 'classic', 'rainbow', 'fire'
let brightness = 150;
let matrixFont;

// Rain mode variables
let drops = [];
let fadeGrid = [];

// Color cycling
let hueOffset = 0;
let colorPalettes = {
    classic: [91, 250, 13], // Original green #5BFA0D
    matrix: [0, 255, 65],   // Brighter Matrix green
    rainbow: [],
    fire: [[255, 0, 0], [255, 100, 0], [255, 200, 0], [0, 255, 0]],
    cyber: [[0, 255, 255], [255, 0, 255], [0, 255, 0], [255, 255, 0]]
};

// Initialize rainbow palette
for (let i = 0; i < 360; i += 30) {
    colorPalettes.rainbow.push([
        Math.sin(radians(i)) * 127 + 128,
        Math.sin(radians(i + 120)) * 127 + 128,
        Math.sin(radians(i + 240)) * 127 + 128
    ]);
}

// Drop class for rain mode
class MatrixDrop {
    constructor(x) {
        this.x = x;
        this.y = random(-500, -50);
        this.speed = random(2, 8);
        this.chars = [];
        this.length = random(5, 25);
        this.opacity = 255;
        
        // Initialize character trail
        for (let i = 0; i < this.length; i++) {
            this.chars.push(this.getRandomChar());
        }
    }
    
    update() {
        this.y += this.speed;
        
        // Randomly change characters
        if (random(100) < 5) {
            let index = floor(random(this.chars.length));
            this.chars[index] = this.getRandomChar();
        }
        
        // Reset when off screen
        if (this.y > height + this.length * txtSize) {
            this.y = random(-500, -50);
            this.x = floor(random(lCount)) * (txtSize + gap);
            this.speed = random(2, 8);
            this.length = random(5, 25);
            this.chars = [];
            for (let i = 0; i < this.length; i++) {
                this.chars.push(this.getRandomChar());
            }
        }
    }
    
    display() {
        for (let i = 0; i < this.chars.length; i++) {
            let charY = this.y + i * txtSize;
            let alpha = map(i, 0, this.chars.length - 1, 255, 50);
            
            // Head character is brightest (white/yellow)
            if (i === 0) {
                fill(255, 255, 255, alpha);
            } else {
                let currentColor = this.getCurrentColor();
                fill(currentColor[0], currentColor[1], currentColor[2], alpha);
            }
            
            text(this.chars[i], this.x, charY);
        }
    }
    
    getRandomChar() {
        if (random(100) < 70) {
            return currentCharSet[floor(random(currentCharSet.length))];
        } else {
            return matrixChars[floor(random(matrixChars.length))];
        }
    }
    
    getCurrentColor() {
        switch(colorMode) {
            case 'rainbow':
                let hue = (frameCount + this.x * 0.1) % 360;
                return [
                    Math.sin(radians(hue)) * 127 + 128,
                    Math.sin(radians(hue + 120)) * 127 + 128,
                    Math.sin(radians(hue + 240)) * 127 + 128
                ];
            case 'fire':
                return colorPalettes.fire[floor(random(colorPalettes.fire.length))];
            case 'cyber':
                return colorPalettes.cyber[floor(random(colorPalettes.cyber.length))];
            default:
                return colorPalettes.classic;
        }
    }
}

// p5.js setup function
function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    
    // Initialize variables
    updateDisplaySettings();
    
    // Initialize rain drops
    initializeRainDrops();
    
    // Initialize fade grid for effects
    initializeFadeGrid();
    
    // Setup keyboard controls
    setupKeyboardControls();
    
    console.log("Matrix Hack Theme initialized");
}

// p5.js draw function
function draw() {
    if (!isAnimating) return;
    
    // Background
    background(0);
    
    // Set text properties
    textFont('Courier New, monospace'); // Web-safe monospace font
    textSize(txtSize);
    textAlign(LEFT, TOP);
    
    if (mode === 'grid') {
        drawGridMode();
    } else if (mode === 'rain') {
        drawRainMode();
    }
    
    // Update statistics
    updateStats();
    
    // Add delay equivalent to Processing's delay()
    if (frameCount % max(1, floor(speed / 16.67)) === 0) {
        // This creates the timing effect similar to Processing's delay()
    }
}

function drawGridMode() {
    // Original Processing logic converted to JavaScript
    rowNo = txtSize;
    colNo = 0;
    
    for (let l = 0; l < lCount; l++) {
        for (let m = 0; m < lCount; m++) {
            let ch = getRandomCharacter();
            
            // Set color based on current color mode
            setCurrentColor(l, m);
            
            text(ch, colNo, rowNo);
            colNo += txtSize + gap;
        }
        rowNo += txtSize + gap;
        colNo = 0;
    }
}

function drawRainMode() {
    // Update and display all rain drops
    for (let drop of drops) {
        drop.update();
        drop.display();
    }
    
    // Add fade effect to background
    fill(0, 0, 0, 20);
    rect(0, 0, width, height);
}

function getRandomCharacter() {
    // Mix different character sets based on probability
    if (random(100) < 60) {
        return currentCharSet[floor(random(currentCharSet.length))];
    } else if (random(100) < 80) {
        return numbers[floor(random(numbers.length))];
    } else {
        return matrixChars[floor(random(matrixChars.length))];
    }
}

function setCurrentColor(l, m) {
    let alpha = brightness;
    
    switch(colorMode) {
        case 'classic':
            fill(colorPalettes.classic[0], colorPalettes.classic[1], colorPalettes.classic[2], alpha);
            break;
        case 'matrix':
            fill(colorPalettes.matrix[0], colorPalettes.matrix[1], colorPalettes.matrix[2], alpha);
            break;
        case 'rainbow':
            let hue = (frameCount * 2 + l * 10 + m * 5) % 360;
            fill(
                Math.sin(radians(hue)) * 127 + 128,
                Math.sin(radians(hue + 120)) * 127 + 128,
                Math.sin(radians(hue + 240)) * 127 + 128,
                alpha
            );
            break;
        case 'fire':
            let fireColor = colorPalettes.fire[floor(random(colorPalettes.fire.length))];
            fill(fireColor[0], fireColor[1], fireColor[2], alpha);
            break;
        case 'cyber':
            let cyberColor = colorPalettes.cyber[(l + m + frameCount) % colorPalettes.cyber.length];
            fill(cyberColor[0], cyberColor[1], cyberColor[2], alpha);
            break;
        default:
            fill(91, 250, 13, alpha); // Original Processing color
    }
}

function initializeRainDrops() {
    drops = [];
    let numDrops = floor(lCount * 0.7); // 70% of grid columns have drops
    
    for (let i = 0; i < numDrops; i++) {
        let x = floor(random(lCount)) * (txtSize + gap);
        drops.push(new MatrixDrop(x));
    }
}

function initializeFadeGrid() {
    fadeGrid = [];
    for (let i = 0; i < lCount; i++) {
        fadeGrid[i] = [];
        for (let j = 0; j < lCount; j++) {
            fadeGrid[i][j] = 0;
        }
    }
}

function updateDisplaySettings() {
    txtSize = width / lCount;
    
    // Ensure minimum readable size
    if (txtSize < 8) {
        txtSize = 8;
        lCount = floor(width / txtSize);
    }
}

// UI Control Functions
function updateGridSize(value) {
    lCount = parseInt(value);
    document.getElementById('gridSizeValue').textContent = value;
    updateDisplaySettings();
    initializeRainDrops();
}

function updateSpeed(value) {
    speed = parseInt(value);
    document.getElementById('speedValue').textContent = value + 'ms';
}

function updateBrightness(value) {
    brightness = parseInt(value);
    document.getElementById('brightnessValue').textContent = value;
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    const btn = document.querySelector('button[onclick="toggleAnimation()"]');
    btn.textContent = isAnimating ? '⏸️ PAUSE' : '▶️ PLAY';
    btn.classList.toggle('active');
    
    if (isAnimating) {
        loop(); // Resume p5.js draw loop
    } else {
        noLoop(); // Pause p5.js draw loop
    }
}

function toggleMode() {
    mode = mode === 'grid' ? 'rain' : 'grid';
    const btn = document.querySelector('button[onclick="toggleMode()"]');
    btn.textContent = mode === 'grid' ? '🌀 RAIN MODE' : '⚫ GRID MODE';
    btn.classList.toggle('active');
    
    if (mode === 'rain') {
        initializeRainDrops();
    }
}

let colorModeIndex = 0;
const colorModeNames = ['classic', 'matrix', 'rainbow', 'fire', 'cyber'];

function toggleColors() {
    colorModeIndex = (colorModeIndex + 1) % colorModeNames.length;
    colorMode = colorModeNames[colorModeIndex];
    
    const btn = document.querySelector('button[onclick="toggleColors()"]');
    btn.textContent = `🎨 ${colorMode.toUpperCase()}`;
    btn.classList.toggle('active');
}

function captureFrame() {
    // Save current frame as image
    save('matrix-hack-frame.png');
    
    // Visual feedback
    const btn = document.querySelector('button[onclick="captureFrame()"]');
    const originalText = btn.textContent;
    btn.textContent = '✅ SAVED!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 1000);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            resizeCanvas(window.innerWidth, window.innerHeight);
            updateDisplaySettings();
            initializeRainDrops();
        });
    } else {
        document.exitFullscreen().then(() => {
            resizeCanvas(800, 600);
            updateDisplaySettings();
            initializeRainDrops();
        });
    }
}

function updateStats() {
    document.getElementById('characterCount').textContent = lCount * lCount;
    document.getElementById('currentMode').textContent = mode.toUpperCase();
    document.getElementById('frameRate').textContent = Math.round(frameRate());
}

// Keyboard controls
function setupKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        switch(event.key.toLowerCase()) {
            case ' ':
                toggleAnimation();
                event.preventDefault();
                break;
            case 'r':
                toggleMode();
                break;
            case 'c':
                toggleColors();
                break;
            case 's':
                captureFrame();
                break;
            case 'f':
                toggleFullscreen();
                break;
            case '1':
                currentCharSet = letters;
                break;
            case '2':
                currentCharSet = numbers;
                break;
            case '3':
                currentCharSet = matrixChars;
                break;
        }
    });
}

// Handle window resize
function windowResized() {
    if (document.fullscreenElement) {
        resizeCanvas(window.innerWidth, window.innerHeight);
    } else {
        resizeCanvas(800, 600);
    }
    updateDisplaySettings();
    initializeRainDrops();
}

// Utility functions
function radians(degrees) {
    return degrees * (Math.PI / 180);
}

// Mouse interaction - change character set based on mouse position
function mouseMoved() {
    if (mouseX < width / 3) {
        currentCharSet = letters;
    } else if (mouseX < width * 2 / 3) {
        currentCharSet = numbers;
    } else {
        currentCharSet = matrixChars;
    }
}

// Click to add special effects
function mousePressed() {
    // Add burst effect at mouse position
    if (mode === 'rain') {
        let newDrop = new MatrixDrop(floor(mouseX / (txtSize + gap)) * (txtSize + gap));
        newDrop.y = mouseY;
        drops.push(newDrop);
        
        // Limit number of drops for performance
        if (drops.length > lCount * 2) {
            drops.splice(0, drops.length - lCount);
        }
    }
}

// Background matrix effect
function createBackgroundMatrix() {
    const overlay = document.getElementById('matrix-bg');
    overlay.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const char = document.createElement('div');
        char.textContent = getRandomCharacter();
        char.style.position = 'absolute';
        char.style.left = Math.random() * 100 + '%';
        char.style.top = Math.random() * 100 + '%';
        char.style.color = 'rgba(0, 255, 65, 0.1)';
        char.style.fontSize = Math.random() * 20 + 10 + 'px';
        char.style.fontFamily = 'Courier New, monospace';
        char.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        overlay.appendChild(char);
    }
}

// Initialize background effect
setTimeout(createBackgroundMatrix, 1000);

// Performance monitoring
setInterval(() => {
    console.log(`Matrix Performance: ${Math.round(frameRate())} FPS, ${drops.length} drops, Mode: ${mode}`);
}, 5000);

// Auto-cycle colors in rainbow mode
setInterval(() => {
    if (colorMode === 'rainbow') {
        hueOffset += 1;
    }
}, 100);
