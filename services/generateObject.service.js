const cheerio = require("cheerio");

const generateObject = async (response) => {
  const $ = cheerio.load(response.data);

  const dList = [];
  $("b").each((_, e) => {
    let row = $(e).text().replace(/(\s+)/g, " ");
    let datas = $(e).html();
    dList.push(datas);
  });
  const dDattas = [];
  const r = dList.forEach((e) => {
    const datass = e
      .replace("<a", ``)
      .replace("</a>", ``)
      .replace(">", ` - `)
      .replace("<i", "")
      .replace("</i>", "")
      .replace("href=", "")
      .split(" ");
    const info = { titulo: datass[3], url: datass[1] };
    datass[1].includes("html") ? dDattas.push(info) : "";
  });
  return dDattas;
};
module.exports = generateObject;
