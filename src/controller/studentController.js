import * as service from '../services/studentService.js';
import {
  scoreSchema,
  studentSchema,
  updateStudentSchema
} from '../validator/studentValidator.js';

export const addStudent = async (req, res) => {
  const { error } = studentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const success = await service.addStudent(req.body);
  res.sendStatus(success ? 201 : 409);
};

export const findStudentByID = async (req, res) => {
  const student = await service.findStudent(+req.params.id);
  if (student) {
    const tmp = { ...student };
    console.log(tmp);
    tmp.password = undefined;
    res.json(tmp);
  } else {
    res.sendStatus(404);
  }
};

export const deleteStudent = async (req, res) => {
  const student = await service.deleteStudent(+req.params.id);
  if (student) {
    student.password = undefined;
    res.json(student);
  } else {
    res.sendStatus(404);
  }
};

export const updateStudent = async (req, res) => {
  const { error } = updateStudentSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const student = await service.updateStudent(+req.params.id, req.body);
  if (student) {
    const tmp = { ...student };
    delete tmp.scores;
    res.json(tmp);
  } else {
    res.sendStatus(404);
  }
};

export const addScore = async (req, res) => {
  const { error } = scoreSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const student = await service.addScore(+req.params.id, req.body.name, +req.body.score);
  res.sendStatus(student ? 204 : 409);
  // if (student) {
  //   const tmp = { ...student };
  //   delete tmp.password;
  //   res.json(tmp);
  // } else {
  //   res.sendStatus(404);
  // }
};

export const findStudentByName = async (req, res) => {
  const students = await service.findStudentByName(req.params.name);
  await students.map((student) => {delete student.password;});
  res.json(students);
};

// export const countByNames = (req, res) => {
//   const quantity = repo.countByNames(req.query.names);
//   if (quantity) {
//     res.json(quantity);
//   } else {
//     res.status(404).send();
//   }
// };
//
// export const findStudentByMinScore = (req, res) => {
//   const student = findStudentByMinScore(req.params.exam, +req.params.minscore);
//   if (student) {}
// };