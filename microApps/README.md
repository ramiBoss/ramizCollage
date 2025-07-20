# 🎮 Unified Micro Apps

A collection of interactive animations and visual effects powered by p5.js, unified into a single, seamless web application.

## 🚀 Features

### 📈 Falling Lines Animation
- **Physics-based simulation** with realistic gravity and bouncing
- **Customizable parameters**: speed, gravity, thickness, density
- **Visual effects**: trails, multiple color modes, background options
- **Interactive controls**: mouse interaction affects nearby lines

### ✨ StarField Simulation
- **3D starfield** with warp speed effects
- **Variable star count** (100-2000 stars)
- **Color palettes**: Classic white, Rainbow, Nebula, Fire
- **Trail effects** for enhanced visual appeal
- **Speed control** from stationary to warp speed

### 🔢 Matrix Hack Theme
- **Digital rain effect** inspired by The Matrix
- **Multiple modes**: Grid and Rain animations
- **Character sets**: Latin letters, Numbers, Japanese Katakana
- **Color themes**: Classic green, Rainbow, Fire, Cyber
- **Adjustable speed and brightness**

## 🎯 Unified Features

- **Seamless navigation** between apps
- **Consistent UI/UX** with glassmorphism design
- **Responsive design** that works on desktop and mobile
- **Theme adaptation** based on active app
- **Performance monitoring** with real-time FPS display
- **Keyboard shortcuts** for power users
- **Touch gesture support** for mobile devices
- **Fullscreen mode** for immersive experience

## 🎮 Controls

### Global Navigation
- **Number keys 1-3**: Switch between apps
- **Home/Escape**: Return to welcome screen
- **Swipe gestures**: Navigate on mobile devices

### App-Specific Controls
Each app has its own set of controls displayed in the interface:

#### Common Shortcuts
- **Spacebar**: Play/Pause animation
- **R**: Reset animation
- **F**: Toggle fullscreen
- **↑/↓ Arrow keys**: Adjust speed

#### Lines App
- **T**: Toggle trails
- **C**: Cycle color modes
- **B**: Change background color

#### StarField App
- **T**: Toggle star trails
- **C**: Toggle color mode

#### Matrix App
- **M**: Switch between Grid/Rain modes
- **S**: Cycle character sets
- **C**: Cycle color themes

## 🏗️ Technical Architecture

### Modular Design
- **unified-app.html**: Main application shell
- **unified-app.js**: Core navigation and app management
- **unified-lines.js**: Falling lines animation module
- **unified-starfield.js**: StarField simulation module
- **unified-matrix.js**: Matrix effect module

### Performance Optimizations
- **Efficient rendering** with p5.js instance management
- **Memory management** with proper cleanup between apps
- **Frame rate monitoring** and optimization
- **Responsive canvas resizing**

### Browser Compatibility
- **Modern browsers** with ES6+ support
- **WebGL acceleration** where available
- **Fallback rendering** for older browsers
- **Mobile touch support**

## 🚀 Getting Started

1. **Open** `unified-app.html` in a modern web browser
2. **Navigate** between apps using the header buttons
3. **Customize** each app using the control panels
4. **Enjoy** the interactive animations!

## 🎨 Customization

### Adding New Apps
To add a new app to the unified system:

1. Create a new JavaScript module following the pattern
2. Add navigation button to the HTML
3. Include the module in the main HTML file
4. Implement the required interface functions

### Modifying Existing Apps
Each app module is self-contained and can be modified independently:
- Adjust parameters in the app's global object
- Modify the drawing functions
- Add new control functions

## 📱 Mobile Experience

The unified app is fully responsive and touch-friendly:
- **Swipe navigation** between apps
- **Touch controls** for interactive elements
- **Adaptive layouts** for different screen sizes
- **Optimized performance** for mobile devices

## 🔧 Development

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server for development (optional but recommended)

### File Structure
```
microApps/
├── unified-app.html          # Main application
├── unified-app.js           # Core app controller
├── unified-lines.js         # Lines animation module
├── unified-starfield.js     # StarField module
├── unified-matrix.js        # Matrix effect module
└── README.md               # This file
```

### Performance Tips
- Use browser developer tools to monitor performance
- Adjust particle counts based on device capabilities
- Enable hardware acceleration when available

## 🌟 Future Enhancements

Potential additions and improvements:
- **Audio visualization** sync with microphone input
- **Shader effects** for advanced graphics
- **Export functionality** for saving animations
- **Custom themes** and color palettes
- **Particle system** framework
- **VR/AR support** for immersive experiences

## 📄 License

This project is part of the ramizCollage repository and follows the same licensing terms.

## 🤝 Contributing

Feel free to fork, modify, and improve the unified app system. Contributions are welcome!

---

**Enjoy the visual journey through these interactive micro apps!** ✨
