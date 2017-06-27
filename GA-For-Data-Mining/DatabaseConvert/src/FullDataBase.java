import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class FullDataBase {

	// Mapping String To Equivalent Integer
		public static int ConvertString(String str){
			if(str.equals("[0-10)") || str.equals("Male") || str.equals("Caucasian") || str.equals("No") || str.equals("NO"))
				return 1;
				//System.out.print("1 \t\t");
			else if(str.equals("[10-20)") || str.equals("Female") || str.equals("AfricanAmerican") || str.equals("Yes") || str.equals("Ch") || str.equals("Up") || str.equals("<30"))
				return 2;
			//System.out.print("2 \t\t");
			else if(str.equals("[20-30)") || str.equals(">30") || str.equals("Others") || str.equals("?") || str.equals("Down"))
				return 3; //System.out.print("3 \t\t");
			else if(str.equals("[30-40)") || str.equals("Steady"))
				return 4; 
			else if(str.equals("[40-50)"))
			return 5;
			else if(str.equals("[50-60)"))
				return 6;
			else if(str.equals("[60-70)"))
				return 7;
			else if(str.equals("[70-80)"))
				return 8;
			else if(str.equals("[80-90)"))
				return 9;
			else if(str.equals("[90-100)"))
				return 10;
			return 0;
		}
		
		public static int ConvertInteger(double val){
			int value;
			if(val>10 && val<100){
				value=(int)(val/10);
				return value;
			}
				
			if(val > 100){
			value=(int)(val/100);
			return value;
			}
			else
				return (int)val;
		}

		public static void main(String[] args) {
			// TODO Auto-generated method stub
			String str=new String();
			//..
			try {
				File fac=new File("mapped1.txt");
				if(!fac.exists()){
					fac.createNewFile();
				}
				FileInputStream file = new FileInputStream(new File("Part1.xls"));
				try{
					FileWriter dfw=new FileWriter(fac);
					//FileOutputStream fw=new FileOutputStream("mapped.txt");
					//DataOutputStream dfw=new DataOutputStream(fw);		     
			    //Get the workbook instance for XLS file 
			    HSSFWorkbook workbook = new HSSFWorkbook(file);
			 
			    //Get first sheet from the workbook
			    HSSFSheet sheet = workbook.getSheetAt(0);
			    int bWrite; 
			    //Iterate through each rows from first sheet
			    Iterator<Row> rowIterator = sheet.iterator();
			    while(rowIterator.hasNext()) {
			        Row row = rowIterator.next();
			        
			        //For each row, iterate through each columns
			        Iterator<Cell> cellIterator = row.cellIterator();
			        while(cellIterator.hasNext()) {
			            Cell cell = cellIterator.next();
			            switch(cell.getCellType()) {
			                case Cell.CELL_TYPE_BOOLEAN:
			                    //System.out.print(cell.getBooleanCellValue() + "\t\t");
			                    break;
			                case Cell.CELL_TYPE_NUMERIC:
			                	dfw.write((int)ConvertInteger(cell.getNumericCellValue()) + " ");
			                    break;
			                case Cell.CELL_TYPE_STRING:
			                  	dfw.write((int)ConvertString(cell.getStringCellValue()) + " ");
			                    break;
			                    
			            }
			            
			        }
			        dfw.write("\r\n");    
			    }
			    file.close();
			    dfw.close();
				}catch (FileNotFoundException e) {
				    e.printStackTrace();
				} 
			    
			} catch (FileNotFoundException e) {
			    e.printStackTrace();
			} catch (IOException e) {
			    e.printStackTrace();
			}
			
		}


}
