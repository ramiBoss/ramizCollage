public class Match_Parenthesis
{

    public static void match_paren(int l,int r,char[] str,int count){
        if(l < 0 || r < l)
            return;

        if(l == 0 && r==0){
            //System.out.print("in here\n");
            System.out.println(str);
        }
        else{
            if(l > 0){
                //*System.out.print(str);
                str[count]='(';
                match_paren(l-1,r,str,count+1);
            }
            if(r > l){
                //System.out.print(l + r);
                str[count]=')';
                match_paren(l,r-1,str,count+1);
            }
        }
    }

    public static void main(String[] args){
        //System.out.print("Hello");
        int count=8;
        char[]ch=new char[count*2];
        match_paren(count,count,ch,0);
    }


}
