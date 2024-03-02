// const person: {
//   name: string;
//   age: number;
// }
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'Nikola',
//   age: 20,
//   hobbies: ['sports', 'fishing'],
//   role: [2, 'author'],
// };

enum Role {
  ADMIN = 5,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: 'Nikola',
  age: 20,
  hobbies: ['sports', 'fishing'],
  role: Role.ADMIN,
};

let favActivites: string[];
favActivites = ['sport'];

if (person.role === Role.ADMIN) console.log('is admin');
