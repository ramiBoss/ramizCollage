import java.util.Random;


public class Consumer implements Runnable{
	private Random getRand=new Random();
	private final Buffer sharedLocation;
	public Consumer(Buffer shared){
		sharedLocation=shared;
	}
	public void run(){
		int sum=0;
		for(int count=1;count<=10;count++){
			try{
				Thread.sleep(getRand.nextInt(300));
				sum=sharedLocation.get();
				System.out.printf("\t\t%2d\n",sum);
			}
			catch(InterruptedException exception){
				exception.printStackTrace();
			}
		}
		System.out.printf("Consumer read all values");
	}
}
