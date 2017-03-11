import java.awt.List;
import java.io.*;
import java.util.ArrayList;
import java.util.Scanner;


public class EmpOp {
	
	public static void closeFile(ObjectOutputStream oos,ObjectInputStream ois) throws IOException{
		oos.close();
		ois.close();
	}
	
	public static void add(int _empId,String _fname,String _lname,int _age,float _salary) throws IOException{
		BufferedReader in=new BufferedReader(new InputStreamReader(System.in));
		File file=new File("EmployeeDatabase.txt");
		if(!file.exists()){
			file.createNewFile();
		}
		FileOutputStream fw=new FileOutputStream(file,true);
		ObjectOutputStream oout=new ObjectOutputStream(fw);
		Employee emp=new Employee();
		emp.setId(_empId);
		emp.setFirstname(_fname);
		emp.setLastname(_lname);
		try {
			emp.setAge(_age);
		} catch (AgeException e) {
			// TODO Auto-generated catch block
			System.out.println("Wrong Age");
			//e.printStackTrace();
		}
		emp.setSalary(_salary);
		oout.writeObject(emp);
		oout.close();
	}
	
	public static void delete(Employee emp,int id,ObjectOutputStream oos,ObjectInputStream ois) throws ClassNotFoundException, IOException{
		try{
			while(true){
				emp=(Employee)ois.readObject();
				if(emp.getId() != id){
					oos.writeObject(emp.toString() + "line.seperator");
				}
			}
		}catch(ClassNotFoundException e){	
			System.out.print("ClassNotFoundException");
			e.printStackTrace();
		}catch(EOFException endofFileException){
			return;
		}
	}
	
	public void deleteRecord(int id){
		File oldfile=new File("EmployeeDatabase.txt");
		File newfile=new File("EmployeeDatabase1.txt");
		Employee emp = null;
		if(!oldfile.exists()){
			System.out.print("File does not exists");
		}
		else{
			try{
				if(!newfile.exists()){
					newfile.createNewFile();
				}
				FileInputStream fs=new FileInputStream(oldfile);
				ObjectInputStream ois=new ObjectInputStream(fs);
				FileOutputStream fo=new FileOutputStream(newfile);
				ObjectOutputStream oos=new ObjectOutputStream(fo);
				delete(emp,id,oos,ois);
				closeFile(oos,ois);
				oldfile.delete();
				newfile.renameTo(oldfile);
			}catch(ClassNotFoundException e){	
				System.out.print("ClassNotFoundException");
				e.printStackTrace();
			}catch(EOFException endofFileException){
				return;
			}catch(IOException ioException){
				System.err.print("Error during reading the file");
			}
			finally{
				System.out.print("Some Exception Occurs");
			}
		}
		
	}
	
	public void modify(Employee newemp){
		File oldfile=new File("EmployeeDatabase.txt");
		File newfile=new File("EmployeeDatabase1.txt");
		Employee emp=new Employee();
		if(!oldfile.exists()){
			System.out.print("File does not exists");
		}else{
			try{
				if(!newfile.exists()){
					newfile.createNewFile();
				}
				FileInputStream fi=new FileInputStream(oldfile);
				ObjectInputStream br=new ObjectInputStream(fi);
				FileOutputStream fo=new FileOutputStream(newfile);
				ObjectOutputStream oout=new ObjectOutputStream(fo);
				while((emp=(Employee)br.readObject())!=null){
					emp=(Employee)br.readObject();
					if(emp.id == newemp.id){
						oout.writeObject(newemp.toString() + "\n");
					}else{
						oout.writeObject(emp.toString() + "\n");
					}
				}
				oout.close();
				oldfile.delete();
				newfile.renameTo(oldfile);
			}catch(Exception e){	
				System.out.print("ClassNotFoundException");
				e.printStackTrace();
			}finally{
				System.out.print("Some Exception Occurs");
			}
		}
	}
	
/*	public  void display() throws IOException, ClassNotFoundException{
		File file=new File("EmployeeDatabase.txt");
		if(!file.exists()){
			System.out.print("File does not exists");
		}
		else{
			//String sString;*/
			/*FileReader fr=new FileReader(file);
			BufferedReader br=new BufferedReader(fr);
				//List<Employee> emp=new ArrayList<Employee>();
				FileInputStream fs=new FileInputStream(file);
				ObjectInputStream or=new ObjectInputStream(fs);
				//Employee emp=new Employee();
			try{	
				while(true){
					//emp.add(or.readObject());
				//	System.out.println("\tEmp Id = "+emp.getId()+"\tEmp Name = "+emp.getFirstname()+"\tEmp Age = "+emp.getAge()+"\tEmp Salary = "+emp.getSalary()+"\n");
					//or.reset();
					//delete emp;
				}
			}catch(EOFException endofFileException){
				return;
			}
		}
	}*/
	
	
}
