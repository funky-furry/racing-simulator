class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Digite seu nome");
    this.playButton = createButton("Jogar");
    this.titleImg = createImg("./assets/TITULO.png", "nome do jogo");
    this.greeting = createElement("h2");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }
  
  display(){
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
  
  setElementsPosition(){
    this.input.position(width/2 - 110, height / 2 - 80);
    this.titleImg.position(120,50);
    this.playButton.position(width / 2 - 90, height/ 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  }

  setElementsStyle() {
    this.input.class("customInput");
    this.titleImg.class("gameTitle");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  handleMousePressed(){
    this.playButton.mousePressed(() => {
      this.playButton.hide();
      this.input.hide();
      var message = `Olá, ${this.input.value()} <br> espere o próximo jogador...`;
      this.greeting.html(message);
      playerCount ++;
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      player.getDistance();
    });
  }

}
