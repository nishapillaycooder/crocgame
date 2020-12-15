var scene,backgroundImage;
var dino,dinoImage;
var blockImage,blockG;
var inviGround,invisiG;
var coinImage,coinG;
var score = 0;
var gameState = "play";
var beeImage,beeG;
var rockImage,rockG;



function preload(){

  backgroundImage = loadImage("background.jpg");
  dinoImage = loadImage("DINO.gif");
  blockImage = loadImage("block1.png");
  coinImage = loadAnimation("c1.png","c2.png","c3.png","c4.png");
  beeImage = loadAnimation("bee1.png","bee2.png");
  rockImage = loadImage("rock.png");
  
}

function setup() {
 
  createCanvas(450,450);
  
  scene = createSprite(225,225);
  scene.addImage("background",backgroundImage);
  scene.velocityX = -4;
  
  dino = createSprite(80,296);
  dino.addImage("dino",dinoImage);
  dino.scale = 0.4
 // dino.debug = true;
  
  
  inviGround = createSprite(80,350,800,10);
  inviGround.visible = false;
  
  blockG = new Group();
  
  coinG = new Group();
  
  invisiG = new Group();
  
  beeG = new Group();
  
  rockG = new Group();


}

function draw() {
 background(0);
  dino.velocityX =0;
  if(gameState === "play"){
  
  
  
  if(scene.x<0){
     scene.x = 225;
     }
  
  blocks();
   
  bee();
   
  rock();
  
  if(keyDown("space")){
     dino.velocityY = -9;
     }
  
  dino.velocityY = dino.velocityY +0.8;
  
  if(coinG.isTouching(dino)){
     coinG.destroyEach();
     score = score +10;
     }
  
  if(blockG.isTouching(dino)){
     dino.velocityY = 0;
     dino.velocityX = 0;
     }
  
  if(invisiG.isTouching(dino)){
    dino.bounceOff(invisiG);
}
    
    if(beeG.isTouching(inviGround)){
       beeG.bounceOff(inviGround);
       }
  
   if(beeG.isTouching(dino) || rockG.isTouching(dino)){
      gameState = "end";
      }
   
  dino.collide(inviGround)
   
   drawSprites();
     
 }
   else if(gameState === "end"){
     
    dino.velocityY = 0;
    fill("yellow");
    stroke("yellow");
    textSize(20);
    text("GameOver",200,225);
    text("press  R  to  restart",150,255);
    
    if(keyDown("R")){
       restart();
       } 
     
     
   }
  
  
  
  
  textSize(20);
  stroke("black")
  fill("black");
  text("score :" + score,50,80)
  
 
}

function blocks(){
  if(frameCount % 80 === 0){
    var block = createSprite(450,0,10,10);
    block.addImage("block",blockImage);
    block.y = Math.round(random(180,250));
    block.velocityX = -4;
    block.lifetime = 120;
    //block.debug = true;
    block.setCollider("rectangle",3,5,65,17)
    blockG.add(block);
    
    var coin = createSprite(450,block.y - 30);
    coin.addAnimation("running",coinImage);
    coin.velocityX = -4;
    coin.scale = 0.4;
    coin.lifetime = 120;
    coinG.add(coin);
    
    var invisiG2 = createSprite(455,block.y + 15,80,10);
    invisiG2.velocityX  = -4;
    invisiG2.lifetime = 120;
    invisiG2.visible = false;
    invisiG2.debug = true;
    invisiG2.lifetime = 120;
    invisiG.add(invisiG2);
    
}
}

function bee(){
  if(frameCount % 120 === 0){
      
    var bees = createSprite(450,0)
    bees.addAnimation("bee",beeImage); 
    bees.velocityX = -(4+random(0,5));
    bees.velocityY = random (-5,5);
    bees.y = Math.round(random(100,400));
    bees.scale = 0.5
    bees.lifetime = 120;
   // bees.bounceOff(inviGround)
    beeG.add(bees)
     }
}

function rock(){
  if(frameCount % 200 === 0){
     var rocks = createSprite(450,300);
     rocks.addImage("rock",rockImage);
     rocks.velocityX = -4;
     rocks.scale = 0.3;
     rocks.lifetime = 120;
     rockG.add(rocks);
     }
}

function restart(){
  gameState = "play";
  blockG.destroyEach();
  rockG.destroyEach();
  coinG.destroyEach();
  beeG.destroyEach();
  invisiG.destroyEach();
  score = 0;
}
