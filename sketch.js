//Create variables here
var database;
var dog, dogImg, happyDog, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() 
{
  //creating canvas
  createCanvas(500, 500);
  //assigning firebase database to variable database
  database = firebase.database();
  //getting foodStock from the database
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  dog = createSprite(400,250);
  dog.addImage(dogImg);
  dog.scale = 0.3;
}


function draw() 
{  
  //creating background
  background(46, 139, 87);
  //add styles here
  fill(255);
  text("Food Remaining = " + foodS, 250, 30);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if(keyWentUp(UP_ARROW))
  {
    dog.addImage(dogImg);
  }
  //drawing sprites
  drawSprites();
}
//function to read values from database
function readStock(data)
{
  foodS = data.val();
}
//function to write valyes in database
function writeStock(x)
{
  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}



