function setup(app) {
  app.get('/', function (req, res) {
    res.render('index', { message: 'Hello there!' })
  })
}

module.exports = setup;