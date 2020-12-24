//Create variables here
var sdog;
var dog,database,happyDog,foodS,foodStock;
var foodStock;
var feedButton,addButton;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dog=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(800, 600);
  sdog=createSprite(650,150,20,20);
  sdog.addImage(dog);
  sdog.scale=0.25;

  database=firebase.database();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  feedButton=createButton("To feed the dog, click here");
  feedButton.position(600,80);
  feedButton.mousePressed(feedDog);
  addButton=createButton("To add more milk, click here");
  addButton.position(800,80);
  addButton.mousePressed(addFood);

  foodObj=new Food();
}


function draw() {  
  background(46, 139, 87);

  fedTime=database.ref("feedTime");
  fedTime.on("value",(data)=>{
    lastFed=data.val();
  });

  if(lastFed>12){
    textSize(25);
    fill("yellow");
    text("Last fed time: "+ (lastFed%12) + " PM",400,450);
  }
  else if(lastFed===12){
    textSize(25);
    fill("yellow");
    text("Last fed time: "+ "12 PM",400,450);
  }
  else if(lastFed===0){
    textSize(25);
    fill("yellow");
    text("Last fed time: "+ "12 AM",400,450);
  }
  else{
    textSize(25);
    fill("yellow");
    text("Last fed time: "+ lastFed + " AM",400,450);
  }

  drawSprites();
  //add styles here
  textSize(25);
  fill("blue");
  text("STOCK:"+ foodS,450,500);
  
  if(foodS===0){
    fill("red");
    text("PLEASE REFILL!",150,100);
    sdog.addImage(dog);
    sdog.x=650;
  }
  foodObj.display();
}


function readStock(data){
   foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}

function feedDog(){
  sdog.addImage(happyDog);
  sdog.x=420;
  foodObj.updatefoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    food:foodObj.getfoodStock(),
    feedTime:hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}



