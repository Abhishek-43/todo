import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';
import forgotPasswordRouter from './routes/forgotPassword.js';

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App config
dotenv.config();
const app = express();
const port = process.env.PORT || 8001;
mongoose.set('strictQuery', true);

// Middlewares
app.use(express.json());
app.use(cors());

// DB config
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('DB Connected');
    }
});

// Serve static files from 'frontend/build'
app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/forgotPassword', forgotPasswordRouter);

// Catch-all route for client-side routing (if using React Router)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// Listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
