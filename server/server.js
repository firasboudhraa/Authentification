require('dotenv').config();
const app = require('./app');
const LOG = require('../lib/log/log')
const connectToDatabase = require('../database/database');

connectToDatabase() ;


const port = process.env.PORT_CLIENT;
const server = require('http').createServer(app);

server.listen(port, () => {
  LOG.info(`ENVIROMENT:[ ${process.env.NODE_ENV} ] Server started on port ${port}`)
});


module.exports = server;