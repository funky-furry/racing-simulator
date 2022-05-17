class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderTitle = createElement('h2');
    this.leader1 = createElement('h2');
    this.leader2 = createElement('h2');
  }

  addSprites(groupGame, numSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numSprites; i ++) {
      var positionX;
      var positionY;
      if(positions > 0) {
        // obstáculos
      } else {
        positionX = Math.round(random(width /2 + 150, width /2 - 150));
        positionY = Math.round(random(-height * 4.5, height - 400 ));
      }
  
      var sprite = createSprite(positionX, positionY);
      sprite.addImage(spriteImage);
      sprite.scale = scale;
      groupGame.add(sprite);
    }
  }

  showLeaderboard() {
    var leader1, leader2;
    var player = Object.values(players);
    if (
      (player[0].rank === 0 && player[1].rank === 0) ||
      player[0].rank === 1
    ) {
      // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
      leader1 =
        player[0].rank +
        "&emsp;" +
        player[0].name +
        "&emsp;" +
        player[0].score;

      leader2 =
        player[1].rank +
        "&emsp;" +
        player[1].name +
        "&emsp;" +
        player[1].score;
    }

    if (player[1].rank === 1) {
      leader1 =
        player[1].rank +
        "&emsp;" +
        player[1].name +
        "&emsp;" +
        player[1].score;

      leader2 =
        player[0].rank +
        "&emsp;" +
        player[0].name +
        "&emsp;" +
        player[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();

    car1 = createSprite(width/2-50, height-100);
    car1.addImage(car1Img);
    car1.scale = 0.07;
    
    car2 = createSprite(width/2+100, height-100);
    car2.addImage(car2Img);
    car2.scale = 0.07;

    cars = [car1, car2];
    coinGroup = new Group();
    gasGroup = new Group();
    this.addSprites(coinGroup, 18, coin, 0.09);
    this.addSprites(gasGroup,10,gas,0.02);
  }
  
  handleFuel(index) {
    // callback 
    cars[index].overlap(gasGroup, (car, gas) => {
      player.fuel += 20;
      player.update();
      gas.remove();
    });
  }

  handleCoin(index) {
    // callback 
    cars[index].overlap(coinGroup, (car, coin) => {
      player.score += 5;
      player.update();
      coin.remove();
    });
  }
  handleElements() {
    form.hide();
    form.titleImg.position(width/2 - 150, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.position(width/2 + 350, 40);
    this.resetTitle.html("reiniciar corrida");
    this.resetTitle.class("resetTitle");
    this.resetButton.position(width/2 + 425, 100);
    this.resetButton.class("resetButton");

    this.leaderTitle.position(width/18, 40);
    this.leaderTitle.html('placar');
    this.leaderTitle.class('resetTitle');

    this.leader1.position(width/18, 80);
    this.leader1.html('leader1');
    this.leader1.class('leadersText');
    this.leader2.position(width/18, 130);
    this.leader2.html('leader2');
    this.leader2.class('leadersText');
  }

  play() {
    Player.getInfosPlayer();
    this.handleElements();
    this.handleResetButton();

    if(players != undefined) {
      this.showLeaderboard();
      image(track, 0, -height*5, width, height*6);
      var index = 0;
      
      for(var plr in players){
        var x = players[plr].positionX;
        var y = height - players[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;
        index = index + 1;
        // verificando se é o nosso jogador
        if(player.index == index) {
          fill("red");
          ellipse(x,y,60,60);
          this.handleCoin(index - 1);
          this.handleFuel(index - 1);
          camera.position.y = cars[index - 1].position.y;
        }
      }
    }
    this.playerControl();
    drawSprites();
  }

  playerControl(){
    if(keyIsDown(38)){
      player.positionY += 10;
      player.update();
    }
    if(keyIsDown(37)){
      player.positionX -= 10;
      player.update();
    }
    if(keyIsDown(39)){
      player.positionX += 10;
      player.update();
    }
  }

  update(state){
    database.ref("/").update({
      gameState: state
    });
  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on('value', function (data) {
      gameState = data.val();
    })
  }

  handleResetButton() {
    this.resetButton.mousePressed(function(){
      database.ref("/").set({playerCount: 0, gameState: 0, players: {}})
      window.location.reload();
    });
  }
}
