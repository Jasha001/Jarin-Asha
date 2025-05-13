const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const SECRET_KEY = 'mySecret123'; // should be more secure in real apps

// Example users (normally from DB)
const userList = {
    user1: { password: "password123", role: "admin" },
    user2: { password: "password456", role: "user" }
};

// Login route issues JWT if creds match
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = userList[username];

    if (user && user.password === password) {
        const token = jwt.sign({ username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Wrong username or password');
    }
});

// Middleware that checks token + roles
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send('No token found');

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.status(403).send('Token is not valid');
            req.user = decoded;

            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).send('Not enough permissions');
            }

            next();
        });
    };
}

// Routes that need JWT
app.get('/jwt-protected', authorizeRoles('admin', 'user'), (req, res) => {
    res.send(`Hi ${req.user.username}, you got through with JWT.`);
});

app.get('/admin', authorizeRoles('admin'), (req, res) => {
    res.send('Welcome Admin! Only you can see this.');
});

app.listen(3001, () => {
    console.log('JWT Auth server running on port 3001');
});
