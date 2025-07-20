// Unified StarField Simulation
// Adapted for the unified app system

// Global variables for starfield app
let starfieldApp = {
    stars: [],
    speed: 5,
    starCount: 500,
    maxSpeed: 15,
    maxStarSize: 50,
    showTrails: false,
    colorMode: false,
    isPaused: false,
    currentPalette: 'classic',
    p5Instance: null
};

// Color palettes for starfield
const starfieldColorPalettes = {
    classic: [255, 255, 255],
    rainbow: [],
    nebula: [[255, 100, 150], [100, 150, 255], [150, 255, 100], [255, 255, 100]],
    fire: [[255, 200, 0], [255, 100, 0], [255, 50, 0], [200, 0, 0]]
};

// Initialize rainbow palette for starfield
for (let i = 0; i < 360; i += 30) {
    starfieldColorPalettes.rainbow.push([
        Math.sin(i * Math.PI / 180) * 127 + 128,
        Math.sin((i + 120) * Math.PI / 180) * 127 + 128,
        Math.sin((i + 240) * Math.PI / 180) * 127 + 128
    ]);
}

// Star class for unified starfield
class UnifiedStar {
    constructor() {
        const p5 = starfieldApp.p5Instance;
        this.x = p5.random(-p5.width, p5.width);
        this.y = p5.random(-p5.height, p5.height);
        this.z = p5.random(p5.width);
        this.pz = this.z;
        this.color = [255, 255, 255];
        this.trail = [];
        this.maxTrailLength = 10;
        this.hue = p5.random(360);
    }

    update() {
        const p5 = starfieldApp.p5Instance;
        this.pz = this.z;
        this.z = this.z - starfieldApp.speed;
        
        if (starfieldApp.showTrails) {
            let sx = p5.map(this.x / this.z, 0, 1, 0, p5.width / 2);
            let sy = p5.map(this.y / this.z, 0, 1, 0, p5.height / 2);
            this.trail.push({x: sx + p5.width / 2, y: sy + p5.height / 2});
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
        }

        if (this.z <= 1) {
            this.reset();
        }
    }

    show() {
        const p5 = starfieldApp.p5Instance;
        p5.fill(this.getColor());
        p5.noStroke();

        let sx = p5.map(this.x / this.z, 0, 1, 0, p5.width / 2);
        let sy = p5.map(this.y / this.z, 0, 1, 0, p5.height / 2);
        
        let r = p5.map(this.z, 0, p5.width, starfieldApp.maxStarSize, 0);
        
        if (starfieldApp.showTrails && this.trail.length > 1) {
            p5.stroke(this.getColor());
            p5.strokeWeight(r * 0.3);
            for (let i = 0; i < this.trail.length - 1; i++) {
                let alpha = p5.map(i, 0, this.trail.length - 1, 0, 255);
                let trailColor = this.getColor();
                trailColor[3] = alpha;
                p5.stroke(trailColor);
                p5.line(this.trail[i].x, this.trail[i].y, 
                        this.trail[i + 1].x, this.trail[i + 1].y);
            }
            p5.noStroke();
        }

        let px = p5.map(this.x / this.pz, 0, 1, 0, p5.width / 2);
        let py = p5.map(this.y / this.pz, 0, 1, 0, p5.height / 2);
        
        this.pz = this.z;
        
        p5.stroke(this.getColor());
        p5.strokeWeight(r);
        p5.line(px + p5.width / 2, py + p5.height / 2, 
                sx + p5.width / 2, sy + p5.height / 2);
        
        p5.fill(this.getColor());
        p5.noStroke();
        p5.ellipse(sx + p5.width / 2, sy + p5.height / 2, r, r);
    }

    getColor() {
        const p5 = starfieldApp.p5Instance;
        if (!starfieldApp.colorMode) {
            return starfieldColorPalettes.classic;
        }

        switch (starfieldApp.currentPalette) {
            case 'rainbow':
                this.hue = (this.hue + 1) % 360;
                p5.colorMode(p5.HSB);
                let col = [this.hue, 80, 100];
                p5.colorMode(p5.RGB);
                return col;
            case 'nebula':
                return p5.random(starfieldColorPalettes.nebula);
            case 'fire':
                return p5.random(starfieldColorPalettes.fire);
            default:
                return starfieldColorPalettes.classic;
        }
    }

    reset() {
        const p5 = starfieldApp.p5Instance;
        this.x = p5.random(-p5.width, p5.width);
        this.y = p5.random(-p5.height, p5.height);
        this.z = p5.width;
        this.pz = this.z;
        this.trail = [];
        this.hue = p5.random(360);
    }
}

// Initialize the starfield app
function initializeStarfieldApp() {
    console.log('✨ Initializing StarField App...');
    
    const starfieldSketch = (p5) => {
        starfieldApp.p5Instance = p5;
        
        p5.setup = () => {
            let canvas = p5.createCanvas(600, 600);
            canvas.parent('starfieldCanvas');
            
            starfieldInitializeStars();
            
            console.log('✨ StarField setup complete');
        };
        
        p5.draw = () => {
            if (starfieldApp.isPaused) return;
            
            p5.background(0);
            p5.translate(p5.width / 2, p5.height / 2);
            
            for (let star of starfieldApp.stars) {
                star.update();
                star.show();
            }
            
            starfieldUpdateFPS();
        };
        
        p5.keyPressed = () => {
            switch (p5.key) {
                case ' ':
                    starfieldToggleAnimation();
                    break;
                case 'r':
                case 'R':
                    starfieldReset();
                    break;
                case 'f':
                case 'F':
                    starfieldToggleFullscreen();
                    break;
                case 't':
                case 'T':
                    starfieldToggleTrails();
                    break;
                case 'c':
                case 'C':
                    starfieldToggleColorMode();
                    break;
            }
            
            if (p5.keyCode === p5.UP_ARROW) {
                starfieldApp.speed = Math.min(starfieldApp.maxSpeed, starfieldApp.speed + 1);
                starfieldUpdateSpeedDisplay();
            } else if (p5.keyCode === p5.DOWN_ARROW) {
                starfieldApp.speed = Math.max(0, starfieldApp.speed - 1);
                starfieldUpdateSpeedDisplay();
            }
        };
        
        p5.windowResized = () => {
            starfieldWindowResized();
        };
    };
    
    if (window.currentP5Instance) {
        window.currentP5Instance.remove();
    }
    window.currentP5Instance = new p5(starfieldSketch);
}

function starfieldInitializeStars() {
    starfieldApp.stars = [];
    for (let i = 0; i < starfieldApp.starCount; i++) {
        starfieldApp.stars[i] = new UnifiedStar();
    }
    document.getElementById('starfieldStarsDisplay').textContent = starfieldApp.starCount;
}

function starfieldUpdateFPS() {
    const p5 = starfieldApp.p5Instance;
    if (p5.frameCount % 30 === 0) {
        let fps = Math.round(p5.frameRate());
        document.getElementById('starfieldFpsDisplay').textContent = fps;
    }
}

function starfieldUpdateSpeedDisplay() {
    document.getElementById('starfieldSpeedValue').textContent = starfieldApp.speed;
    const slider = document.querySelector('#starfield .control-slider[oninput*="starfieldUpdateSpeed"]');
    if (slider) slider.value = starfieldApp.speed;
}

// Control functions for starfield
function starfieldToggleAnimation() {
    const p5 = starfieldApp.p5Instance;
    starfieldApp.isPaused = !starfieldApp.isPaused;
    document.getElementById('starfieldPlayPauseText').textContent = starfieldApp.isPaused ? 'Play' : 'Pause';
    
    if (starfieldApp.isPaused) {
        p5.noLoop();
    } else {
        p5.loop();
    }
}

function starfieldReset() {
    for (let star of starfieldApp.stars) {
        star.reset();
    }
}

function starfieldUpdateSpeed(value) {
    starfieldApp.speed = parseInt(value);
    document.getElementById('starfieldSpeedValue').textContent = starfieldApp.speed;
}

function starfieldUpdateCount(value) {
    const newCount = parseInt(value);
    starfieldApp.starCount = newCount;
    document.getElementById('starfieldCountValue').textContent = newCount;
    starfieldInitializeStars();
}

function starfieldToggleTrails() {
    starfieldApp.showTrails = !starfieldApp.showTrails;
    document.getElementById('starfieldTrailsText').textContent = starfieldApp.showTrails ? 'Disable Trails' : 'Enable Trails';
    
    for (let star of starfieldApp.stars) {
        star.trail = [];
    }
}

function starfieldToggleColorMode() {
    starfieldApp.colorMode = !starfieldApp.colorMode;
    document.getElementById('starfieldColorModeText').textContent = starfieldApp.colorMode ? 'Colored Stars' : 'White Stars';
}

function starfieldCyclePalette() {
    const palettes = ['classic', 'rainbow', 'nebula', 'fire'];
    const paletteNames = ['Classic', 'Rainbow', 'Nebula', 'Fire'];
    let currentIndex = palettes.indexOf(starfieldApp.currentPalette);
    currentIndex = (currentIndex + 1) % palettes.length;
    starfieldApp.currentPalette = palettes[currentIndex];
    document.getElementById('starfieldPaletteText').textContent = paletteNames[currentIndex];
}

function starfieldToggleFullscreen() {
    if (!document.fullscreenElement) {
        window.unifiedApp.requestFullscreen();
    } else {
        window.unifiedApp.exitFullscreen();
    }
}

function starfieldWindowResized() {
    const p5 = starfieldApp.p5Instance;
    if (!p5) return;
    
    let container = document.getElementById('starfieldCanvas');
    let containerWidth = container.offsetWidth;
    let containerHeight = Math.min(containerWidth, 600);
    
    p5.resizeCanvas(containerWidth, containerHeight);
    starfieldInitializeStars();
}

console.log('✨ Unified StarField module loaded');
