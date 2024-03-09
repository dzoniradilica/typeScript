// const names: Array<string> = ['dzoni', 'nikola'];

// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('This is done')
//   }, 2000)
// })

// promise.then(data => {
//   data.split('')
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'dzoni' }, { age: 20 });

interface Lenghty {
  length: number;
}

function countAndPrint<T extends Lenghty>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  }

  if (element.length > 1) {
    descriptionText = `Got ${element.length} elements`;
  }

  return [element, descriptionText];
}

console.log(countAndPrint('Hi there'));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

extractAndConvert({ name: 'dzoni' }, 'name');

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Dzoni');
textStorage.addItem('nikola');
textStorage.removeItem('Dzoni');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
