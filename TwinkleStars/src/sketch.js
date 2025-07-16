var x,y,d;
var r=0,g=150,b=180;
var object;

function setup(){
    createCanvas(600,400);
    background(r,g,b);
}

function draw(){
    
    // coordinates
    x=random(0,600);
    y=random(0,400);
    d=random(1,25);
    //colors
    
    r=random(0,255);
    g=random(0,255);
    b=random(0,255);
    var c=color(r,g,b);
    // checking conditions
    
    if(who == 1){
	object = new star(x,y,c);
    }
    else if(who == 2){
	object = new Ball(x,y,d,c);
    }
    else if(who == 3){
	object = new Boxs(x,y,c); 
    }//default
    else{
	background(c);
    }
}
