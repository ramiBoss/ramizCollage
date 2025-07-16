
public class Account {
	int userNumber;
	double userBalance;
	
	public Account(int usNum){
		//this.userBalance=usBal;
		this.userNumber=usNum;
	}
	
	public synchronized boolean deposit(int amount){
		double newBalance;
		if(amount < 0.0){
			System.out.print("We are so Sorry. Negative amount cannot be submitted");
			return false;
		}
			
		else{
			newBalance=userBalance+amount;
			userBalance=newBalance;
			System.out.print("Final Balance = " +userBalance);
			return true;
		}
	}
	
	public synchronized boolean withdraw(int amount){
		double newBalance;
		if(userBalance < amount){
			System.out.print("Insufficient balance");
			return false;
		}
			
		else{
			newBalance=userBalance-amount;
			userBalance=newBalance;
			System.out.print("Final Balance = " +userBalance);
			return true;
		}
	}
	
}
