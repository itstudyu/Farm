import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database';

const saltRounds = 10;

export const signupUser = async (req: Request, res: Response) => {
    const { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        req.session.flash = { type: 'error', message: 'Passwords do not match.' };
        return res.status(400).redirect('/signup');
    }

    try {
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            req.session.flash = { type: 'error', message: 'A user with this email already exists.' };
            return res.status(400).redirect('/signup');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        req.session.flash = { type: 'success', message: 'Registration successful! Please log in.' };
        res.redirect('/login');

    } catch (error) {
        console.error(error);
        req.session.flash = { type: 'error', message: 'Server error. Please try again later.' };
        res.status(500).redirect('/signup');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const users = rows as any[];

        if (users.length === 0) {
            req.session.flash = { type: 'error', message: 'Invalid email or password.' };
            return res.status(401).redirect('/login');
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // Passwords match, create session
            req.session.user = { id: user.id, name: user.name, email: user.email };
            req.session.flash = { type: 'success', message: 'You have been successfully logged in.' };
            res.redirect('/');
        } else {
            // Passwords do not match
            req.session.flash = { type: 'error', message: 'Invalid email or password.' };
            return res.status(401).redirect('/login');
        }
    } catch (error) {
        console.error(error);
        req.session.flash = { type: 'error', message: 'Server error. Please try again later.' };
        res.status(500).redirect('/login');
    }
};

export const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
}; 