
public class AgeException extends Exception {
	int age;
	AgeException(int age){
		this.age=age;
	}
	
	public String toString(){
		return "Wrong Age : AgeException : "+age;	
	}
	
}
