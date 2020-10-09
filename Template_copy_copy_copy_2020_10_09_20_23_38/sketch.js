
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 
  score = 0;
  
  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("Monkey", monkey_running)
  monkey.scale = 0.1
  
  ground = createSprite(200, 380, 400, 20);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
 background(180);
 
  if(gameState === PLAY){
  monkey.bounceOff(ground);
  monkey.velocityY = 5;
  
  text("score = "+score, 300, 30);
  
  if(keyDown("space")){
    monkey.velocityY = -5;
  }
  monkey.velocityY = monkey.velocityY +0.5;
  if(FoodGroup.isTouching(monkey)){
    score = score+1;
    FoodGroup.destroyEach();
  }
  
  
  
  create_obstacles();
  create_fruits();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END
      obstacleGroup.destroyEach();
    }
  }
  
  if(gameState === END){
    text("score = "+score, 300, 30);
    
    monkey.velocityY = 0;
    banana.lifetim4e = 0;
    banana.velocityX = 0;
    obstacle.lifetime = 0;
    obstacle.velocityX = 0;
  }
  
  monkey.collide(ground)
  drawSprites();
}


function create_obstacles(){

  if(frameCount % 60 === 0){
  obstacle = createSprite(400, 360, 20,20);
  obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
  obstacle.velocityX = -3;
  obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}

function create_fruits(){
  r = Math.round(random(1,100));
  if(frameCount%r === 0){
  R = Math.round(random(350,0));
  banana = createSprite(400, R, 20,20);
  banana.velocityX = -5;  
  banana.addImage(bananaImage);  
  banana.scale = 0.1;  
    banana.lifetim4e = 100;
    FoodGroup.add(banana);
  }
}



