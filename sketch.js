var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var players; 

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount == 2){
    game.update(1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


