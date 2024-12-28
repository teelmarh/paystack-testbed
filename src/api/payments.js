const express = require('express');
const https = require('https');
const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

//initialise transaction
router.post ( '/initialize', async(req, res) => {
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
        const paystackReq = https.request(options, async paystackRes => {
            let data = '';

            paystackRes.on('data', chunk => {
                data += chunk;
            });

            paystackRes.on('end', async () => {
                try {
                    const paystackResponse = JSON.parse(data);
                    console.log("Paystack Response:", paystackResponse);

                    try {
                        const transaction = await Transaction.create({
                            user_id: user_id,
                            product_id: product_id,
                            status: 'pending'
                        });
                        console.log("Transaction record created:", transaction);

                        res.json(paystackResponse);
                    } catch (databaseError) {
                        console.error("Failed to create transaction:", databaseError);
                        res.status(500).json({ error: "Failed to create transaction record." }); 
                    }

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
        console.error("Unexpected error during Paystack initialization:", error);
        res.status(500).json({ error: "An unexpected error occurred." }); // Consistent error responses
    }
});


module.exports = router;



