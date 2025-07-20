
public class Node {
Node next=null;
int data;
public Node(int d) { data=d; }

void appendAtEnd(int d){
	Node temp = new Node(d);
	Node n=this;
	while(n.next != null)
		n=n.next;
	n.next=temp;
	
}

}
