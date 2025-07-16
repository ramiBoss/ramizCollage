import java.awt.Point;


public class Square {

	/**
	 * @param args
	 */
	int left,right,top,bottom;
	public Square(int left,int top,int size){
		this.left=left;
		this.top=top;
		this.bottom=top+size;
		this.right=left+size;
	};
	
	public static Point middle(Square square){
		return (new Point((square.left+square.right)/2,(square.top+square.bottom)/2));
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//int left=4;
		//int top=6;
		//int size=8;
		Square square1=new Square(4,6,8);
		Square square2=new Square(6,4,8);
		Point mid_1,mid_2;
		mid_1=middle(square1);
		mid_2=middle(square2);
		if(mid_1==mid_2)
			System.out.printf("from" +square1.left,square1.top+ "to" + square1.right,square1.bottom);
		else
			System.out.printf("from" +mid_1+ "to" + mid_2);
	}

}
