interface addFn {
  (a: number, b: number): number;
}

let add: addFn;

add = (n1: number, n2: number) => n1 + n2;

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age: number = 20;

  constructor(n?: string) {
    if (n) this.name = n;
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase} ${this.name}`);
    } else console.log('hi');
  }
}

let user1: Greetable;

user1 = new Person();

user1.greet('Cao ja sam');
