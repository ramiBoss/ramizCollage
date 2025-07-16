import java.util.Random;


public class Producer implements Runnable{
	private final Random getRand=new Random();
	private final Buffer sharedLocation;
	public Producer(Buffer shared){
		sharedLocation=shared;
	}
	
	public void run(){
		//int sum=0;
		for(int count=1;count<=10;count++){
			try{
				Thread.sleep(getRand.nextInt(500));
				sharedLocation.set(count);
				//sum+=count;
				//System.out.printf("\t%2d\n",sum);
			}
			catch(InterruptedException exception){
				exception.printStackTrace();
			}
		}
		System.out.printf("Producer done producing");
	}
}
