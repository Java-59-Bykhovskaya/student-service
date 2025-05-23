import { Student } from '../model/student.js';

const students = new Map();

export const addStudent = ({ id, name, password }) => {
  if (students.has(id)) {
    return false;
  }
  students.set(id, new Student(id, name, password));
  return true;
};

export const findStudent = (id) => students.get(id);

export const deleteStudent = (id) => {
  const student = students.get(id);
  if (students.has(id)) {
    students.delete(id);
    return student;
  }
};

export const updateStudent = (id, data) => {
  const student = students.get(id);
  if (student) {
    Object.assign(student, data);
    return student;
  }
};

export const addScore = (id, { examName, score }) => {
  const student = students.get(id);
  if (student) {
    student.scores[examName] = score;
    return student;
  }
};

export const findStudentByName = (name) => {
  const res = [];
  for (const id of students.keys()) {
    const student = students.get(id);
    if (student.name.toLowerCase() === name.toLowerCase()) {
      res.push(student);
    }
  }
  return res;
};

export const countByNames = (names) => {
  if (!Array.isArray(names)) findStudentByName(names).length;
  else {
    let count = 0;
    names.forEach(name => {
      for (const id of students.keys()) {
        const student = students.get(id);
        if (student.name.toLowerCase() === name.toLowerCase()) {
          count++;
        }
      }
    });
    return count;
  }
};

export const findStudentByMinScore = (exam, minScore) => {

};
