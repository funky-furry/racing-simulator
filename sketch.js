var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var players;
var track; 
var gameState;
var car1, car2, cars;
var coin;
var gas;
var coinGroup;
var gasGroup;

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  track = loadImage("./assets/track.jpg");
  car1Img = loadImage('./assets/car1.png');
  car2Img = loadImage('./assets/car2.png');
  coin = loadImage("./assets/goldCoin.png");
  gas = loadImage("./assets/fuel.png");
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


