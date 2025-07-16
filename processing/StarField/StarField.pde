Star[] stars=new Star[500];
float speed;
void setup(){
  size(400,400);
  for(int i=0;i<stars.length;i++){
    stars[i] = new Star();
  }
}

void draw(){
 // background(random(200,255),random(200,255),random(200,255));
  background(0);
  speed = map(mouseX,0,width,1,15);
  translate(width/2,height/2);
  for(int i = 0;i<stars.length;i++ ){
    stars[i].update();
    stars[i].show();
  }
}