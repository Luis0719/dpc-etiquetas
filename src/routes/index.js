const fs = require("fs/promises");

function setup(app) {
  app.get('/', async function (req, res) {
    const etiquetasRaw = await fs.readFile("src/etiquetas.meta.json");
    const etiquetas = JSON.parse(etiquetasRaw).sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    return res.render('index', { etiquetas });
  });

  app.post('/preview', async function (req, res) {
    let etiquetas = Object.entries(req.body); // convert from key-value pair, to array of key-values
    return res.render('preview', { etiquetas });
  });
}

module.exports = setup;