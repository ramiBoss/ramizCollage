import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * A thread-safe blocking buffer implementation using ArrayBlockingQueue.
 * This class implements the Buffer interface and provides synchronized
 * access to a shared buffer between producer and consumer threads.
 * 
 * Features:
 * - Thread-safe operations using ArrayBlockingQueue
 * - Configurable buffer capacity
 * - Detailed logging and monitoring
 * - Timeout support for operations
 * 
 * @author Your Name
 * @version 2.0
 * @since 1.0
 */
public class BlockingBuffer implements Buffer {
    
    // Logger for this class
    private static final Logger LOGGER = Logger.getLogger(BlockingBuffer.class.getName());
    
    // Default buffer capacity
    private static final int DEFAULT_CAPACITY = 1;
    
    // Default timeout for operations (in seconds)
    private static final long DEFAULT_TIMEOUT_SECONDS = 10;
    
    // The underlying thread-safe buffer
    private final ArrayBlockingQueue<Integer> buffer;
    
    // Buffer capacity for monitoring
    private final int capacity;
    
    // Statistics
    private volatile long totalItemsProduced = 0;
    private volatile long totalItemsConsumed = 0;
    
    /**
     * Default constructor creates a buffer with capacity of 1.
     */
    public BlockingBuffer() {
        this(DEFAULT_CAPACITY);
    }
    
    /**
     * Constructor with specified capacity.
     * 
     * @param capacity the maximum number of elements the buffer can hold
     * @throws IllegalArgumentException if capacity is less than 1
     */
    public BlockingBuffer(int capacity) {
        if (capacity < 1) {
            throw new IllegalArgumentException("Buffer capacity must be at least 1, got: " + capacity);
        }
        
        this.capacity = capacity;
        this.buffer = new ArrayBlockingQueue<>(capacity);
        
        LOGGER.info(String.format("BlockingBuffer created with capacity: %d", capacity));
    }
    
    /**
     * Adds a value to the buffer. This method blocks if the buffer is full.
     * 
     * @param value the integer value to add to the buffer
     * @throws InterruptedException if the thread is interrupted while waiting
     */
    @Override
    public void set(int value) throws InterruptedException {
        long startTime = System.currentTimeMillis();
        
        try {
            buffer.put(value);
            totalItemsProduced++;
            
            long waitTime = System.currentTimeMillis() - startTime;
            String message = String.format("Producer writes %2d | Buffer occupied: %d/%d | Wait time: %dms", 
                                         value, buffer.size(), capacity, waitTime);
            
            System.out.println(message);
            LOGGER.log(Level.FINE, message);
            
        } catch (InterruptedException e) {
            LOGGER.log(Level.WARNING, "Producer interrupted while writing value: " + value, e);
            Thread.currentThread().interrupt(); // Restore interrupt status
            throw e;
        }
    }
    
    /**
     * Removes and returns a value from the buffer. This method blocks if the buffer is empty.
     * 
     * @return the integer value removed from the buffer
     * @throws InterruptedException if the thread is interrupted while waiting
     */
    @Override
    public int get() throws InterruptedException {
        long startTime = System.currentTimeMillis();
        
        try {
            int readValue = buffer.take();
            totalItemsConsumed++;
            
            long waitTime = System.currentTimeMillis() - startTime;
            String message = String.format("Consumer reads  %2d | Buffer occupied: %d/%d | Wait time: %dms", 
                                         readValue, buffer.size(), capacity, waitTime);
            
            System.out.println(message);
            LOGGER.log(Level.FINE, message);
            
            return readValue;
            
        } catch (InterruptedException e) {
            LOGGER.log(Level.WARNING, "Consumer interrupted while reading", e);
            Thread.currentThread().interrupt(); // Restore interrupt status
            throw e;
        }
    }
    
    /**
     * Attempts to add a value to the buffer with a timeout.
     * 
     * @param value the integer value to add
     * @param timeout the maximum time to wait
     * @param unit the time unit of the timeout argument
     * @return true if the value was added, false if timeout elapsed
     * @throws InterruptedException if the thread is interrupted while waiting
     */
    public boolean offer(int value, long timeout, TimeUnit unit) throws InterruptedException {
        boolean success = buffer.offer(value, timeout, unit);
        
        if (success) {
            totalItemsProduced++;
            System.out.printf("Producer writes %2d (timed) | Buffer occupied: %d/%d%n", 
                            value, buffer.size(), capacity);
        } else {
            System.out.printf("Producer timeout writing %2d | Buffer occupied: %d/%d%n", 
                            value, buffer.size(), capacity);
        }
        
        return success;
    }
    
    /**
     * Attempts to remove and return a value from the buffer with a timeout.
     * 
     * @param timeout the maximum time to wait
     * @param unit the time unit of the timeout argument
     * @return the value removed from the buffer, or null if timeout elapsed
     * @throws InterruptedException if the thread is interrupted while waiting
     */
    public Integer poll(long timeout, TimeUnit unit) throws InterruptedException {
        Integer readValue = buffer.poll(timeout, unit);
        
        if (readValue != null) {
            totalItemsConsumed++;
            System.out.printf("Consumer reads  %2d (timed) | Buffer occupied: %d/%d%n", 
                            readValue, buffer.size(), capacity);
        } else {
            System.out.printf("Consumer timeout reading | Buffer occupied: %d/%d%n", 
                            buffer.size(), capacity);
        }
        
        return readValue;
    }
    
    /**
     * Returns the current number of elements in the buffer.
     * 
     * @return current buffer size
     */
    public int size() {
        return buffer.size();
    }
    
    /**
     * Returns the maximum capacity of the buffer.
     * 
     * @return buffer capacity
     */
    public int capacity() {
        return capacity;
    }
    
    /**
     * Returns the number of additional elements the buffer can accept.
     * 
     * @return remaining capacity
     */
    public int remainingCapacity() {
        return buffer.remainingCapacity();
    }
    
    /**
     * Checks if the buffer is empty.
     * 
     * @return true if the buffer contains no elements
     */
    public boolean isEmpty() {
        return buffer.isEmpty();
    }
    
    /**
     * Checks if the buffer is full.
     * 
     * @return true if the buffer is at capacity
     */
    public boolean isFull() {
        return buffer.remainingCapacity() == 0;
    }
    
    /**
     * Returns the total number of items produced.
     * 
     * @return total items produced
     */
    public long getTotalItemsProduced() {
        return totalItemsProduced;
    }
    
    /**
     * Returns the total number of items consumed.
     * 
     * @return total items consumed
     */
    public long getTotalItemsConsumed() {
        return totalItemsConsumed;
    }
    
    /**
     * Clears all elements from the buffer.
     */
    public void clear() {
        buffer.clear();
        LOGGER.info("Buffer cleared");
    }
    
    /**
     * Returns a string representation of the buffer state.
     * 
     * @return string representation of buffer state
     */
    @Override
    public String toString() {
        return String.format("BlockingBuffer{capacity=%d, size=%d, produced=%d, consumed=%d}", 
                           capacity, buffer.size(), totalItemsProduced, totalItemsConsumed);
    }
    
    /**
     * Prints detailed buffer statistics.
     */
    public void printStatistics() {
        System.out.println("\n=== Buffer Statistics ===");
        System.out.printf("Capacity: %d%n", capacity);
        System.out.printf("Current Size: %d%n", buffer.size());
        System.out.printf("Remaining Capacity: %d%n", remainingCapacity());
        System.out.printf("Total Items Produced: %d%n", totalItemsProduced);
        System.out.printf("Total Items Consumed: %d%n", totalItemsConsumed);
        System.out.printf("Items in Transit: %d%n", totalItemsProduced - totalItemsConsumed);
        System.out.println("========================\n");
    }
}
