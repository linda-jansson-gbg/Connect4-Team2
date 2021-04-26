class Board {
  constructor () {
    this.rows = 6
    this.columns = 7
    this.spaces = this.createSpaces()
  }

  /**
   * Generates 2D array of spaces.
   * @return {Array} An array of space objects
   */
  createSpaces () {
    const spaces = []
    for (let x = 0; x < this.rows; x++) {
      const columns = []

      const spaces = []
      for (let x = 0; x < this.rows; x++) {
        const columns = []
        for (let y = 0; y < this.columns; y++) {
          const space = new Space(x, y)
          columns.push(space)
        }
  
        spaces.push(columns)
      }

      // const div = document.querySelector('.game--board')
      // let gameBoardStr = ''
      // for (const spaceArray of spaces) {
      //   gameBoardStr = gameBoardStr.concat('<div>')
      //   for (const space of spaceArray) {
      //     gameBoardStr = gameBoardStr.concat(space.render())
      //   }
      //   gameBoardStr = gameBoardStr.concat('</div>')
      // }
      // div.innerHTML = gameBoardStr
  
      return spaces
    }

  columnIsFull(column){
      let counter = 0;
      for( let row = 0 ; row < this.rows ; row++ ){
          
          if( this.spaces[row][column].token!=null ){
              counter++;
          }
      }
      return (counter === this.rows)
  }

  addToken(column,token){
      //start from the bottom
      let index = this.rows-1 ;
      for(let row=0 ; row< this.rows ; row++){
          if(this.spaces[index-row][column].token==null){
           
              this.spaces[index-row][column].token=token
              return
          }
         
      for (let y = 0; y < this.columns; y++) {
        const space = new Space(x, y)
        columns.push(space)
      }

      spaces.push(columns)
    }

    const div = document.querySelector('.game--board')
    let gameBoardStr = ''
    for (const spaceArray of spaces) {
      gameBoardStr = gameBoardStr.concat('<div>')
      for (const space of spaceArray) {
        gameBoardStr = gameBoardStr.concat(space.render())
      }
      gameBoardStr = gameBoardStr.concat('</div>')
    }
    div.innerHTML = gameBoardStr

    return spaces
  }

  columnIsFull (column) {
    let counter = 0
    for (let row = 0; row < this.rows; row++) {
      if (this.spaces[row][column].token != null) {
        counter++
      }
    }
    return counter === this.rows
  }

  addToken (column, token) {
    //start from the bottom
    let index = this.rows - 1
    for (let row = 0; row < this.rows; row++) {
      if (this.spaces[index - row][column].token == null) {
        this.spaces[index - row][column].token = token
        return
      }
    }
  }
}

/*
class Board {
  constructor () {
    this.rows = 6
    this.columns = 7
    this.slots = this.createSlots()
    console.log(this.slots)
  }
  //  this.start();

  createSlots () {
    const slots = []
    for (let x = 0; x < this.rows; x++) {
      const columns = []

      for (let y = 0; y < this.columns; y++) {
        const slot = new Slot(x, y)
        columns.push(slot)
      }

      slots.push(columns)
    }
    const div = document.querySelector('.game--board')
    let gameBoardStr = ''
    for (const slotArray of slots) {
      gameBoardStr = gameBoardStr.concat('<div>')
      for (const slot of slotArray) {
        gameBoardStr = gameBoardStr.concat(slot.render())
      }
      gameBoardStr = gameBoardStr.concat('</div>')
    }
    div.innerHTML = gameBoardStr

    return slots
  }
}
/* -------------------------------------------------------------------------------------------------
 start() {
      // read the data from json
      let persons = await (await fetch('/json/persons.json')).json();
      // convert each person object to an instance of Person
      persons = persons.map(rawPersonData => new Person(rawPersonData));
      for (let person of persons) {
        let div = document.createElement('div');
        div.innerHTML = person.render();
        document.body.append(div);
      }
    } */
