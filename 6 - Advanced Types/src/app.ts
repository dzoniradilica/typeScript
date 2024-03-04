type Admin = {
  name: string;
  peivalges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevateEmployee = Admin & Employee;

const e1: ElevateEmployee = {
  name: 'Dzoni',
  peivalges: ['Create-Server'],
  startDate: new Date(),
};

type Combine = string | number;
type Numeric = number | boolean;

type Universal = Combine & Numeric;

function add(n1: number, n2: number): number;
function add(n1: string, n2: string): string;
function add(n1: Combine, n2: Combine) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }

  return n1 + n2;
}

const result = add('Dzoni', 'Savic');

const fetchUserData = {
  id: 'ul',
  name: 'dzoni',
  //   job: { title: 'programer', description: 'Sta znam' },
};

console.log(fetchUserData?.job?.title);

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(`name: ${emp.name}`);

  if ('privilages' in emp) {
    console.log(`Privilages: ${emp.privilages}`);
  }

  if ('startDate' in emp) console.log(`Start date: ${emp.startDate}`);
}

printEmployeeInfo({ name: 'dzoni', startDate: new Date() });

class Car {
  drive() {
    console.log('Driving');
  }
}

class Truck {
  drive() {
    console.log('Driving truck');
  }

  loadCargo(amount: number) {
    console.log(`Loading cargo ${amount}`);
  }
}

type Vecihle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVecihle(vecihle: Vecihle) {
  vecihle.drive();

  if (vecihle instanceof Truck) vecihle.loadCargo(1000);
}

useVecihle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;

  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }

  console.log(`Moving with: ${speed}`);
}

moveAnimal({ type: 'horse', runningSpeed: 10 });

// const userInput = <HTMLInputElement> document.querySelector('#userInput');
const userInput = document.querySelector('#userInput')! as HTMLInputElement;

userInput.value = 'Hi there';

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!',
};
