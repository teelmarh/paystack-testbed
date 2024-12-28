const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user'); 
const Product = require('./product'); 


const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, 
            key: 'id'
        }

    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, 
            key: 'id'
        }
    },

    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed', 'cancelled'),
        defaultValue: 'pending'
    },
    reference: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },  
    paid_at: { type: DataTypes.DATE }, 
    amount: { type: DataTypes.DECIMAL(20, 2), allowNull: false }, 
    transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false, 
    tableName: 'transactions' 

});

Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Transaction;

