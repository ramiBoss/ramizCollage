
public class threeStackinArray {
int StackSize=200;
int[] buffer=new int[StackSize*3];
int[] StackPointer={0,0,0};

void push(int StackNum,int item){
	int index=(StackSize*StackNum+StackPointer[StackNum]+1);
	StackPointer[StackNum]++;
	buffer[index]=item;
}

int pop(int StackNum){
	int index=(StackSize*StackNum+StackPointer[StackNum]);
	StackPointer[StackNum]--;
	int value=buffer[index];
	buffer[index]=0;
	return value;
}

boolean isEmpty(int StackNum){
	return (StackPointer[StackNum] == StackSize*StackNum);
}

}
