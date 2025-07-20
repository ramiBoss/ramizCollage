import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Test class for demonstrating the BlockingBuffer implementation
 * with Producer-Consumer pattern.
 * 
 * Features:
 * - Configurable test scenarios
 * - Multiple producers and consumers
 * - Performance monitoring
 * - Graceful shutdown handling
 * 
 * @author Your Name
 * @version 2.0
 * @since 1.0
 */
public class BlockingBufferTest {
    
    private static final Logger LOGGER = Logger.getLogger(BlockingBufferTest.class.getName());
    
    // Test configuration
    private static final int BUFFER_CAPACITY = 5;
    private static final int ITEMS_PER_PRODUCER = 10;
    private static final int ITEMS_PER_CONSUMER = 10;
    private static final int NUM_PRODUCERS = 1;
    private static final int NUM_CONSUMERS = 1;
    private static final int MAX_WAIT_SECONDS = 30;
    
    public static void main(String[] args) {
        System.out.println("=== BlockingBuffer Producer-Consumer Test ===\n");
        
        // Run different test scenarios
        try {
            runBasicTest();
            System.out.println("\n" + "=".repeat(50) + "\n");
            
            runMultiProducerConsumerTest();
            System.out.println("\n" + "=".repeat(50) + "\n");
            
            runCapacityTest();
            
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Test execution failed", e);
            System.err.println("Test failed: " + e.getMessage());
            System.exit(1);
        }
        
        System.out.println("\n=== All tests completed successfully! ===");
    }
    
    /**
     * Basic test with single producer and consumer.
     */
    private static void runBasicTest() throws InterruptedException {
        System.out.println("🧪 Running Basic Test (1 Producer, 1 Consumer)");
        System.out.println("Buffer capacity: " + BUFFER_CAPACITY);
        System.out.println();
        
        ExecutorService executor = Executors.newCachedThreadPool();
        BlockingBuffer sharedBuffer = new BlockingBuffer(BUFFER_CAPACITY);
        
        try {
            // Create and start producer and consumer
            Producer producer = new Producer(sharedBuffer, ITEMS_PER_PRODUCER, 200, "Producer-1");
            Consumer consumer = new Consumer(sharedBuffer, ITEMS_PER_CONSUMER, 150, "Consumer-1");
            
            long startTime = System.currentTimeMillis();
            
            executor.execute(producer);
            executor.execute(consumer);
            
            // Shutdown and wait for completion
            executor.shutdown();
            boolean finished = executor.awaitTermination(MAX_WAIT_SECONDS, TimeUnit.SECONDS);
            
            long totalTime = System.currentTimeMillis() - startTime;
            
            if (finished) {
                System.out.printf("✅ Basic test completed in %d ms%n", totalTime);
                sharedBuffer.printStatistics();
            } else {
                System.out.println("❌ Basic test timed out!");
                executor.shutdownNow();
            }
            
        } finally {
            if (!executor.isTerminated()) {
                executor.shutdownNow();
            }
        }
    }
    
    /**
     * Test with multiple producers and consumers.
     */
    private static void runMultiProducerConsumerTest() throws InterruptedException {
        System.out.println("🧪 Running Multi-Producer-Consumer Test");
        System.out.printf("Producers: %d, Consumers: %d, Buffer capacity: %d%n", 
                         NUM_PRODUCERS + 1, NUM_CONSUMERS + 1, BUFFER_CAPACITY);
        System.out.println();
        
        ExecutorService executor = Executors.newCachedThreadPool();
        BlockingBuffer sharedBuffer = new BlockingBuffer(BUFFER_CAPACITY);
        
        try {
            long startTime = System.currentTimeMillis();
            
            // Create multiple producers
            for (int i = 1; i <= NUM_PRODUCERS + 1; i++) {
                Producer producer = new Producer(sharedBuffer, ITEMS_PER_PRODUCER / 2, 300, 
                                               "Producer-" + i);
                executor.execute(producer);
            }
            
            // Create multiple consumers
            for (int i = 1; i <= NUM_CONSUMERS + 1; i++) {
                Consumer consumer = new Consumer(sharedBuffer, ITEMS_PER_CONSUMER / 2, 200, 
                                               "Consumer-" + i);
                executor.execute(consumer);
            }
            
            // Shutdown and wait for completion
            executor.shutdown();
            boolean finished = executor.awaitTermination(MAX_WAIT_SECONDS, TimeUnit.SECONDS);
            
            long totalTime = System.currentTimeMillis() - startTime;
            
            if (finished) {
                System.out.printf("✅ Multi-producer-consumer test completed in %d ms%n", totalTime);
                sharedBuffer.printStatistics();
            } else {
                System.out.println("❌ Multi-producer-consumer test timed out!");
                executor.shutdownNow();
            }
            
        } finally {
            if (!executor.isTerminated()) {
                executor.shutdownNow();
            }
        }
    }
    
    /**
     * Test buffer capacity and blocking behavior.
     */
    private static void runCapacityTest() throws InterruptedException {
        System.out.println("🧪 Running Buffer Capacity Test");
        System.out.println("Testing blocking behavior with small buffer");
        System.out.println();
        
        ExecutorService executor = Executors.newCachedThreadPool();
        BlockingBuffer smallBuffer = new BlockingBuffer(1); // Very small buffer
        
        try {
            long startTime = System.currentTimeMillis();
            
            // Fast producer, slow consumer to test blocking
            Producer fastProducer = new Producer(smallBuffer, 5, 50, "FastProducer");
            Consumer slowConsumer = new Consumer(smallBuffer, 5, 500, "SlowConsumer");
            
            executor.execute(fastProducer);
            
            // Start consumer after a delay to see blocking effect
            Thread.sleep(1000);
            executor.execute(slowConsumer);
            
            // Shutdown and wait for completion
            executor.shutdown();
            boolean finished = executor.awaitTermination(MAX_WAIT_SECONDS, TimeUnit.SECONDS);
            
            long totalTime = System.currentTimeMillis() - startTime;
            
            if (finished) {
                System.out.printf("✅ Capacity test completed in %d ms%n", totalTime);
                smallBuffer.printStatistics();
            } else {
                System.out.println("❌ Capacity test timed out!");
                executor.shutdownNow();
            }
            
        } finally {
            if (!executor.isTerminated()) {
                executor.shutdownNow();
            }
        }
    }
    
    /**
     * Demonstrates timeout-based operations (if needed).
     */
    @SuppressWarnings("unused")
    private static void demonstrateTimeoutOperations() {
        System.out.println("🧪 Demonstrating Timeout Operations");
        
        BlockingBuffer buffer = new BlockingBuffer(1);
        
        try {
            // Fill the buffer
            buffer.set(1);
            System.out.println("Buffer filled with value 1");
            
            // Try to add with timeout (should fail)
            boolean success = buffer.offer(2, 1, TimeUnit.SECONDS);
            System.out.println("Timeout offer result: " + success);
            
            // Read the value
            Integer value = buffer.poll(1, TimeUnit.SECONDS);
            System.out.println("Timeout poll result: " + value);
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Timeout demonstration interrupted");
        }
    }
}
