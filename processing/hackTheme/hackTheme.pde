PFont font;
char[] letters = {'A','B','C','D','C','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','V','U','W','X','Y','Z'}; 
char ch;
int lCount = 30;
int rowNo = 0, colNo = 0;
int txtSize, gap = 4, speed = 50;
void setup(){
  size(600,600);
  smooth();
  stroke(5);
  rowNo = 20;
  font = loadFont("Matrix.vlw");
  textFont(font);
}

void draw(){
  background(0);
  delay(speed);
  txtSize = width/lCount;
  textSize(txtSize);  
  for(int l=0;l<lCount;l++){
    for(int m=0;m<lCount;m++){
      ch = letters[int(random(26)+1)];
      fill(#5BFA0D);
      text(ch, colNo,rowNo);
      colNo += txtSize+gap;
    }
  rowNo += txtSize+gap;
  colNo = 0;
  }
  rowNo =txtSize;;
  colNo = 0;
  //save("hackTheme.png");
}
