const {Sequelize} = require('sequelize');

const sequelize = new Sequelize( 'callbacks', 'postgres', '12', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    define: {
        timestamps: true
    },
    logging: false
})

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {sequelize, testConnection};