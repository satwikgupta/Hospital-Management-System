import express from 'express';
import cookieParser from 'cookie-parser';


const app = express();

// middlewares

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import routes

import userRoutes from './routes/user.route.js';
import appointmentRoutes from './routes/appointment.route.js';

// declaring routes
app.use('/api/user', userRoutes);
app.use('/api/v1/appointments', appointmentRoutes);


export { app };
