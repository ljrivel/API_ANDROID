import config from './config';
import express from 'express';
import cors from 'cors';

import studentRoutes from './routes/students.routes';
import courseRoutes from './routes/course.routes';
import registerRoutes from './routes/register.routes';

const app = express();

//settings
app.set('port', config.port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(studentRoutes);
app.use(courseRoutes);
app.use(registerRoutes);

export default app;
