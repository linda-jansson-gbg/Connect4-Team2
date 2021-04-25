import Board from './Board.js'


export default class Slot {
    
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.id = `slot-${x}-${y}`;
        this.token = null;
    }

    render() {
        return `
          <div class="slot"></div>
        `;
      }
}