// Modern Untangle Game - Enhanced Version with ES6+ Features
class ModernUntangleGame {
  constructor() {
    this.canvas = document.getElementById('game');
    this.ctx = this.canvas.getContext('2d');
    this.canvasRect = null;
    
    // Game state
    this.circles = [];
    this.lines = [];
    this.level = 1;
    this.moves = 0;
    this.intersectionCount = 0;
    this.isGameSolved = false;
    this.isDragging = false;
    this.dragCircleIndex = -1;
    
    // Visual properties
    this.circleRadius = 15;
    this.lineThickness = 2;
    this.intersectionLineThickness = 4;
    
    // Difficulty settings
    this.difficulties = {
      easy: { circles: 5, name: 'Easy' },
      medium: { circles: 7, name: 'Medium' },
      hard: { circles: 10, name: 'Hard' },
      expert: { circles: 15, name: 'Expert' }
    };
    this.currentDifficulty = 'medium';
    
    // Animation properties
    this.animationId = null;
    this.particles = [];
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.updateCanvasRect();
    this.generateLevel();
    this.updateUI();
    this.startGameLoop();
  }
  
  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    
    // Touch events for mobile
    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
    
    // Button events
    $('#newGameBtn').on('click', () => this.newGame());
    $('#hintBtn').on('click', () => this.showHint());
    $('#resetBtn').on('click', () => this.resetLevel());
    $('#difficulty').on('change', (e) => this.changeDifficulty(e.target.value));
    
    // Window resize
    $(window).on('resize', () => this.updateCanvasRect());
    
    // Prevent context menu
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  
  updateCanvasRect() {
    this.canvasRect = this.canvas.getBoundingClientRect();
  }
  
  getMousePos(event) {
    const rect = this.canvasRect || this.canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (this.canvas.width / rect.width),
      y: (event.clientY - rect.top) * (this.canvas.height / rect.height)
    };
  }
  
  getTouchPos(event) {
    const touch = event.touches[0] || event.changedTouches[0];
    return this.getMousePos(touch);
  }
  
  generateLevel() {
    this.circles = [];
    this.lines = [];
    this.moves = 0;
    this.isGameSolved = false;
    this.intersectionCount = 0;
    
    const circleCount = this.difficulties[this.currentDifficulty].circles;
    const margin = this.circleRadius * 2;
    
    // Generate circles with minimum distance
    for (let i = 0; i < circleCount; i++) {
      let attempts = 0;
      let validPosition = false;
      let x, y;
      
      while (!validPosition && attempts < 100) {
        x = margin + Math.random() * (this.canvas.width - 2 * margin);
        y = margin + Math.random() * (this.canvas.height - 2 * margin);
        
        validPosition = true;
        for (let j = 0; j < this.circles.length; j++) {
          const distance = Math.sqrt(
            Math.pow(x - this.circles[j].x, 2) + Math.pow(y - this.circles[j].y, 2)
          );
          if (distance < this.circleRadius * 3) {
            validPosition = false;
            break;
          }
        }
        attempts++;
      }
      
      this.circles.push({
        x: x,
        y: y,
        radius: this.circleRadius,
        originalX: x,
        originalY: y,
        isHovered: false,
        isDragging: false
      });
    }
    
    // Generate lines connecting all circles
    this.generateLines();
    
    // Scramble the circles to create intersections
    this.scrambleCircles();
    
    this.updateIntersections();
    this.updateUI();
  }
  
  generateLines() {
    this.lines = [];
    for (let i = 0; i < this.circles.length; i++) {
      for (let j = i + 1; j < this.circles.length; j++) {
        this.lines.push({
          startIndex: i,
          endIndex: j,
          isIntersecting: false
        });
      }
    }
  }
  
  scrambleCircles() {
    // Move circles to create some intersections
    const scrambleIntensity = 0.3;
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      const maxOffset = Math.min(this.canvas.width, this.canvas.height) * scrambleIntensity;
      
      circle.x += (Math.random() - 0.5) * maxOffset;
      circle.y += (Math.random() - 0.5) * maxOffset;
      
      // Keep within bounds
      circle.x = Math.max(this.circleRadius, Math.min(this.canvas.width - this.circleRadius, circle.x));
      circle.y = Math.max(this.circleRadius, Math.min(this.canvas.height - this.circleRadius, circle.y));
    }
  }
  
  handleMouseDown(event) {
    const mousePos = this.getMousePos(event);
    this.startDrag(mousePos);
  }
  
  handleMouseMove(event) {
    const mousePos = this.getMousePos(event);
    this.updateDrag(mousePos);
  }
  
  handleMouseUp(event) {
    this.endDrag();
  }
  
  handleTouchStart(event) {
    event.preventDefault();
    const touchPos = this.getTouchPos(event);
    this.startDrag(touchPos);
  }
  
  handleTouchMove(event) {
    event.preventDefault();
    const touchPos = this.getTouchPos(event);
    this.updateDrag(touchPos);
  }
  
  handleTouchEnd(event) {
    event.preventDefault();
    this.endDrag();
  }
  
  startDrag(pos) {
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      const distance = Math.sqrt(
        Math.pow(pos.x - circle.x, 2) + Math.pow(pos.y - circle.y, 2)
      );
      
      if (distance <= circle.radius) {
        this.isDragging = true;
        this.dragCircleIndex = i;
        circle.isDragging = true;
        this.canvas.style.cursor = 'grabbing';
        break;
      }
    }
  }
  
  updateDrag(pos) {
    if (this.isDragging && this.dragCircleIndex >= 0) {
      const circle = this.circles[this.dragCircleIndex];
      
      // Update position with bounds checking
      circle.x = Math.max(circle.radius, Math.min(this.canvas.width - circle.radius, pos.x));
      circle.y = Math.max(circle.radius, Math.min(this.canvas.height - circle.radius, pos.y));
      
      this.updateIntersections();
    } else {
      // Check for hover effects
      this.updateHoverStates(pos);
    }
  }
  
  endDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      if (this.dragCircleIndex >= 0) {
        this.circles[this.dragCircleIndex].isDragging = false;
        this.moves++;
        this.checkWinCondition();
      }
      this.dragCircleIndex = -1;
      this.canvas.style.cursor = 'grab';
      this.updateUI();
    }
  }
  
  updateHoverStates(pos) {
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      const distance = Math.sqrt(
        Math.pow(pos.x - circle.x, 2) + Math.pow(pos.y - circle.y, 2)
      );
      circle.isHovered = distance <= circle.radius;
    }
  }
  
  updateIntersections() {
    this.intersectionCount = 0;
    
    for (let i = 0; i < this.lines.length; i++) {
      const line = this.lines[i];
      line.isIntersecting = false;
      
      for (let j = i + 1; j < this.lines.length; j++) {
        const otherLine = this.lines[j];
        
        if (this.doLinesIntersect(line, otherLine)) {
          line.isIntersecting = true;
          otherLine.isIntersecting = true;
        }
      }
      
      if (line.isIntersecting) {
        this.intersectionCount++;
      }
    }
    
    // Each intersection is counted twice, so divide by 2
    this.intersectionCount = Math.floor(this.intersectionCount / 2);
  }
  
  doLinesIntersect(line1, line2) {
    const start1 = this.circles[line1.startIndex];
    const end1 = this.circles[line1.endIndex];
    const start2 = this.circles[line2.startIndex];
    const end2 = this.circles[line2.endIndex];
    
    // Skip if lines share a common point
    if (line1.startIndex === line2.startIndex || line1.startIndex === line2.endIndex ||
        line1.endIndex === line2.startIndex || line1.endIndex === line2.endIndex) {
      return false;
    }
    
    return this.lineIntersection(start1, end1, start2, end2);
  }
  
  lineIntersection(p1, p2, p3, p4) {
    const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
    
    if (Math.abs(denominator) < 0.0001) {
      return false; // Lines are parallel
    }
    
    const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
    const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;
    
    return ua > 0.001 && ua < 0.999 && ub > 0.001 && ub < 0.999;
  }
  
  checkWinCondition() {
    if (this.intersectionCount === 0 && !this.isGameSolved) {
      this.isGameSolved = true;
      this.celebrateWin();
    }
  }
  
  celebrateWin() {
    this.canvas.classList.add('solved');
    $('#gameStatus').addClass('success').text(
      `🎉 Level ${this.level} Complete! Solved in ${this.moves} moves!`
    );
    
    // Create celebration particles
    this.createCelebrationParticles();
    
    // Auto-advance to next level after delay
    setTimeout(() => {
      this.level++;
      this.newGame();
    }, 3000);
  }
  
  createCelebrationParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 1.0,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`
      });
    }
  }
  
  updateParticles() {
    this.particles = this.particles.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.life -= 0.02;
      return particle.life > 0;
    });
  }
  
  startGameLoop() {
    const gameLoop = () => {
      this.update();
      this.render();
      this.animationId = requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }
  
  update() {
    this.updateParticles();
  }
  
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw lines
    this.drawLines();
    
    // Draw circles
    this.drawCircles();
    
    // Draw particles
    this.drawParticles();
  }
  
  drawLines() {
    for (const line of this.lines) {
      const start = this.circles[line.startIndex];
      const end = this.circles[line.endIndex];
      
      this.ctx.beginPath();
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      
      if (line.isIntersecting) {
        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.lineWidth = this.intersectionLineThickness;
        this.ctx.shadowColor = '#ff6b6b';
        this.ctx.shadowBlur = 10;
      } else {
        this.ctx.strokeStyle = '#00ff88';
        this.ctx.lineWidth = this.lineThickness;
        this.ctx.shadowColor = '#00ff88';
        this.ctx.shadowBlur = 5;
      }
      
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }
  }
  
  drawCircles() {
    for (const circle of this.circles) {
      // Draw circle shadow
      this.ctx.beginPath();
      this.ctx.arc(circle.x + 2, circle.y + 2, circle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      this.ctx.fill();
      
      // Draw main circle
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      
      if (circle.isDragging) {
        this.ctx.fillStyle = '#74b9ff';
        this.ctx.shadowColor = '#74b9ff';
        this.ctx.shadowBlur = 20;
      } else if (circle.isHovered) {
        this.ctx.fillStyle = '#ffeaa7';
        this.ctx.shadowColor = '#ffeaa7';
        this.ctx.shadowBlur = 15;
      } else {
        this.ctx.fillStyle = '#fdcb6e';
        this.ctx.shadowColor = '#fdcb6e';
        this.ctx.shadowBlur = 10;
      }
      
      this.ctx.fill();
      
      // Draw circle border
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    }
  }
  
  drawParticles() {
    for (const particle of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.fillStyle = particle.color;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  
  newGame() {
    this.canvas.classList.remove('solved');
    $('#gameStatus').removeClass('success');
    this.particles = [];
    this.generateLevel();
    this.updateStatus('Drag the circles to untangle all the lines!');
  }
  
  resetLevel() {
    // Reset circles to original positions
    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].x = this.circles[i].originalX;
      this.circles[i].y = this.circles[i].originalY;
    }
    this.moves = 0;
    this.isGameSolved = false;
    this.updateIntersections();
    this.updateUI();
    this.updateStatus('Level reset! Try again.');
  }
  
  showHint() {
    // Find the circle that would reduce the most intersections if moved
    let bestCircle = -1;
    let bestReduction = 0;
    
    for (let i = 0; i < this.circles.length; i++) {
      const originalX = this.circles[i].x;
      const originalY = this.circles[i].y;
      const originalIntersections = this.intersectionCount;
      
      // Try moving the circle to its original position
      this.circles[i].x = this.circles[i].originalX;
      this.circles[i].y = this.circles[i].originalY;
      this.updateIntersections();
      
      const reduction = originalIntersections - this.intersectionCount;
      if (reduction > bestReduction) {
        bestReduction = reduction;
        bestCircle = i;
      }
      
      // Restore position
      this.circles[i].x = originalX;
      this.circles[i].y = originalY;
    }
    
    this.updateIntersections();
    
    if (bestCircle >= 0) {
      // Highlight the best circle
      this.circles[bestCircle].isHovered = true;
      setTimeout(() => {
        if (this.circles[bestCircle]) {
          this.circles[bestCircle].isHovered = false;
        }
      }, 2000);
      
      this.updateStatus(`Hint: Try moving the highlighted circle! It could reduce ${bestReduction} intersection(s).`);
    } else {
      this.updateStatus('No obvious moves available. Try different positions!');
    }
  }
  
  changeDifficulty(difficulty) {
    this.currentDifficulty = difficulty;
    this.level = 1;
    this.newGame();
  }
  
  updateUI() {
    $('#level').text(this.level);
    $('#moves').text(this.moves);
    $('#intersections').text(this.intersectionCount);
  }
  
  updateStatus(message) {
    $('#gameStatus').removeClass('success').text(message);
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize the game when document is ready
$(document).ready(() => {
  window.untangleGame = new ModernUntangleGame();
  
  console.log('Modern Untangle Game initialized!');
  console.log('Drag the yellow circles to untangle all the red intersecting lines!');
});
