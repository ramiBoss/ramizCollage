
public class SynchronizedBuffer implements Buffer{
	boolean occupied=false;
	private int buffer=-1;
	public synchronized void set(int value) throws InterruptedException{
		while(occupied){
			System.out.print("producer tries to write");
			System.out.printf("%-40s%d\t\t%b\n\n","Buffer full. producer waits",buffer,occupied);
			wait();
		}
		buffer=value;
		occupied=true;
		System.out.printf("%-40s%d\t\t%b\n\n","producer writes",buffer,occupied);
		notifyAll();
		
	}
	
	public synchronized int get() throws InterruptedException{
		while(!occupied){
			System.out.print("consumer tries to read");
			System.out.printf("%-40s%d\t\t%b\n\n","Buffer empty.consumer waits",buffer,occupied);
			wait();
		}
		occupied=false;
		System.out.printf("%-40s%d\t\t%b\n\n","consumer reads",buffer,occupied);
		notifyAll();
		return buffer;
	}
}
