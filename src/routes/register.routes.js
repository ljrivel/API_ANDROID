//Porpuse: Receive the request of register and send it to the controller
import { Router } from 'express';

import { getRegister } from '../controllers/register.controller';

const router = Router();

router.get('/getRegisters', getRegister);

export default router;
