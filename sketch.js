var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var players;
var track; 
var gameState;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  track = loadImage("./assets/track.jpg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount == 2){
    game.update(1);
  }
  if(gameState == 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


