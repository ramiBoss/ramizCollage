
public class EditDistanceProblem {

	/**
	 * @param args
	 */
	
	public static int min(int a,int b,int c){
		int sec=a>b?a:b;
		int ret = sec>c?sec:c;
		//System.out.print(ret+"\t");
		return ret;
	}
	
	
	public static int WorkFunction(String s1,String s2){
		int[][] dp=new int[s1.length()+1][s2.length()+1];
		
		if(s1.length() == 0)
			return s2.length();
		if(s2.length() == 0)
			return s1.length();
		
		System.out.print("Before...\n");
		
		for(int i=0;i<s1.length();i++){
			for(int j=0;j<s2.length();j++){
				System.out.print(dp[i][j]+" ");
			}
			System.out.print("\n");
		}
		
		
			
		for(int i=0;i<s1.length();i++){
			for(int j=0;j<s2.length();j++){
				 if (i==0)
		                dp[i][j] = j;  
		            else if (j==0)
		                dp[i][j] = i; 
		            else if(s1.charAt(i) == s2.charAt(j))
					dp[i][j] = dp[i-1][j-1];
		            else
					dp[i][j]=1+min(dp[i][j-1],dp[i-1][j],dp[i-1][j-1]);	
			}
		}
		
		System.out.print("After...\n");
		
		for(int i=0;i<s1.length();i++){
			for(int j=0;j<s2.length();j++){
				System.out.print(dp[i][j]+" ");
			}
			System.out.print("\n");
		}
		
		return dp[s1.length()-1][s2.length()-1];
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s1="geek";
		String s2="gesek";
		System.out.print(WorkFunction(s1,s2));
	}

}
