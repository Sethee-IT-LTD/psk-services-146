// This is your serverless function for Vercel deployment
export default async function handler(req, res) {
  // Enable CORS for serverless deployment
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error("Missing Brevo configuration");
      return res.status(500).json({ message: "Server configuration error" });
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
      // If Brevo returns an error, forward it
      console.error("Brevo API error:", brevoData);
      return res
        .status(brevoResponse.status)
        .json({ message: brevoData.message || "An error occurred" });
    }

    // Success!
    return res.status(200).json({ message: "Success! You are on the list." });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
