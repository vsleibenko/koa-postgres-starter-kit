const Sequelize = require('sequelize');
const MemoryStore = require('koa-session-memory');

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true',
  },
});

sequelize.authenticate()
  .then(() => console.log('DB is connected')) // eslint-disable-line
  .then(() => sequelize.sync())
  .catch((err) => console.error(err)); // eslint-disable-line

const memoryStore = new MemoryStore();

exports.sequelize = sequelize;
exports.memoryStore = memoryStore;
