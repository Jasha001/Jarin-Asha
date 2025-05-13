const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;
const users = [];
const SECRET_KEY = 'mySuperSecretKey';

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware to check JWT on non-account routes
app.use((req, res, next) => {
    if (!req.path.startsWith('/account/')) {
        const token = req.cookies.token;
        if (!token) {
            console.log('No token, redirecting...');
            return res.redirect(`/account/login-page?redirect=${req.originalUrl}`);
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('Invalid token, redirecting...');
                return res.redirect(`/account/login-page?redirect=${req.originalUrl}`);
            }
            req.user = decoded;
            next();
        });
    } else {
        next();
    }
});

// Sample pages
app.get('/home', (req, res) => res.send('<h1>Welcome to Home Page</h1>'));
app.get('/about', (req, res) => res.send('<h1>About Us</h1>'));
app.get('/contact', (req, res) => res.send('<h1>Contact Page</h1>'));

// Serve forms
app.get('/account/login-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/account/sign-up-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle user signup
app.post('/account/sign-up', async (req, res) => {
    const { username, password } = req.body;
    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.status(400).send('Username already exists.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send('User created.');
});

// Handle login
app.post('/account/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).send('Invalid login.');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid login.');

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false });

    const redirectUrl = req.query.redirect || '/home';
    res.redirect(redirectUrl);
});

// Handle logout
app.post('/account/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
