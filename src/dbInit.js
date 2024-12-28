require('dotenv').config();
const { sequelize } = require('./config/db');


const User = require('./models/user');
const Product = require('./models/product');
const Transaction = require('./models/transactions');

async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Tables synchronized successfully.');
    } catch (error) {
        console.error('Error syncing tables:', error);
    }
}


async function seedDatabase() {
    try {
        await sequelize.sync({ alter: true }); 

        await require('./seeders/products'); 
        await require('./seeders/users'); 

        console.log('Database seeded!');
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

async function initializeDatabase() {
    try {
      await syncDatabase(); // Synchronize tables first
      await seedDatabase(); // Then seed data
    } catch (error) {
      console.error("Error initializing the database: ", error)
    }
}

initializeDatabase();


