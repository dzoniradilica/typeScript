type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Dzoni',
  privilages: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(n1: number, n2: number): number;
function add(n1: string, n2: string): string;
function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }

  return n1 + n2;
}

const result = add('Nikola', ' Savic');
console.log(result);

const fetchedUserData = {
  id: 'u1',
  name: 'Dzoni',
  job: { title: 'CEO', description: 'My company' },
};

console.log(fetchedUserData?.job?.title);

const userInput = null;

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log(`Name: ${emp.name}`);

//   if ('privilages' in emp) {
//     console.log(`Privilages: ${emp.privilages}`);
//   }

//   if ('startDate' in emp) {
//     console.log(`Start date: ${emp.startDate}`);
//   }
// }

// printEmployeeInformation(e1);

// class Car {
//   drive() {
//     console.log('Driving');
//   }
// }

// class Truck {
//   drive() {
//     console.log('Driving truck');
//   }

//   loadCargo(amount: number) {
//     console.log(`Loading cargo...${amount}`);
//   }
// }

// type Vecihle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVecihle(vecihle: Vecihle) {
//   vecihle.drive();

//   if (vecihle instanceof Truck) {
//     vecihle.loadCargo(200);
//   }
// }

// useVecihle(v1);
// useVecihle(v2);

// interface Bird {
//   type: 'bird';
//   flyingSpeed: number;
// }

// interface Horse {
//   type: 'horse';
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   if (animal.type === 'bird')
//     console.log(`Bird speed is ${animal.flyingSpeed}`);

//   if (animal.type === 'horse')
//     console.log(`Horse speed is ${animal.runningSpeed}`);
// }

// moveAnimal({ type: 'bird', flyingSpeed: 200 });

// const userInput = document.querySelector('#userInput')! as HTMLInputElement;

// userInput.value = 'Djes';

// interface ErrorContainer {
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: 'Not a valid email',
//   username: 'Must start with a capital character',
// };
