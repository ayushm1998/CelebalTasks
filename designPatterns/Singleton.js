//Singleton

//Without Design
class demo {
    constructor() {
      this.demoVar = 'dummytext';
    }
  
    demoNew() {
      return this.demoVar;
    }
  }
  
  class Singleton {
    constructor() {
      throw new Error('Use the getInstance() method on the Singleton object!');
    }
  
    getInstance() {
      if (!Singleton.instance) {
        Singleton.instance = new demoNew();
      }
  
      return Singleton.instance;
    }
  }
  
  module.exports = Singleton;

  //With Design Patterns

  class demo {
    constructor() {
      this.demoVar = 'dummytext';
    }
  
    demoNew() {
      return this.demoVar;
    }
  }
  
  module.exports = new demo();