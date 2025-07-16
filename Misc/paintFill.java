import java.util.Random;

/**
 * Created by XacerAspire on 3/9/2016.
 */
public class paintFill {

    public enum Color{
        RED,BLACK,BLUE,GREEN;
    }

    public static Color randomColor() {
        int pick = new Random().nextInt(Color.values().length);
        return Color.values()[pick];
    }

    public static boolean fillColor(Color[][] screen, int x, int y, Color old_color, Color new_color){
        if(x < 0 || x >= screen[0].length || y < 0 || y >= screen.length)
            return false;
        else{
            if(screen[y][x] == old_color){
                screen[y][x]=new_color;
                fillColor(screen,x+1,y,old_color,new_color);
                fillColor(screen,x-1,y,old_color,new_color);
                fillColor(screen,x,y-1,old_color,new_color);
                fillColor(screen,x,y+1,old_color,new_color);
            }
        }
        return true;
    }

    public static void displayScreen(Color[][] screen){
        for(int i=0;i< screen.length;i++){
            for(int j=0;j<screen[0].length;j++){
               System.out.print(screen[i][j] + "\t");
            }
            System.out.print("\n");
        }
        System.out.println("-------------------");
    }


    public static void main(String[] args) {
        //Random ran=new Random();
        Color[][] screen=new Color[3][4];
        for(int i=0;i< screen.length;i++){
            for(int j=0;j<screen[0].length;j++){
                screen[i][j]=randomColor();
            }
        }
        displayScreen(screen);
        Color old_color,new_color;
        new_color=Color.GREEN;
        int x=2,y=1;
        old_color=screen[y][x];
        if (fillColor(screen,x,y,old_color,new_color) == true)
            displayScreen(screen);
    }
}
