import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// Registration Route
router.post('/reg', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.render('register', { msgCheck: 'The user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });

        res.redirect('/login');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Some error occurred: ' + error.message);
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.render('register', { msg: "You are not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.cookie('token', token, { maxAge: process.env.COOKIE_MAX_AGE, httpOnly: true });
        res.redirect('/home');
    } else {
        res.render('login', { inCorrect: 'Your password is wrong' });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.redirect('/home');
});

export default router;
