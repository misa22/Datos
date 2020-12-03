class cola {
    constructor() {
      this.cola = [];
    }
  
    agregar(element) {
      this.cola.push(element);
      return this.cola;
    }
  
    sacar() {
      return this.cola.shift();
    }
  
    peek() {
      return this.cola[0];
    }
  
    size() {
      return this.cola.length;
    }
  
    isEmpty() {
      return this.cola.length === 0;
    }
  
    print() {
      return this.queue;
    }
  }
  
  const queue = new Queue();
  console.log(queue.enqueue('misael')); 
  console.log(queue.enqueue('Solano')); 
  console.log(queue.enqueue('var'));
  console.log(queue.dequeue()); 
  console.log(queue.peek()); 
  console.log(queue.isEmpty()); 
  console.log(queue.print()); 