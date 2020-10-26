var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","e713a824-78cf-423f-b5e9-1996d4fcc2ac","ac677b41-884c-43ed-a1d8-aa9d822840e1"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"AuI_JV8XveMIitFTanzZ8zC6yO_t0EMj","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"LcISey6BgsajHBMEGQ_wEoCiGCeQyzQZ","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":null,"frameSize":{"x":470,"y":364},"frameCount":1,"looping":true,"frameDelay":12,"version":"Jt0GIXZ9MOGLRsiEe.5ySNDUl8R6CLcn","loadedFromSource":true,"saved":true,"sourceSize":{"x":470,"y":364},"rootRelativePath":"assets/33841f90-7a53-4346-b956-e51d1961959b.png"},"e713a824-78cf-423f-b5e9-1996d4fcc2ac":{"name":"sky","sourceUrl":"assets/api/v1/animation-library/gamelab/84NrqToYiIzJG2xPvFfZnE.LnXJ.iUWx/category_backgrounds/park_view.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"84NrqToYiIzJG2xPvFfZnE.LnXJ.iUWx","loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/84NrqToYiIzJG2xPvFfZnE.LnXJ.iUWx/category_backgrounds/park_view.png"},"ac677b41-884c-43ed-a1d8-aa9d822840e1":{"name":"ground","sourceUrl":null,"frameSize":{"x":800,"y":20},"frameCount":1,"looping":true,"frameDelay":12,"version":"YQTOgmU519p2U3vyPVJD7MmLp2SpyGB4","loadedFromSource":true,"saved":true,"sourceSize":{"x":800,"y":20},"rootRelativePath":"assets/ac677b41-884c-43ed-a1d8-aa9d822840e1.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var ground = createSprite(200,360,400,30);
ground.setAnimation("ground");
ground.x = ground.width/2;
//ground.scale = 0.25; 
var monkey = createSprite(100,300,20,20);
monkey.setAnimation("monkey");
monkey.scale = 0.2;
monkey.velocityY = 0;
var stime = 0;
stroke("black");
textSize(20);
fill("black");

//initiate Game
var a = 1;


var ObstaclesGroup = createGroup();
var BananasGroup = createGroup();

var count = 0;

function draw() {
  
  background("white");
  ground.velocityX = -(1 + 1*count/100);
  count = count + Math.round(World.frameRate/60);
//    console.log (World.frameRate);

 if(a == 1){
    stones();
    bananas();
   }

 if (ground.x < 0){
      ground.x = ground.width/2;
   }

//stop monkey from falling down
 monkey.collide(ground);
 
//End the game when monkey is touching the obstacle
  if(ObstaclesGroup.isTouching(monkey)){
      a = 0;
      ground.velocityX = 0;
      ObstaclesGroup.setVelocityXEach(0);
      BananasGroup.setVelocityXEach(0);
      
//set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    BananasGroup.setLifetimeEach(-1);
    
  }

if(keyDown("space")){
      monkey.velocityY = -15 ;
    }

//add gravity
   monkey.velocityY =  monkey.velocityY + 1;
   
 if(a== 1){
   
//stime = stime + Math.ceil(World.frameCount/30); 
  stime = Math.ceil(World.frameCount/World.frameRate); 
 }

text("Survival Time: "+ stime, 100, 50);
 
drawSprites();  

}

function stones (){
if(World.frameCount%120===0){
var stone = createSprite(275,316,20,20);
stone.setAnimation("Stone");
stone.scale = 0.2;
stone.velocityX = -6;
//stone.x = randomNumber(30,400);
stone.lifetime = 150;
ObstaclesGroup.add(stone);
}  
}

function bananas (){
if(World.frameCount%80===0){
var banana = createSprite(275,328,20,20);
banana.setAnimation("Banana");
banana.scale = 0.08;
banana.velocityX = -6;
banana.y = randomNumber(100,150);
banana.lifetime = 100;
BananasGroup.add(banana);
}  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
