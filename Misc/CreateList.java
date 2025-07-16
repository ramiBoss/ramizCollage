import java.util.Scanner;


public class CreateList {

	/**
	 * @param args
	 */
	
	public static void displayList(AdjacencyList list,int ver){
		for(int i=0;i<ver;i++){
			Node ptr=list.List[i];
			while(ptr != null)
			{
				System.out.println(ptr.data + "\t");
				ptr=ptr.next;
			}
			System.out.println("\n");
		}
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner in=new Scanner(System.in);
		int ele;
		System.out.print("Enter the number of vertices");
		int ver=in.nextInt();
		AdjacencyList list=new AdjacencyList(ver);
		for(int i=0;i<ver;i++){
			System.out.print("Enter elements to add to node" + i +"type -1 to indicate end\t");
			ele=in.nextInt();
			if(list.List[i] == null)
			{
				list.List[i]=new Node(ele);
			}else {
				while(ele != -1){
				System.out.print("element = " +ele + "\n");	
				list.addToList(i,ele);
				System.out.print("next\t");
				ele=in.nextInt();
				}
			}	
		}
		displayList(list,ver);
	}

}
