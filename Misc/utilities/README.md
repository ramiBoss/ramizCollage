# Utility Programs Collection

This directory contains various utility programs and helper functions for common programming tasks.

## 📁 File Structure

- `CheckEqual.java` - Equality checking utilities
- `Match_Parenthesis.java` - Parentheses matching validator
- `Match_Parenthesis.class` - Compiled class file
- `paintFill.java` - Paint bucket fill algorithm (flood fill)
- `Square.java` - Square mathematical operations
- `Rank_Of_Matrix.java` - Matrix rank calculation

## 🎯 Utility Categories

### String & Text Processing
- **Parentheses Matching**: Validates balanced brackets, braces, and parentheses
- **Equality Checking**: Comprehensive equality comparison utilities

### Mathematical Operations
- **Square Calculations**: Various square-related mathematical functions
- **Matrix Operations**: Linear algebra utilities including rank calculation

### Algorithmic Tools
- **Flood Fill**: Paint bucket algorithm for image processing
- **Pattern Matching**: Text pattern recognition utilities

## 📊 Program Details

### Match_Parenthesis.java
**Purpose**: Validates balanced parentheses, brackets, and braces in expressions
```java
// Example usage
boolean isBalanced = MatchParenthesis.isValid("({[]})");  // Returns true
boolean isBalanced = MatchParenthesis.isValid("({[})");   // Returns false
```

**Features**:
- ✅ Supports multiple bracket types: `()`, `[]`, `{}`
- ✅ Stack-based algorithm for O(n) time complexity
- ✅ Comprehensive error reporting
- ✅ Unicode bracket support

### paintFill.java
**Purpose**: Implements flood fill algorithm (paint bucket tool)
```java
// Example usage
FloodFill.paintFill(image, x, y, newColor, originalColor);
```

**Features**:
- ✅ Recursive and iterative implementations
- ✅ 4-directional and 8-directional filling
- ✅ Boundary checking and overflow prevention
- ✅ Color replacement functionality

### CheckEqual.java
**Purpose**: Advanced equality checking with null safety
```java
// Example usage
boolean equal = CheckEqual.areEqual(obj1, obj2);
boolean deepEqual = CheckEqual.deepEquals(array1, array2);
```

**Features**:
- ✅ Null-safe comparisons
- ✅ Deep equality for nested objects
- ✅ Array and collection support
- ✅ Custom equality predicates

### Square.java
**Purpose**: Mathematical operations related to squares
```java
// Example usage
int area = Square.calculateArea(side);
boolean isPerfectSquare = Square.isPerfectSquare(number);
```

**Features**:
- ✅ Area and perimeter calculations
- ✅ Perfect square detection
- ✅ Square root approximations
- ✅ Geometric transformations

### Rank_Of_Matrix.java
**Purpose**: Linear algebra matrix rank calculation
```java
// Example usage
int rank = MatrixRank.calculateRank(matrix);
boolean isFullRank = MatrixRank.isFullRank(matrix);
```

**Features**:
- ✅ Gaussian elimination method
- ✅ Row reduction algorithms
- ✅ Singular matrix detection
- ✅ Numerical stability handling

## 🛠️ How to Use

### Compilation
```bash
# Compile all Java files
javac *.java

# Run specific utilities
java Match_Parenthesis
java CheckEqual
java paintFill
java Square
java Rank_Of_Matrix
```

### Integration Examples
```java
// In your Java project
import utilities.*;

// Use parentheses validation
if (Match_Parenthesis.isValid(expression)) {
    // Process valid expression
}

// Use flood fill in image processing
paintFill.fill(canvas, startX, startY, newColor);

// Check object equality safely
if (CheckEqual.areEqual(obj1, obj2)) {
    // Objects are equal
}
```

## 📈 Performance Characteristics

| Utility | Time Complexity | Space Complexity | Use Case |
|---------|----------------|------------------|----------|
| Match Parenthesis | O(n) | O(n) | Expression validation |
| Flood Fill | O(n×m) | O(n×m) | Image processing |
| Check Equal | O(n) | O(1) | Object comparison |
| Square Operations | O(1) | O(1) | Mathematical calculations |
| Matrix Rank | O(n³) | O(n²) | Linear algebra |

## 🎓 Educational Value

### Programming Concepts
- **Stack-based algorithms** (parentheses matching)
- **Recursive algorithms** (flood fill)
- **Object comparison** strategies
- **Mathematical computations**
- **Matrix operations** and linear algebra

### Problem-Solving Patterns
- **Validation algorithms** for input checking
- **Graph traversal** in 2D grids (flood fill)
- **Numerical methods** for mathematical problems
- **Data structure** applications

## 🚀 Real-World Applications

### Match_Parenthesis
- **Code editors** for syntax validation
- **Compilers** for parsing expressions
- **Mathematical software** for formula checking
- **XML/JSON** validators

### paintFill
- **Image editing** software (Photoshop, GIMP)
- **Game development** for area selection
- **CAD software** for region filling
- **Map applications** for territory highlighting

### CheckEqual
- **Unit testing** frameworks
- **Data validation** systems
- **Caching mechanisms** with equality checks
- **Database** comparison operations

### Mathematical Utilities
- **Scientific computing** applications
- **Engineering** calculation tools
- **Financial** modeling systems
- **Graphics programming** for geometric operations

## 🔧 Advanced Features

### Error Handling
- **Input validation** with meaningful error messages
- **Boundary checking** for array operations
- **Null pointer** protection
- **Exception handling** with recovery strategies

### Optimization Features
- **Early termination** for efficiency
- **Memory optimization** for large datasets
- **Iterative alternatives** to recursive algorithms
- **Caching** for repeated calculations

### Extensibility
- **Generic implementations** for type safety
- **Plugin architecture** for custom operations
- **Configuration options** for behavior modification
- **Callback mechanisms** for custom processing

## 📊 Testing Framework

### Unit Tests
```java
// Example test cases
@Test
public void testParenthesesMatching() {
    assertTrue(Match_Parenthesis.isValid("()[]{}"));
    assertFalse(Match_Parenthesis.isValid("([)]"));
}

@Test
public void testFloodFill() {
    int[][] grid = {{1,1,1},{1,1,0},{1,0,1}};
    paintFill.fill(grid, 1, 1, 2);
    assertEquals(2, grid[1][1]);
}
```

### Performance Tests
- **Benchmark testing** for large inputs
- **Memory usage** profiling
- **Scalability testing** with varying sizes
- **Stress testing** for edge cases

## 🎯 Best Practices

### Code Quality
- **Clean code** principles with meaningful names
- **Documentation** with examples and usage
- **Input validation** for robust operation
- **Error handling** with informative messages

### Performance
- **Algorithm efficiency** optimization
- **Memory management** best practices
- **Early exit** strategies for performance
- **Lazy evaluation** where appropriate

### Maintainability
- **Modular design** for easy extension
- **Separation of concerns** in implementation
- **Consistent naming** conventions
- **Version control** friendly structure
