# Lab 25 – CI/CD Pipeline Setup (CIS 485)

## Project Overview
This is a basic HTTPS "Hello World" Node.js project configured for CI/CD integration via GitHub Webhooks.

## Steps Followed

1. **Created GitHub Repository**
   - New public repo created.
   - Cloned and initialized using `npm init`.

2. **Server Setup**
   - HTTPS server built using previously created self-signed certificate (`server.key`, `server.cert`).

3. **Webhook Configuration**
   - Configured GitHub Webhook:
     - Payload URL: `https://tribefires.com:5443/webhook/`
     - Content-Type: `application/json`
     - Secret: *(provided by professor)*

4. **Feature Added**
   - Modified server response to say: `"Hello from Lab 25! CI/CD deployed."`
   - Committed and pushed changes.

5. **Deployment Verified**
   - Confirmed access to the live deployment at:
     - `https://tribefires.com:YOUR_PORT_HERE`

## Notes
- Remember to replace `YOUR_PORT_HERE` with the actual port assigned.
- This demonstrates basic CI/CD: webhook triggers rebuild + deployment.
