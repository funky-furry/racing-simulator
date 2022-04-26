class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
  }

  play() {
    image(track, 0, -height*5, width, height*6);

    drawSprites();
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
