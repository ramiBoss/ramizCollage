import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class SharedBufferTest2 {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ExecutorService application=Executors.newCachedThreadPool();
		Buffer sharedLocation=new SynchronizedBuffer();
		System.out.printf("%-40s%s\t\t%s\n5-40s%s\n\n","Operation","Buffer","Occupied","----------------","------------------","-----------------");
		application.execute(new Producer(sharedLocation));
		application.execute(new Consumer(sharedLocation));
		
		application.shutdown();
	}

}
