function Logger(logString: string) {
  return function (_: any) {
    console.log(logString);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.querySelector(`#${hookId}`);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('Logging - Person')
@WithTemplate('<h1>My person object <h1>', 'app')
class Person {
  name = 'dzoni';

  constructor() {
    console.log('Creating person object ...');
  }
}

const pers = new Person();
console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
  console.log('Propery decorator');
  console.log(target, propertyName);
}

function Log2<T>(
  target: any,
  name: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  console.log('Accsesor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3<T>(
  target: any,
  name: string | Symbol,
  descriptor: TypedPropertyDescriptor<T>
) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, postition: number) {
  console.log('Parametar decorator');
  console.log(target);
  console.log(name);
  console.log(postition);
}

class Prodcut {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else throw new Error('Valu has to be postive');
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Prodcut('Book', 20);

function AutoBind<T extends Function>(
  _: any,
  _2: string,
  descriptor: TypedPropertyDescriptor<T>
) {
  const originalMethod: Function = descriptor.value!;
  const adjDescriptor: TypedPropertyDescriptor<T> = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button')!;

button.addEventListener('click', p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatebleProp: string]: string[];
  };
}

const registeredValidators: ValidatorConfig = {};

function RequiredText(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'],
  };
  console.log(registeredValidators[target.constructor.name]);
}

function Validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }

  return isValid;
}

class Course {
  @RequiredText
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form');

courseForm?.addEventListener('submit', e => {
  e.preventDefault();

  const titleEl = document.querySelector('#title') as HTMLInputElement;
  const priceEl = document.querySelector('#price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!Validate(createdCourse)) {
    alert('Invalid input, pls try again!');
    return;
  }

  console.log(createdCourse);
});
