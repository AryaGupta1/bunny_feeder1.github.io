//const matterMin = require("./matter.min");

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,rope2,rope3,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var bk_song, cut_sound, sad_sound, eating_sound, air;
var blower, balloon;
var mute_btn;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bk_song = loadSound("sound1.mp3");
  sad_sound = loadSound("sad.wav");
  cut_sound = loadSound("rope_cut.mp3");
  eating_sound = loadSound("eating_sound.mp3");
  air = loadSound ("air.wav");
  ballo0n = loadImage("balloon.png");

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

}

function setup() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
     canW = displayWidth;
     canH = displayHeight;
     createCanvas(displayWidth+80,displayHeight);
  }
  else{
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth,displayHeight);
  }
  //createCanvas(500,700);
  frameRate(80);

    //bk_song.play();
    bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(300,30);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(350,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);
  
  /*blower = createImg('balloon.png');
  blower.position(10,230);
  blower.size(150,150);
  blower.mouseClicked(airblow);*/

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(200,canH-80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  rope = new Rope(7,{x:40,y:30});
  rope2 = new Rope(7,{x:330,y:40});
  rope3 = new Rope(7,{x:370,y:220});
  ground = new Ground(200,canH,600,20);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  fruit_con_3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);
  push();
  imageMode(CENTER);
  pop();

  if(fruit != null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  if(collide(fruit, bunny) === true){
    bunny.changeAnimation("eating", eat);
    eating_sound.play();
  }
   if( collide(fruit, ground.body) === true){
    bunny.changeAnimation("crying", sad);
    bk_song.stop();
    sad_sound.play();
   }

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();

   drawSprites();
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}
function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
}

function collide(body, sprite) {
 if(body != null){
   var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
   if(d <= 80){
    World.remove(engine.world,fruit);
    fruit = null;
    return true;
   }
   else{
    return false;
   }
 }
}

/*function airblow(){
 Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})
}*/

function mute(){
  if(bk_song.isPlaying()){
    bk_song.stop();
  }
  else{
    bk_song.play();
  }
}
