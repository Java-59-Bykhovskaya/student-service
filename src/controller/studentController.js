import * as repo from '../repository/studentRepository.js';

export const addStudent = async (req, res) => {
  const success = await repo.addStudent(req.body);
  if (success) {
    res.status(204).send();
  } else {
    res.status(409).send();
  }
};

export const findStudentByID = async (req, res) => {
  const student = await repo.findStudent(+req.params.id);
  if (student) {
    delete student.password;
    res.json(student);
  } else {
    res.status(404).send();
  }
};

export const deleteStudent = async (req, res) => {
  const student = await repo.deleteStudent(+req.params.id);
  if (student) {
    delete student.password;
    res.json(student);
  } else {
    res.status(404).send();
  }
};

export const updateStudent = async (req, res) => {
  const student = await repo.updateStudent(+req.params.id, req.body);
  if (student) {
    delete student.scores;
    res.json(student);
  } else {
    res.status(404).send();
  }
};

export const addScore = async (req, res) => {
  const student = await repo.addScore(+req.params.id, req.body);
  if (student) {
    student.password;
    res.json(student);
  } else {
    res.status(404).send();
  }
};

export const findStudentByName = async (req, res) => {
  const students = await repo.findStudentByName(req.params.name);
  await students.map((student) => {delete student.password;});
  res.json(students);
};

export const countByNames = async (req, res) => {
  const quantity = await repo.countByNames(req.query.names);
  if (quantity) {
    res.json(quantity);
  } else {
    res.status(404).send();
  }
};

export const findStudentByMinScore = async (req, res) => {
  const student = await repo.findByMinScore(req.params.exam, +req.params.minscore);
  if (student) {
    res.json(student);
  } else {
    res.sentStatus(409);
  }
};
