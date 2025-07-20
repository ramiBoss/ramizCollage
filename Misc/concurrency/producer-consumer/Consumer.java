import java.util.Random;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.logging.Level;

/**
 * Consumer class that reads data from a shared buffer.
 * Implements Runnable to be executed in a separate thread.
 * 
 * Features:
 * - Configurable number of items to consume
 * - Random sleep intervals for realistic simulation
 * - Data validation and processing
 * - Comprehensive statistics tracking
 * 
 * @author Your Name
 * @version 2.0
 * @since 1.0
 */
public class Consumer implements Runnable {
    
    private static final Logger LOGGER = Logger.getLogger(Consumer.class.getName());
    
    // Default configuration
    private static final int DEFAULT_ITEMS_TO_CONSUME = 10;
    private static final int DEFAULT_MAX_SLEEP_MS = 300;
    
    private final Random random;
    private final Buffer sharedLocation;
    private final int itemsToConsume;
    private final int maxSleepTime;
    private final String consumerName;
    
    // Data storage and statistics
    private final List<Integer> consumedValues;
    private volatile int itemsConsumed = 0;
    private volatile int sum = 0;
    private volatile long totalConsumptionTime = 0;
    
    /**
     * Default constructor.
     * 
     * @param shared the shared buffer to read from
     */
    public Consumer(Buffer shared) {
        this(shared, DEFAULT_ITEMS_TO_CONSUME, DEFAULT_MAX_SLEEP_MS, "Consumer");
    }
    
    /**
     * Constructor with custom configuration.
     * 
     * @param shared the shared buffer to read from
     * @param itemsToConsume number of items to consume
     * @param maxSleepTime maximum sleep time between consumptions (ms)
     * @param name name of this consumer for logging
     */
    public Consumer(Buffer shared, int itemsToConsume, int maxSleepTime, String name) {
        if (shared == null) {
            throw new IllegalArgumentException("Shared buffer cannot be null");
        }
        if (itemsToConsume < 1) {
            throw new IllegalArgumentException("Items to consume must be positive, got: " + itemsToConsume);
        }
        if (maxSleepTime < 0) {
            throw new IllegalArgumentException("Max sleep time cannot be negative, got: " + maxSleepTime);
        }
        
        this.sharedLocation = shared;
        this.itemsToConsume = itemsToConsume;
        this.maxSleepTime = maxSleepTime;
        this.consumerName = name != null ? name : "Consumer";
        this.random = new Random();
        this.consumedValues = new ArrayList<>();
        
        LOGGER.info(String.format("%s initialized: %d items, max sleep %dms", 
                                this.consumerName, itemsToConsume, maxSleepTime));
    }
    
    /**
     * Main execution method for the consumer thread.
     * Consumes the specified number of items with random delays.
     */
    @Override
    public void run() {
        long startTime = System.currentTimeMillis();
        
        try {
            LOGGER.info(String.format("%s starting consumption of %d items", consumerName, itemsToConsume));
            
            for (int count = 1; count <= itemsToConsume; count++) {
                try {
                    // Random sleep to simulate variable consumption time
                    if (maxSleepTime > 0) {
                        int sleepTime = random.nextInt(maxSleepTime);
                        Thread.sleep(sleepTime);
                    }
                    
                    // Consume the item
                    long itemStartTime = System.currentTimeMillis();
                    int value = sharedLocation.get();
                    long itemConsumptionTime = System.currentTimeMillis() - itemStartTime;
                    
                    // Process the consumed value
                    processConsumedValue(value);
                    itemsConsumed++;
                    totalConsumptionTime += itemConsumptionTime;
                    
                    System.out.printf("\t\t[%s] Running sum: %d%n", consumerName, sum);
                    
                    LOGGER.log(Level.FINE, String.format("%s consumed value %d in %dms, running sum: %d", 
                                                       consumerName, value, itemConsumptionTime, sum));
                    
                } catch (InterruptedException e) {
                    LOGGER.log(Level.WARNING, String.format("%s interrupted while consuming item %d", 
                                                          consumerName, count), e);
                    Thread.currentThread().interrupt(); // Restore interrupt status
                    break; // Exit the loop if interrupted
                }
            }
            
            long totalTime = System.currentTimeMillis() - startTime;
            
            System.out.printf("\n[%s] Consumption completed!%n", consumerName);
            System.out.printf("  • Items consumed: %d/%d%n", itemsConsumed, itemsToConsume);
            System.out.printf("  • Final sum: %d%n", sum);
            System.out.printf("  • Average value: %.2f%n", 
                            itemsConsumed > 0 ? (double)sum / itemsConsumed : 0);
            System.out.printf("  • Total time: %d ms%n", totalTime);
            System.out.printf("  • Average time per item: %.2f ms%n", 
                            itemsConsumed > 0 ? (double)totalConsumptionTime / itemsConsumed : 0);
            System.out.println();
            
            // Print consumed values for verification
            if (!consumedValues.isEmpty()) {
                System.out.printf("[%s] Consumed values: %s%n", consumerName, consumedValues);
            }
            
            LOGGER.info(String.format("%s completed: %d items, sum=%d in %dms", 
                                    consumerName, itemsConsumed, sum, totalTime));
            
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, String.format("%s encountered unexpected error", consumerName), e);
            throw new RuntimeException("Consumer failed", e);
        }
    }
    
    /**
     * Processes a consumed value and updates statistics.
     * 
     * @param value the consumed value to process
     */
    private void processConsumedValue(int value) {
        consumedValues.add(value);
        sum += value;
        
        // Validate the value (example: warn if negative)
        if (value < 0) {
            LOGGER.warning(String.format("%s received negative value: %d", consumerName, value));
        }
    }
    
    /**
     * Returns the number of items successfully consumed.
     * 
     * @return items consumed count
     */
    public int getItemsConsumed() {
        return itemsConsumed;
    }
    
    /**
     * Returns the sum of all consumed values.
     * 
     * @return sum of consumed values
     */
    public int getSum() {
        return sum;
    }
    
    /**
     * Returns the total time spent in consumption operations.
     * 
     * @return total consumption time in milliseconds
     */
    public long getTotalConsumptionTime() {
        return totalConsumptionTime;
    }
    
    /**
     * Returns a copy of all consumed values.
     * 
     * @return list of consumed values
     */
    public List<Integer> getConsumedValues() {
        return new ArrayList<>(consumedValues);
    }
    
    /**
     * Returns the consumer's name.
     * 
     * @return consumer name
     */
    public String getConsumerName() {
        return consumerName;
    }
    
    /**
     * Calculates and returns the average of consumed values.
     * 
     * @return average of consumed values, or 0 if no values consumed
     */
    public double getAverageValue() {
        return itemsConsumed > 0 ? (double) sum / itemsConsumed : 0.0;
    }
    
    @Override
    public String toString() {
        return String.format("%s{itemsConsumed=%d, sum=%d, avgValue=%.2f, totalTime=%dms}", 
                           consumerName, itemsConsumed, sum, getAverageValue(), totalConsumptionTime);
    }
}
