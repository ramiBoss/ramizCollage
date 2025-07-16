function Ball(x,y,d,c){
    this.x=x;
    this.y=y;
    this.d=d;
    this.col=c;
    noStroke();
    fill(this.col);
    ellipse(this.x,this.y,this.d,this.d);
}
