// const names: Array<string> = ['dzoni']

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('opic')
//     }, 1000)
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: 'nikola', hobbies: ['opic'] }, { age: 20 });

interface lengthy {
  length: number;
}

function countAndPrint<T extends lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value';
  if (element.length === 1) {
    descriptionText = `Got 1 elements`;
  }

  if (element.length > 1) descriptionText = `Got ${element.length} elements`;
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

class DataStorage<T extends string | number | boolean> {
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
textStorage.addItem('dzoni');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

interface CourseGoal {
  title: string;
  description: string;
  complateUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.complateUntil = date;

  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['max', 'dzoni'];
