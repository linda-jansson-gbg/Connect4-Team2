import StartPage from './StartPage.js';
import GamePage from './GamePage.js';
import HighScorePage from './HighScorePage.js';
import RulesPage from './RulesPage.js';
import NotFoundPage from './NotFoundPage.js';

export default class Router {

  // the router uses the onhashchange event
  // to show different views from different classes
  // depending on the hash portion of the url

  constructor(app) {
    this.routes = {
      '#': new StartPage(app),
      '#game': new GamePage(app),
      '#rules': new RulesPage(app),
      '#highscore': new HighScorePage(app),
      '404': new NotFoundPage(app)
    }
    window.onhashchange = () => this.render();
  }

  render() {
    let route = this.routes[location.hash || '#'];
    route = route || this.routes['404'];
    let htmlHolder = document.createElement('div');
    htmlHolder.innerHTML = route.render();
    document.querySelector('main')
      .replaceWith(htmlHolder.querySelector('main'));
  }

}