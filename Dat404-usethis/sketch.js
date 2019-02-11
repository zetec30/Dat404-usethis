//parallax scrolling sketch.

const SCROLL_SPEED = 0.5,
      NUMBER_OF_CIRCLES = 500;

let circles, leftmost, rightmost, topmost, bottommost;

function getCircle(){
    return {
        x: random(-width, width*2),
        y: random(-height, height*2),
        diam: random(5, 100)
    };
}

function setup(){

  //
  let clientHeight = document.getElementById('p5').clientHeight;
  let clientWidth = document.getElementById('p5').clientWidth;


  //allows the p5 sketch be added to a container by ID (container).
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent("container");


    noStroke();
    //populate the circles array with new circle objects
    circles = [];
    for (let i=0; i<NUMBER_OF_CIRCLES; i++){
        circles.push(getCircle());
    }
    //sort circle array by smallest to largest
    circles.sort(function(c1,c2){
        return c1.daim - c2.diam;
    });
    //find the circles farthest away from the center
    leftmost = circles.reduce(function(c1,c2){
        if (c1.x < c2.x) return c1;
        return c2;
    });
    rightmost = circles.reduce(function(c1,c2){
        if (c1.x > c2.x) return c1;
        return c2;
    });
    topmost = circles.reduce(function(c1,c2){
        if (c1.y < c2.y) return c1;
        return c2;
    });
    bottommost = circles.reduce(function(c1,c2){
        if (c1.y > c2.y) return c1;
        return c2;
    });
}



function draw(){


    //repaint
    background(25);
    //calculate parallax based on mouse position
    let dx = mouseX < width/2 ? SCROLL_SPEED : -SCROLL_SPEED,
        dy = mouseY < height/2 ? SCROLL_SPEED : -SCROLL_SPEED;
    //constrain panning movement
    if (dx > 0 && leftmost.x >= 0) dx = 0;
    if (dx < 0 && rightmost.x <= width) dx = 0;
    if (dy > 0 && topmost.y >= 0) dy = 0;
    if (dy < 0 && bottommost.y <= height) dy = 0;
    //loop through circles
    circles.forEach(function(circle){
        //reassign position (larger circles move faster)
        circle.x += dx*circle.diam/2;
        circle.y += dy*circle.diam/2;
        //draw circle
        fill(46, 255, 203, circle.diam*2);
        ellipse(circle.x, circle.y, circle.diam, circle.diam);
    });
}
