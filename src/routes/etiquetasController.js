const { copyFile, readFile, writeFile, rm } = require("fs/promises");
const { resolve } = require("path");

function splitNameByRows(name) {
  words = name.split(" ");

  ROW_SIZE_LIMIT = 20;
  rows = [];
  row = [];
  row_size = 0;
  for (let w of words) {
    if (row_size + w.length + 1 > ROW_SIZE_LIMIT) {
      rows.push(row.join(" "));
      row = [w];
      row_size = w.length;
      continue;
    }

    row.push(w);
    // +1 counts for te space
    // Yeah, the first one should have +1, but I don't want to spend more minutes/lines of code fixing that
    row_size += w.length + 1;
  }

  // There are leftovers
  if (row_size > 0) {
    rows.push(row.join(" "));
  }

  return rows;
}

async function create(name) {
  const template = __dirname + "/templates/template.svg";
  const outFile = resolve(
    __dirname + "/../../public/files/etiquetas/" + name + ".svg"
  );

  namePerRows = splitNameByRows(name);

  // TODO: Support multiline names
  if (namePerRows.length > 1) {
    return [null, "Nombres mayores a 20 letras no están soportados todavía"];
  }

  // Cleanup any existing file with this name
  try {
    await rm(outFile);
  } catch (err) {
    if (err.code !== "ENOENT") console.log(err);
  }

  try {
    await copyFile(template, outFile);
  } catch (err) {
    console.log("Failed to copy template");
    console.log(err);
    return [err, null];
  }

  const propsToChange = [["template", namePerRows[0]]];
  let data = await readFile(outFile, "utf-8");

  for (let prop of propsToChange) {
    regex = new RegExp(prop[0], "g");
    data = data.replace(regex, prop[1]);
  }

  try {
    await writeFile(outFile, data, {
      encoding: "utf-8",
      flag: "w",
    });
  } catch (err) {
    console.log(err);
  }

  return [null, true];
}

module.exports = { create };
