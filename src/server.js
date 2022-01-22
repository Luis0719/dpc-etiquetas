const express = require('express')
const app = express()
const port = 3000

function start() {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

  return app;
}

module.exports = start;