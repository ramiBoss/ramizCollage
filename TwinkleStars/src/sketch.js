// Enhanced TwinkleStars with modern p5.js
let canvas;
let particles = [];
let mouseTrail = [];
let backgroundHue = 0;
let rainbowOffset = 0;

function setup() {
    // Create canvas and attach to container
    canvas = createCanvas(800, 500);
    canvas.parent(document.querySelector('.canvas-container'));
    
    // Set initial background
    colorMode(HSB, 360, 100, 100, 100);
    background(220, 60, 15); // Dark blue-purple
    
    // Initialize frame rate display
    frameRate(60);
}

function draw() {
    // Handle trail mode
    if (!trailMode) {
        background(220, 60, 15, 100);
    } else {
        // Subtle fade for trail effect
        fill(220, 60, 15, 8);
        noStroke();
        rect(0, 0, width, height);
    }
    
    // Update background animation for rainbow mode
    backgroundHue = (backgroundHue + 0.5) % 360;
    rainbowOffset = (rainbowOffset + 1) % 360;
    
    // Control animation speed
    if (frameCount % (61 - animationSpeed) !== 0 && currentMode !== 4) {
        return;
    }
    
    // Generate objects based on current mode
    if (isPlaying) {
        generateObject();
    }
    
    // Update and display particles
    updateParticles();
    
    // Handle mouse interaction
    handleMouseInteraction();
    
    // Update object counter
    if (frameCount % 30 === 0) {
        objectCount = particles.length;
    }
}

function generateObject() {
    let x = random(width);
    let y = random(height);
    let size = random(particleSize * 0.5, particleSize * 1.5);
    
    switch(currentMode) {
        case 1: // Stars
            particles.push(new Star(x, y, size));
            break;
        case 2: // Balls
            particles.push(new Ball(x, y, size));
            break;
        case 3: // Boxes
            particles.push(new Box(x, y, size));
            break;
        case 4: // Rainbow
            generateRainbowParticles(x, y);
            break;
    }
    
    // Limit particle count for performance
    if (particles.length > 500) {
        particles.splice(0, particles.length - 500);
    }
}

function generateRainbowParticles(x, y) {
    for (let i = 0; i < 3; i++) {
        let offsetX = x + random(-50, 50);
        let offsetY = y + random(-50, 50);
        let hue = (rainbowOffset + i * 120) % 360;
        particles.push(new RainbowParticle(offsetX, offsetY, particleSize, hue));
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.update();
        particle.display();
        
        // Remove old particles
        if (particle.isDead()) {
            particles.splice(i, 1);
        }
    }
}

function handleMouseInteraction() {
    if (mouseIsPressed && currentMode > 0) {
        // Add trail effect where mouse is
        mouseTrail.push({x: mouseX, y: mouseY, life: 30});
        
        // Generate particles at mouse position
        if (frameCount % 3 === 0) {
            generateObject();
            particles[particles.length - 1].x = mouseX + random(-20, 20);
            particles[particles.length - 1].y = mouseY + random(-20, 20);
        }
    }
    
    // Update mouse trail
    for (let i = mouseTrail.length - 1; i >= 0; i--) {
        let trail = mouseTrail[i];
        
        push();
        colorMode(HSB, 360, 100, 100, 100);
        fill(60, 80, 90, trail.life);
        noStroke();
        ellipse(trail.x, trail.y, trail.life * 0.5);
        pop();
        
        trail.life--;
        if (trail.life <= 0) {
            mouseTrail.splice(i, 1);
        }
    }
}

function windowResized() {
    // Keep canvas responsive
    resizeCanvas(min(windowWidth - 40, 800), min(windowHeight * 0.6, 500));
}
