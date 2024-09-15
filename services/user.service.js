const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
const {models} = require('../libs/sequelize')

class UserService {
  constructor() {
    this.pool = pool
    this.pool.on('errors',(err)=> console.error(err))
  }

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser;
  }

  async find() {
    // const query = 'SELECT * FROM tasks';
    // const rta = await this.pool.query(query);
    const rta = await models.User.findAll();
    return rta[0]
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      boom.notFound('User Not Found')
    }
    return user;
  }

  async update(id, changes) {

    const user = await this.find(id);
    const rta = user.update(changes) 
    return rta
  }

  async delete(id) {
    const user = await this.find(id);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
