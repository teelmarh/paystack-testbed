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
    
    const paystackReq = https.request(options, paystackRes => {
      let data = ''
    
      paystackRes.on('data', (chunk) => {
        data += chunk
      });
    
      paystackRes.on('end', () => {
        console.log(JSON.parse(data))
      })
    }).on('error', error => {
      console.error(error)
    })
    
    paystackReq.write(params)
    paystackReq.end()

});


module.exports = router;

