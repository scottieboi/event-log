import express from 'express';
import eventsRouter from './routes';

const app = express();
app.use('/events', eventsRouter);

export default app;
