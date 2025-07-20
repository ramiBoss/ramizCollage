// Unified Falling Lines Animation
// Adapted for the unified app system

// Global variables for lines app
let linesApp = {
    fLines: [],
    thickness: 2,
    noLines: 0,
    xpos: 2,
    count: 0,
    gap: 4,
    isAnimating: true,
    speedMultiplier: 1.0,
    gravityMultiplier: 1.0,
    showTrails: false,
    colorMode: 'random',
    bgColorIndex: 0,
    canvasWidth: 600,
    canvasHeight: 600,
    fpsHistory: [],
    lastFpsUpdate: 0,
    p5Instance: null
};

// Background colors for lines app
const linesBgColors = [
    [27, 242, 50],    // Original green #1BF232
    [255, 255, 255],   // White
    [0, 0, 0],         // Black
    [30, 30, 60],      // Dark blue
    [60, 20, 60]       // Purple
];
const linesBgColorNames = ['Green', 'White', 'Black', 'Blue', 'Purple'];

// FalLine class for lines app
class UnifiedFalLine {
    constructor(fallSpeed, xpos) {
        this.x = xpos;
        this.oldy = 0;
        this.newy = 0;
        this.fallSpeed = fallSpeed;
        this.reverse = false;
        this.originalSpeed = fallSpeed;
        this.hue = linesApp.p5Instance.random(360);
        this.bounceCount = 0;
        this.maxBounces = linesApp.p5Instance.random(5, 15);
        this.alpha = 255;
        this.trail = [];
        this.maxTrailLength = 20;
    }

    fall() {
        const p5 = linesApp.p5Instance;
        let currentSpeed = this.fallSpeed * linesApp.speedMultiplier * linesApp.gravityMultiplier;
        
        if (linesApp.showTrails) {
            this.trail.push({x: this.x, y: this.newy, alpha: this.alpha});
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
        }

        if (this.newy >= p5.height) {
            this.reverse = true;
            this.oldy = p5.height;
            this.bounceCount++;
            
            p5.push();
            p5.fill(this.getColor());
            p5.ellipse(this.x, this.newy - currentSpeed, 30 + p5.random(20), 30 + p5.random(20));
            p5.pop();
            
            if (this.bounceCount >= this.maxBounces) {
                this.reset();
            } else {
                this.fallSpeed *= 0.8;
            }
        } else if (this.newy <= 0 && this.reverse) {
            this.oldy = 0;
            this.reverse = false;
            this.bounceCount++;
            
            p5.push();
            p5.fill(this.getColor());
            p5.ellipse(this.x, this.newy + currentSpeed, 30 + p5.random(20), 30 + p5.random(20));
            p5.pop();
            
            if (this.bounceCount >= this.maxBounces) {
                this.reset();
            } else {
                this.fallSpeed *= 0.8;
            }
        }

        if (this.reverse) {
            this.newy -= currentSpeed;
        } else {
            this.newy += currentSpeed;
        }
    }

    show() {
        const p5 = linesApp.p5Instance;
        p5.push();
        
        if (linesApp.showTrails && this.trail.length > 1) {
            for (let i = 0; i < this.trail.length - 1; i++) {
                let alpha = p5.map(i, 0, this.trail.length - 1, 50, 255);
                let trailColor = this.getColor();
                trailColor[3] = alpha;
                p5.stroke(trailColor);
                p5.strokeWeight(linesApp.thickness * 0.5);
                p5.line(this.trail[i].x, this.trail[i].y, this.trail[i + 1].x, this.trail[i + 1].y);
            }
        }
        
        p5.stroke(this.getColor());
        p5.strokeWeight(linesApp.thickness);
        p5.line(this.x, this.oldy, this.x, this.newy);
        
        p5.pop();
    }

    getColor() {
        const p5 = linesApp.p5Instance;
        switch (linesApp.colorMode) {
            case 'random':
                return [p5.random(255), p5.random(255), p5.random(255)];
            case 'rainbow':
                p5.colorMode(p5.HSB);
                let col = [this.hue, 80, 90];
                p5.colorMode(p5.RGB);
                this.hue = (this.hue + 1) % 360;
                return col;
            case 'gradient':
                let factor = p5.map(this.newy, 0, p5.height, 0, 1);
                return [
                    p5.lerp(255, 100, factor),
                    p5.lerp(100, 255, factor),
                    p5.lerp(150, 200, factor)
                ];
            default:
                return [255, 255, 255];
        }
    }

    reset() {
        const p5 = linesApp.p5Instance;
        this.newy = 0;
        this.oldy = 0;
        this.reverse = false;
        this.bounceCount = 0;
        this.fallSpeed = this.originalSpeed;
        this.maxBounces = p5.random(5, 15);
        this.hue = p5.random(360);
        this.trail = [];
    }
}

// Initialize the lines app
function initializeLinesApp() {
    console.log('📈 Initializing Falling Lines App...');
    
    // Create p5 instance for lines app
    const linesSketch = (p5) => {
        linesApp.p5Instance = p5;
        
        p5.setup = () => {
            let canvas = p5.createCanvas(linesApp.canvasWidth, linesApp.canvasHeight);
            canvas.parent('linesCanvas');
            
            linesInitializeLines();
            p5.strokeWeight(linesApp.thickness);
            
            console.log('📈 Falling Lines setup complete');
        };
        
        p5.draw = () => {
            if (!linesApp.isAnimating) return;
            
            let bgColor = linesBgColors[linesApp.bgColorIndex];
            p5.background(bgColor[0], bgColor[1], bgColor[2]);
            
            for (let i = 0; i < linesApp.noLines; i++) {
                linesApp.fLines[i].show();
                linesApp.fLines[i].fall();
            }
            
            linesApp.count++;
            linesUpdateFPS();
        };
        
        p5.keyPressed = () => {
            switch (p5.key) {
                case ' ':
                    linesToggleAnimation();
                    break;
                case 'r':
                case 'R':
                    linesResetAnimation();
                    break;
                case 'f':
                case 'F':
                    linesToggleFullscreen();
                    break;
                case 't':
                case 'T':
                    linesToggleTrails();
                    break;
                case 'c':
                case 'C':
                    linesCycleColorMode();
                    break;
                case 'b':
                case 'B':
                    linesCycleBgColor();
                    break;
            }
            
            if (p5.keyCode === p5.UP_ARROW) {
                let currentSpeed = parseFloat(document.getElementById('linesSpeedSlider').value);
                currentSpeed = Math.min(5.0, currentSpeed + 0.1);
                document.getElementById('linesSpeedSlider').value = currentSpeed;
                linesUpdateSpeed(currentSpeed);
            } else if (p5.keyCode === p5.DOWN_ARROW) {
                let currentSpeed = parseFloat(document.getElementById('linesSpeedSlider').value);
                currentSpeed = Math.max(0.1, currentSpeed - 0.1);
                document.getElementById('linesSpeedSlider').value = currentSpeed;
                linesUpdateSpeed(currentSpeed);
            }
        };
        
        p5.mousePressed = () => {
            if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
                p5.push();
                p5.fill(255, 255, 255, 100);
                p5.noStroke();
                p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
                p5.pop();
                
                for (let line of linesApp.fLines) {
                    let distance = Math.abs(line.x - p5.mouseX);
                    if (distance < 50) {
                        line.fallSpeed += 0.5;
                    }
                }
            }
        };
        
        p5.windowResized = () => {
            linesWindowResized();
        };
    };
    
    // Store the p5 instance globally for cleanup
    if (window.currentP5Instance) {
        window.currentP5Instance.remove();
    }
    window.currentP5Instance = new p5(linesSketch);
}

function linesInitializeLines() {
    const p5 = linesApp.p5Instance;
    linesApp.xpos = 2;
    linesApp.noLines = Math.floor(p5.width / (linesApp.thickness + linesApp.gap));
    linesApp.fLines = [];
    
    for (let i = 0; i < linesApp.noLines; i++) {
        linesApp.fLines[i] = new UnifiedFalLine(p5.random(1) + 0.015, linesApp.xpos);
        linesApp.xpos += linesApp.thickness + linesApp.gap;
    }
    
    document.getElementById('linesLinesDisplay').textContent = linesApp.noLines;
}

function linesUpdateFPS() {
    const p5 = linesApp.p5Instance;
    if (p5.millis() - linesApp.lastFpsUpdate > 500) {
        let currentFPS = Math.round(p5.frameRate());
        linesApp.fpsHistory.push(currentFPS);
        if (linesApp.fpsHistory.length > 10) {
            linesApp.fpsHistory.shift();
        }
        
        let avgFPS = Math.round(linesApp.fpsHistory.reduce((a, b) => a + b, 0) / linesApp.fpsHistory.length);
        document.getElementById('linesFpsDisplay').textContent = avgFPS;
        linesApp.lastFpsUpdate = p5.millis();
    }
}

// Control functions for lines app
function linesToggleAnimation() {
    const p5 = linesApp.p5Instance;
    linesApp.isAnimating = !linesApp.isAnimating;
    document.getElementById('linesPlayPauseText').textContent = linesApp.isAnimating ? 'Pause' : 'Play';
    
    if (linesApp.isAnimating) {
        p5.loop();
    } else {
        p5.noLoop();
    }
}

function linesResetAnimation() {
    linesApp.count = 0;
    for (let line of linesApp.fLines) {
        line.reset();
    }
}

function linesUpdateSpeed(value) {
    linesApp.speedMultiplier = parseFloat(value);
    document.getElementById('linesSpeedValue').textContent = linesApp.speedMultiplier.toFixed(1);
}

function linesUpdateGravity(value) {
    linesApp.gravityMultiplier = parseFloat(value);
    document.getElementById('linesGravityValue').textContent = linesApp.gravityMultiplier.toFixed(1);
}

function linesUpdateThickness(value) {
    linesApp.thickness = parseInt(value);
    document.getElementById('linesThicknessValue').textContent = linesApp.thickness;
    linesInitializeLines();
}

function linesUpdateDensity(value) {
    linesApp.gap = parseInt(value);
    document.getElementById('linesDensityValue').textContent = linesApp.gap;
    linesInitializeLines();
}

function linesToggleTrails() {
    linesApp.showTrails = !linesApp.showTrails;
    document.getElementById('linesTrailsText').textContent = linesApp.showTrails ? 'Disable Trails' : 'Enable Trails';
    
    for (let line of linesApp.fLines) {
        line.trail = [];
    }
}

function linesCycleColorMode() {
    const modes = ['random', 'rainbow', 'gradient'];
    const modeNames = ['Random', 'Rainbow', 'Gradient'];
    let currentIndex = modes.indexOf(linesApp.colorMode);
    currentIndex = (currentIndex + 1) % modes.length;
    linesApp.colorMode = modes[currentIndex];
    document.getElementById('linesColorModeText').textContent = modeNames[currentIndex];
}

function linesCycleBgColor() {
    linesApp.bgColorIndex = (linesApp.bgColorIndex + 1) % linesBgColors.length;
    document.getElementById('linesBgColorText').textContent = linesBgColorNames[linesApp.bgColorIndex];
}

function linesToggleFullscreen() {
    if (!document.fullscreenElement) {
        window.unifiedApp.requestFullscreen();
    } else {
        window.unifiedApp.exitFullscreen();
    }
}

function linesWindowResized() {
    const p5 = linesApp.p5Instance;
    if (!p5) return;
    
    let container = document.getElementById('linesCanvas');
    let containerWidth = container.offsetWidth;
    let containerHeight = Math.min(containerWidth, 600);
    
    p5.resizeCanvas(containerWidth, containerHeight);
    linesInitializeLines();
}

console.log('📈 Unified Falling Lines module loaded');
