# 🎨 Interactive Visual Apps Collection

A unified single-page web application featuring four stunning visual experiences, all converted from Processing to modern HTML5/JavaScript using p5.js.

## ✨ Features

### 🌌 StarField
- **3D Star Field Simulation**: Watch stars fly towards you in mesmerizing 3D space
- **Interactive Controls**: Adjust speed, star count, and size in real-time
- **Color Modes**: Classic white, rainbow, fire, and ice themes
- **Trail Effects**: Optional star trails for enhanced visual appeal
- **Pause/Resume**: Full animation control

### 💚 Matrix Digital Rain
- **Authentic Matrix Effect**: Green digital rain with Japanese characters
- **Dynamic Streams**: Configurable number of falling character streams
- **Real-time Customization**: Adjust fade speed, stream density, and font size
- **Symbol Animation**: Characters change randomly for authentic digital rain feel
- **Performance Optimized**: Smooth 60fps animation

### ⭐ TwinkleStars
- **Multiple Particle Modes**: Stars, bouncing balls, rotating boxes, and rainbow particles
- **Interactive Generation**: Click to create particles or use automatic generation
- **Trail System**: Optional particle trails with fade effects
- **Animation Speed Control**: Fine-tune the generation and movement speed
- **Size Customization**: Adjust particle sizes to your preference

### 📈 Falling Lines
- **Physics Simulation**: Realistic gravity and bounce effects
- **Interactive Controls**: Adjust gravity, speed, and line properties
- **Visual Customization**: Line thickness, density, and color options
- **Trail Effects**: Optional motion trails for enhanced visuals
- **Background Modes**: Multiple color themes and fullscreen support

## 🎮 Controls

### Global Navigation
- **Number Keys 1-4**: Quick switch between apps
- **H Key**: Return to home page
- **Space Bar**: Pause/resume current animation

### Per-App Controls
Each visual app includes its own control panel with:
- **Sliders**: Real-time parameter adjustment
- **Buttons**: Toggle features and modes
- **Keyboard Shortcuts**: Quick access to common functions

## 🚀 Getting Started

1. **Open the App**: Simply open `index.html` in any modern web browser
2. **Navigate**: Use the navigation menu or number keys to switch between apps
3. **Customize**: Use the control panels to adjust each app's behavior
4. **Enjoy**: Experiment with different settings to create unique visual experiences

## 📁 Project Structure

```
processing/
├── index.html              # Main unified app page
├── unified-apps.js          # JavaScript controller for all apps
├── README.md               # This documentation
└── StarField/              # Individual StarField app
    ├── index.html
    ├── starfield.js
    └── README.md
```

## 🛠️ Technical Details

### Built With
- **p5.js**: Creative coding framework for interactive graphics
- **HTML5 Canvas**: Hardware-accelerated 2D rendering
- **Modern CSS**: Responsive design with glassmorphism effects
- **Vanilla JavaScript**: No external dependencies beyond p5.js

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance Features
- **Optimized Rendering**: Efficient particle systems and draw calls
- **Memory Management**: Automatic cleanup of old particles
- **Responsive Design**: Adapts to different screen sizes
- **Background Processing**: Apps pause when not visible

## 🎨 Customization

Each app offers extensive customization options:

### StarField
- Star count: 100-1000 stars
- Speed: 1-20x multiplier
- Star size: 10-100 pixel maximum
- Color modes: Classic, Rainbow, Fire, Ice

### Matrix
- Stream count: 20-100 streams
- Fade speed: 1-20 levels
- Font size: 10-24 pixels

### TwinkleStars
- Particle modes: Stars, Balls, Boxes, Rainbow
- Animation speed: 1-60 levels
- Particle size: 5-50 pixels

### Falling Lines
- Fall speed: 0.1-5.0x multiplier
- Gravity: 0.5-3.0x multiplier
- Line thickness: 1-10 pixels
- Line density: 3-15 lines

## 🌟 Original Processing Sketches

These apps are modern web adaptations of classic Processing sketches:
- **StarField**: 3D starfield navigation effect
- **Matrix**: Digital rain character animation
- **TwinkleStars**: Particle system with multiple modes
- **Falling Lines**: Physics-based line animation

## 📱 Mobile Support

The unified app is fully responsive and touch-friendly:
- **Touch Controls**: Tap buttons and drag sliders
- **Responsive Layout**: Adapts to mobile screens
- **Performance Optimized**: Reduced particle counts on mobile devices

## 🔧 Development

To modify or extend the apps:

1. **Edit HTML**: Modify `index.html` for layout changes
2. **Update JavaScript**: Edit `unified-apps.js` for behavior changes
3. **Add Features**: Extend the control functions for new parameters
4. **Test**: Verify changes across different browsers and devices

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

**Created with ❤️ using p5.js and modern web technologies**

*Experience the beauty of generative art and interactive animation in your browser!*
