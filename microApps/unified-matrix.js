// Unified Matrix Hack Theme
// Adapted for the unified app system

// Global variables for matrix app
let matrixApp = {
    letters: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    numbers: ['0','1','2','3','4','5','6','7','8','9'],
    matrixChars: ['ｱ','ｲ','ｳ','ｴ','ｵ','ｶ','ｷ','ｸ','ｹ','ｺ','ｻ','ｼ','ｽ','ｾ','ｿ','ﾀ','ﾁ','ﾂ','ﾃ','ﾄ','ﾅ','ﾆ','ﾇ','ﾈ','ﾉ','ﾊ','ﾋ','ﾌ','ﾍ','ﾎ','ﾏ','ﾐ','ﾑ','ﾒ','ﾓ','ﾔ','ﾕ','ﾖ','ﾗ','ﾘ','ﾙ','ﾚ','ﾛ','ﾜ','ｦ','ﾝ'],
    currentCharSet: null,
    lCount: 30,
    txtSize: 0,
    gap: 4,
    speed: 50,
    rowNo: 0,
    colNo: 0,
    isAnimating: true,
    mode: 'grid',
    colorMode: 'classic',
    brightness: 150,
    drops: [],
    fadeGrid: [],
    hueOffset: 0,
    p5Instance: null
};

// Initialize current char set
matrixApp.currentCharSet = matrixApp.letters;

// Color palettes for matrix
const matrixColorPalettes = {
    classic: [91, 250, 13],
    matrix: [0, 255, 65],
    rainbow: [],
    fire: [[255, 0, 0], [255, 100, 0], [255, 200, 0], [0, 255, 0]],
    cyber: [[0, 255, 255], [255, 0, 255], [0, 255, 0], [255, 255, 0]]
};

// Initialize rainbow palette for matrix
for (let i = 0; i < 360; i += 30) {
    matrixColorPalettes.rainbow.push([
        Math.sin(i * Math.PI / 180) * 127 + 128,
        Math.sin((i + 120) * Math.PI / 180) * 127 + 128,
        Math.sin((i + 240) * Math.PI / 180) * 127 + 128
    ]);
}

// Matrix Drop class for rain mode
class UnifiedMatrixDrop {
    constructor(x) {
        const p5 = matrixApp.p5Instance;
        this.x = x;
        this.y = p5.random(-500, -50);
        this.speed = p5.random(2, 8);
        this.chars = [];
        this.length = p5.random(10, 30);
        this.opacity = 255;
        
        for (let i = 0; i < this.length; i++) {
            this.chars.push({
                char: p5.random(matrixApp.currentCharSet),
                brightness: p5.map(i, 0, this.length - 1, 255, 50)
            });
        }
    }

    update() {
        const p5 = matrixApp.p5Instance;
        this.y += this.speed;
        
        // Change characters randomly
        if (p5.random(1) < 0.1) {
            let index = Math.floor(p5.random(this.chars.length));
            this.chars[index].char = p5.random(matrixApp.currentCharSet);
        }
        
        // Reset when off screen
        if (this.y > p5.height + this.length * matrixApp.txtSize) {
            this.y = p5.random(-500, -50);
            this.x = Math.floor(p5.random(matrixApp.lCount)) * matrixApp.txtSize;
        }
    }

    show() {
        const p5 = matrixApp.p5Instance;
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textSize(matrixApp.txtSize);
        
        for (let i = 0; i < this.chars.length; i++) {
            let charY = this.y + i * matrixApp.txtSize;
            if (charY > 0 && charY < p5.height) {
                let color = matrixGetColor();
                let brightness = this.chars[i].brightness;
                
                p5.fill(color[0] * brightness / 255, 
                       color[1] * brightness / 255, 
                       color[2] * brightness / 255);
                
                p5.text(this.chars[i].char, this.x + matrixApp.txtSize / 2, charY);
            }
        }
    }

    reset() {
        const p5 = matrixApp.p5Instance;
        this.y = p5.random(-500, -50);
        this.speed = p5.random(2, 8);
        this.length = p5.random(10, 30);
        this.chars = [];
        
        for (let i = 0; i < this.length; i++) {
            this.chars.push({
                char: p5.random(matrixApp.currentCharSet),
                brightness: p5.map(i, 0, this.length - 1, 255, 50)
            });
        }
    }
}

// Initialize the matrix app
function initializeMatrixApp() {
    console.log('🔢 Initializing Matrix App...');
    
    const matrixSketch = (p5) => {
        matrixApp.p5Instance = p5;
        
        p5.setup = () => {
            let canvas = p5.createCanvas(600, 600);
            canvas.parent('matrixCanvas');
            
            matrixInitialize();
            
            console.log('🔢 Matrix setup complete');
        };
        
        p5.draw = () => {
            if (!matrixApp.isAnimating) return;
            
            p5.background(0);
            
            if (matrixApp.mode === 'grid') {
                matrixDrawGrid();
            } else {
                matrixDrawRain();
            }
            
            matrixUpdateFPS();
        };
        
        p5.keyPressed = () => {
            switch (p5.key) {
                case ' ':
                    matrixToggleAnimation();
                    break;
                case 'r':
                case 'R':
                    matrixReset();
                    break;
                case 'f':
                case 'F':
                    matrixToggleFullscreen();
                    break;
                case 'm':
                case 'M':
                    matrixToggleMode();
                    break;
                case 's':
                case 'S':
                    matrixCycleCharSet();
                    break;
                case 'c':
                case 'C':
                    matrixCycleColorMode();
                    break;
            }
            
            if (p5.keyCode === p5.UP_ARROW) {
                matrixApp.speed = Math.min(200, matrixApp.speed + 10);
                matrixUpdateSpeedDisplay();
            } else if (p5.keyCode === p5.DOWN_ARROW) {
                matrixApp.speed = Math.max(10, matrixApp.speed - 10);
                matrixUpdateSpeedDisplay();
            }
        };
        
        p5.windowResized = () => {
            matrixWindowResized();
        };
    };
    
    if (window.currentP5Instance) {
        window.currentP5Instance.remove();
    }
    window.currentP5Instance = new p5(matrixSketch);
}

function matrixInitialize() {
    const p5 = matrixApp.p5Instance;
    matrixApp.txtSize = p5.width / matrixApp.lCount;
    
    // Initialize fade grid
    matrixApp.fadeGrid = [];
    for (let i = 0; i < matrixApp.lCount; i++) {
        matrixApp.fadeGrid[i] = [];
        for (let j = 0; j < matrixApp.lCount; j++) {
            matrixApp.fadeGrid[i][j] = 0;
        }
    }
    
    // Initialize drops for rain mode
    matrixApp.drops = [];
    for (let i = 0; i < matrixApp.lCount; i++) {
        matrixApp.drops.push(new UnifiedMatrixDrop(i * matrixApp.txtSize));
    }
    
    document.getElementById('matrixCharsDisplay').textContent = matrixApp.lCount * matrixApp.lCount;
}

function matrixDrawGrid() {
    const p5 = matrixApp.p5Instance;
    
    if (p5.frameCount % (201 - matrixApp.speed) === 0) {
        // Update grid
        for (let i = 0; i < matrixApp.lCount; i++) {
            for (let j = 0; j < matrixApp.lCount; j++) {
                if (matrixApp.fadeGrid[i][j] > 0) {
                    matrixApp.fadeGrid[i][j] -= 5;
                }
            }
        }
        
        // Add new characters
        for (let i = 0; i < matrixApp.lCount; i++) {
            if (p5.random(1) < 0.1) {
                matrixApp.fadeGrid[i][Math.floor(p5.random(matrixApp.lCount))] = 255;
            }
        }
    }
    
    // Draw grid
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(matrixApp.txtSize);
    
    for (let i = 0; i < matrixApp.lCount; i++) {
        for (let j = 0; j < matrixApp.lCount; j++) {
            if (matrixApp.fadeGrid[i][j] > 0) {
                let color = matrixGetColor();
                let brightness = matrixApp.fadeGrid[i][j] * matrixApp.brightness / 255;
                
                p5.fill(color[0] * brightness / 255,
                       color[1] * brightness / 255,
                       color[2] * brightness / 255);
                
                let char = p5.random(matrixApp.currentCharSet);
                p5.text(char, i * matrixApp.txtSize + matrixApp.txtSize / 2,
                              j * matrixApp.txtSize + matrixApp.txtSize / 2);
            }
        }
    }
}

function matrixDrawRain() {
    for (let drop of matrixApp.drops) {
        drop.update();
        drop.show();
    }
}

function matrixGetColor() {
    const p5 = matrixApp.p5Instance;
    
    switch (matrixApp.colorMode) {
        case 'classic':
            return matrixColorPalettes.classic;
        case 'matrix':
            return matrixColorPalettes.matrix;
        case 'rainbow':
            matrixApp.hueOffset = (matrixApp.hueOffset + 1) % 360;
            p5.colorMode(p5.HSB);
            let col = [matrixApp.hueOffset, 80, 100];
            p5.colorMode(p5.RGB);
            return col;
        case 'fire':
            return p5.random(matrixColorPalettes.fire);
        case 'cyber':
            return p5.random(matrixColorPalettes.cyber);
        default:
            return matrixColorPalettes.classic;
    }
}

function matrixUpdateFPS() {
    const p5 = matrixApp.p5Instance;
    if (p5.frameCount % 30 === 0) {
        let fps = Math.round(p5.frameRate());
        document.getElementById('matrixFpsDisplay').textContent = fps;
    }
}

function matrixUpdateSpeedDisplay() {
    document.getElementById('matrixSpeedValue').textContent = matrixApp.speed;
    const slider = document.querySelector('#matrix .control-slider[oninput*="matrixUpdateSpeed"]');
    if (slider) slider.value = matrixApp.speed;
}

// Control functions for matrix
function matrixToggleAnimation() {
    const p5 = matrixApp.p5Instance;
    matrixApp.isAnimating = !matrixApp.isAnimating;
    document.getElementById('matrixPlayPauseText').textContent = matrixApp.isAnimating ? 'Pause' : 'Play';
    
    if (matrixApp.isAnimating) {
        p5.loop();
    } else {
        p5.noLoop();
    }
}

function matrixReset() {
    const p5 = matrixApp.p5Instance;
    
    // Reset fade grid
    for (let i = 0; i < matrixApp.lCount; i++) {
        for (let j = 0; j < matrixApp.lCount; j++) {
            matrixApp.fadeGrid[i][j] = 0;
        }
    }
    
    // Reset drops
    for (let drop of matrixApp.drops) {
        drop.reset();
    }
}

function matrixUpdateSpeed(value) {
    matrixApp.speed = parseInt(value);
    document.getElementById('matrixSpeedValue').textContent = matrixApp.speed;
}

function matrixUpdateBrightness(value) {
    matrixApp.brightness = parseInt(value);
    document.getElementById('matrixBrightnessValue').textContent = matrixApp.brightness;
}

function matrixToggleMode() {
    matrixApp.mode = matrixApp.mode === 'grid' ? 'rain' : 'grid';
    document.getElementById('matrixModeText').textContent = matrixApp.mode === 'grid' ? 'Grid' : 'Rain';
}

function matrixCycleCharSet() {
    const charSets = [matrixApp.letters, matrixApp.numbers, matrixApp.matrixChars];
    const charSetNames = ['Letters', 'Numbers', 'Matrix'];
    let currentIndex = charSets.indexOf(matrixApp.currentCharSet);
    currentIndex = (currentIndex + 1) % charSets.length;
    matrixApp.currentCharSet = charSets[currentIndex];
    document.getElementById('matrixCharSetText').textContent = charSetNames[currentIndex];
}

function matrixCycleColorMode() {
    const modes = ['classic', 'matrix', 'rainbow', 'fire', 'cyber'];
    const modeNames = ['Classic', 'Matrix', 'Rainbow', 'Fire', 'Cyber'];
    let currentIndex = modes.indexOf(matrixApp.colorMode);
    currentIndex = (currentIndex + 1) % modes.length;
    matrixApp.colorMode = modes[currentIndex];
    document.getElementById('matrixColorModeText').textContent = modeNames[currentIndex];
}

function matrixToggleFullscreen() {
    if (!document.fullscreenElement) {
        window.unifiedApp.requestFullscreen();
    } else {
        window.unifiedApp.exitFullscreen();
    }
}

function matrixWindowResized() {
    const p5 = matrixApp.p5Instance;
    if (!p5) return;
    
    let container = document.getElementById('matrixCanvas');
    let containerWidth = container.offsetWidth;
    let containerHeight = Math.min(containerWidth, 600);
    
    p5.resizeCanvas(containerWidth, containerHeight);
    matrixInitialize();
}

console.log('🔢 Unified Matrix module loaded');
