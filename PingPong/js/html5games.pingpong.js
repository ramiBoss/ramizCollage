// Modern Ping Pong Game - Enhanced Version with ES6+ Features
class ModernPingPongGame {
  constructor() {
    this.KEY = {
      UP: 38,
      DOWN: 40,
      W: 87,
      S: 83,
      SPACE: 32,
      R: 82,
      ESCAPE: 27
    };
    
    // Game state
    this.scoreA = 0;
    this.scoreB = 0;
    this.maxScore = 11; // Traditional ping pong scoring
    this.gameActive = true;
    this.gamePaused = false;
    this.gameStarted = false;
    
    // Ball properties
    this.ball = {
      speed: 4,
      maxSpeed: 8,
      x: 390, // Will be reset in init
      y: 190, // Will be reset in init
      directionX: Math.random() > 0.5 ? 1 : -1,
      directionY: (Math.random() - 0.5) * 0.8,
      size: 20,
      trail: []
    };
    
    // Paddle properties
    this.paddleA = {
      speed: 6,
      y: 160,
      height: 80,
      width: 15,
      ai: false
    };
    
    this.paddleB = {
      speed: 6,
      y: 160,
      height: 80,
      width: 15,
      ai: false // Can be toggled for AI opponent
    };
    
    this.pressedKeys = {};
    this.lastTime = 0;
    this.animationId = null;
    
    // Game settings
    this.settings = {
      ballSpeedIncrease: 1.05,
      maxBallSpeed: 10,
      paddleSpeedIncrease: 1.02,
      aiDifficulty: 0.85, // AI reaction speed (0-1)
      enableSounds: true,
      enableParticles: true
    };
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.createAudioContext();
    this.updateScore();
    this.resetBallPosition();
    this.updateStatus("Press SPACE to start the game! First to 11 wins!");
    
    // Set initial paddle positions
    $('#paddleA').css('top', this.paddleA.y + 'px');
    $('#paddleB').css('top', this.paddleB.y + 'px');
    
    // Start the game loop
    this.gameLoop();
  }
  
  createAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.sounds = {
        paddle: () => this.playTone(440, 0.1, 'sine'),
        wall: () => this.playTone(220, 0.15, 'square'),
        score: () => this.playTone(660, 0.3, 'triangle'),
        gameEnd: () => this.playMelody([440, 554, 659, 880], 0.5)
      };
    } catch (e) {
      console.warn('Audio not supported');
      this.sounds = {
        paddle: () => {},
        wall: () => {},
        score: () => {},
        gameEnd: () => {}
      };
    }
  }
  
  playTone(frequency, duration, type = 'sine') {
    if (!this.settings.enableSounds || !this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
    
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
  
  playMelody(frequencies, noteDuration) {
    frequencies.forEach((freq, index) => {
      setTimeout(() => this.playTone(freq, noteDuration * 0.8), index * noteDuration * 1000);
    });
  }
  
  setupEventListeners() {
    $(document).keydown((e) => {
      this.pressedKeys[e.which] = true;
      this.handleKeyPress(e.which);
      
      // Prevent default for game keys
      if (Object.values(this.KEY).includes(e.which)) {
        e.preventDefault();
      }
    });
    
    $(document).keyup((e) => {
      this.pressedKeys[e.which] = false;
    });
    
    // Handle window focus/blur for pause
    $(window).blur(() => {
      if (this.gameStarted && this.gameActive) {
        this.pauseGame();
      }
    });
    
    // Click to resume if paused
    $(document).click(() => {
      if (this.gamePaused) {
        this.resumeGame();
      }
    });
  }
  
  handleKeyPress(key) {
    switch (key) {
      case this.KEY.SPACE:
        if (!this.gameStarted) {
          this.startGame();
        } else if (this.gameActive) {
          this.togglePause();
        }
        break;
      case this.KEY.R:
        this.resetGame();
        break;
      case this.KEY.ESCAPE:
        this.pauseGame();
        break;
    }
  }
  
  startGame() {
    this.gameStarted = true;
    this.gameActive = true;
    this.gamePaused = false;
    this.updateStatus("Game started! First to 11 wins!");
  }
  
  gameLoop(currentTime = 0) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (this.gameActive && !this.gamePaused && this.gameStarted) {
      this.update(deltaTime);
      this.render();
    }
    
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  update(deltaTime) {
    this.moveBall();
    this.movePaddles();
    this.updateAI();
    this.checkCollisions();
    this.updateParticles();
  }
  
  moveBall() {
    const playground = $('#playground');
    const playgroundHeight = playground.height();
    const playgroundWidth = playground.width();
    
    // Calculate next position
    const nextX = this.ball.x + this.ball.speed * this.ball.directionX;
    const nextY = this.ball.y + this.ball.speed * this.ball.directionY;
    
    // Wall collision (top/bottom)
    if (nextY <= 0 || nextY >= playgroundHeight - this.ball.size) {
      this.ball.directionY *= -1;
      this.sounds.wall();
      this.createParticles(this.ball.x, nextY <= 0 ? 0 : playgroundHeight, '#74b9ff');
    } else {
      this.ball.y = nextY;
    }
    
    // Update ball trail
    this.updateBallTrail();
    
    this.ball.x = nextX;
  }
  
  updateBallTrail() {
    this.ball.trail.push({ x: this.ball.x, y: this.ball.y, life: 1.0 });
    
    // Limit trail length and update life
    this.ball.trail = this.ball.trail
      .filter(point => point.life > 0)
      .slice(-10)
      .map(point => ({ ...point, life: point.life - 0.1 }));
  }
  
  checkCollisions() {
    const playgroundWidth = $('#playground').width();
    
    // Paddle collisions
    this.checkPaddleCollision(this.paddleA, 'left');
    this.checkPaddleCollision(this.paddleB, 'right');
    
    // Score detection
    if (this.ball.x <= -this.ball.size) {
      this.score('B');
    } else if (this.ball.x >= playgroundWidth) {
      this.score('A');
    }
  }
  
  checkPaddleCollision(paddle, side) {
    const playground = $('#playground');
    const paddleElement = side === 'left' ? $('#paddleA') : $('#paddleB');
    const paddleX = side === 'left' ? 30 : playground.width() - 45;
    
    // Check collision bounds
    if (this.ball.x < paddleX + paddle.width &&
        this.ball.x + this.ball.size > paddleX &&
        this.ball.y < paddle.y + paddle.height &&
        this.ball.y + this.ball.size > paddle.y) {
      
      // Calculate hit position for angle variation
      const hitPos = (this.ball.y + this.ball.size/2 - paddle.y) / paddle.height;
      const angle = (hitPos - 0.5) * Math.PI/3; // Max 60 degree angle
      
      // Reverse X direction and apply angle
      this.ball.directionX *= -1;
      this.ball.directionY = Math.sin(angle) * 1.2;
      
      // Increase ball speed gradually
      this.ball.speed = Math.min(
        this.ball.speed * this.settings.ballSpeedIncrease,
        this.settings.maxBallSpeed
      );
      
      // Move ball away from paddle to prevent sticking
      if (side === 'left') {
        this.ball.x = paddleX + paddle.width + 1;
      } else {
        this.ball.x = paddleX - this.ball.size - 1;
      }
      
      this.sounds.paddle();
      this.createParticles(this.ball.x, this.ball.y, '#ff6b6b');
      this.addPaddleEffect(side === 'left' ? '#paddleA' : '#paddleB');
    }
  }
  
  movePaddles() {
    const playgroundHeight = $('#playground').height();
    
    // Player 1 controls (W/S)
    if (this.pressedKeys[this.KEY.W] && this.paddleA.y > 0) {
      this.paddleA.y = Math.max(0, this.paddleA.y - this.paddleA.speed);
    }
    if (this.pressedKeys[this.KEY.S] && this.paddleA.y < playgroundHeight - this.paddleA.height) {
      this.paddleA.y = Math.min(playgroundHeight - this.paddleA.height, this.paddleA.y + this.paddleA.speed);
    }
    
    // Player 2 controls (Arrow keys) - if not AI
    if (!this.paddleB.ai) {
      if (this.pressedKeys[this.KEY.UP] && this.paddleB.y > 0) {
        this.paddleB.y = Math.max(0, this.paddleB.y - this.paddleB.speed);
      }
      if (this.pressedKeys[this.KEY.DOWN] && this.paddleB.y < playgroundHeight - this.paddleB.height) {
        this.paddleB.y = Math.min(playgroundHeight - this.paddleB.height, this.paddleB.y + this.paddleB.speed);
      }
    }
  }
  
  updateAI() {
    if (!this.paddleB.ai) return;
    
    // Simple AI that follows the ball
    const ballCenterY = this.ball.y + this.ball.size / 2;
    const paddleCenterY = this.paddleB.y + this.paddleB.height / 2;
    const diff = ballCenterY - paddleCenterY;
    
    // Add some imperfection to AI
    if (Math.abs(diff) > 10 && Math.random() < this.settings.aiDifficulty) {
      if (diff > 0) {
        this.paddleB.y = Math.min(
          $('#playground').height() - this.paddleB.height,
          this.paddleB.y + this.paddleB.speed * 0.8
        );
      } else {
        this.paddleB.y = Math.max(0, this.paddleB.y - this.paddleB.speed * 0.8);
      }
    }
  }
  
  score(player) {
    if (player === 'A') {
      this.scoreA++;
    } else {
      this.scoreB++;
    }
    
    this.sounds.score();
    this.updateScore();
    this.resetBallPosition();
    this.createCelebrationParticles(player);
    
    // Check for game end
    if (this.scoreA >= this.maxScore || this.scoreB >= this.maxScore) {
      this.endGame(player);
    } else {
      this.updateStatus(`${player === 'A' ? 'Player 1' : 'Player 2'} scores! ${this.getScoreStatus()}`);
    }
  }
  
  getScoreStatus() {
    const diff = Math.abs(this.scoreA - this.scoreB);
    if (diff >= 3) return "Dominating!";
    if (diff >= 2) return "Taking control!";
    return "Close game!";
  }
  
  updateScore() {
    $('#scoreA').text(this.scoreA);
    $('#scoreB').text(this.scoreB);
  }
  
  resetBallPosition() {
    const playground = $('#playground');
    this.ball.x = playground.width() / 2 - this.ball.size / 2;
    this.ball.y = playground.height() / 2 - this.ball.size / 2;
    this.ball.speed = 4;
    this.ball.directionX = Math.random() > 0.5 ? 1 : -1;
    this.ball.directionY = (Math.random() - 0.5) * 0.8;
    this.ball.trail = [];
    
    // Update ball position immediately
    $('#ball').css({
      left: this.ball.x + 'px',
      top: this.ball.y + 'px'
    });
  }
  
  createParticles(x, y, color) {
    if (!this.settings.enableParticles) return;
    
    for (let i = 0; i < 5; i++) {
      const particle = $('<div>').css({
        position: 'absolute',
        left: x + Math.random() * 20 - 10 + 'px',
        top: y + Math.random() * 20 - 10 + 'px',
        width: '4px',
        height: '4px',
        background: color,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 10
      });
      
      $('#playground').append(particle);
      
      particle.animate({
        left: '+=' + (Math.random() * 60 - 30),
        top: '+=' + (Math.random() * 60 - 30),
        opacity: 0
      }, 500, () => particle.remove());
    }
  }
  
  createCelebrationParticles(player) {
    const x = player === 'A' ? 100 : $('#playground').width() - 100;
    const y = $('#playground').height() / 2;
    
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        this.createParticles(x, y, `hsl(${Math.random() * 360}, 70%, 60%)`);
      }, i * 50);
    }
  }
  
  updateParticles() {
    // Render ball trail
    if (this.ball.trail.length > 1) {
      this.renderBallTrail();
    }
  }
  
  renderBallTrail() {
    // Remove old trail elements
    $('.ball-trail').remove();
    
    // Create new trail elements
    this.ball.trail.forEach((point, index) => {
      const trail = $('<div>').addClass('ball-trail').css({
        position: 'absolute',
        left: point.x + 'px',
        top: point.y + 'px',
        width: (point.life * 10) + 'px',
        height: (point.life * 10) + 'px',
        background: `rgba(255, 234, 167, ${point.life * 0.5})`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1
      });
      
      $('#playground').append(trail);
    });
  }
  
  addPaddleEffect(paddleId) {
    const paddle = $(paddleId);
    paddle.addClass('paddle-hit');
    setTimeout(() => paddle.removeClass('paddle-hit'), 200);
  }
  
  togglePause() {
    if (this.gamePaused) {
      this.resumeGame();
    } else {
      this.pauseGame();
    }
  }
  
  pauseGame() {
    this.gamePaused = true;
    this.updateStatus('Game Paused - Press SPACE to resume or click anywhere');
  }
  
  resumeGame() {
    this.gamePaused = false;
    this.updateStatus('Game Resumed!');
    setTimeout(() => {
      if (this.gameActive) {
        this.updateStatus(`Playing to ${this.maxScore} - ${this.getScoreStatus()}`);
      }
    }, 1000);
  }
  
  resetGame() {
    this.scoreA = 0;
    this.scoreB = 0;
    this.gameActive = true;
    this.gamePaused = false;
    this.gameStarted = false;
    this.ball.speed = 4;
    this.updateScore();
    this.resetBallPosition();
    $('.ball-trail').remove();
    this.updateStatus('Game Reset! Press SPACE to start');
  }
  
  endGame(winner) {
    this.gameActive = false;
    this.gameStarted = false;
    const winnerName = winner === 'A' ? 'Player 1' : 'Player 2';
    this.updateStatus(`🏆 ${winnerName} Wins the Championship! Press R to play again`);
    
    this.sounds.gameEnd();
    this.createVictoryEffect();
  }
  
  createVictoryEffect() {
    // Create confetti effect
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const confetti = $('<div>').css({
          position: 'absolute',
          left: Math.random() * $('#playground').width() + 'px',
          top: '-10px',
          width: Math.random() * 8 + 4 + 'px',
          height: Math.random() * 8 + 4 + 'px',
          background: `hsl(${Math.random() * 360}, 80%, 60%)`,
          borderRadius: Math.random() > 0.5 ? '50%' : '0',
          pointerEvents: 'none',
          zIndex: 20
        });
        
        $('#playground').append(confetti);
        confetti.animate({
          top: $('#playground').height() + 20 + 'px',
          left: '+=' + (Math.random() * 200 - 100) + 'px',
          opacity: 0
        }, 3000, () => confetti.remove());
      }, i * 100);
    }
  }
  
  render() {
    // Update ball position
    $('#ball').css({
      left: this.ball.x + 'px',
      top: this.ball.y + 'px'
    });
    
    // Update paddle positions
    $('#paddleA').css('top', this.paddleA.y + 'px');
    $('#paddleB').css('top', this.paddleB.y + 'px');
  }
  
  updateStatus(message) {
    const statusElement = $('#gameStatus');
    if (statusElement.length) {
      statusElement.text(message);
    } else {
      console.log('Game Status:', message);
    }
  }
  
  // Public methods for external control
  toggleAI() {
    this.paddleB.ai = !this.paddleB.ai;
    this.updateStatus(this.paddleB.ai ? 'AI opponent enabled' : 'Two player mode');
  }
  
  adjustDifficulty(level) {
    // level: 1 (easy) to 5 (very hard)
    this.settings.aiDifficulty = Math.min(0.95, 0.5 + (level * 0.1));
    this.paddleB.speed = 4 + level;
  }
}

// Add CSS for enhanced effects
$('<style>').text(`
  .paddle-hit {
    box-shadow: 0 0 25px rgba(255, 107, 107, 1) !important;
    transform: scale(1.1) !important;
  }
  
  .ball-trail {
    transition: all 0.1s ease;
  }
  
  #ball {
    transition: all 0.05s ease;
  }
`).appendTo('head');

// Initialize the modern ping pong game
$(document).ready(() => {
  // Clear any existing intervals
  if (window.pingpongGame) {
    if (window.pingpongGame.timer) {
      clearInterval(window.pingpongGame.timer);
    }
    if (window.pingpongGame.animationId) {
      cancelAnimationFrame(window.pingpongGame.animationId);
    }
  }
  
  // Wait a bit to ensure all elements are rendered
  setTimeout(() => {
    window.pingpongGame = new ModernPingPongGame();
    
    // Expose some controls to the console for testing
    window.toggleAI = () => window.pingpongGame.toggleAI();
    window.setDifficulty = (level) => window.pingpongGame.adjustDifficulty(level);
    
    console.log('Modern Ping Pong Game initialized!');
    console.log('Use SPACE to start, W/S for left paddle, arrows for right paddle');
    console.log('Type toggleAI() in console to enable AI opponent');
  }, 100);
});
