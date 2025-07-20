class Box {
    constructor(x, y, size = 12) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.targetSize = size;
        this.hue = random(360);
        this.saturation = random(70, 100);
        this.brightness = random(60, 90);
        this.alpha = random(70, 100);
        this.rotation = random(TWO_PI);
        this.rotationSpeed = random(-0.05, 0.05);
        this.velX = random(-1, 1);
        this.velY = random(-1, 1);
        this.pulseSpeed = random(0.01, 0.04);
        this.life = random(200, 450);
        this.maxLife = this.life;
        this.oscillation = random(0.5, 2);
    }
    
    update() {
        // Movement
        this.x += this.velX;
        this.y += this.velY;
        
        // Oscillating movement
        this.x += sin(frameCount * 0.01 + this.oscillation) * 0.5;
        this.y += cos(frameCount * 0.008 + this.oscillation) * 0.3;
        
        // Rotation
        this.rotation += this.rotationSpeed;
        
        // Pulsing effect
        this.size = this.targetSize + sin(frameCount * this.pulseSpeed) * (this.targetSize * 0.3);
        
        // Color cycling
        this.hue = (this.hue + 0.3) % 360;
        
        // Boundary wrapping
        if (this.x < -this.size) this.x = width + this.size;
        if (this.x > width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = height + this.size;
        if (this.y > height + this.size) this.y = -this.size;
        
        // Life decay
        this.life--;
        this.alpha = map(this.life, 0, this.maxLife, 0, 100);
    }
    
    display() {
        push();
        colorMode(HSB, 360, 100, 100, 100);
        
        translate(this.x, this.y);
        rotate(this.rotation);
        
        // Shadow/glow effect
        for (let offset = this.size; offset > 0; offset -= 2) {
            let shadowAlpha = this.alpha * (this.size - offset) / this.size * 0.3;
            fill(this.hue, this.saturation, this.brightness, shadowAlpha);
            noStroke();
            rectMode(CENTER);
            rect(2, 2, offset, offset, 2);
        }
        
        // Main box
        fill(this.hue, this.saturation, this.brightness, this.alpha);
        stroke(this.hue, this.saturation, 100, this.alpha * 0.8);
        strokeWeight(1);
        rectMode(CENTER);
        rect(0, 0, this.size, this.size, this.size * 0.1);
        
        // Inner decoration
        fill(this.hue, this.saturation * 0.5, 100, this.alpha * 0.7);
        noStroke();
        rect(0, 0, this.size * 0.6, this.size * 0.6, this.size * 0.05);
        
        // Center dot
        fill(this.hue, this.saturation, 100, this.alpha);
        ellipse(0, 0, this.size * 0.2, this.size * 0.2);
        
        pop();
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// Rainbow particle class for special mode
class RainbowParticle {
    constructor(x, y, size, hue) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hue = hue;
        this.saturation = 100;
        this.brightness = 90;
        this.alpha = 80;
        this.velX = random(-3, 3);
        this.velY = random(-3, 3);
        this.life = random(100, 200);
        this.maxLife = this.life;
        this.shape = floor(random(3)); // 0: circle, 1: square, 2: triangle
    }
    
    update() {
        this.x += this.velX;
        this.y += this.velY;
        
        // Boundary wrapping
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
        
        // Velocity dampening
        this.velX *= 0.98;
        this.velY *= 0.98;
        
        this.life--;
        this.alpha = map(this.life, 0, this.maxLife, 0, 80);
    }
    
    display() {
        push();
        colorMode(HSB, 360, 100, 100, 100);
        fill(this.hue, this.saturation, this.brightness, this.alpha);
        noStroke();
        
        if (this.shape === 0) {
            ellipse(this.x, this.y, this.size, this.size);
        } else if (this.shape === 1) {
            rectMode(CENTER);
            rect(this.x, this.y, this.size, this.size);
        } else {
            // Triangle
            let halfSize = this.size / 2;
            triangle(
                this.x, this.y - halfSize,
                this.x - halfSize, this.y + halfSize,
                this.x + halfSize, this.y + halfSize
            );
        }
        pop();
    }
    
    isDead() {
        return this.life <= 0;
    }
}
