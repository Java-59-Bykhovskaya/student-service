import * as repo from '../repository/studentRepository.js';

export const addStudent = async ({ id, name, password }) => {
  const exists = await repo.findStudentById(id);
  if (exists) {
    return false;
  }
  await repo.createStudent({ _id: id, name, password });
  return true;
};


export const findStudent = async (id) => {
  return await repo.findStudentById(id);
};

export const deleteStudent = async (id) => {
  return await repo.deleteStudent(id);
};

export const updateStudent = async (id, data) => {
  return await repo.updateStudent(id, data);
};

export const addScore = async (id, exam, score) => {
  return await repo.updateStudentScores(id, exam, score);
};

export const findStudentByName = async (name) => {
  return await repo.findStudentsByName(name);
};

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
