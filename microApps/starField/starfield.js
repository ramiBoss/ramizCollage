// StarField Simulation - JavaScript/p5.js Version
// Converted from Processing to HTML5/JavaScript

// Global variables
let stars = [];
let speed;
let starCount = 500;
let maxSpeed = 15;
let maxStarSize = 50;
let showTrails = false;
let colorMode = false;
let isPaused = false;

// Color palettes for different modes
const colorPalettes = {
    classic: [255, 255, 255], // White
    rainbow: [],
    nebula: [[255, 100, 150], [100, 150, 255], [150, 255, 100], [255, 255, 100]],
    fire: [[255, 200, 0], [255, 100, 0], [255, 50, 0], [200, 0, 0]]
};

// Initialize rainbow palette
for (let i = 0; i < 360; i += 30) {
    colorPalettes.rainbow.push([
        Math.sin(radians(i)) * 127 + 128,
        Math.sin(radians(i + 120)) * 127 + 128,
        Math.sin(radians(i + 240)) * 127 + 128
    ]);
}

// Star class - converted from Processing
class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z;
        this.color = [255, 255, 255];
        this.trail = [];
        this.maxTrailLength = 10;
    }

    update() {
        // Store previous z for trail effect
        this.pz = this.z;
        
        // Move star towards camera
        this.z = this.z - speed;
        
        // Reset star when it reaches the camera
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
            this.trail = []; // Clear trail when star resets
        }

        // Update trail if enabled
        if (showTrails) {
            let sx = map(this.x / this.z, 0, 1, 0, width);
            let sy = map(this.y / this.z, 0, 1, 0, height);
            
            this.trail.push({x: sx, y: sy, alpha: 255});
            
            // Limit trail length
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
            
            // Fade trail points
            for (let i = 0; i < this.trail.length; i++) {
                this.trail[i].alpha = map(i, 0, this.trail.length - 1, 50, 255);
            }
        }

        // Update color for dynamic modes
        if (colorMode) {
            this.updateColor();
        }
    }

    updateColor() {
        const mode = getCurrentColorMode();
        
        switch(mode) {
            case 'rainbow':
                let hue = (frameCount + this.z * 0.01) % 360;
                this.color = [
                    Math.sin(radians(hue)) * 127 + 128,
                    Math.sin(radians(hue + 120)) * 127 + 128,
                    Math.sin(radians(hue + 240)) * 127 + 128
                ];
                break;
            case 'nebula':
                let palette = colorPalettes.nebula;
                let index = Math.floor(this.z / width * palette.length);
                index = constrain(index, 0, palette.length - 1);
                this.color = palette[index];
                break;
            case 'fire':
                let firePalette = colorPalettes.fire;
                let fireIndex = Math.floor(speed / maxSpeed * firePalette.length);
                fireIndex = constrain(fireIndex, 0, firePalette.length - 1);
                this.color = firePalette[fireIndex];
                break;
            default:
                this.color = [255, 255, 255];
        }
    }

    show() {
        // Draw trail if enabled
        if (showTrails && this.trail.length > 1) {
            stroke(this.color[0], this.color[1], this.color[2], 100);
            strokeWeight(1);
            noFill();
            
            beginShape();
            for (let point of this.trail) {
                vertex(point.x, point.y);
            }
            endShape();
        }

        // Calculate star position and size
        fill(this.color[0], this.color[1], this.color[2]);
        noStroke();
        
        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);
        let r = map(this.z, 0, width, maxStarSize, 0);
        
        // Add pulsing effect for larger stars
        if (r > 10) {
            r += sin(frameCount * 0.1 + this.z * 0.01) * 2;
        }
        
        // Draw star with glow effect
        if (r > 5) {
            // Outer glow
            fill(this.color[0], this.color[1], this.color[2], 50);
            ellipse(sx, sy, r * 1.5, r * 1.5);
            
            // Inner bright core
            fill(this.color[0], this.color[1], this.color[2], 255);
            ellipse(sx, sy, r, r);
            
            // Bright center
            fill(255, 255, 255, 200);
            ellipse(sx, sy, r * 0.3, r * 0.3);
        } else {
            // Small distant stars
            fill(this.color[0], this.color[1], this.color[2], 200);
            ellipse(sx, sy, r, r);
        }

        // Optional: Draw speed lines for very fast movement
        if (speed > 10 && !showTrails) {
            let px = map(this.x / this.pz, 0, 1, 0, width);
            let py = map(this.y / this.pz, 0, 1, 0, height);
            
            stroke(this.color[0], this.color[1], this.color[2], 100);
            strokeWeight(1);
            line(px, py, sx, sy);
        }
    }
}

// p5.js setup function
function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');
    
    // Initialize stars array
    initializeStars();
    
    // Set initial speed
    speed = 1;
    
    // Add keyboard event listeners
    setupKeyboardControls();
    
    console.log("StarField simulation initialized with", starCount, "stars");
}

// p5.js draw function
function draw() {
    // Background with subtle fade effect
    if (showTrails) {
        fill(0, 0, 0, 50); // Semi-transparent black for trail effect
        rect(0, 0, width, height);
    } else {
        background(0); // Solid black background
    }
    
    // Calculate speed based on mouse position (like original Processing code)
    if (!isPaused) {
        speed = map(mouseX, 0, width, 1, maxSpeed);
    } else {
        speed = 0;
    }
    
    // Move origin to center of canvas
    translate(width / 2, height / 2);
    
    // Update and draw all stars
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
    
    // Update UI statistics
    updateStats();
}

// Initialize stars array
function initializeStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
        stars[i] = new Star();
    }
}

// UI Control Functions
function updateStarCount(value) {
    starCount = parseInt(value);
    document.getElementById('starCountValue').textContent = value;
    initializeStars();
}

function updateMaxSpeed(value) {
    maxSpeed = parseInt(value);
    document.getElementById('maxSpeedValue').textContent = value;
}

function updateStarSize(value) {
    maxStarSize = parseInt(value);
    document.getElementById('starSizeValue').textContent = value;
}

function toggleTrails() {
    showTrails = !showTrails;
    const btn = document.querySelector('.btn-primary');
    btn.textContent = showTrails ? '🌟 Trails: ON' : '🌟 Toggle Trails';
    btn.classList.toggle('active');
}

let currentColorModeIndex = 0;
const colorModeNames = ['classic', 'rainbow', 'nebula', 'fire'];

function toggleColors() {
    colorMode = !colorMode;
    if (colorMode) {
        currentColorModeIndex = (currentColorModeIndex + 1) % colorModeNames.length;
    }
    
    const btn = document.querySelector('.btn-secondary');
    btn.textContent = colorMode ? `🎨 ${colorModeNames[currentColorModeIndex].toUpperCase()}` : '🎨 Color Mode';
    btn.classList.toggle('active');
}

function getCurrentColorMode() {
    return colorModeNames[currentColorModeIndex];
}

function resetStars() {
    initializeStars();
    speed = 1;
    showTrails = false;
    colorMode = false;
    isPaused = false;
    
    // Reset UI buttons
    document.querySelector('.btn-primary').textContent = '🌟 Toggle Trails';
    document.querySelector('.btn-secondary').textContent = '🎨 Color Mode';
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            // Resize canvas to fullscreen
            resizeCanvas(window.innerWidth, window.innerHeight);
            initializeStars(); // Reinitialize for new canvas size
        });
    } else {
        document.exitFullscreen().then(() => {
            // Restore original canvas size
            resizeCanvas(800, 600);
            initializeStars(); // Reinitialize for original canvas size
        });
    }
}

function updateStats() {
    document.getElementById('starCount').textContent = stars.length;
    document.getElementById('currentSpeed').textContent = speed.toFixed(1);
    document.getElementById('frameRate').textContent = Math.round(frameRate());
}

// Keyboard controls
function setupKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        switch(event.key.toLowerCase()) {
            case 't':
                toggleTrails();
                break;
            case 'c':
                toggleColors();
                break;
            case 'r':
                resetStars();
                break;
            case 'f':
                toggleFullscreen();
                break;
            case ' ':
                isPaused = !isPaused;
                event.preventDefault();
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
    initializeStars(); // Reinitialize stars for new canvas size
}

// Utility functions
function radians(degrees) {
    return degrees * (Math.PI / 180);
}

// Enhanced mouse interaction
function mousePressed() {
    // Add some stars at mouse position when clicked
    for (let i = 0; i < 10; i++) {
        let newStar = new Star();
        // Position new stars around mouse click
        newStar.x = map(mouseX - width/2, 0, width, -width, width) + random(-50, 50);
        newStar.y = map(mouseY - height/2, 0, height, -height, height) + random(-50, 50);
        newStar.z = random(width * 0.5, width);
        stars.push(newStar);
    }
    
    // Limit total stars to prevent performance issues
    if (stars.length > starCount * 2) {
        stars = stars.slice(0, starCount);
    }
}

// Performance monitoring
setInterval(() => {
    // Log performance stats every 5 seconds
    console.log(`StarField Performance: ${Math.round(frameRate())} FPS, ${stars.length} stars, Speed: ${speed.toFixed(1)}`);
}, 5000);
