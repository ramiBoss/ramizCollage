
public class Unsync implements Buffer{
	private int buffer=-1;
	public void set(int value){
		System.out.printf("producer writes\t%2d",value);
		buffer=value;
	}
	public int get(){
		System.out.printf("consumer reads\t%2d",buffer);
		return buffer;
	}
}
