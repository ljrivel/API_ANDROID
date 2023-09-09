//Porpuse: Receive the request of register and send it to the controller
import { Router } from 'express';

import {
  getRegister,
  addRegister,
  deleteRegister,
  editRegister,
  getRegisterByID,
} from '../controllers/register.controller.js';

const router = Router();

router.get('/getRegisters', getRegister);
router.post('/getRegisterByID', getRegisterByID);
router.post('/addRegister', addRegister);
router.post('/deleteRegister', deleteRegister);
router.post('/editRegister', editRegister);

export default router;
