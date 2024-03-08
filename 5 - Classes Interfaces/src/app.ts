interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn = (a: number, b: number) => a + b;

interface Named {
  readonly name: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age: number = 20;
  outputName?: string = 'Djes';

  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

let user1: Greetable = new Person('Dzoni');

user1.greet('Cao');
