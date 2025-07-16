import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;


public class WordBreakProblem {

	/**
	 * @param args
	 */
	
	public static boolean WBreak(String s,Set<String> dict){
		boolean dp[]=new boolean[s.length()+1];
		dp[0]=true;
		for(int i=0;i<s.length();i++){
			if(!dp[i])
				continue;
			for(String a:dict){
				int len=a.length();
				int end=i+len;
				
				if(end > s.length())
					continue;
				if(s.substring(i, end).equals(a))
					dp[end]=true;
			}
		}
		return dp[s.length()];
	}
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String s="ramizkhan";
		String[] dictonary={"leet","code","ramiz","khan"};
		Set<String> dict=new HashSet<String>(Arrays.asList(dictonary));
		System.out.print(WBreak(s,dict));
	}

}
