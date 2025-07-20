// 🎨 Unified Visual Apps Collection - JavaScript Controller
// Manages multiple p5.js visual applications in a single-page app

// Global app state
let currentApp = null;
let appInstances = {};
let isInitialized = false;

// Navigation and app management
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Stop current app if switching away
    if (currentApp && sectionId !== currentApp) {
        stopCurrentApp();
    }
    
    // Initialize new app if needed
    if (sectionId !== 'home' && sectionId !== currentApp) {
        initializeApp(sectionId);
    }
    
    currentApp = sectionId;
}

// Stop the currently running app
function stopCurrentApp() {
    if (currentApp && appInstances[currentApp]) {
        // Remove p5.js canvas
        if (appInstances[currentApp].canvas) {
            appInstances[currentApp].canvas.remove();
        }
        
        // Clear p5.js instance
        if (typeof remove === 'function') {
            remove();
        }
        
        // Reset p5.js global variables
        resetP5Globals();
        
        appInstances[currentApp] = null;
    }
}

// Reset p5.js global variables
function resetP5Globals() {
    // Clear any intervals or timeouts
    if (window.p5Instance) {
        window.p5Instance.remove();
        window.p5Instance = null;
    }
}

// Initialize specific app
function initializeApp(appId) {
    switch(appId) {
        case 'starfield':
            initStarField();
            break;
        case 'matrix':
            initMatrix();
            break;
        case 'twinklestars':
            initTwinkleStars();
            break;
        case 'fallinglines':
            initFallingLines();
            break;
    }
}

// ================================
// STARFIELD APP
// ================================
function initStarField() {
    const starFieldSketch = (p) => {
        // StarField variables
        let stars = [];
        let speed = 5;
        let starCount = 500;
        let maxSpeed = 15;
        let maxStarSize = 50;
        let showTrails = false;
        let colorMode = false;
        let isPaused = false;
        let currentColorMode = 'classic';

        // Star class
        class Star {
            constructor() {
                this.x = p.random(-p.width, p.width);
                this.y = p.random(-p.height, p.height);
                this.z = p.random(p.width);
                this.pz = this.z;
                this.color = [255, 255, 255];
                this.trail = [];
                this.maxTrailLength = 10;
            }

            update() {
                this.pz = this.z;
                this.z = this.z - speed;
                
                if (this.z < 1) {
                    this.z = p.width;
                    this.x = p.random(-p.width, p.width);
                    this.y = p.random(-p.height, p.height);
                    this.pz = this.z;
                    this.trail = [];
                }

                if (showTrails) {
                    let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
                    let sy = p.map(this.y / this.z, 0, 1, 0, p.height);
                    
                    this.trail.push({x: sx, y: sy, alpha: 255});
                    
                    if (this.trail.length > this.maxTrailLength) {
                        this.trail.shift();
                    }
                    
                    for (let i = 0; i < this.trail.length; i++) {
                        this.trail[i].alpha = p.map(i, 0, this.trail.length - 1, 50, 255);
                    }
                }

                if (colorMode) {
                    this.updateColor();
                }
            }

            updateColor() {
                switch(currentColorMode) {
                    case 'rainbow':
                        let hue = (p.frameCount + this.z * 0.01) % 360;
                        this.color = [
                            p.sin(p.radians(hue)) * 127 + 128,
                            p.sin(p.radians(hue + 120)) * 127 + 128,
                            p.sin(p.radians(hue + 240)) * 127 + 128
                        ];
                        break;
                    case 'fire':
                        let intensity = p.map(this.z, 0, p.width, 255, 100);
                        this.color = [intensity, intensity * 0.4, 0];
                        break;
                    case 'ice':
                        let coldness = p.map(this.z, 0, p.width, 100, 255);
                        this.color = [coldness * 0.3, coldness * 0.7, coldness];
                        break;
                    default:
                        this.color = [255, 255, 255];
                }
            }

            show() {
                p.fill(this.color[0], this.color[1], this.color[2]);
                p.noStroke();

                // Draw trail
                if (showTrails) {
                    for (let i = 0; i < this.trail.length; i++) {
                        let point = this.trail[i];
                        p.fill(this.color[0], this.color[1], this.color[2], point.alpha);
                        p.ellipse(point.x, point.y, 2);
                    }
                }

                // Draw star
                let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
                let sy = p.map(this.y / this.z, 0, 1, 0, p.height);
                let r = p.map(this.z, 0, p.width, maxStarSize, 0);
                
                p.ellipse(sx, sy, r, r);

                // Draw line from previous position
                let px = p.map(this.x / this.pz, 0, 1, 0, p.width);
                let py = p.map(this.y / this.pz, 0, 1, 0, p.height);
                
                p.stroke(this.color[0], this.color[1], this.color[2]);
                p.line(px, py, sx, sy);
            }
        }

        p.setup = () => {
            let canvas = p.createCanvas(800, 600);
            canvas.parent('starfield-canvas');
            
            // Initialize stars
            for (let i = 0; i < starCount; i++) {
                stars[i] = new Star();
            }
        };

        p.draw = () => {
            p.background(0);
            p.translate(p.width / 2, p.height / 2);

            if (!isPaused) {
                for (let i = 0; i < stars.length; i++) {
                    stars[i].update();
                    stars[i].show();
                }
            } else {
                for (let i = 0; i < stars.length; i++) {
                    stars[i].show();
                }
            }
        };

        // Control functions
        window.starFieldControls = {
            updateSpeed: (value) => {
                speed = parseFloat(value);
                document.getElementById('sf-speed').textContent = value;
            },
            updateStarCount: (value) => {
                let newCount = parseInt(value);
                if (newCount > starCount) {
                    for (let i = starCount; i < newCount; i++) {
                        stars[i] = new Star();
                    }
                } else {
                    stars = stars.slice(0, newCount);
                }
                starCount = newCount;
                document.getElementById('sf-count').textContent = value;
            },
            updateStarSize: (value) => {
                maxStarSize = parseInt(value);
                document.getElementById('sf-size').textContent = value;
            },
            toggleTrails: () => {
                showTrails = !showTrails;
                for (let star of stars) {
                    star.trail = [];
                }
            },
            togglePause: () => {
                isPaused = !isPaused;
            },
            reset: () => {
                for (let i = 0; i < stars.length; i++) {
                    stars[i] = new Star();
                }
            },
            setColorMode: (mode) => {
                currentColorMode = mode;
                colorMode = mode !== 'classic';
            }
        };
    };

    appInstances.starfield = new p5(starFieldSketch);
}

// ================================
// MATRIX APP
// ================================
function initMatrix() {
    const matrixSketch = (p) => {
        let streams = [];
        let streamCount = 50;
        let symbols = 'アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブプエケセテネヘメレゲゼデベペオコソトノホモヨロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let fontSize = 14;
        let fadeSpeed = 3;

        class Stream {
            constructor() {
                this.x = p.random(p.width);
                this.y = p.random(-500, 0);
                this.speed = p.random(1, 5);
                this.chars = [];
                this.length = p.random(10, 30);
                
                for (let i = 0; i < this.length; i++) {
                    this.chars.push({
                        char: symbols.charAt(p.floor(p.random(symbols.length))),
                        changeTime: p.random(5, 20)
                    });
                }
            }

            update() {
                this.y += this.speed;
                
                if (this.y > p.height + this.length * fontSize) {
                    this.y = p.random(-500, 0);
                    this.x = p.random(p.width);
                }

                // Change characters randomly
                for (let char of this.chars) {
                    char.changeTime--;
                    if (char.changeTime <= 0) {
                        char.char = symbols.charAt(p.floor(p.random(symbols.length)));
                        char.changeTime = p.random(5, 20);
                    }
                }
            }

            show() {
                p.textSize(fontSize);
                p.textAlign(p.CENTER, p.CENTER);
                
                for (let i = 0; i < this.chars.length; i++) {
                    let alpha = p.map(i, 0, this.chars.length - 1, 255, 50);
                    
                    if (i === 0) {
                        p.fill(200, 255, 200, alpha); // Bright green for head
                    } else {
                        p.fill(0, 255, 70, alpha); // Matrix green
                    }
                    
                    let charY = this.y + i * fontSize;
                    if (charY > 0 && charY < p.height) {
                        p.text(this.chars[i].char, this.x, charY);
                    }
                }
            }
        }

        p.setup = () => {
            let canvas = p.createCanvas(800, 600);
            canvas.parent('matrix-canvas');
            
            // Initialize streams
            for (let i = 0; i < streamCount; i++) {
                streams.push(new Stream());
            }
        };

        p.draw = () => {
            p.background(0, fadeSpeed);
            
            for (let stream of streams) {
                stream.update();
                stream.show();
            }
        };

        // Control functions
        window.matrixControls = {
            updateSpeed: (value) => {
                fadeSpeed = parseInt(value);
                document.getElementById('mx-speed').textContent = value;
            },
            updateDensity: (value) => {
                let newCount = parseInt(value);
                if (newCount > streamCount) {
                    for (let i = streamCount; i < newCount; i++) {
                        streams.push(new Stream());
                    }
                } else {
                    streams = streams.slice(0, newCount);
                }
                streamCount = newCount;
                document.getElementById('mx-density').textContent = value;
            },
            updateFontSize: (value) => {
                fontSize = parseInt(value);
                document.getElementById('mx-fontsize').textContent = value;
            },
            reset: () => {
                streams = [];
                for (let i = 0; i < streamCount; i++) {
                    streams.push(new Stream());
                }
            }
        };
    };

    appInstances.matrix = new p5(matrixSketch);
}

// ================================
// TWINKLE STARS APP
// ================================
function initTwinkleStars() {
    const twinkleSketch = (p) => {
        let particles = [];
        let mouseTrail = [];
        let backgroundHue = 0;
        let rainbowOffset = 0;
        let currentMode = 1; // 1: Stars, 2: Balls, 3: Boxes, 4: Rainbow
        let animationSpeed = 30;
        let particleSize = 20;
        let trailMode = false;
        let isPlaying = true;
        let objectCount = 0;

        // Particle classes
        class Star {
            constructor(x, y, size) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.brightness = p.random(100, 255);
                this.twinkleSpeed = p.random(0.02, 0.1);
                this.angle = p.random(p.TWO_PI);
                this.life = 255;
            }

            update() {
                this.brightness = 150 + p.sin(p.frameCount * this.twinkleSpeed) * 100;
                this.angle += 0.01;
                this.life -= 1;
            }

            display() {
                p.push();
                p.translate(this.x, this.y);
                p.rotate(this.angle);
                p.fill(255, 255, 150, this.life);
                p.noStroke();
                
                // Draw star shape
                p.beginShape();
                for (let i = 0; i < 5; i++) {
                    let angle1 = p.map(i, 0, 5, 0, p.TWO_PI);
                    let angle2 = p.map(i + 0.5, 0, 5, 0, p.TWO_PI);
                    let x1 = p.cos(angle1) * this.size;
                    let y1 = p.sin(angle1) * this.size;
                    let x2 = p.cos(angle2) * this.size * 0.5;
                    let y2 = p.sin(angle2) * this.size * 0.5;
                    p.vertex(x1, y1);
                    p.vertex(x2, y2);
                }
                p.endShape(p.CLOSE);
                p.pop();
            }

            isDead() {
                return this.life <= 0;
            }
        }

        class Ball {
            constructor(x, y, size) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.vx = p.random(-2, 2);
                this.vy = p.random(-2, 2);
                this.hue = p.random(360);
                this.life = 255;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.hue = (this.hue + 1) % 360;
                this.life -= 1;
                
                // Bounce off edges
                if (this.x < 0 || this.x > p.width) this.vx *= -1;
                if (this.y < 0 || this.y > p.height) this.vy *= -1;
            }

            display() {
                p.colorMode(p.HSB, 360, 100, 100, 255);
                p.fill(this.hue, 80, 90, this.life);
                p.noStroke();
                p.ellipse(this.x, this.y, this.size);
                p.colorMode(p.RGB);
            }

            isDead() {
                return this.life <= 0;
            }
        }

        class Box {
            constructor(x, y, size) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.rotation = 0;
                this.rotSpeed = p.random(-0.1, 0.1);
                this.color = [p.random(255), p.random(255), p.random(255)];
                this.life = 255;
            }

            update() {
                this.rotation += this.rotSpeed;
                this.life -= 1;
            }

            display() {
                p.push();
                p.translate(this.x, this.y);
                p.rotate(this.rotation);
                p.fill(this.color[0], this.color[1], this.color[2], this.life);
                p.stroke(255, this.life);
                p.rectMode(p.CENTER);
                p.rect(0, 0, this.size, this.size);
                p.pop();
            }

            isDead() {
                return this.life <= 0;
            }
        }

        class RainbowParticle {
            constructor(x, y, size, hue) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.hue = hue;
                this.vx = p.random(-3, 3);
                this.vy = p.random(-3, 3);
                this.life = 255;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.hue = (this.hue + 2) % 360;
                this.life -= 2;
            }

            display() {
                p.colorMode(p.HSB, 360, 100, 100, 255);
                p.fill(this.hue, 100, 100, this.life);
                p.noStroke();
                p.ellipse(this.x, this.y, this.size);
                p.colorMode(p.RGB);
            }

            isDead() {
                return this.life <= 0;
            }
        }

        p.setup = () => {
            let canvas = p.createCanvas(800, 600);
            canvas.parent('twinklestars-canvas');
            p.colorMode(p.HSB, 360, 100, 100, 100);
        };

        p.draw = () => {
            // Handle trail mode
            if (!trailMode) {
                p.background(220, 60, 15, 100);
            } else {
                p.fill(220, 60, 15, 8);
                p.noStroke();
                p.rect(0, 0, p.width, p.height);
            }
            
            backgroundHue = (backgroundHue + 0.5) % 360;
            rainbowOffset = (rainbowOffset + 1) % 360;
            
            if (p.frameCount % (61 - animationSpeed) !== 0 && currentMode !== 4) {
                return;
            }
            
            if (isPlaying) {
                generateObject();
            }
            
            updateParticles();
            
            if (p.frameCount % 30 === 0) {
                objectCount = particles.length;
            }
        };

        function generateObject() {
            let x = p.random(p.width);
            let y = p.random(p.height);
            let size = p.random(particleSize * 0.5, particleSize * 1.5);
            
            switch(currentMode) {
                case 1:
                    particles.push(new Star(x, y, size));
                    break;
                case 2:
                    particles.push(new Ball(x, y, size));
                    break;
                case 3:
                    particles.push(new Box(x, y, size));
                    break;
                case 4:
                    generateRainbowParticles(x, y);
                    break;
            }
            
            if (particles.length > 500) {
                particles.splice(0, particles.length - 500);
            }
        }

        function generateRainbowParticles(x, y) {
            for (let i = 0; i < 3; i++) {
                let offsetX = x + p.random(-50, 50);
                let offsetY = y + p.random(-50, 50);
                let hue = (rainbowOffset + i * 120) % 360;
                particles.push(new RainbowParticle(offsetX, offsetY, particleSize, hue));
            }
        }

        function updateParticles() {
            for (let i = particles.length - 1; i >= 0; i--) {
                let particle = particles[i];
                particle.update();
                particle.display();
                
                if (particle.isDead()) {
                    particles.splice(i, 1);
                }
            }
        }

        // Control functions
        window.twinkleControls = {
            setMode: (mode) => {
                currentMode = parseInt(mode);
            },
            updateSpeed: (value) => {
                animationSpeed = parseInt(value);
                document.getElementById('ts-speed').textContent = value;
            },
            updateSize: (value) => {
                particleSize = parseInt(value);
                document.getElementById('ts-size').textContent = value;
            },
            toggleTrails: () => {
                trailMode = !trailMode;
            },
            togglePause: () => {
                isPlaying = !isPlaying;
            },
            clear: () => {
                particles = [];
            }
        };
    };

    appInstances.twinklestars = new p5(twinkleSketch);
}

// ================================
// FALLING LINES APP
// ================================
function initFallingLines() {
    const fallingLinesSketch = (p) => {
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
                this.hue = p.random(360); // For rainbow mode
                this.bounceCount = 0;
                this.maxBounces = p.random(5, 15);
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
                if (this.newy >= p.height) {
                    this.reverse = true;
                    this.oldy = p.height;
                    this.bounceCount++;
                    
                    // Create bounce effect
                    p.push();
                    p.fill(this.getColor());
                    p.ellipse(this.x, this.newy - currentSpeed, 30 + p.random(20), 30 + p.random(20));
                    p.pop();
                    
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
                    p.push();
                    p.fill(this.getColor());
                    p.ellipse(this.x, this.newy + currentSpeed, 30 + p.random(20), 30 + p.random(20));
                    p.pop();
                    
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
                p.push();
                
                // Draw trail if enabled
                if (showTrails && this.trail.length > 1) {
                    for (let i = 0; i < this.trail.length - 1; i++) {
                        let alpha = p.map(i, 0, this.trail.length - 1, 50, 255);
                        let trailColor = this.getColor();
                        p.stroke(trailColor[0], trailColor[1], trailColor[2], alpha);
                        p.strokeWeight(thickness * 0.5);
                        p.line(this.trail[i].x, this.trail[i].y, this.trail[i + 1].x, this.trail[i + 1].y);
                    }
                }
                
                // Draw main line
                let lineColor = this.getColor();
                p.stroke(lineColor[0], lineColor[1], lineColor[2]);
                p.strokeWeight(thickness);
                p.line(this.x, this.oldy, this.x, this.newy);
                
                p.pop();
            }

            getColor() {
                switch (colorMode) {
                    case 'random':
                        return [p.random(255), p.random(255), p.random(255)];
                    case 'rainbow':
                        p.colorMode(p.HSB);
                        let col = [this.hue, 80, 90];
                        p.colorMode(p.RGB);
                        this.hue = (this.hue + 1) % 360;
                        return col;
                    case 'gradient':
                        let factor = p.map(this.newy, 0, p.height, 0, 1);
                        return [
                            p.lerp(255, 100, factor),
                            p.lerp(100, 255, factor),
                            p.lerp(150, 200, factor)
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
                this.maxBounces = p.random(5, 15);
                this.hue = p.random(360);
                this.trail = [];
            }
        }

        function initializeLines() {
            xpos = 2;
            noLines = Math.floor(p.width / (thickness + gap));
            fLines = [];
            
            for (let i = 0; i < noLines; i++) {
                fLines[i] = new FalLine(p.random(1) + 0.015, xpos);
                xpos += thickness + gap;
            }
            
            // Update lines display if element exists
            if (document.getElementById('fl-lines')) {
                document.getElementById('fl-lines').textContent = noLines;
            }
        }

        function updateFPS() {
            if (p.millis() - lastFpsUpdate > 500) { // Update every 500ms
                let currentFPS = Math.round(p.frameRate());
                fpsHistory.push(currentFPS);
                if (fpsHistory.length > 10) {
                    fpsHistory.shift();
                }
                
                let avgFPS = Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length);
                if (document.getElementById('fl-fps')) {
                    document.getElementById('fl-fps').textContent = avgFPS;
                }
                lastFpsUpdate = p.millis();
            }
        }

        p.setup = () => {
            let canvas = p.createCanvas(800, 600);
            canvas.parent('fallinglines-canvas');
            
            // Initialize lines
            initializeLines();
            
            // Set initial stroke weight
            p.strokeWeight(thickness);
        };

        p.draw = () => {
            if (!isAnimating) return;
            
            // Set background
            let bgColor = bgColors[bgColorIndex];
            p.background(bgColor[0], bgColor[1], bgColor[2]);
            
            // Update and draw all lines
            for (let i = 0; i < noLines; i++) {
                fLines[i].show();
                fLines[i].fall();
            }
            
            count++;
            
            // Update FPS display
            updateFPS();
        };

        p.mousePressed = () => {
            // Add some interactivity - create ripple effect
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                p.push();
                p.fill(255, 255, 255, 100);
                p.noStroke();
                p.ellipse(p.mouseX, p.mouseY, 50, 50);
                p.pop();
                
                // Affect nearby lines
                for (let line of fLines) {
                    let distance = Math.abs(line.x - p.mouseX);
                    if (distance < 50) {
                        line.fallSpeed += 0.5;
                    }
                }
            }
        };

        // Control functions
        window.linesControls = {
            updateSpeed: (value) => {
                speedMultiplier = parseFloat(value);
                document.getElementById('fl-speed').textContent = value;
            },
            updateGravity: (value) => {
                gravityMultiplier = parseFloat(value);
                document.getElementById('fl-gravity').textContent = value;
            },
            updateThickness: (value) => {
                thickness = parseInt(value);
                if (document.getElementById('fl-thickness')) {
                    document.getElementById('fl-thickness').textContent = value;
                }
                initializeLines(); // Reinitialize with new thickness
            },
            updateDensity: (value) => {
                gap = parseInt(value);
                if (document.getElementById('fl-density')) {
                    document.getElementById('fl-density').textContent = value;
                }
                initializeLines(); // Reinitialize with new density
            },
            toggleTrails: () => {
                showTrails = !showTrails;
                // Clear existing trails
                for (let line of fLines) {
                    line.trail = [];
                }
            },
            togglePause: () => {
                isAnimating = !isAnimating;
            },
            reset: () => {
                count = 0;
                for (let line of fLines) {
                    line.reset();
                }
            },
            cycleColorMode: () => {
                const modes = ['random', 'rainbow', 'gradient'];
                let currentIndex = modes.indexOf(colorMode);
                currentIndex = (currentIndex + 1) % modes.length;
                colorMode = modes[currentIndex];
            },
            cycleBgColor: () => {
                bgColorIndex = (bgColorIndex + 1) % bgColors.length;
            }
        };
    };

    appInstances.fallinglines = new p5(fallingLinesSketch);
}

// Enhanced app switching with loading states
function showSectionWithTransition(sectionId) {
    // Add loading state
    showLoadingSpinner(sectionId);
    
    // Delay to allow for smooth transition
    setTimeout(() => {
        showSection(sectionId);
        hideLoadingSpinner();
    }, 300);
}

function showLoadingSpinner(sectionId) {
    if (sectionId !== 'home') {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const canvasContainer = targetSection.querySelector('.canvas-container');
            if (canvasContainer) {
                canvasContainer.innerHTML = `
                    <div class="loading-state">
                        <div class="spinner"></div>
                        <p>Loading ${getSectionTitle(sectionId)}...</p>
                    </div>
                `;
            }
        }
    }
}

function hideLoadingSpinner() {
    const loadingStates = document.querySelectorAll('.loading-state');
    loadingStates.forEach(state => state.remove());
}

function getSectionTitle(sectionId) {
    const titles = {
        'starfield': 'StarField',
        'matrix': 'Matrix',
        'twinklestars': 'TwinkleStars',
        'fallinglines': 'Falling Lines'
    };
    return titles[sectionId] || sectionId;
}

// Performance monitoring
let performanceMonitor = {
    fps: 60,
    lastFrameTime: 0,
    frameCount: 0,
    
    update: function() {
        const now = performance.now();
        if (this.lastFrameTime) {
            const delta = now - this.lastFrameTime;
            this.fps = Math.round(1000 / delta);
        }
        this.lastFrameTime = now;
        this.frameCount++;
        
        // Update performance display every 30 frames
        if (this.frameCount % 30 === 0) {
            this.updateDisplay();
        }
    },
    
    updateDisplay: function() {
        // Update FPS displays for active app
        const displays = ['sf-fps', 'mx-fps', 'ts-fps', 'fl-fps'];
        displays.forEach(id => {
            const element = document.getElementById(id);
            if (element && element.offsetParent) {
                element.textContent = this.fps;
            }
        });
    }
};

// Add CSS for loading states
if (!document.querySelector('#loading-styles')) {
    const loadingStyles = document.createElement('style');
    loadingStyles.id = 'loading-styles';
    loadingStyles.innerHTML = `
        .loading-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 400px;
            color: var(--text-primary);
        }
        
        .loading-state .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 212, 255, 0.2);
            border-top: 4px solid var(--accent-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        .loading-state p {
            font-family: 'Orbitron', monospace;
            font-size: 1.1rem;
            opacity: 0.8;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .app-section {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        
        .app-section.active {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyles);
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show home section by default
    showSection('home');
    isInitialized = true;
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case '1':
                showSection('starfield');
                break;
            case '2':
                showSection('matrix');
                break;
            case '3':
                showSection('twinklestars');
                break;
            case '4':
                showSection('fallinglines');
                break;
            case 'h':
            case 'H':
                showSection('home');
                break;
            case ' ':
                e.preventDefault();
                // Toggle pause for current app
                if (currentApp && window[currentApp + 'Controls'] && window[currentApp + 'Controls'].togglePause) {
                    window[currentApp + 'Controls'].togglePause();
                }
                break;
        }
    });
});

// Utility functions
function getRandomColor() {
    return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
}

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Export for global access
window.showSection = showSection;
window.appInstances = appInstances;
