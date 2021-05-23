

var pony,obc1Image,obc2image,obc3Image,groundImage,ponyImg,ground;
var invisiblebg,coinsImg,ponyStuckImg;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score =0;
var gameover , reset ,resetImg , gameoverImg;

function preload(){
  

groundImage = loadImage("bg1.jpg");
  
 obc1Image = loadImage("obstacle1.png");  
 obc2Image = loadImage("obstacle2.png"); 
 obc3Image = loadImage("obstacle3.png");  
  ponyImg = loadAnimation("pony1.png","pony2.png");
  coinsImg = loadImage("point.png");
  boosterImg = loadImage("boosterpoint.png");
  ponyStuckImg=loadAnimation("pony1.png");
  resetImg = loadImage("reaset.png");
  gameoverImg = loadImage("gameOver.jpg");
}

function setup(){ 
  createCanvas(1800,700);
  

  ground = createSprite(350,300,700,600);
  ground.addImage("ground",groundImage);
  ground.scale=2;
  ground.velocityX=-6;
  ground.x=ground.width/2;
  
  
  pony = createSprite(60,460);
  pony.addAnimation("running",ponyImg);
  pony.addAnimation("stuck",ponyStuckImg);
  pony.scale= 0.3;


  invisiblebg = createSprite(350,530,700,10);
  invisiblebg.visible=false;
  

  candyGroup = new Group();
  

  boosterGroup = new Group();
  

  coinsGroup = new Group();
  

  pony.debug=false;
  pony.setCollider("rectangle",0,0,350,400);
  

    gameover = createSprite(900,350);
    gameover.addImage(gameoverImg);
   gameover.scale = 0.5;
  
    reset = createSprite(1200,350);
    reset.addImage(resetImg);
   reset.scale = 0.3;
}

function draw(){
  background(220);
  
if(gameState===PLAY){
  
  if(ground.x<350){
    ground.x=500;
  }
  
  if(keyDown("space") && pony.y>250){
    pony.velocityY=-10;
  }
  
  pony.velocityY=pony.velocityY+0.8;
  
  spawnCandy(); 
  spawnCoins();
  
   if(boosterGroup.isTouching(pony)){
    score=score+50;
    boosterGroup.destroyEach();
  }

   if(candyGroup.isTouching(pony)){
    gameState=END;
} 
  
  if(coinsGroup.isTouching(pony))
    {
      score = score + 5;
      coinsGroup.destroyEach();
    }
  
  gameover.visible= false;
  reset.visible = false;

}
  else if(gameState===END){

   ground.velocityX = 0; 

  pony.velocityY = 0;
  pony.changeAnimation("stuck",ponyStuckImg); 

   coinsGroup.setVelocityXEach(0);

    candyGroup.setVelocityXEach(0);
    
    boosterGroup.setVelocityXEach(0);
    

    coinsGroup.setLifetimeEach(-1);
    candyGroup.setLifetimeEach(-1);
    boosterGroup.setLifetimeEach(-1);

   gameover.visible= true;
  reset.visible = true;

    if(mousePressedOver(reset)){
      resetGame(); 
      
       }
    
  
 }
  pony.collide(invisiblebg);
  

  

  drawSprites();
  stroke("yellow")
  strokeWeight(4);
  fill("#FFB6C7");
  textSize(20);
  text("Score : " + score,700,30);
  
  
}


function spawnCandy(){
  

  if(frameCount%120===0){
    var candy = createSprite(880,495,30,50);
  candy.velocityX=-6;
    candy.scale=0.3;
    candy.debug=false;
    
  
    var rndm = Math.round(random(1,2));
    switch(rndm){
        
      case 1: candy.addImage(obc2Image);
        break;
        
      case 2 : candy.addImage(obc3Image)
               candy.setCollider("rectangle",0,0,250,200);
        break;
       
      default : break;
    }
    
    candy.lifetime=300;
    
    candyGroup.add(candy);
  } 
  
}


function spawnCoins(){

    if(frameCount%180===0){
    var coins = createSprite(900,295,30,50);
  coins.velocityX=-6;
    coins.scale=0.3;
      coins.addImage(coinsImg);
      coins.debug = false;
      coins.setCollider("rectangle",0,0,150,180);

      coins.lifetime=300;

      coinsGroup.add(coins);
    }
}

function resetGame(){
  
   gameState=PLAY;
   gameover.visible= false;
  reset.visible = false;
  
  candyGroup.destroyEach();
  coinsGroup.destroyEach();
  

   pony.changeAnimation("running",ponyImg);
  
  ground.velocityX=-6;
  
  score = 0;
}

function spawnBooster(){

  if(frameCount%10===0){
    var booster = createSprite(600,295,30,50);
      booster.velocityX=-3;
    booster.scale=0.3;
      booster.addImage(boosterImg);
      booster.debug=false
    booster.setCollider("rectangle",0,0,240,240);  
          booster.lifetime=300;
      
          
     boosterGroup.add(booster);
  }



}