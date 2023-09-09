//Porpuse: Receive the request of course and send it to the controller
import { Router } from 'express';

import {
  getCourses,
  addCourse,
  deleteCourse,
  editCourse,
  getCoursesByCode,
} from '../controllers/course.controller.js';

const router = Router();

router.get('/getCourses', getCourses);
router.post('/getCoursesByCode', getCoursesByCode);
router.post('/addCourse', addCourse);
router.post('/deleteCourse', deleteCourse);
router.post('/editCourse', editCourse);

export default router;
