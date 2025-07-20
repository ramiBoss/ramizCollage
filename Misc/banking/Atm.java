import java.util.Scanner;


public class Atm extends Thread{

	/**
	 * @param args
	 */
	int accNumber;
	public Atm(int acct){
		this.accNumber=acct;
	}
	
	Scanner inp =new Scanner(System.in);
	
	public void run(){
		Account a=new Account(accNumber);
		System.out.print(this.accNumber);
		int amount;
		while(true){
			System.out.print("Select:" + Thread.currentThread().getId() + "\n 1:Deposit\n2:Withdraw\n0:Exit\n");
			int option=inp.nextInt();
			switch(option){
			case 1: amount=inp.nextInt();
				a.deposit(amount);
				break;
			case 2:	amount=inp.nextInt();
				a.withdraw(amount);
				break;
			case 0:	System.out.print("Thank You! It's good o bank with you"); 
					System.exit(1);		
			default:	System.out.print("wrong input");		
				}
		}
	}

}
