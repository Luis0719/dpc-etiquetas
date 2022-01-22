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
    /*
      Each page allows up to 5 imgs per row, and 9 rows.
      45 in total. Split list into pages of 45 elements each.
    */
    let etiquetas = Object.entries(req.body); // convert from key-value pair, to array of key-values
    etiquetas = etiquetas.filter(x => x[1] > 0); // Ignore those without a > 0 value
    etiquetas = etiquetas.reduce((result, x) => { // Expand array. Add n elements of each perfume, where n is defined at x[1]
      for (let i=0; i<x[1]; i+=1) {
        result.push(x[0]);
      }

      return result;
    }, []);

    // Split into chunks of 45 (items per page)
    pages = [];
    for (let i=0; i<etiquetas.length; i+= 45) {
      pages.push(
        etiquetas.slice(i, i+45)
      );
    }

    return res.render('preview', { pages });
  });
}

module.exports = setup;