import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class SharedBuffer {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ExecutorService application=Executors.newCachedThreadPool();
		Buffer sharedLocation=new Unsync();
		System.out.println("Action\t\tvalue\tSum of Produced\tSum of Consumed");
		application.execute(new Producer(sharedLocation));
		application.execute(new Consumer(sharedLocation));
		
	}

}
