const {User, UserSchema} = require('./user.module');

function setUpModels(sequelize){
    User.init(UserSchema,User.config(sequelize))
}

module.exports = setUpModels;