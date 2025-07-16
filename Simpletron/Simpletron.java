import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
public class Simpletron{
  
  public static Scanner in = new Scanner(System.in);
// Input/output operations
  public final int READ = 10;
  public final int WRITE = 20;
// Load/Store operations  
  public final int LOAD = 20;
  public final int STORE = 21;
  
// Arithmatic operations  
  public final int ADD = 30;
  public final int SUBTRACT = 31;
  public final int DIVIDE = 32;
  public final int MULTIPLY = 33;
  
// Transfer of control operations
  public final int BRANCH = 40;
  public final int BRANCHNEG = 41;
  public final int BRANCHZERO = 42;
  public final int HALT = 43;
  
  private static int[] MEMORY = new int[100];
// Constructor  
  public void Simpletron(){
    return;
  }
  
  public boolean checkInput(int input){
    int terms = 0;
    if(Integer.toString(input) == "0000")
      return true;
    
    while(input > 0){
      input = input/10;
      terms++;
    }
    if(terms == 4)
      return true;
    return false;
  }
  
  public void printManual(){
    Scanner input = null;
    int line_no = 1;
    try{
      input = new Scanner(new File("manual.txt"));
    }catch(FileNotFoundException fileNotFound){
      System.err.println("Error opening file");
      System.exit(1);
    }
    while(input.hasNext()){
      System.out.println(line_no + " " + input.nextLine());
      line_no++;
    }
    
  }
  public boolean checkData(int data){
    int terms = 0;
    while(data > 0){
      data = data/10;
      terms++;
    }
    if(terms <= 2)
      return true;
    return false;
  }
  
  // Load th program into the memory
  public void loadProgram(){
    int loc = 0;
    int data = 0;
    System.out.println("*** Enter your program ***");
    
    while(true && (loc < 100)){
      if(loc < 10){
        System.out.print("0" + loc + " ?\t");
        data = in.nextInt();
        if(checkInput(data)){
          if(data == -9999){
          MEMORY[loc] = data;
          break;
        }         
        else
          MEMORY[loc] = data;
        loc++;
      }else
        System.out.println("Check Data");
     }
      else{
        System.out.print(loc + " ?\t");
        data = in.nextInt();
        if(checkInput(data)){
          if(data == -9999){
          MEMORY[loc] = data;
          break;
        } 
        else
          MEMORY[loc] = data;
        loc++;
      }else
        System.out.println("Check Data");
     }     
   }
    System.out.println("*** Loading Completed ***");
    return;
  }
  
  // Display the program residing in the memory
  public void displayProgram(){
    int loc = 0;
    System.out.println("*** Your Program ***");
    while(true && (MEMORY[loc] != -9999)){
      if(loc < 10){
        System.out.print("0" + loc + " ?\t");
        System.out.println(MEMORY[loc]);      
      }
      else{
        System.out.print(loc + " ?\t");
        System.out.println(MEMORY[loc]);
      }
       loc++; 
    }
    System.out.print("0" + loc + " ?\t");
    System.out.println(MEMORY[loc]);
    return;
  }
  
  public void enterData(){
    int mem_loc = 0;
    int data = 0;
    while(true){
     System.out.println("Enter memory location");
     mem_loc = in.nextInt();
     if(mem_loc == -1)
       break;
     if(MEMORY[mem_loc] != 0){
       System.out.println("The memory location contains " + MEMORY[mem_loc] + " are you sure to override(y for yes)");
       char desc = in.next().charAt(0);
       if(desc == 'y'){
         System.out.println("Enter Data");
         data = in.nextInt();
         if(checkData(data))
           MEMORY[mem_loc] = data;
         else
           System.out.println("Invalid Data");
       }
       else
         System.out.println("Overiding Aborted");
    }
     else{
       System.out.println("Enter Data");
       data = in.nextInt();
       if(checkData(data))
         MEMORY[mem_loc] = data;
       else
         System.out.println("Invalid Data");
     }
    } 
  }
  
  public static void main(String[] args){
    Simpletron computer = new Simpletron();
    System.out.println("*** Welcome to Simpletron ***\n*** Please enter your program one instruction ***\n *** (or data word)" + 
                       "at a time. I will display ***\n*** the location number and a question mark (?)***\n" + 
  "*** You then type the word for that location ***\n*** Type -9999 to stop entering your program. ****");
  System.out.println("Do you want to read the manual (y for yes)");
  if(in.next().charAt(0) == 'y')
    computer.printManual();
  System.out.println("Proceed (n for no)");
  if(in.next().charAt(0) == 'n')
    System.exit(1);
  computer.loadProgram();
  computer.displayProgram();
  System.out.println("*** 1: Enter Data ***\n*** 2: Execute ***\n *** 0: Exit ***\n");
  switch(in.nextInt()){
    case 1:
      computer.enterData();
      break;
    case 2:
      //computer.execute();
      break;
    case 0:
      System.exit(1);
      break;
    default:
      System.out.println("Incorrect Input");
  }
 }
  
  
}