
var ground ,trex_running, invisibleground,trex,ground1;
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
  invisibleground=createSprite(200,180,400,20);
  invisibleground.visible=false;
  //crie um sprite de trex
 
}

function draw(){
  background("grey");
  if(keyDown("space") &&trex.y>=100){
    trex.velocityY=-10;
  }
  trex.velocityY=0.8;
  if(ground.x==0){
    ground.x=ground.width/2;
  }
  trex.collide(invisibleground);
  spawnClouds();
  obstacleCourse();
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
  }
}

function obstacleCourse(){
  if(frameCount%120===0){
    var obstacle=createSprite(400,165,10,40);
    obstacle.x=-6;

    var randomNUM=Math.round(random(1,9)); 
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
  }
}


