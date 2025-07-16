function star(x,y,r,g,b){
    var p1X=x;
    var p1Y=y-5;
    var p2X=x;
    var p2Y=y+5;
    var p3X=x-5;
    var p3Y=y-3;
    var p4X=x+5;
    var p4Y=y-3;
    var p5X=x-5;
    var p5Y=y+3;
    var p6X=x+5;
    var p6Y=y+3;
    noStroke();
    fill(r,g,b);
    triangle(p1X,p1Y,p5X,p5Y,p6X,p6Y);
    triangle(p2X,p2Y,p3X,p3Y,p4X,p4Y);
}
