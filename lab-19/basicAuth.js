const express = require('express');
const basicAuth = require('basic-auth');
const app = express();

// A simple user list for basic auth demo
const userList = {
    admin: "password123",
    user: "password456",
    guest: "guest789"  // added guest to test another role
};

// Middleware to handle basic auth logic
function basicAuthCheck(req, res, next) {
    const credentials = basicAuth(req);
    if (credentials && userList[credentials.name] === credentials.pass) {
        req.user = credentials.name;
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        res.status(401).send('Unauthorized access. Try again.');
    }
}

// This is a protected route
app.get('/basic-protected', basicAuthCheck, (req, res) => {
    res.send(`Hey ${req.user}, you made it into the protected route!`);
});

app.listen(3000, () => {
    console.log('Basic Auth server running on port 3000');
});
