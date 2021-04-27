export default class EventHandler {

  constructor() {
    this.listeners = [];
    let eventTypes = [
      'click',
      'submit',
      'change',
      'keyup'
    ];
    for (let eventType of eventTypes) {
      document.body.addEventListener(eventType, event => {
        for (let { eventType, cssSelector, func } of this.listeners) {
          if (
            event.target.closest(cssSelector)
            && event.type == eventType
          ) { func(event); }
        }
      });
    }
  }

  // to register an event simply send eventType, 
  // cssSelector and function to run to registerEvent
  // se GamePage for an example
  registerEvent(eventType, cssSelector, func) {
    this.listeners.push({ eventType, cssSelector, func });
  }

}