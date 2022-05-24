class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leaderTitle = createElement('h2');
    this.leader1 = createElement('h2');
    this.leader2 = createElement('h2');

    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }

  addSprites(groupGame, numSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numSprites; i ++) {
      var positionX;
      var positionY;

      if(positions.length > 0) {
        
        // obstáculos
        positionX = positions[i].x;
        positionY = positions[i].y;
        spriteImage = positions[i].image;
       
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
    console.log(player)
    car1 = createSprite(width/2-50, height-100);
    car1.addImage(car1Img);
    car1.addImage("blast", blast);
    car1.scale = 0.07;
    
    car2 = createSprite(width/2+100, height-100);
    car2.addImage(car2Img);
    car2.addImage("blast", blast);
    car2.scale = 0.07;

    cars = [car1, car2];
    coinGroup = new Group();
    gasGroup = new Group();
    junkGroup = new Group();

    this.addSprites(coinGroup, 18, coin, 0.09);
    this.addSprites(gasGroup,10,gas,0.02);

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: junk },
      { x: width / 2 - 150, y: height - 1300, image: junk2 },
      { x: width / 2 + 250, y: height - 1800, image: junk2 },
      { x: width / 2 - 180, y: height - 2300, image: junk },
      { x: width / 2, y: height - 2800, image: junk },
      { x: width / 2 - 180, y: height - 3300, image: junk2 },
      { x: width / 2 + 180, y: height - 3300, image: junk },
      { x: width / 2 + 250, y: height - 3800, image: junk },
      { x: width / 2 - 150, y: height - 4300, image: junk2 },
      { x: width / 2 + 250, y: height - 4800, image: junk },
      { x: width / 2, y: height - 5300, image: junk2 },
      { x: width / 2 - 180, y: height - 5500, image: junk },
    ];
    console.log(obstaclesPositions.length);
    this.addSprites(junkGroup, obstaclesPositions.length, junk, 0.02, obstaclesPositions);
  }
  
  handleFuel(index) {
    // callback 
    cars[index].overlap(gasGroup, (car, gas) => {
      player.fuel = 185;
      player.update();
      gas.remove();
    });

    if (this.playerMoving == true) {
      player.fuel -= 1;
      this.playerMoving = false;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
    
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
    player.getCarsEnd();

    var endGame = height * 6 - 100;

    if(player.positionY > endGame) {
      player.rank += 1;
      Player.updateCarsEnd(player.rank);
      player.update();
      gameState = 2;
    }

    if(players != undefined) {
      image(track, 0, -height*5, width, height*6);
      this.showLeaderboard();
      this.showGasBar();
      this.showLifeBar();

      var index = 0;
      
      for(var plr in players){
        var x = players[plr].positionX;
        var y = height - players[plr].positionY;
        var lyfe = players[plr].life;
        cars[index].position.x = x;
        cars[index].position.y = y;
        if (lyfe <= 0){
          cars[index].changeImage("blast");
          cars[index].scale = 0.3;
        }
        index = index + 1;
        // verificando se é o nosso jogador
        if(player.index == index) {
          if(player.life <= 0){
            // gameState = 2;
            this.blast = true;

          }
          fill("red");
          ellipse(x,y,60,60);
          this.handleCoin(index - 1);
          this.handleFuel(index - 1);
          this.handleObstacleCollision(index - 1);
          camera.position.y = cars[index - 1].position.y;
        }
      }
    }
    this.playerControl();
    drawSprites();
  }

  handleObstacleCollision(index){
    if(cars[index].collide(junkGroup)){
      if(player.life > 0){
        // boolean 
        if(this.leftKeyActive){
          player.positionX += 100;
        }else{
          player.positionX -= 100;
        }
        player.life -= 185/4;
        player.update();
      }
    }
  }

  playerControl(){
    if(!this.blast) {
      if(keyIsDown(38)){
        player.positionY += 10;
        player.update();
        this.playerMoving = true;
      }
      if(keyIsDown(37)){
        player.positionX -= 10;
        player.update();
        this.leftKeyActive = true;
      }
      if(keyIsDown(39)){
        player.positionX += 10;
        player.update();
        this.leftKeyActive = false;
        
      }
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
      database.ref("/").set({carsEnd: 0, playerCount: 0, gameState: 0, players: {}})
      window.location.reload();
    });
  }

  showGasBar() {
    push();
    fill("white");
    rect(player.positionX - 130, height - player.positionY - 100, 185, 20);
    fill("yellow");
    rect(
      player.positionX - 130,
      height - player.positionY - 100,
      player.fuel,
      20
    );
    pop();
    image(
      gas,
      player.positionX - 160,
      height - player.positionY - 100,
      20,
      20
    );
  }

  showLifeBar() {
    push();
    fill("white");
    rect(player.positionX - 130, height - player.positionY - 130, 185, 20);
    fill("red");
    rect(
      player.positionX - 130,
      height - player.positionY - 130,
      player.life,
      20
    );
    pop();
    image(
      life,
      player.positionX - 160,
      height - player.positionY - 130,
      20,
      20
    );
  }

  gameOver() {
    // sweetalert
    swal({
      title: `fim de jogo!`,
      text: "Oops! Você perdeu a corrida!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "obrigado por jogar!",
    });
  }
}
