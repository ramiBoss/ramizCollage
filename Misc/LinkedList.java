import java.util.Scanner;


public class LinkedList {

	/**
	 * @param args
	 */
	public static Node root;//=null;
	
	public static void nFromLast(int n,Node root){
		if(root == null)
		{
			System.out.print("Empty List");
			return;
		}
		Node p1=root;
		Node p2=root;
		for(int i=0;i<n-1;i++){
			p2=p2.next;
		}
		if(p2 == null){
			System.out.print("Short List\n");
			return;
		}
		else{
			while(p2.next != null){
				p1=p1.next;
				p2=p2.next;
			}
		}
		System.out.print(n+"th form last element is" + p1.data);
		return;
	}
	
	public static Node addNode(int d,Node root){
		if(root == null){
			root=new Node(d);
			return root;
		}
		else{
			root.appendAtEnd(d);
			return root;
		}
		//printList(root);
	}
	
	public static Node deleteNode(int d,Node root){
		if(root == null){
			System.out.print("Empty List");
			return root;
		}
		else{
			Node n=root;
			Node previous=null;
			while(n.next != null)
			{
				if(n.data == d){
					previous.next=n.next;
					return root;
				}
				else{
					previous=n;
					n=n.next;	
				}
			}
			return root;
		}
	}
	
	public static void printList(Node root){
		if(root == null){
			System.out.print("Empty List");
			return;
		}
		else{
			Node n=root;
			while(n != null)
			{
				System.out.print(n.data + " -> ");
				n=n.next;
			}
		}
			
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int another=1;
		int choice=0;
		Scanner in=new Scanner(System.in);
		while(another == 1){
		System.out.println("1:Add at end \n 2: Delete \n 3: Display List \n 4: N from last\n");
		choice=in.nextInt();
		switch(choice){
		case 1:System.out.print("Enter element to add ");
				int d=in.nextInt();
				root=addNode(d,root);
				break;
		case 2: System.out.print("Enter the element to delete\n");
				int ele=in.nextInt();
				root=deleteNode(ele,root);
				break;
		case 3: printList(root);
				break;
		case 4:System.out.print("Enter the position");
				int n=in.nextInt();
				nFromLast(n,root);
				break;
		default: System.out.print("Choose correct option\n");		
		}
		System.out.print("Another");
		another=in.nextInt();
	}
		System.out.print("Program Terminated");
	}

}
