import java.util.Scanner;


public class CheckEqual {

	/**
	 * @param args
	 */
	
	public static int bitCheck(int a,int b){
		int count=0;
		for(int c=a^b;c!=0;c=c>>1)
			count+=c&1;
		return count; 
		
	}
	
	public static int checkPowerOfTwo(int n){
		return ((n&(n-1))==0)?1:0;
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner input=new Scanner(System.in);
		int a=31,b=14,n=3;
		int opt = 0;
		char another='y';
		do{
		System.out.print("...Choose Programs to run..." +
				"\n1:	bitCheck\n2:	checkPowerOfTwo\n-1:	exit");
		opt=input.nextInt();
			switch(opt){
			case 1:	System.out.print("Enter two numbers\n");
				a=input.nextInt();
				b=input.nextInt();
				System.out.print("number of dissimilar bits= "+bitCheck(a,b));
				break;
			case 2:	System.out.print("Enter a number\n");
				n=input.nextInt();
				System.out.print(checkPowerOfTwo(n));
				break;
			case -1:	System.exit(1);	
					break;
			default: System.out.print("\nChoose correct option.Try Again...");
					
			}
			System.out.print("\nWant to Try Again...");
			another=input.next().charAt(0);
		}while(another =='y');
		
		
	}

}
