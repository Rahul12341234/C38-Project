var bee, ground, ObstacleGroup, AirObstacleGroup;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;

function setup() {
  createCanvas(600, 200);
  
  bee = createSprite(100 ,130, 15, 15);
  bee.scale = 1;
  bee.shapeColor = "yellow";
  
  ground = createSprite(600, 190, 1200, 20);
  ground.shapeColor = "green";
  
  ObstacleGroup = new Group();
  AirObstacleGroup = new Group();
  
  textSize(18);
  textFont("Georgia");
  stroke("orange");

}

function draw() {
  background("blue");
  
  bee.collide(ground);
  bee.velocityY = bee.velocityY + 0.6;
  
  if (gamestate === PLAY){
    
    score = Math.round(getFrameRate()/60) + score;
    
    if (keyDown("space") && bee.y >= 172.5){
    bee.velocityY = -13;
    }
    
    if (keyDown("down")){
    bee.velocityY = 10;
    }
    
    SpawnFly();
    SpawnGrass();
        
    if (ObstacleGroup.isTouching(bee) || AirObstacleGroup.isTouching(bee)){
      gamestate = END;
    }
  }
  else if(gamestate === END){
    ObstacleGroup.setVelocityXEach(0);
    
    textSize(17); 
    textFont("Timesnewroman");
    text("GAME OVER, HOLD THE DOWN KEY TO GLIDE", 110, 100);
    text("WHEN JUMPING", 230, 120); 
  
  }
  
  text("Score: " + score, 500, 30);
  
  drawSprites();
}

function SpawnFly(){
  if (World.frameCount %20 === 0){
    var Fly = createSprite(600, 30, 20, 20);
    Fly.shapeColor = "black";
    AirObstacleGroup.add(Fly);
    Fly.velocityX = -15;
  }
}

function SpawnGrass(){
  if (World.frameCount %30 === 0){
    var obstacle = createSprite(600, 160, 20, 50);
    ObstacleGroup.add(obstacle);
    obstacle.shapeColor = "green";
    obstacle.velocityX = -15;
  }
}