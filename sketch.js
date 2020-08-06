var bee, ground, ObstacleGroup, AirObstacleGroup;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;

var text1;

var ending1;
var ending2;

function setup() {
  createCanvas(displayWidth, displayHeight - 73);
  
  bee = createSprite(10, displayHeight - 60, 15, 15);
  bee.shapeColor = "yellow";
  
  ground = createSprite(0, displayHeight - 60, displayWidth * 2, 80 );
  ground.shapeColor = "green";

  ObstacleGroup = new Group();
  AirObstacleGroup = new Group();

  text1 = createElement('h4');
  ending1 = createElement('h4')
  ending2 = createElement('h4');
}

function draw() {
  background("blue");
  console.log(bee.y);
  bee.collide(ground);
  bee.velocityY =+ 0.6;
  bee.velocityX = 10;
  ground.velocityX = 10;
  camera.position.x = bee.x;
  text1.html("Score: " + score)
  text1.position(displayWidth - 100, 30);
  
  if (gamestate === PLAY){ 
    score = Math.round(getFrameRate()/60) + score;

    if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
    if (keyDown("space") && bee.y >= 660){
    bee.velocityY = -300;
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
    ending1.html("GAME OVER, HOLD THE DOWN KEY TO GLIDE")
    ending1.position(displayWidth/2 - 200, displayHeight/2);
    ending2.html("WHEN JUMPING")
    ending2.position(displayWidth/2 - 100, displayHeight/2 + 20);
  }
  
  
  drawSprites();
}

function SpawnFly(){
  if (World.frameCount %10 === 0){
    var Fly = createSprite(bee.x + displayWidth/2, displayHeight - 275, 20, 20);
    Fly.shapeColor = "black";
    AirObstacleGroup.add(Fly);
  }
}

function SpawnGrass(){
  if (World.frameCount %15 === 0){
    var obstacle = createSprite(bee.x + displayWidth/2, displayHeight - 125, 20, 50);
    ObstacleGroup.add(obstacle);
    obstacle.shapeColor = "green";
  }
}