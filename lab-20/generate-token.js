const jwt = require('jsonwebtoken');

// Function that creates a JWT using payload and secret
function generateJWT(payload, secretKey) {
    const token = jwt.sign(payload, secretKey, {
        algorithm: 'HS256',
        expiresIn: '1h'
    });
    return token;
}

// Read CLI arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
    console.error('Usage: node generate-token.js <payload as JSON> <secret key>');
    process.exit(1);
}

let payload;
try {
    payload = JSON.parse(args[0]);
} catch (err) {
    console.error('Payload must be valid JSON.');
    process.exit(1);
}

const secretKey = args[1];

try {
    const token = generateJWT(payload, secretKey);
    console.log('Generated JWT:', token);
} catch (error) {
    console.error('Error generating JWT:', error.message);
}
