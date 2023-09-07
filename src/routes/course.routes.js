//Porpuse: Receive the request of course and send it to the controller
import { Router } from 'express';

import { getCourses } from '../controllers/course.controller.js';

const router = Router();

router.get('/getCourses', getCourses);

export default router;
