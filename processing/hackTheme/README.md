# 🔢 Matrix Hack Theme

A modernized HTML5/JavaScript version of the classic Matrix digital rain effect, originally created in Processing. This project features an interactive Matrix-style visualization with multiple modes, character sets, and visual effects.

![Matrix Hack Theme Preview](https://img.shields.io/badge/Status-Complete-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)

## 🎯 Features

### Core Functionality
- **Grid Mode**: Classic grid-based character display with synchronized animations
- **Rain Mode**: Authentic Matrix-style digital rain with varying drop speeds
- **Multiple Character Sets**: 
  - English letters (A-Z)
  - Numbers (0-9) 
  - Japanese Katakana characters (authentic Matrix style)

### Visual Effects
- **Color Themes**:
  - Classic Matrix Green
  - Rainbow cycling
  - Fire gradient
  - Cyber neon colors
- **Dynamic lighting and glow effects**
- **Smooth character transitions**
- **Customizable brightness and speed**

### Interactive Controls
- **Mode switching** between grid and rain effects
- **Character set selection**
- **Color palette switching**
- **Speed and brightness adjustment**
- **Pause/Resume functionality**
- **Fullscreen support**

## 🚀 How to Run

1. **Local Setup**:
   ```bash
   # Navigate to the project directory
   cd processing/hackTheme
   
   # Open in your web browser
   open index.html
   ```

2. **Live Server** (recommended):
   - Install Live Server extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Direct Browser**:
   - Simply double-click `index.html` to open in your default browser

## 🎮 Controls

### Keyboard Shortcuts
- **`SPACE`**: Toggle animation (pause/resume)
- **`1`**: Switch to English letters
- **`2`**: Switch to numbers
- **`3`**: Switch to Japanese characters
- **`G`**: Grid mode
- **`R`**: Rain mode
- **`C`**: Cycle color themes
- **`F`**: Toggle fullscreen
- **`+/-`**: Adjust speed
- **`↑/↓`**: Adjust brightness

### Interactive Panel
- **Mode Selection**: Switch between Grid and Rain modes
- **Character Set**: Choose from Letters, Numbers, or Matrix characters
- **Color Themes**: Select from multiple color palettes
- **Speed Control**: Adjust animation speed (1-10)
- **Brightness**: Control overall brightness (50-255)

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure and modern web standards
- **CSS3**: Advanced styling with gradients, shadows, and animations
- **JavaScript ES6+**: Modern JavaScript features and class-based architecture
- **p5.js**: Creative coding library for canvas rendering
- **Google Fonts**: Orbitron and Source Code Pro for cyberpunk aesthetics

### Architecture
```
hackTheme/
├── index.html          # Main HTML file with UI controls
├── matrix-hack.js      # Core p5.js sketch and logic
├── README.md          # This documentation
└── hackTheme.pde      # Original Processing source (preserved)
```

### Key Classes and Functions
- **`MatrixDrop`**: Handles individual rain drops in rain mode
- **`setup()`**: Initialize canvas and variables
- **`draw()`**: Main animation loop
- **`drawGridMode()`**: Renders grid-based character display
- **`drawRainMode()`**: Renders Matrix rain effect
- **`updateCharacterSet()`**: Manages character set switching
- **`getRandomChar()`**: Returns random character from current set

## 🎨 Customization

### Adding New Character Sets
```javascript
// Add to global character arrays
let customChars = ['あ', 'か', 'さ', 'た', 'な'];
// Update character set switching logic
```

### Creating Custom Color Palettes
```javascript
colorPalettes.custom = [
    [red_value, green_value, blue_value],
    // Add more color variations
];
```

### Adjusting Visual Effects
- **Grid size**: Modify `lCount` variable
- **Character size**: Adjust `txtSize` calculation
- **Animation speed**: Change `speed` variable range
- **Drop density**: Modify rain drop generation frequency

## 🎓 Educational Value

This project demonstrates:
- **Canvas-based animation** using p5.js
- **Object-oriented programming** with JavaScript classes
- **Event handling** for keyboard and mouse interactions
- **Color theory** and HSB/RGB color space manipulation
- **Performance optimization** for smooth 60fps animation
- **Responsive design** principles for modern web development

## 🔮 Original Processing Code

The original Processing sketch (`hackTheme.pde`) is preserved in the same directory. Key differences in the JavaScript version:

### Enhancements Made
1. **Interactive UI**: Added control panel with real-time adjustments
2. **Multiple Modes**: Extended beyond original grid to include rain mode
3. **Color Themes**: Added multiple color palettes and cycling
4. **Character Sets**: Expanded to include numbers and Japanese characters
5. **Performance**: Optimized for smooth web performance
6. **Responsive**: Adapts to different screen sizes
7. **Modern Web**: Uses ES6+ features and modern web APIs

### Processing → JavaScript Conversion Notes
- `setup()` and `draw()` functions preserved
- Processing color functions replaced with p5.js equivalents
- Array handling updated to JavaScript syntax
- Added event listeners for keyboard and UI controls
- Implemented proper canvas resizing for responsive design

## 🚧 Potential Improvements

- **Sound Effects**: Add Matrix-style sound effects
- **3D Mode**: Implement WebGL-based 3D rain effect
- **Webcam Integration**: Use camera input to affect animation
- **Performance Metrics**: Display FPS and performance statistics
- **Export Functionality**: Save current frame or record animation
- **VR Support**: WebXR integration for immersive experience

## 📄 License

This project is part of a personal coding portfolio. Feel free to use and modify for educational purposes.

---

*Created with ❤️ using p5.js | Part of ramizCollage Portfolio*
