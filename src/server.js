const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

function start() {
  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

  return app;
}

module.exports = start;