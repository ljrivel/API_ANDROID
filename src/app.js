import config from './config';
import express, { Router } from 'express';
import serverless from 'serverless-http';
import cors from 'cors';

import studentRoutes from './routes/students.routes';
import courseRoutes from './routes/course.routes';
import registerRoutes from './routes/register.routes';

const app = express();
const router = Router();
router.get('/hello', (req, res) => res.send('Hello World!'));

//settings
app.set('port', config.port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/', studentRoutes);
app.use('/api/', courseRoutes);
app.use('/api/', registerRoutes);

export default app;
