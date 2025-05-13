const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());

// Setup session
app.use(session({
    secret: 'mySessionSecret', // not safe for production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // true only if using HTTPS
}));

// Fake user base
const userList = {
    user1: { password: "password123", role: "admin" },
    user2: { password: "password456", role: "user" }
};

// Login endpoint
app.post('/session-login', (req, res) => {
    const { username, password } = req.body;
    const user = userList[username];

    if (user && user.password === password) {
        req.session.user = { username, role: user.role };
        res.send(`Welcome, ${username}`);
    } else {
        res.status(401).send('Invalid login');
    }
});

// Logout endpoint
app.post('/session-logout', (req, res) => {
    req.session.destroy();
    res.send('Session ended. See you!');
});

// Only allow if logged in
function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('You need to login first');
    }
}

// Role-based gate
function checkUserRole(...rolesAllowed) {
    return (req, res, next) => {
        const role = req.session.user?.role;
        if (!rolesAllowed.includes(role)) {
            return res.status(403).send('You are not allowed here');
        }
        next();
    };
}

// Protected areas
app.get('/session-protected', requireLogin, (req, res) => {
    res.send(`Hello ${req.session.user.username}, this route is secured.`);
});

app.get('/session-admin', requireLogin, checkUserRole('admin'), (req, res) => {
    res.send('Only admins can view this section.');
});

app.listen(3002, () => {
    console.log('Session Auth server running on port 3002');
});
