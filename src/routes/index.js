function setup(app) {
  app.get('/', function (req, res) {
    res.send('hello world')
  })
}

module.exports = setup;