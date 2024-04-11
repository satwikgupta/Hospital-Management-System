import express from 'express';
const app = express();

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import routes

import userRoutes from './routes/user.route';

// declaring routes
app.use('/api/users', userRoutes);

export { app };
