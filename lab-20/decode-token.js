// This function splits a JWT and decodes its base64 parts
function decodeJWT(token) {
    const parts = token.split('.');
    const header = parts[0];
    const payload = parts[1];

    if (!header || !payload) {
        throw new Error('The token seems broken.');
    }

    const decode = (str) => {
        return JSON.parse(Buffer.from(str, 'base64').toString('utf8'));
    };

    return {
        header: decode(header),
        payload: decode(payload)
    };
}

// Get token from CLI
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error('Usage: node decode-token.js <JWT>');
    process.exit(1);
}

const token = args[0];
try {
    const decoded = decodeJWT(token);
    console.log('Header:', decoded.header);
    console.log('Payload:', decoded.payload);
} catch (err) {
    console.error('Could not decode token:', err.message);
}
