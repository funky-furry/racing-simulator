class Game {
  constructor() {}

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();
  }
  update(state){
    database.ref("/").update({
      gameState: state
    });
  }
}
