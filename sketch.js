var running_girl;
var running_ani;
var track,trakImage;
var standingGirl;
var turn_ani;
var tileImg;
var gameState = "play";
var distance = 0;
var wolfImg;
var c1Img,c2Img,c3Img,c4Img,c5Img,c6Img;
var c1g,c2g,c3g,c4g,c5g,c6g;
var gameover;



function preload(){

    running_ani = loadAnimation("images/girl1.png","images/girl2.png","images/girl3.png","images/girl4.png","images/girl5.png","images/girl6.png")
    trackImage = loadImage("images/track1.jpg");
    standingGirl = loadAnimation("images/girl1.png");
    tileImg = loadImage("images/tile.png");
    turn_ani = loadAnimation("images/girl7.png","images/girl8.png","images/girl9.png","images/girl10.png","images/girl11.png","images/girl12.png")
   // wolfImg = loadImage("images/wolf.png");
   c1Img = loadImage("images/car1.png");
   c2Img = loadImage("images/car2.png");
   c3Img = loadImage("images/car3.png");
   gameover = loadImage("images/gameOver.png");




}

function setup(){
    createCanvas(1200,750);

    running_girl = createSprite(80,375,30,40);
    running_girl.addAnimation("standing",standingGirl);
    running_girl.addAnimation("running",running_ani);
    running_girl.addAnimation("turn",turn_ani);
    running_girl.scale = 0.5

    c1g = new  Group();
    c2g = new  Group();
    c3g = new  Group();

    //running_girl.debug = true;
    running_girl.setCollider("circle",3,7,18);
  
    

   
}

function draw(){
    //if(gameState % 50 === 0){
  
    //console.log(gameState);
   // }
    
    
    

    if(gameState === "play"){
        background(0);
        image(trackImage,0,0,displayWidth*5,displayHeight);

        drawSprites();

        if(keyDown("right") && distance < 4960){
            running_girl.x+=10;
            running_girl.changeAnimation("running",running_ani);
            if(distance < 4100){
                camera.position.x+= 10;
            }
            distance+=10;

        }else if(keyDown("left") && distance > 0){
            running_girl.x-=10;
            running_girl.changeAnimation("turn",turn_ani);
            camera.position.x-= 10;
            distance-=10;


        }else if(keyDown("up")){
            running_girl.y-=10;
            running_girl.changeAnimation("running",running_ani);

        }else if(keyDown("down")){
            running_girl.y+=10;
            running_girl.changeAnimation("turn",turn_ani);
        }else{
            running_girl.changeAnimation("standing",standingGirl);

        }


        if(distance === 4960){
            gameState = "win";
        }
        
        car1();
        car2();
        car3();

        if(running_girl.isTouching(c1g) || running_girl.isTouching(c2g) || running_girl.isTouching(c3g)){
            gameState = "end";
        }
       
    }else if(gameState === "end"){
        c1g.setVelocityEach(0);
        c2g.setVelocityEach(0);
        c3g.setVelocityEach(0);
        c1g.setLifetimeEach(-1);
        c2g.setLifetimeEach(-1);
        c3g.setLifetimeEach(-1);
        image(gameover,camera.position.x-300,375,800,150);

    }else if(gameState === "win"){
        
            background(0);
            fill("white");
            textSize(80);
            text("YOU WIN!!", camera.position.x-150,375);
    

    
    }



    fill("white");
    strokeWeight(3);
    textSize(25)
    //text("Distance : " + distance ,camera.position.x,100);
    
   
}

function car1(){
    if(frameCount % 100 === 0){
        var c1 = createSprite(camera.position.x - 650,0,10,10);
        c1.shapeColor = "white";
        c1.velocityY = 4;
        c1.addImage(c1Img);
        c1.scale = 3;
        c1.lifetime = 200;
      //  c1.debug = true;
        c1.x = random(camera.position.x - 480 , camera.position.x +300);
        c1g.add(c1);

    }
}

function car2(){
    if(frameCount % 200 === 0){
        var c2 = createSprite(camera.position.x - 650,0,10,10);
        c2.shapeColor = "white";
        c2.velocityY = 4;
        c2.addImage(c2Img);
        c2.scale = 3;
        c2.lifetime = 200;
      //  c2.debug = true;
        c2.x = random(camera.position.x - 300 , camera.position.x +200);
        c2g.add(c2);
    }
}

function car3(){
    if(frameCount % 300 === 0){
        var c3 = createSprite(camera.position.x - 650,0,10,10);
        c3.shapeColor = "white";
        c3.velocityY = 4;
        c3.addImage(c3Img);
        c3.scale = 3;
        c3.lifetime = 200;
     //   c3.debug = true;
        c3.x = random(camera.position.x - 400 , camera.position.x + 300);
        c3g.add(c3);
    }
}