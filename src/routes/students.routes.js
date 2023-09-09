//Porpuse: Receive the request of students and send it to the controller
import { Router } from 'express';

import {
  getStudents,
  addStudent,
  deleteStudent,
  editStudent,
  getStudentsbyCarnet,
} from '../controllers/students.controller.js';

const router = Router();

router.get('/getStudents', getStudents);
router.post('/getStudentsbyCarnet', getStudentsbyCarnet);
router.post('/addStudent', addStudent);
router.post('/deleteStudent', deleteStudent);
router.post('/editStudent', editStudent);

export default router;
