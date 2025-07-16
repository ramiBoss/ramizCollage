
public class Rank_Of_Matrix {

	/**
	 * @param args
	 */
	
	public static void swap(int [][] mat,int row,int next_row,int rows,int cols,int mode){
		if(mode == 1){
			for(int c=0;c<cols;c++){
				int temp=mat[row][c];
				mat[row][c]=mat[next_row][c];
				mat[next_row][c]=temp;
			}		
		}
		else if(mode == 2){
			for(int r=0;r<rows;r++){
				int temp=mat[r][row];
				mat[r][row]=mat[r][next_row];
				mat[r][next_row]=temp;
			}
		}
	}
	
	public static int find_rank(int[][] mat,int M,int N){
		int rank=N;
		for(int row=0;row<rank;row++){
			if(mat[row][row]!=0){
				for(int col=0;col<M;col++){
					if(col!=row){
						int mult_ele=mat[col][row]/mat[row][row];
						for(int i=0;i<N;i++)
							mat[col][i]=mat[col][i]-(mat[row][i]*mult_ele);
					}
				}
				//int next_row=row+1;
				/*while(next_row<M){
					int mult_ele=mat[next_row][row]/mat[row][row];
					for(int cols=0;cols<N;cols++)
						mat[next_row][cols]=mat[next_row][cols]-(mat[row][row]*mult_ele);
					next_row++;
				}*/
			}
			else if(mat[row][row]==0){
				if(row+1 !=rank-1 && mat[row+1][row]!=0)
					swap(mat,row,row+1,M,N,1);
				else
					swap(mat,row,N-1,M,N,2);
				rank--;
				row--;
			}
			System.out.print("\n");
			for(int i=0;i<3;i++){
				for(int j=0;j<3;j++){
					System.out.print(mat[i][j] +" ");
				}
				System.out.print("\n");
			}
		}
		return rank;
		
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[][] mat=new int[][]{{10,   20,   10},
								{-20, -30,   10},
								{30,   50,   0}};
		for(int i=0;i<3;i++){
			for(int j=0;j<3;j++){
				System.out.print(mat[i][j] +" ");
			}
			System.out.print("\n");
		}
		System.out.print(find_rank(mat,3,3));
		System.out.print("\n");
		for(int i=0;i<3;i++){
			for(int j=0;j<3;j++){
				System.out.print(mat[i][j] +" ");
			}
			System.out.print("\n");
		}
	}

}
