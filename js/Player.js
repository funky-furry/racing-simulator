class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
  }
  /** players {
     *  player1 {
     * 
     * }
     *  player2 {}
   * } */
  addPlayer() {
    var playerRef = "players/player"+ player.index;
    if(player.index == 1) {
      this.positionX = width/2 - 100;
    } else {
      this.positionX = width/2 + 100;
    }

    database.ref(playerRef).set({
      name: this.name,
      positionX: this.positionX,
      positionY:  this.positionY,
    });
  }

  getCount() {
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on('value', function (data) {
      playerCount = data.val();
    })
  }

  updateCount(number) {
    database.ref("/").update({
      playerCount: number
    });
  }

  static getInfosPlayer() {
    var playersRef = database.ref("players");
    playersRef.on("value", function (data) {
      players = data.val();
    });
  }

 // Math.round() 
 // Player.getInfosPlayer();
}
