export default class matrix {

  constructor(gamePage) {
    this.gamePage = gamePage;
    this.app = this.gamePage.app;

    // the matrix as a two-dimensional array
    // 0 = empty, 1 = player 1, 2 = player 2
    this.matrix = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];

    // current player (player who's turn it is)
    this.currentPlayerNo = 1;

    // register click event on matrix slots
    this.app.eventHandler.registerEvent(
      'click',
      '.board > div',
      e => this.makeMove(e)
    );
  }

  // sleep a number of ms inside async function
  sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

  async makeMove(e) {
    // get which slot (0-41) that is clicked
    let which = [...document.querySelectorAll('.board > div')].indexOf(
      e.target.closest('.board > div')
    );

    // calculate which column (0-6)
    let column = which % 7;

    // set the row to the top row
    let row = 0;

    // check if the column is full, then do nothing
    if (this.matrix[0][column] !== 0) { return; }

    // animate the move (let the brick fall)
    while (true) {
      this.matrix[row][column] = this.currentPlayerNo;
      this.app.render(); // update screen
      // as long as the row below is empty fall down
      if (this.matrix[row + 1] && this.matrix[row + 1][column] === 0 && row < 5) {
        this.matrix[row][column] = 0;
        row++;
        await this.sleep(100);
      }
      else { break; }
    }

    // change player
    this.currentPlayerNo = this.currentPlayerNo === 1 ? 2 : 1;
    this.app.render(); // update screen
  }

  render() {
    // note: flat flattens a two-dimensional array
    // to a one-dimensional
    return /*html*/`
      <p>${this.gamePage.playerNames[this.currentPlayerNo - 1]}'s turn...</p>
      <div class="board">
        ${this.matrix.flat().map(x => /*html*/`
          <div class="player-${x}"><div></div></div>
        `).join('')}
      </div>
    `
  }

}