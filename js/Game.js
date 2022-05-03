class Game {
  constructor() {}

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
  }

  handleElements() {
    form.hide();
    form.titleImg.position(width/2 - 150, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    Player.getInfosPlayer();
    this.handleElements();

    if(players != undefined) {
      image(track, 0, -height*5, width, height*6);
      var index = 0;
      
      for(var plr in players){
        var x = players[plr].positionX;
        var y = height - players[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;
        index = index + 1;

        if(player.index == index) {
          ellipse(x,y,60,60);
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
}
