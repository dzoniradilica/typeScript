// function Logger(logString: string) {
//   return function (constructor: Function) {
//     console.log(logString);
//     console.log(constructor);
//   };
// }

// function WithTemplate(template: string, hookId: string) {
//   return function <T extends { new (...args: any[]): { name: string } }>(
//     originalConstructor: T
//   ) {
//     return class extends originalConstructor {
//       constructor(..._: any[]) {
//         super();
//         const hookEl = document.getElementById(hookId)!;
//         hookEl.innerHTML = template;

//         hookEl.querySelector('h1')!.innerHTML = this.name;
//       }
//     };
//   };
// }

// @Logger('Person')
// @WithTemplate('<h1>Sidje</h1>', 'app')
// class Person {
//   name = 'dzoni';

//   constructor() {
//     console.log('radiiii');
//   }
// }

// const pers = new Person();

// console.log(pers);

// function Log(target: any, propName: string | Symbol) {
//   console.log('Prop decorator');
//   console.log(target, propName);
//   console.log('-----------------------');
// }

// function Log2<T>(
//   target: any,
//   name: string,
//   descriptor: TypedPropertyDescriptor<T>
// ) {
//   console.log('Accessor decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
//   console.log('-----------------------');
// }

// function Log3<T>(
//   target: any,
//   name: string,
//   descriptor: TypedPropertyDescriptor<T>
// ) {
//   console.log('Method decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(descriptor);
//   console.log('-----------------------');
// }

// function Log4(target: any, name: string, position: number) {
//   console.log('Parametar decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(position);
//   console.log('-----------------------');
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//     } else throw new Error('Invalid price');
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this._price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }

// const p1 = new Product('book', 20);
// const p2 = new Product('book2', 202);

// function AutoBind<T>(
//   _: any,
//   _2: string,
//   descriptor: TypedPropertyDescriptor<T>
// ) {
//   const originalMethod = descriptor.value as Function;

//   const adjDescriptor: TypedPropertyDescriptor<T> = {
//     configurable: true,
//     enumerable: false,

//     get() {
//       const boundFn = originalMethod.bind(this);
//       return boundFn;
//     },
//   };

//   return adjDescriptor;
// }

// class Printer {
//   message = 'This is works';

//   @AutoBind
//   showMessage() {
//     console.log(this.message);
//   }
// }

// const p = new Printer();

// document.querySelector('#click')!.addEventListener('click', p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[];
  };
}

const registraredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registraredValidators[target.constructor.name] = {
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any, propName: string) {
  registraredValidators[target.constructor.name] = {
    [propName]: ['positive'],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registraredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];

        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Coruse {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', e => {
  e.preventDefault();

  const titleEl = document.querySelector('#title')! as HTMLInputElement;
  const priceEl = document.querySelector('#price')! as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const course = new Coruse(title, price);

  if (!validate(course)) {
    alert('Invalid input');
    return;
  } else console.log(course);
});
