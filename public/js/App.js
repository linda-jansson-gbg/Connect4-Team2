import Router from './Router.js';
import EventHandler from './EventHandler.js';

export default class App {

  constructor() {
    this.eventHandler = new EventHandler();
    this.router = new Router(this);
    this.render();
  }

  render() {
    document.body.innerHTML = /*html*/`
      <section class="home__wrapper">
        <header>
          <h1 class="header__home">
            <a href="#">Home</a>
          </h1>
          <nav class="navbar">
            <a href="#rules">Rules</a>
            <a href="#highscore">Highscore</a>
            <a href="#game">Game</a>
          </nav>
        </header>
        <main></main>
      </section>
    `;
    this.router.render();
  }

}