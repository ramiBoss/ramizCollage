class Ball {
    constructor(x, y, size = 15) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.targetSize = size;
        this.hue = random(360);
        this.saturation = random(60, 100);
        this.brightness = random(70, 100);
        this.alpha = random(70, 100);
        this.velX = random(-2, 2);
        this.velY = random(-2, 2);
        this.pulseSpeed = random(0.02, 0.06);
        this.life = random(180, 400);
        this.maxLife = this.life;
        this.gravity = 0.02;
        this.bounce = 0.8;
    }
    
    update() {
        // Movement with gravity
        this.velY += this.gravity;
        this.x += this.velX;
        this.y += this.velY;
        
        // Bounce off edges
        if (this.x - this.size/2 < 0 || this.x + this.size/2 > width) {
            this.velX *= -this.bounce;
            this.x = constrain(this.x, this.size/2, width - this.size/2);
        }
        
        if (this.y - this.size/2 < 0 || this.y + this.size/2 > height) {
            this.velY *= -this.bounce;
            this.y = constrain(this.y, this.size/2, height - this.size/2);
        }
        
        // Pulsing effect
        this.size = this.targetSize + sin(frameCount * this.pulseSpeed) * (this.targetSize * 0.2);
        
        // Color shifting
        this.hue = (this.hue + 0.5) % 360;
        
        // Air resistance
        this.velX *= 0.99;
        this.velY *= 0.99;
        
        // Life decay
        this.life--;
        this.alpha = map(this.life, 0, this.maxLife, 0, 100);
    }
    
    display() {
        push();
        colorMode(HSB, 360, 100, 100, 100);
        
        // Glow effect
        for (let r = this.size * 1.5; r > this.size * 0.2; r -= 2) {
            let alpha = this.alpha * (this.size * 1.5 - r) / (this.size * 1.3);
            fill(this.hue, this.saturation, this.brightness, alpha);
            noStroke();
            ellipse(this.x, this.y, r, r);
        }
        
        // Main ball
        fill(this.hue, this.saturation, this.brightness, this.alpha);
        stroke(this.hue, this.saturation, 100, this.alpha * 0.8);
        strokeWeight(1);
        ellipse(this.x, this.y, this.size, this.size);
        
        // Highlight
        fill(this.hue, this.saturation * 0.3, 100, this.alpha * 0.6);
        noStroke();
        ellipse(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.3, this.size * 0.3);
        
        pop();
    }
    
    isDead() {
        return this.life <= 0;
    }
}
