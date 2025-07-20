// Falling Lines Animation - JavaScript/p5.js Version
// Converted from Processing with enhanced features

// Global variables (converted from Processing)
let fLines = [];
let thickness = 2;
let noLines;
let xpos = 2;
let count = 0;
let gap = 4;

// Enhanced variables for web version
let isAnimating = true;
let speedMultiplier = 1.0;
let gravityMultiplier = 1.0;
let showTrails = false;
let colorMode = 'random'; // 'random', 'rainbow', 'gradient'
let bgColorIndex = 0;
let canvasWidth = 600;
let canvasHeight = 600;

// Background colors
let bgColors = [
    [27, 242, 50],    // Original green #1BF232
    [255, 255, 255],   // White
    [0, 0, 0],         // Black
    [30, 30, 60],      // Dark blue
    [60, 20, 60]       // Purple
];
let bgColorNames = ['Green', 'White', 'Black', 'Blue', 'Purple'];

// FPS tracking
let fpsHistory = [];
let lastFpsUpdate = 0;

// FalLine class (converted from Processing)
class FalLine {
    constructor(fallSpeed, xpos) {
        this.x = xpos;
        this.oldy = 0;
        this.newy = 0;
        this.fallSpeed = fallSpeed;
        this.reverse = false;
        this.originalSpeed = fallSpeed;
        this.hue = random(360); // For rainbow mode
        this.bounceCount = 0;
        this.maxBounces = random(5, 15);
        this.alpha = 255;
        this.trail = [];
        this.maxTrailLength = 20;
    }

    fall() {
        // Apply speed and gravity multipliers
        let currentSpeed = this.fallSpeed * speedMultiplier * gravityMultiplier;
        
        // Store trail positions
        if (showTrails) {
            this.trail.push({x: this.x, y: this.newy, alpha: this.alpha});
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
        }

        // Bounce logic with enhanced physics
        if (this.newy >= height) {
            this.reverse = true;
            this.oldy = height;
            this.bounceCount++;
            
            // Create bounce effect
            push();
            fill(this.getColor());
            ellipse(this.x, this.newy - currentSpeed, 30 + random(20), 30 + random(20));
            pop();
            
            // Gradual speed reduction after bounces
            if (this.bounceCount >= this.maxBounces) {
                this.reset();
            } else {
                this.fallSpeed *= 0.8; // Lose energy on bounce
            }
        } else if (this.newy <= 0 && this.reverse) {
            this.oldy = 0;
            this.reverse = false;
            this.bounceCount++;
            
            // Create bounce effect
            push();
            fill(this.getColor());
            ellipse(this.x, this.newy + currentSpeed, 30 + random(20), 30 + random(20));
            pop();
            
            if (this.bounceCount >= this.maxBounces) {
                this.reset();
            } else {
                this.fallSpeed *= 0.8;
            }
        }

        // Update position
        if (this.reverse) {
            this.newy -= currentSpeed;
        } else {
            this.newy += currentSpeed;
        }
    }

    show() {
        push();
        
        // Draw trail if enabled
        if (showTrails && this.trail.length > 1) {
            for (let i = 0; i < this.trail.length - 1; i++) {
                let alpha = map(i, 0, this.trail.length - 1, 50, 255);
                let trailColor = this.getColor();
                trailColor[3] = alpha;
                stroke(trailColor);
                strokeWeight(thickness * 0.5);
                line(this.trail[i].x, this.trail[i].y, this.trail[i + 1].x, this.trail[i + 1].y);
            }
        }
        
        // Draw main line
        stroke(this.getColor());
        strokeWeight(thickness);
        line(this.x, this.oldy, this.x, this.newy);
        
        pop();
    }

    getColor() {
        switch (colorMode) {
            case 'random':
                return [random(255), random(255), random(255)];
            case 'rainbow':
                colorMode(HSB);
                let col = [this.hue, 80, 90];
                colorMode(RGB);
                this.hue = (this.hue + 1) % 360;
                return col;
            case 'gradient':
                let factor = map(this.newy, 0, height, 0, 1);
                return [
                    lerp(255, 100, factor),
                    lerp(100, 255, factor),
                    lerp(150, 200, factor)
                ];
            default:
                return [255, 255, 255];
        }
    }

    reset() {
        this.newy = 0;
        this.oldy = 0;
        this.reverse = false;
        this.bounceCount = 0;
        this.fallSpeed = this.originalSpeed;
        this.maxBounces = random(5, 15);
        this.hue = random(360);
        this.trail = [];
    }
}

// p5.js setup function
function setup() {
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-wrapper');
    
    // Initialize lines
    initializeLines();
    
    // Set initial stroke weight
    strokeWeight(thickness);
    
    console.log('Falling Lines Animation initialized');
    console.log(`Canvas size: ${width}x${height}`);
    console.log(`Number of lines: ${noLines}`);
}

// p5.js draw function
function draw() {
    if (!isAnimating) return;
    
    // Set background
    let bgColor = bgColors[bgColorIndex];
    background(bgColor[0], bgColor[1], bgColor[2]);
    
    // Update and draw all lines
    for (let i = 0; i < noLines; i++) {
        fLines[i].show();
        fLines[i].fall();
    }
    
    count++;
    
    // Update FPS display
    updateFPS();
}

function initializeLines() {
    xpos = 2;
    noLines = Math.floor(width / (thickness + gap));
    fLines = [];
    
    for (let i = 0; i < noLines; i++) {
        fLines[i] = new FalLine(random(1) + 0.015, xpos);
        xpos += thickness + gap;
    }
    
    // Update lines display
    document.getElementById('linesDisplay').textContent = noLines;
    
    console.log(`Initialized ${noLines} lines`);
}

function updateFPS() {
    if (millis() - lastFpsUpdate > 500) { // Update every 500ms
        let currentFPS = Math.round(frameRate());
        fpsHistory.push(currentFPS);
        if (fpsHistory.length > 10) {
            fpsHistory.shift();
        }
        
        let avgFPS = Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length);
        document.getElementById('fpsDisplay').textContent = avgFPS;
        lastFpsUpdate = millis();
    }
}

// Control Functions
function toggleAnimation() {
    isAnimating = !isAnimating;
    document.getElementById('playPauseText').textContent = isAnimating ? 'Pause' : 'Play';
    
    if (isAnimating) {
        loop();
    } else {
        noLoop();
    }
}

function resetAnimation() {
    count = 0;
    for (let line of fLines) {
        line.reset();
    }
    console.log('Animation reset');
}

function updateSpeed(value) {
    speedMultiplier = parseFloat(value);
    document.getElementById('speedValue').textContent = speedMultiplier.toFixed(1);
}

function updateGravity(value) {
    gravityMultiplier = parseFloat(value);
    document.getElementById('gravityValue').textContent = gravityMultiplier.toFixed(1);
}

function updateThickness(value) {
    thickness = parseInt(value);
    document.getElementById('thicknessValue').textContent = thickness;
    initializeLines(); // Reinitialize with new thickness
}

function updateDensity(value) {
    gap = parseInt(value);
    document.getElementById('densityValue').textContent = gap;
    initializeLines(); // Reinitialize with new density
}

function toggleTrails() {
    showTrails = !showTrails;
    document.getElementById('trailsText').textContent = showTrails ? 'Disable Trails' : 'Enable Trails';
    
    // Clear existing trails
    for (let line of fLines) {
        line.trail = [];
    }
}

function cycleColorMode() {
    const modes = ['random', 'rainbow', 'gradient'];
    const modeNames = ['Random', 'Rainbow', 'Gradient'];
    let currentIndex = modes.indexOf(colorMode);
    currentIndex = (currentIndex + 1) % modes.length;
    colorMode = modes[currentIndex];
    document.getElementById('colorModeText').textContent = modeNames[currentIndex];
}

function cycleBgColor() {
    bgColorIndex = (bgColorIndex + 1) % bgColors.length;
    document.getElementById('bgColorText').textContent = bgColorNames[bgColorIndex];
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Keyboard Controls
function keyPressed() {
    switch (key) {
        case ' ':
            toggleAnimation();
            break;
        case 'r':
        case 'R':
            resetAnimation();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
        case 't':
        case 'T':
            toggleTrails();
            break;
        case 'c':
        case 'C':
            cycleColorMode();
            break;
        case 'b':
        case 'B':
            cycleBgColor();
            break;
    }
    
    // Arrow keys for speed control
    if (keyCode === UP_ARROW) {
        let currentSpeed = parseFloat(document.getElementById('speedSlider').value);
        currentSpeed = Math.min(5.0, currentSpeed + 0.1);
        document.getElementById('speedSlider').value = currentSpeed;
        updateSpeed(currentSpeed);
    } else if (keyCode === DOWN_ARROW) {
        let currentSpeed = parseFloat(document.getElementById('speedSlider').value);
        currentSpeed = Math.max(0.1, currentSpeed - 0.1);
        document.getElementById('speedSlider').value = currentSpeed;
        updateSpeed(currentSpeed);
    }
}

// Window resize handler
function windowResized() {
    // Maintain aspect ratio while fitting in container
    let container = document.getElementById('canvas-wrapper');
    let containerWidth = container.offsetWidth;
    let containerHeight = Math.min(containerWidth, 600);
    
    resizeCanvas(containerWidth, containerHeight);
    initializeLines();
    
    console.log(`Canvas resized to: ${width}x${height}`);
}

// Mouse interaction
function mousePressed() {
    // Add some interactivity - create ripple effect
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        push();
        fill(255, 255, 255, 100);
        noStroke();
        ellipse(mouseX, mouseY, 50, 50);
        pop();
        
        // Affect nearby lines
        for (let line of fLines) {
            let distance = Math.abs(line.x - mouseX);
            if (distance < 50) {
                line.fallSpeed += 0.5;
            }
        }
    }
}

// Utility function for color interpolation
function lerpColor(c1, c2, amt) {
    return [
        lerp(c1[0], c2[0], amt),
        lerp(c1[1], c2[1], amt),
        lerp(c1[2], c2[2], amt)
    ];
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    console.log('Falling Lines Animation loaded successfully');
});
