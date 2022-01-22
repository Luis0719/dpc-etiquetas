const app = require('./server')();

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'pug');

const routes = require('./routes');
routes(app);
