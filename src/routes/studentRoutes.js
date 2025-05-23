import express from 'express';
import {
  addScore,
  addStudent,
  countByNames,
  deleteStudent,
  findStudentByID,
  findStudentByMinScore,
  findStudentByName,
  updateStudent
} from '../controller/studentController.js';

const router = express.Router();

router.post('/student', addStudent);
router.get('/student/:id', findStudentByID);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', updateStudent);
router.patch('/score/student/:id', addScore);
router.get('/students/name/:name', findStudentByName);
router.get('/quantity/students', countByNames);
router.get('/students/exam/:exam/minscore/:minscore', findStudentByMinScore);

export default router;