
var monkey , monkey_running
var ground;
var banana ,bananaImage, obstacle, obstacleImage, jumpImg1;
var bananaGroup, obstacleGroup
var score = 0;
var score2 = 0; 
var totalScore = 0
var gameState = "play"

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpImg1 = loadImage ("sprite_0.png")
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(75,330);
  monkey.addAnimation("monkey running", monkey_running);
  monkey.scale = 0.13
  
  ground = createSprite(300,370,1200,10);
  
  monkey.depth = ground.depth;
  monkey.depth = monkey.depth+1;
  
  ground.velocityX = -5;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if(gameState === "play"){
  totalScore = score*score2
  
  score = round(frameCount/55);

  fill(0);
  textFont("Calibri");
  textSize (16.5);
  text("Survival Time: " + score, 450, 38);
  text("Bananas Collected: " + score2, 430, 68);
  text("Total Score: " + totalScore, 455, 98);
 
  monkey.velocityY = 11;
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y>100){
    monkey.velocityY = -15;
  }
  
  if(monkey.y<330){
    monkey.addImage(jumpImg1);
  }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score2 = score2+1
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = "end"
  }
  
  if(ground.x < 0){
    ground.x = 300;
  }
  }
  
  if(gameState === "end"){
    background(20);
    
    ground.destroy();
    monkey.destroy();
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    
  fill("white");
  textFont("Impact");
  textSize (72.5);
  text("Game Over", 155, 108);
  textFont("Calibri")
  textSize (40)
  text("Total Score: " + totalScore, 195, 198);
  text("Bananas Collected: " + score2, 145, 248);
  text("Survival Time: " + score, 175, 298);
 
  }
  
  spawnBanana();
  spawnObstacles();
  drawSprites();
}



function spawnObstacles(){
  
  if(frameCount%80 === 0 && gameState === "play"){
    
  obstacle = createSprite(650,345,10,10);
  obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.15;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana(){
  if(frameCount%80 === 0 && gameState === "play"){
    banana = createSprite(100,100,100,100)
    banana.addImage(bananaImage);
    banana.x = 350;
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.y = round(random(100,300))
    
    bananaGroup.add(banana);
    
  }
}



