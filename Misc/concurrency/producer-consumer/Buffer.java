
/**
 * Buffer interface for thread-safe producer-consumer communication.
 * Defines the contract for buffer implementations that support
 * concurrent access by multiple threads.
 * 
 * @author Your Name
 * @version 2.0
 * @since 1.0
 */
public interface Buffer {
    
    /**
     * Adds a value to the buffer.
     * This method may block if the buffer is full.
     * 
     * @param value the integer value to add to the buffer
     * @throws InterruptedException if the thread is interrupted while waiting
     */
    void set(int value) throws InterruptedException;
    
    /**
     * Removes and returns a value from the buffer.
     * This method may block if the buffer is empty.
     * 
     * @return the integer value removed from the buffer
     * @throws InterruptedException if the thread is interrupted while waiting
     */
    int get() throws InterruptedException;
}
