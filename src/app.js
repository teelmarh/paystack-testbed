require('dotenv').config();
const express = require('express');
const db = require('./config/db'); 
const app = express();

const paymentRoutes = require('./api/payments');

// Middleware 
app.use(express.json());

app.use('/payments', paymentRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
