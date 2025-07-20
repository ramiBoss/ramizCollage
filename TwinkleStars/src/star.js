class Star {
    constructor(x, y, size = 10) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.hue = random(30, 60); // Golden/yellow hues for stars
        this.saturation = random(60, 100);
        this.brightness = random(70, 100);
        this.alpha = random(50, 100);
        this.twinkleSpeed = random(0.02, 0.05);
        this.rotation = random(TWO_PI);
        this.rotationSpeed = random(-0.02, 0.02);
        this.life = random(120, 300);
        this.maxLife = this.life;
        this.velX = random(-0.5, 0.5);
        this.velY = random(-0.5, 0.5);
    }
    
    update() {
        // Twinkling effect
        this.brightness = 70 + 30 * sin(frameCount * this.twinkleSpeed);
        this.alpha = 50 + 50 * sin(frameCount * this.twinkleSpeed + PI/2);
        
        // Gentle movement
        this.x += this.velX;
        this.y += this.velY;
        
        // Rotation
        this.rotation += this.rotationSpeed;
        
        // Life decay
        this.life--;
        
        // Bounce off edges
        if (this.x < 0 || this.x > width) this.velX *= -1;
        if (this.y < 0 || this.y > height) this.velY *= -1;
    }
    
    display() {
        push();
        colorMode(HSB, 360, 100, 100, 100);
        
        translate(this.x, this.y);
        rotate(this.rotation);
        
        // Glow effect
        for (let r = this.size * 2; r > 0; r -= 2) {
            fill(this.hue, this.saturation, this.brightness, this.alpha * (this.size * 2 - r) / (this.size * 2));
            noStroke();
            this.drawStar(0, 0, r * 0.4, r * 0.8, 5);
        }
        
        // Main star
        fill(this.hue, this.saturation, this.brightness, this.alpha);
        stroke(this.hue, this.saturation, 100, this.alpha * 0.8);
        strokeWeight(0.5);
        this.drawStar(0, 0, this.size * 0.4, this.size * 0.8, 5);
        
        pop();
    }
    
    drawStar(x, y, radius1, radius2, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius2;
            let sy = y + sin(a) * radius2;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
    
    isDead() {
        return this.life <= 0;
    }
}
