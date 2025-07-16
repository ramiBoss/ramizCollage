class Star{
float x;
float y;
float z;
float pz;

  Star(){
  x=random(-width,width);
  y=random(-height,height);
  z=random(width);
  
  }
  
  void update(){
    z=z-speed;
    if(z<1){
      z=width;
      x=random(-width,width);
      y=random(-height,height);
      pz=z;
    }
  }
  
  void show(){
  fill(255);
  noStroke();
  float  sx = map(x/z,0,1,0,width);
  float sy = map(y/z,0,1,0,height);
  float r = map(z,0,width,50,0);
  ellipse(sx,sy,r,r);
  
  /*float px = map(x/pz,0,1,0,width);
  float py = map(y/pz,0,1,0,width);
   stroke(255);
  stroke(255,random(0,255),0);
  line(px,py,sx,sy);*/
  }
}