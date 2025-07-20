# Data Structures Collection

This directory contains implementations of fundamental data structures organized by type.

## 📁 Directory Structure

### `/linear/`
- **Linear data structures with sequential access**
- `Stack.java` - Stack implementation (LIFO)
- `Queue.java` - Queue implementation (FIFO)
- `LinkedList.java` - Singly linked list
- `Node.java` - Node class for linked structures
- `CreateList.java` - List creation utilities
- `threeStackinArray.java` - Multiple stacks in single array

### `/trees/`
- **Hierarchical data structures**
- `AdjacencyList.java` - Graph representation using adjacency lists

## 🎯 Data Structure Types

### Linear Structures
- **Stack**: Last-In-First-Out (LIFO) structure
- **Queue**: First-In-First-Out (FIFO) structure
- **Linked List**: Dynamic linear collection
- **Array-based Structures**: Efficient memory usage

### Tree/Graph Structures
- **Adjacency List**: Efficient graph representation
- **Tree Traversal**: Various tree navigation methods

## 📊 Performance Characteristics

| Data Structure | Access | Search | Insertion | Deletion | Space |
|----------------|--------|--------|-----------|----------|--------|
| Stack | O(n) | O(n) | O(1) | O(1) | O(n) |
| Queue | O(n) | O(n) | O(1) | O(1) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) | O(n) |
| Adjacency List | O(V) | O(V) | O(1) | O(V) | O(V+E) |

## 🛠️ Implementation Features

### Stack Operations
```java
push(item)    // Add item to top
pop()         // Remove and return top item
peek()        // View top item without removing
isEmpty()     // Check if stack is empty
size()        // Get number of elements
```

### Queue Operations
```java
enqueue(item) // Add item to rear
dequeue()     // Remove and return front item
front()       // View front item
isEmpty()     // Check if queue is empty
size()        // Get number of elements
```

### Linked List Operations
```java
insert(item)  // Add item to list
delete(item)  // Remove item from list
search(item)  // Find item in list
traverse()    // Visit all nodes
size()        // Get list length
```

## 📚 Use Cases

### Stack Applications
- **Function call management** (call stack)
- **Expression evaluation** (postfix, infix)
- **Undo operations** in applications
- **Backtracking algorithms**
- **Syntax parsing**

### Queue Applications
- **Task scheduling** in operating systems
- **Breadth-first search** in graphs
- **Buffer for data streams**
- **Print job management**
- **Level-order tree traversal**

### Linked List Applications
- **Dynamic memory allocation**
- **Implementation of other data structures**
- **Undo functionality**
- **Music playlist management**
- **Browser history**

### Tree/Graph Applications
- **Social networks** (adjacency list)
- **Computer networks** topology
- **File system** hierarchy
- **Decision trees**
- **Database indexing**

## 🔧 How to Use

### Compilation and Execution
```bash
# Navigate to the appropriate subdirectory
cd linear/

# Compile Java files
javac *.java

# Run specific implementations
java Stack
java Queue
java LinkedList
```

### Example Usage
```java
// Stack example
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
int top = stack.pop(); // Returns 2

// Queue example
Queue<String> queue = new Queue<>();
queue.enqueue("first");
queue.enqueue("second");
String front = queue.dequeue(); // Returns "first"
```

## 📈 Advanced Features

### Three Stacks in Array
- **Memory efficient** implementation
- **Fixed size** allocation
- **Optimal space** utilization

### Custom Node Implementation
- **Generic type** support
- **Flexible linking** for various structures
- **Memory efficient** design

## 🎓 Educational Value

These implementations provide:
- **Clear understanding** of data structure concepts
- **Practical implementation** experience
- **Algorithm complexity** analysis
- **Memory management** insights
- **Object-oriented programming** principles

## 🚀 Extensions

Possible enhancements:
- **Generic type** implementations
- **Iterator pattern** support
- **Thread-safe** versions
- **Performance optimizations**
- **Visual representations**
