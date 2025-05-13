// SQL Injection Fix (Parameterized Query Example)
const username = req.body.username;
const password = req.body.password;
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.execute(query, [username, password], (err, results) => {
    if (results.length > 0) {
        // Successful login
    } else {
        // Invalid credentials
    }
});

// XSS Fix (Manual sanitization)
const comment = req.body.comment;
const safeComment = comment.replace(/</g, "&lt;").replace(/>/g, "&gt;");
display(safeComment);

// Session Fix
const session = require('express-session');
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,     // Requires HTTPS
        httpOnly: true    // Not accessible via JavaScript
    }
}));
