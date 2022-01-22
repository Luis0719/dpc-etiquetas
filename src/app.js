const app = require('./server')();
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));


const routes = require('./routes');
routes(app);
