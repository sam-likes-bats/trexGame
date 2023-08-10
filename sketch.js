var game=play;
var score=0;
var play,end;
var restart,gameOver,restartImg,gameOverImg;
var ground ,trex_running, invisibleground,trex,ground1,collided;
var cloudImage,cloud;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground1=loadImage("ground2.png");
  cloudImage=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restartImg=loadImage("restart.png");
  gameOverImg=loadImage("gameOver.png");
  collided=loadImage("trex_collided.png");

}

function setup(){
  createCanvas(600,200);

  ground=createSprite(200,170,400,20);
  ground.x=ground.width/2;
  ground.velocityX=-4;
  ground.addImage("ground",ground1);

  trex=createSprite(50,180,20,50);
  trex.addAnimation("trex",trex_running);
  trex.scale=0.5;

  restart.createSprite(300,140);
  restart.addImage("restart",restartImg);

  gameOver.createSprite(300,10);
  gameOver.addImage("gameOver",gameOverImg);

  gameOver.scale=0.5;
  restart.scale=0.5;

  invisibleground=createSprite(200,180,400,20);
  invisibleground.visible=false;

  obstacleGroup=createGroup();
  cloudsGroup=createGroup();

}

function draw(){
  background("grey");

  text("score: "+score,500,50);

  if (game===play){
    gameOver.visible=false;
    restart.visible=false;
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    if (ground.x < 0){ ground.x = ground.width/2; }
    if(keyDown("space")&& trex.y >= 100) { trex.velocityY = -12; }
    trex.velocityY = trex.velocityY + 0.8;
    
    
    spawnClouds();
    obstacleCourse();    


  }

  if(obstacleGroup.isTouching(trex)){
    game==end;
  }

  else if(game===end){
    gameOver.visible=true;
    restart.visible=true;

    trex.velocityY=0;
    ground.velocityX=0;

    trex.changeAnimation(collided);

    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);

    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

  }


  

  trex.collide(invisibleground);


  drawSprites();
}

function spawnClouds(){
  if (frameCount%60===0){
    cloud=createSprite(600,100,40,10);
    cloud.addImage("cloud",cloudImage);
    cloud.y=Math.round(random(10,60));
    cloud.scale=0.5;
    cloud.velocityX=-2;
    cloud.lifetime=200;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudsGroup.add(cloud);
  }
}

function obstacleCourse(){
  if(frameCount%60===0){
    var obstacle=createSprite(600,165,10,40);
    obstacle.velocityX=-6;

    var randomNUM=Math.round(random(1,6)); 
    switch (randomNUM) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default: break;
    }
    obstacle.lifetime=300;
    obstacle.scale=0.5;
    obstacleGroup.add(obstacle);
  }
}
