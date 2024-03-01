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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 5] = "ADMIN";
    Role[Role["READ_ONLY"] = 6] = "READ_ONLY";
    Role[Role["AUTHOR"] = 7] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: 'Nikola',
    age: 20,
    hobbies: ['sports', 'fishing'],
    role: Role.ADMIN,
};
var favActivites;
favActivites = ['sport'];
if (person.role === Role.ADMIN)
    console.log('is admin');
