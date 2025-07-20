import java.util.Random;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Producer class that generates data and puts it into a shared buffer.
 * Implements Runnable to be executed in a separate thread.
 * 
 * Features:
 * - Configurable number of items to produce
 * - Random sleep intervals for realistic simulation
 * - Comprehensive error handling and logging
 * - Statistics tracking
 * 
 * @author Your Name
 * @version 2.0
 * @since 1.0
 */
public class Producer implements Runnable {
    
    private static final Logger LOGGER = Logger.getLogger(Producer.class.getName());
    
    // Default configuration
    private static final int DEFAULT_ITEMS_TO_PRODUCE = 10;
    private static final int DEFAULT_MAX_SLEEP_MS = 500;
    
    private final Random random;
    private final Buffer sharedLocation;
    private final int itemsToProduce;
    private final int maxSleepTime;
    private final String producerName;
    
    // Statistics
    private volatile int itemsProduced = 0;
    private volatile long totalProductionTime = 0;
    
    /**
     * Default constructor.
     * 
     * @param shared the shared buffer to write to
     */
    public Producer(Buffer shared) {
        this(shared, DEFAULT_ITEMS_TO_PRODUCE, DEFAULT_MAX_SLEEP_MS, "Producer");
    }
    
    /**
     * Constructor with custom configuration.
     * 
     * @param shared the shared buffer to write to
     * @param itemsToProduce number of items to produce
     * @param maxSleepTime maximum sleep time between productions (ms)
     * @param name name of this producer for logging
     */
    public Producer(Buffer shared, int itemsToProduce, int maxSleepTime, String name) {
        if (shared == null) {
            throw new IllegalArgumentException("Shared buffer cannot be null");
        }
        if (itemsToProduce < 1) {
            throw new IllegalArgumentException("Items to produce must be positive, got: " + itemsToProduce);
        }
        if (maxSleepTime < 0) {
            throw new IllegalArgumentException("Max sleep time cannot be negative, got: " + maxSleepTime);
        }
        
        this.sharedLocation = shared;
        this.itemsToProduce = itemsToProduce;
        this.maxSleepTime = maxSleepTime;
        this.producerName = name != null ? name : "Producer";
        this.random = new Random();
        
        LOGGER.info(String.format("%s initialized: %d items, max sleep %dms", 
                                this.producerName, itemsToProduce, maxSleepTime));
    }
    
    /**
     * Main execution method for the producer thread.
     * Produces the specified number of items with random delays.
     */
    @Override
    public void run() {
        long startTime = System.currentTimeMillis();
        
        try {
            LOGGER.info(String.format("%s starting production of %d items", producerName, itemsToProduce));
            
            for (int count = 1; count <= itemsToProduce; count++) {
                try {
                    // Random sleep to simulate variable production time
                    if (maxSleepTime > 0) {
                        int sleepTime = random.nextInt(maxSleepTime);
                        Thread.sleep(sleepTime);
                    }
                    
                    // Produce the item
                    long itemStartTime = System.currentTimeMillis();
                    sharedLocation.set(count);
                    long itemProductionTime = System.currentTimeMillis() - itemStartTime;
                    
                    itemsProduced++;
                    totalProductionTime += itemProductionTime;
                    
                    LOGGER.log(Level.FINE, String.format("%s produced item %d in %dms", 
                                                       producerName, count, itemProductionTime));
                    
                } catch (InterruptedException e) {
                    LOGGER.log(Level.WARNING, String.format("%s interrupted while producing item %d", 
                                                          producerName, count), e);
                    Thread.currentThread().interrupt(); // Restore interrupt status
                    break; // Exit the loop if interrupted
                }
            }
            
            long totalTime = System.currentTimeMillis() - startTime;
            
            System.out.printf("\n[%s] Production completed!%n", producerName);
            System.out.printf("  • Items produced: %d/%d%n", itemsProduced, itemsToProduce);
            System.out.printf("  • Total time: %d ms%n", totalTime);
            System.out.printf("  • Average time per item: %.2f ms%n", 
                            itemsProduced > 0 ? (double)totalProductionTime / itemsProduced : 0);
            System.out.println();
            
            LOGGER.info(String.format("%s completed: %d items in %dms", 
                                    producerName, itemsProduced, totalTime));
            
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, String.format("%s encountered unexpected error", producerName), e);
            throw new RuntimeException("Producer failed", e);
        }
    }
    
    /**
     * Returns the number of items successfully produced.
     * 
     * @return items produced count
     */
    public int getItemsProduced() {
        return itemsProduced;
    }
    
    /**
     * Returns the total time spent in production operations.
     * 
     * @return total production time in milliseconds
     */
    public long getTotalProductionTime() {
        return totalProductionTime;
    }
    
    /**
     * Returns the producer's name.
     * 
     * @return producer name
     */
    public String getProducerName() {
        return producerName;
    }
    
    @Override
    public String toString() {
        return String.format("%s{itemsProduced=%d, totalTime=%dms}", 
                           producerName, itemsProduced, totalProductionTime);
    }
}
