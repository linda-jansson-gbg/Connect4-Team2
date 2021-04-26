class Game {
  constructor () {
    console.log('Game created')
    this.board = new Board()
    this.players = this.createPlayers()
    // this.ready = false;
  }

  /**
   * Creates two player objects
   * @return {Array} An array of two Player objects.
   */

  createPlayers () {
    // new players instantiated
    console.log('in player class')

    let player1 = document.querySelector('#player1').value
    let player2 = document.querySelector('#player2').value

    console.log(player1)
    console.log(player2)

    const players = [
      new Player(player1, 1, '#e15258', true),
      new Player(player2, 2, '#e59a13')
    ]
    return players
  }

  getActivePlayer () {
    return this.players.find(player => player.active)
  }

  switchPlayer () {
    for (const player of this.players) {
      player.active = !player.active
    }
  }
}
