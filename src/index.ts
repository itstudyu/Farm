import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import path from 'path';
import session from 'express-session';
import pageRoutes from './routes/pageRoutes';
import authRoutes from './routes/authRoutes';
import { localsMiddleware } from './middleware/localsMiddleware';

const app: Application = express();
const port: number = parseInt(process.env.PORT || '3000', 10);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// Locals middleware
app.use(localsMiddleware);

// Routes
app.use('/', pageRoutes);
app.use('/', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}); 