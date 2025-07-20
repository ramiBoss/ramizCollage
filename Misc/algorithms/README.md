# Algorithms Collection

This directory contains various algorithm implementations organized by category.

## 📁 Directory Structure

### `/graphs/`
- **Graph algorithms and traversal methods**
- `dfs11.cpp` - Depth-First Search implementation
- `dijsktra.cpp` - Dijkstra's shortest path algorithm

### `/sorting/`
- **Sorting algorithms and techniques**
- `counting_sort.java` - Counting sort implementation

### `/strings/`
- **String manipulation and pattern matching algorithms**
- `samenessOfStrings.cpp` - String comparison utilities
- `stringComb.cpp` - String combination generator
- `strTotokens.cpp` - String tokenization
- `findFirstOf.cpp` - String search functions
- `codeForPhoneNumber.cpp` - Phone number to letter code converter

### `/dynamic-programming/`
- **Dynamic programming solutions and optimization problems**
- `EditDistanceProblem.java` - Edit distance calculation (Levenshtein distance)
- `WordBreakProblem.java` - Word break problem solution
- `kadane.cpp` - Kadane's algorithm for maximum subarray
- `findMinCostPath.cpp` - Minimum cost path finder

## 🎯 Algorithm Categories

### Graph Algorithms
- **DFS (Depth-First Search)**: Tree/graph traversal
- **Dijkstra's Algorithm**: Shortest path finding

### Sorting
- **Counting Sort**: Linear time sorting for integer arrays

### String Processing
- **Pattern Matching**: Various string search and manipulation
- **Code Generation**: Phone number to letter combinations

### Dynamic Programming
- **Edit Distance**: String similarity measurement
- **Word Break**: Dictionary-based word segmentation
- **Maximum Subarray**: Kadane's algorithm for optimization
- **Path Finding**: Minimum cost path calculation

## 📊 Complexity Analysis

| Algorithm | Time Complexity | Space Complexity | Use Case |
|-----------|----------------|------------------|----------|
| DFS | O(V + E) | O(V) | Graph traversal |
| Dijkstra | O((V + E) log V) | O(V) | Shortest path |
| Counting Sort | O(n + k) | O(k) | Integer sorting |
| Edit Distance | O(m × n) | O(m × n) | String similarity |
| Kadane's | O(n) | O(1) | Maximum subarray |

## 🛠️ How to Use

### Compilation
```bash
# For C++ files
g++ -o output_name filename.cpp

# For Java files
javac filename.java
java ClassName
```

### Examples
```bash
# Compile and run DFS
cd graphs/
g++ -o dfs dfs11.cpp
./dfs

# Compile and run Java programs
cd dynamic-programming/
javac EditDistanceProblem.java
java EditDistanceProblem
```

## 📚 Learning Resources

These implementations are great for:
- **Algorithm study and practice**
- **Coding interview preparation**
- **Competitive programming**
- **Computer science education**
- **Performance analysis and optimization**

## 🔧 Implementation Features

- **Well-commented code** for educational purposes
- **Multiple language implementations** (C++, Java)
- **Optimized solutions** with complexity analysis
- **Real-world applicable algorithms**
- **Clear input/output examples**
