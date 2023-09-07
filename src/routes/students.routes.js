//Porpuse: Receive the request of students and send it to the controller
import { Router } from 'express';

import { getStudents } from '../controllers/students.controller.js';

const router = Router();

router.get('/getStudents', getStudents);

export default router;
