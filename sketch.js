var sharky, sharkImgUp, sharkImgDown, sharkImgLeft, sharkImgRight;
var bg1, bg2;
var start = 0;
var play = 1;
var end = 2;
var gameState = 0;
var medalCollected=0;
var form;
var timer=1;
var m1, ml1, m2, ml2, m3, ml3, m4, ml4;
var obstacle, obs1, obs2;

function preload(){
    sharkImgUp = loadImage("image/SHARK-UP.png");
    sharkImgDown = loadImage("image/SHARK-DOWN.png");
    sharkImgLeft = loadImage("image/SHARK-LEFT.png");
    sharkImgRight = loadImage("image/SHARK-RIGHT.png");
    bg1 = loadImage("image/BACKGROUND-STORY.jpg");
    bg2 = loadImage("image/Background.jpg");
    m1 = loadImage("image/medal1.png");
    m2 = loadImage("image/medal2.png");
    m3 = loadImage("image/medal3.png");
    m4 = loadImage("image/medal4.png");
    obs1 = loadImage("image/anker.png");
    obs2 = loadImage("image/obstacle.png");

}

function setup(){
    createCanvas(displayWidth, displayHeight);
    shark=createSprite(displayWidth/2, displayHeight/2, 100, 100);
    shark.addImage(sharkImgRight);
    shark.scale=0.5;
    shark.visible=false
    ml1=createSprite(100, 100, 10, 10);
    ml1.addImage(m1);
    ml1.scale=1.2;
    ml1.visible=false;
    ml2=createSprite(100, 700, 10, 10);
    ml2.addImage(m2);
    ml2.scale=1.2;
    ml2.visible=false;
    ml3=createSprite(1200, 100, 10, 10);
    ml3.addImage(m3);
    ml3.scale=1.2;
    ml3.visible=false;
    ml4=createSprite(1200, 700, 10, 10);
    ml4.addImage(m4);
    ml4.scale=1.2;
    ml4.visible=false;
}

function draw(){
    if(gameState === start){
        background(bg1);
         fill(255);
         textSize(30);
         text("Sharky is bored living in water caves of Bay of Bengal.", displayWidth/2-500, displayHeight/2-200);
         text("So he decided to leave on an adventure.", displayWidth/2-500, displayHeight/2-165)
         text("Be careful of dangers.", displayWidth/2-500, displayHeight/2-130)
         text("Use arrows to move the shark.", displayWidth/2-500, displayHeight/2-95)
         text("Click p to start the game.", displayWidth/2-500, displayHeight/2-60)
         if(keyDown("p")){
            gameState = play;
        }
        }
    if(gameState === play){
        background(bg2);
        shark.visible=true;
        ml1.visible=true;
        ml2.visible=true;
        ml3.visible=true;
        ml4.visible=true;
        sharkyMove();
        medalCollect();
        if(medalCollected > 3){
            textSize(30);
            fill(0);
            text("you won", displayWidth/2, displayHeight/2);
        }
        if (frameCount % 50 === 0) {
            timer=timer-1;
        }
        textSize(20)
        fill(0)
        text("Next falling obstacle in : "+timer+" seconds.", displayWidth/2-180, 100);
        fallingObstacles();
        console.log(medalCollected);
    }
    drawSprites();
}
function sharkyMove(){
    if(keyDown("UP_ARROW")){
        shark.y=shark.y-5;
        shark.addImage(sharkImgUp);
    }
    if(keyWentUp("UP_ARROW")){
        shark.addImage(sharkImgRight);
    }
    if(keyDown("DOWN_ARROW")){
        shark.y=shark.y+5;
        shark.addImage(sharkImgDown);
    }
    if(keyWentUp("DOWN_ARROW")){
        shark.addImage(sharkImgLeft);
    }
    if(keyDown("LEFT_ARROW")){
        shark.x=shark.x-5;
        shark.addImage(sharkImgLeft);
    }
    if(keyDown("RIGHT_ARROW")){
        shark.x=shark.x+5;
        shark.addImage(sharkImgRight);
    }
}
function medalCollect(){
    if(keyWentDown("C") && shark.x < ml1.x+100 && shark.y < ml1.x+100){
        medalCollected=medalCollected+1;
        ml1.destroy();
    }
    if(keyWentDown("C") && shark.x < 200 && shark.y > 600){
        medalCollected=medalCollected+1;
        ml2.destroy();
    }
    if(keyWentDown("C") && shark.x > 1100 && shark.y < 200){
        medalCollected=medalCollected+1;
        ml3.destroy();
    }
    if(keyWentDown("C") && shark.x > 1100 && shark.y > 600){
        medalCollected=medalCollected+1;
        ml4.destroy();
    }
}
function fallingObstacles(){
    var rand1 = Math.round(random(100, 1200));
    if(frameCount % 75 === 0){
        obstacle = createSprite(rand1, -200, 10, 10);
        obstacle.velocityY=10;
        var rand2 = Math.round(random(1,2));
        switch(rand2) {
            case 1: obstacle.addImage(obs1);
                    obstacle.scale=1.75;
              break;
            case 2: obstacle.addImage(obs2);
                    obstacle.scale=1.5;
              break;
    }
        timer=1;
        obstacle.lifetime=100;
    }
}