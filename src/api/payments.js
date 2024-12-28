const express = require('express');
const https = require('https');
const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

//initialise transaction
router.post ( '/initialize', (req, res) => {
   const { email, amount } = req.body;

    const params = JSON.stringify({
      "email": email,
      "amount": amount * 100, // Convert to kobo
    })
    
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: '/transaction/initialize',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }
    
    try {
        const paystackReq = https.request(options, paystackRes => {
            let data = '';

            paystackRes.on('data', chunk => {
                data += chunk;
            });

            paystackRes.on('end', () => {
                try {
                    const paystackResponse = JSON.parse(data);
                    console.log("Paystack Response:", paystackResponse);
                    res.json(paystackResponse);
                } catch (parseError) {
                    console.error("Error parsing Paystack response:", parseError);
                    res.status(500).json({ error: "Failed to parse Paystack response." });
                }
            });
        });

        paystackReq.on('error', error => {
            console.error("Paystack Request Error:", error);
            res.status(500).json({ error: "Failed to make Paystack request." });
        });

        paystackReq.write(params);
        paystackReq.end();


    } catch (error) {
        console.error("Unexpected error during Paystack initialization:", error)
        res.status(500).send("An unexpected error occurred.")
    }
});


module.exports = router;

