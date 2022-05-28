const { readdir } = require("fs/promises");
const datefns = require("date-fns");

const etiquetasController = require("./etiquetasController");

let lastCreateRequest = null;

// Avoid an attack were we receive multiple create requests at once
const CREATE_INTERVAL = 10; // 5 seconds
function validateCreateRequest(req, res, next) {
  if (!lastCreateRequest) {
    lastCreateRequest = new Date();
    return next();
  }

  const nextAllowedRequest = datefns.add(lastCreateRequest, {
    seconds: CREATE_INTERVAL,
  });
  if (datefns.isBefore(new Date(), nextAllowedRequest)) {
    return res.redirect(
      "/?error=solo puedes create etiquetas cada " +
        CREATE_INTERVAL +
        " segundos"
    );
  }

  lastCreateRequest = new Date();
  return next();
}

function setup(app) {
  app.get("/", async function (req, res) {
    let etiquetas = await readdir("public/files/etiquetas");

    etiquetas = etiquetas.sort((a, b) => {
      return a.localeCompare(b);
    });

    let error = req.query.error;

    return res.render("index", { etiquetas, error });
  });

  app.post("/create", validateCreateRequest, async function (req, res) {
    let name = req.body.name;
    const [err, result] = await etiquetasController.create(name);

    if (err) {
      return res.status(500).send();
    }

    if (result !== true) {
      return res.redirect("/?error=" + result);
    }

    return res.redirect("/");
  });

  app.post("/preview", async function (req, res) {
    /*
      Each page allows up to 5 imgs per row, and 9 rows.
      45 in total. Split list into pages of 45 elements each.
    */
    let etiquetas = Object.entries(req.body); // convert from key-value pair, to array of key-values
    etiquetas = etiquetas.filter((x) => x[1] > 0); // Ignore those without a > 0 value
    etiquetas = etiquetas.reduce((result, x) => {
      // Expand array. Add n elements of each perfume, where n is defined at x[1]
      for (let i = 0; i < x[1]; i += 1) {
        result.push(x[0]);
      }

      return result;
    }, []);

    // Split into chunks of 45 (items per page)
    pages = [];
    for (let i = 0; i < etiquetas.length; i += 45) {
      pages.push(etiquetas.slice(i, i + 45));
    }

    return res.render("preview", { pages });
  });
}

module.exports = setup;
