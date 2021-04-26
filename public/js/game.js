class Game {

  constructor(player1, player2) {
      console.log("Game created")
      this.board = new Board()
      this.players = this.createPlayers(player1, player2)
     // this.ready = false;                
  }

  /**
   * Creates two player objects
   * @return {Array} An array of two Player objects.
   */

  createPlayers(player1, player2) {
      // new players instantiated
      console.log('in player class')
      console.log(player1, player2)
      const players = [new Player(player1, 1, "#f4a5b8", true),
                       new Player(player2, 2, "#e8ea8b")]
      return players;

  }

  getActivePlayer(){
     return this.players.find(player => player.active)
  }

  switchPlayer(){
      for(const player of this.players){
          player.active = !player.active
      }
   }
}