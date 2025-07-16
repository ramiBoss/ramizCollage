function Boxs(x,y,c){
    this.x=x;
    this.y=y;
    this.col=c;
    Size=10;
    noStroke();
    fill(c);
    rect(this.x,this.y,Size,Size);
}
