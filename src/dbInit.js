require('dotenv').config();
require('./models/user')
require('./models/product')
require('./models/transactions')
const { sequelize } = require('./config/db'); 

sequelize.sync() 
  .then(() => {
    console.log('Tables created');
  })
  .catch((error) => {
    console.error('Error syncing tables:', error);
  });