// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "dzoni",
//   age: 20,
//   hobbies: ["Spotrs", "Cooking"],
//   role: [2, "author"],
// };

enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}

const person = {
  name: "dzoni",
  age: 20,
  hobbies: ["Spotrs", "Cooking"],
  role: Role.ADMIN,
};

let favoriteActivities: string[];

favoriteActivities = ["Smooking"];

for (const hobby of person.hobbies) {
  console.log(hobby);
}

if (person.role === Role.ADMIN) {
  console.log("admin je");
}
