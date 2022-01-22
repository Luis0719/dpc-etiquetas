const app = require('./server')();

const routes = require('./routes');
routes(app);