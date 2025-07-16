
public class AdjacencyList {
	Node[] List;
public AdjacencyList(int n){
	List=new Node[n];
}
void addToList(int listNum,int value){
	System.out.print("Value reached = " +value);
	Node ptr= List[listNum];
	ptr.appendAtEnd(value);	
}
}
