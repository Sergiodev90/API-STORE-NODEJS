const {Sequelize} = require('sequelize');
const config  = require('../config/config');
const setUpModels = require('../db/models/index')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(URI,{
    dialect:'postgres',
    logging:true,
});

setUpModels(sequelize)


sequelize.sync();
(async()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established succesfully')
    }catch(err){
        console.error('Unable to connect to the databaes')
    }
})();


module.exports = sequelize;
