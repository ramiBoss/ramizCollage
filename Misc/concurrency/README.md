# Producer-Consumer Pattern Implementation

This directory contains a comprehensive implementation of the Producer-Consumer pattern using Java's concurrent utilities.

## 📁 File Structure

### Core Implementation
- `Buffer.java` - Interface defining buffer contract
- `BlockingBuffer.java` - Thread-safe buffer using ArrayBlockingQueue
- `SharedBuffer.java` - Alternative shared buffer implementation
- `SynchronizedBuffer.java` - Synchronized buffer implementation

### Producer-Consumer Components
- `Producer.java` - Data producer with configurable parameters
- `Consumer.java` - Data consumer with statistics tracking

### Test and Demo
- `BlockingBufferTest.java` - Comprehensive test suite
- `SharedBufferTest2.java` - Alternative testing implementation
- `Unsync.java` - Unsynchronized implementation for comparison

### Documentation
- `README_BlockingBuffer.md` - Detailed implementation guide

## 🎯 Key Features

### Thread Safety
- ✅ **ArrayBlockingQueue** for thread-safe operations
- ✅ **Proper synchronization** to prevent race conditions
- ✅ **Interrupt handling** for graceful shutdown
- ✅ **Timeout support** for non-blocking operations

### Configurability
- ✅ **Buffer capacity** configuration
- ✅ **Production/consumption rates** adjustment
- ✅ **Named threads** for better debugging
- ✅ **Custom sleep intervals** for realistic simulation

### Monitoring & Statistics
- ✅ **Real-time buffer state** monitoring
- ✅ **Production/consumption** statistics
- ✅ **Performance timing** metrics
- ✅ **Comprehensive logging** support

### Error Handling
- ✅ **Exception handling** with proper logging
- ✅ **Resource cleanup** and graceful shutdown
- ✅ **Input validation** with meaningful errors
- ✅ **Interrupt status** preservation

## 📊 Performance Characteristics

| Operation | Time Complexity | Thread Safety | Blocking |
|-----------|----------------|---------------|----------|
| put() | O(1) | Yes | Yes |
| take() | O(1) | Yes | Yes |
| offer() | O(1) | Yes | No (with timeout) |
| poll() | O(1) | Yes | No (with timeout) |
| size() | O(1) | Yes | No |

## 🛠️ How to Use

### Basic Usage
```java
// Create buffer with capacity 5
BlockingBuffer buffer = new BlockingBuffer(5);

// Create producer and consumer
Producer producer = new Producer(buffer, 10, 200, "Producer-1");
Consumer consumer = new Consumer(buffer, 10, 150, "Consumer-1");

// Execute in separate threads
ExecutorService executor = Executors.newCachedThreadPool();
executor.execute(producer);
executor.execute(consumer);
executor.shutdown();
```

### Advanced Configuration
```java
// Custom buffer with specific capacity
BlockingBuffer buffer = new BlockingBuffer(10);

// Multiple producers with different rates
Producer fastProducer = new Producer(buffer, 20, 100, "FastProducer");
Producer slowProducer = new Producer(buffer, 10, 500, "SlowProducer");

// Consumer with custom processing
Consumer processor = new Consumer(buffer, 30, 200, "DataProcessor");
```

### Compilation and Execution
```bash
# Compile all files
javac *.java

# Run the comprehensive test
java BlockingBufferTest

# Expected output includes:
# - Real-time buffer operations
# - Statistics and timing
# - Multiple test scenarios
```

## 📈 Test Scenarios

### 1. Basic Test
- Single producer and consumer
- Standard buffer capacity (5)
- Balanced production/consumption rates

### 2. Multi-threaded Test
- Multiple producers and consumers
- Concurrent access patterns
- Load balancing verification

### 3. Capacity Test
- Small buffer (capacity 1)
- Fast producer, slow consumer
- Blocking behavior demonstration

## 🎓 Educational Value

### Concurrency Concepts
- **Producer-Consumer pattern** implementation
- **Thread synchronization** techniques
- **Blocking vs non-blocking** operations
- **Resource sharing** between threads

### Java Concurrency
- **ArrayBlockingQueue** usage
- **ExecutorService** thread management
- **TimeUnit** for timeout operations
- **Interrupt handling** best practices

### Software Engineering
- **Interface-based design** for flexibility
- **Comprehensive error handling**
- **Logging and monitoring** integration
- **Unit testing** strategies

## 🔧 Implementation Highlights

### BlockingBuffer Features
```java
// Timeout operations
boolean success = buffer.offer(value, 5, TimeUnit.SECONDS);
Integer value = buffer.poll(5, TimeUnit.SECONDS);

// Buffer monitoring
int currentSize = buffer.size();
boolean isFull = buffer.isFull();
boolean isEmpty = buffer.isEmpty();

// Statistics access
long totalProduced = buffer.getTotalItemsProduced();
long totalConsumed = buffer.getTotalItemsConsumed();
```

### Producer Features
```java
// Get production statistics
int itemsProduced = producer.getItemsProduced();
long productionTime = producer.getTotalProductionTime();
String producerName = producer.getProducerName();
```

### Consumer Features
```java
// Get consumption statistics
int itemsConsumed = consumer.getItemsConsumed();
int totalSum = consumer.getSum();
double avgValue = consumer.getAverageValue();
List<Integer> values = consumer.getConsumedValues();
```

## 🚀 Advanced Features

### Logging Integration
- **Level-based logging** (INFO, WARNING, SEVERE)
- **Thread-specific** log messages
- **Performance timing** in logs
- **Error tracking** and debugging

### Statistics Collection
- **Real-time monitoring** of buffer state
- **Performance metrics** calculation
- **Data validation** and verification
- **Summary reports** generation

### Error Recovery
- **Graceful degradation** on errors
- **Resource cleanup** on interruption
- **Timeout handling** for stuck operations
- **Status reporting** for monitoring

## 🎯 Use Cases

### Educational
- **Concurrency learning** and demonstration
- **Threading concepts** illustration
- **Synchronization patterns** study
- **Performance analysis** training

### Professional
- **Task scheduling** systems
- **Data pipeline** implementations
- **Message queue** foundations
- **Load balancing** mechanisms

### Research
- **Concurrency performance** testing
- **Thread synchronization** analysis
- **Resource contention** studies
- **Scalability testing** frameworks
