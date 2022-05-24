class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.fuel = 185;
    this.life = 185;
    this.score = 0;
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
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
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
  
  update(){
    var ref = "players/player"+this.index;
    database.ref(ref).update({
      positionX: this.positionX,
      positionY: this.positionY,
      score: this.score,
      fuel: this.fuel,
      rank: this.rank,
      life: this.life,
    });
  }
  
  getDistance(){
    var playersRef = database.ref("players/player"+this.index);
    
    playersRef.on(
      "value", (data) => {
        var data = data.val();
        // console.log(data);
        this.positionX = data.positionX;
        this.positionY = data.positionY;
      }
    )
  }

  static getInfosPlayer() {
    var playersRef = database.ref("players");
    playersRef.on("value", (data) => {
      players = data.val();
    });
  }

  getCarsEnd() {
    database.ref("carsEnd").on("value", (data) => {
      this.rank = data.val();
    });
  }

  // funções estáticas não precisam que a gente crie um objeto da classe (instanciar a classe) para chamá-la
  // new Player();
  // Player.updateCarsEnd();
  static updateCarsEnd(number) {
    database.ref("/").update({
      carsEnd: number
    })
  }

 // Math.round() 
 // Player.getInfosPlayer();
}
