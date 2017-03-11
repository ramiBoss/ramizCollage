import java.io.Serializable;
import java.util.Scanner;


public class Employee implements Serializable{
	int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	String firstname;
	String lastname;
	int age;
	float salary;
	public int getAge() {
		return age;
	}
	public void setAge(int age) throws AgeException {
		if(age<15)
			throw new AgeException(age);
		this.age = age;
	}
	public float getSalary() {
		return salary;
	}
	public void setSalary(float salary) {
		this.salary = salary;
	}
	
	public String getFirstname() {
		return this.firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	/*
	public void set(String firstname,String lastname) {
		super.firstname = firstname;
		super.lastname = lastname;
	}
	*/
	public void set(int age) throws AgeException {
		if(age<15)
			throw new AgeException(age);
		this.age = age;
	}
	
	public void set(float salary) {
		this.salary = salary;
	}
	
	/*public String toString(){
		return new StringBuffer(this.id + " ").append(this.firstname + " ").append(this.lastname + " ")
				.append(this.age + " ").append(this.salary + " ").toString();
	}*/
	
	/*public void show(){
	super.show();	
	System.out.println("Age= " + age);
	System.out.println("Salary= " + salary);
	}*/
	
}
