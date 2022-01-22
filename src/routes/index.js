const fs = require("fs/promises");

function setup(app) {
  app.get('/', async function (req, res) {
    const etiquetasRaw = await fs.readFile("src/etiquetas.meta.json");
    const etiquetas = JSON.parse(etiquetasRaw);

    return res.render('index', { items: etiquetas });
  });
}

module.exports = setup;