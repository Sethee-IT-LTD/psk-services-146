import http from 'http';
import { config } from 'dotenv';

// Load environment variables
config();

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/subscribe' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const { email } = JSON.parse(body);
        
        // Basic validation
        if (!email) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Email is required' }));
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Please enter a valid email address' }));
          return;
        }

        const BREVO_API_KEY = process.env.BREVO_API_KEY;
        const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

        if (!BREVO_API_KEY || !BREVO_LIST_ID) {
          console.error("Missing Brevo configuration");
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Server configuration error' }));
          return;
        }

        // Prepare the request payload
        const payload = {
          email: email,
          listIds: [Number(BREVO_LIST_ID)],
          updateEnabled: true,
        };

        // Call the Brevo API
        const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "api-key": BREVO_API_KEY,
          },
          body: JSON.stringify(payload),
        });

        // Handle empty responses properly
        let brevoData = {};
        const responseText = await brevoResponse.text();
        
        if (responseText) {
          try {
            brevoData = JSON.parse(responseText);
          } catch (parseError) {
            console.error('Failed to parse Brevo response:', responseText);
            brevoData = { message: 'Invalid response from Brevo' };
          }
        }

        if (!brevoResponse.ok) {
          console.error("Brevo API error:", brevoData);
          res.writeHead(brevoResponse.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: brevoData.message || 'An error occurred' }));
          return;
        }

        // Success!
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Success! You are on the list.' }));
      } catch (e) {
        console.error('Server error:', e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3001, () => {
  console.log('Development API server running on port 3001');
}); 