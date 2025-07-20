
public class Queue {
Node front,rear;

void Enqueue(int item){
	if(front == null){
		rear=new Node(item);
		front=rear;
	}
	else{
		rear.next=new Node(item);
		rear=rear.next;
	}
}

Node Dequeue(Node n){
	if( front != null){
		int item=front.data;
		System.out.print(item);
		front=front.next;
		return front;
	}
	return null;
}
}
