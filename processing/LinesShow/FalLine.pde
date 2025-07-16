class FalLine{
  float x, oldy, newy;
  float fallSpeed;
  boolean reverse = false;
  public FalLine(float fallSpeed, int xpos){
    this.x = xpos;
    this.oldy = 0;
    this.fallSpeed = fallSpeed;
    newy = oldy;
  }
  
  public void fall(){
    if(this.newy >= height){
      reverse = true;
      this.oldy = height;
      ellipse(this.x, this.newy-fallSpeed, 50,50);
    }
    else if(this.newy <= 0){
      this.oldy = 0;
      reverse = false;
      ellipse(this.x, this.newy+fallSpeed, 50,50);
    }
    if(reverse == true)
      this.newy -= this.fallSpeed;
      else{
        this.newy += this.fallSpeed;
      }
  }
  
  public void show(){
    line(this.x, oldy,this.x, this.newy);
  }
}