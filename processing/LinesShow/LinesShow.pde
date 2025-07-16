FalLine[] fLines;
int thickness = 2;
int noLines;
int xpos = 2;
int count = 0;
void setup(){
  size(600,600);
  strokeWeight(thickness);
  noLines = width/thickness;
  fLines = new FalLine[noLines];
  for(int i=0;i<noLines;i++){
    fLines[i] = new FalLine(random(1)+0.015, xpos);
    xpos += thickness+4;
  }
}

void draw(){
  //background(255);
  background(#1BF232);   
  fill(random(255), random(255), random(255));
  for(int i=0;i<noLines;i++){
    fLines[i].show();
    fLines[i].fall();
  }
  count++;
  //save("LinesShow.jpg");
}