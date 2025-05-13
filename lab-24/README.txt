Lab 24: How to Set Up HTTPS Using Let's Encrypt

This lab walks you through securing a Node.js Express server with an SSL/TLS certificate from Let's Encrypt.

⚠️ Note: You need a real domain name pointing to your server and internet accessibility. It's OK if you can't complete this lab fully — focus on understanding each step.

---

🧩 Steps Summary:

1. **Install Certbot (on Linux):**
   sudo apt-get update
   sudo apt-get install certbot

2. **Stop Your App (to free ports 80/443):**
   sudo systemctl stop your-node-service

3. **Get Certificates:**
   sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

   This generates certs under:  
   /etc/letsencrypt/live/yourdomain.com/

4. **Set Up Express HTTPS Server:**
   Use `https.createServer()` and read the key/cert/chain files using `fs`.

5. **Test Auto-Renewal:**
   sudo certbot renew --dry-run

6. **Restart Your App:**
   Use PM2 or another process manager to ensure the app restarts after renewal or crash.

---

Even if you can't fully test it, review the `server.js` to understand how the cert files are used.
