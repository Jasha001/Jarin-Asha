Lab 23: HTTPS Server with Self-Signed Certificate

Instructions:

1. Make sure OpenSSL is installed on your system.

2. Generate a self-signed SSL certificate by running:
   openssl req -nodes -new -x509 -keyout server.key -out server.cert

   - Answer the prompts (you can use defaults for development).
   - This will create two files: server.key (private key) and server.cert (certificate).

3. Place both files (server.key and server.cert) in the same folder as server.js.

4. Run the server:
   node server.js

5. Visit in browser:
   https://localhost:3000

   - You will see a security warning. Click through it to continue (this is expected).

Note: This setup is for development only. Never use self-signed certs in production.
