import Board from './Board.js';

export default class GamePage {

  constructor(app) {
    this.app = app;
    this.playerNames = [];
    this.board = new Board(this);

    this.app.eventHandler.registerEvent(
      'submit',
      '.enter-names-form',
      e => this.namesFormSubmit(e)
    );
  }

  namesFormSubmit(e) {
    e.preventDefault();
    this.playerNames.push(
      document.querySelector('input[name="player1name"]').value
    );
    this.playerNames.push(
      document.querySelector('input[name="player2name"]').value
    );
    // always re-render any change 
    // by calling this.app.render()
    this.app.render();
  }

  render() {
    return /*html*/`
      <main class="home__main">
        <h1>Game</h1>
        ${this.playerNames.length < 2 ? /*html*/`
          <form class="enter-names-form">
            Enter names:
            <div><input name="player1name" type="text" placeholder="Player 1"></div>
            <div><input name="player2name" type="text" placeholder="Player 2"></div>
            <div><input type="submit" value="Start"></div>
          </form>
        ` : /*html*/`
          ${this.board.render()}
        `}
      </main>
    `
  }

}