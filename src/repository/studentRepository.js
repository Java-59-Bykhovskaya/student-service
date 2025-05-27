import Student from '../model/student.js';


export async function createStudent (student) {
  return Student.create(student);
}

export async function findStudentById (id) {
  return Student.findById(id);
}


export async function deleteStudent (id) {
  return Student.findByIdAndDelete(id);

}

export async function updateStudent (id, data) {
  return Student.findByIdAndUpdate(id, data, { new: true });
}

export async function updateStudentScores (id, exam, score) {
  return Student.findByIdAndUpdate(id, { [`scores${exam}`]: score }, { new: true });
}

export async function findStudentsByName (name) {
  return Student.find({ name: new RegExp(`^${name}$`, 'i') });
}

// export async function countStudentsByName (names) {
//   return Student.countDocuments({});
// }

// export const findStudentByName = async (name) => {
//   return await collection.find({
//     name: {
//       $regex: `${name}`,
//       $options: 'i'
//     }
//   }).toArray();

// const res = [];
// for (const id of students.keys()) {
//   const student = students.get(id);
//   if (student.name.toLowerCase() === name.toLowerCase()) {
//     res.push(student);
//   }
// }
// return res;
// };

// export const countByNames = (names) => {
//   if (!Array.isArray(names)) findStudentByName(names).length;
//   else {
//     let count = 0;
//     names.forEach(name => {
//       for (const id of students.keys()) {
//         const student = students.get(id);
//         if (student.name.toLowerCase() === name.toLowerCase()) {
//           count++;
//         }
//       }
//     });
//     return count;
//   }
// };
//
// export const findStudentByMinScore = (exam, minScore) => {
//
// };
