
public class Stack {
Node top;

void push(int value){
	Node t=new Node(value);
	t.next=top;
	top=t;
}

int pop(){
	if(top != null){
		int item=top.data;
		top=top.next;
		return item;
	}
	return (Integer) null;
}
}
