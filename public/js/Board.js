import Slot from './Slot.js'

export default class Board {

        constructor(){
            this.rows = 6;
            this.columns = 7;
            this.slots = this.createSlots();
            console.log(this.slots);
        }
    //  this.start();
  
    createSlots() {
        const slots = [];
        for (let x = 0; x < this.rows; x++){
            const columns = []
          
            for (let y = 0; y < this.columns; y++){
                const slot= new Slot(x,y);
                columns.push(slot);
            }

            slots.push(columns);
        }
        
        for (let slot of slots) {
            let div = document.querySelector('game--board');
            div.innerHTML = slot.render();
            document.body.append(div);
          }
  
        return slots;
    }

   
        
}


    /* start() {
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
  