const cheerio = require("cheerio");

const generateObjectC = async (data) => {
  const dList = [];
  const dDattas = [];

  const $ = cheerio.load(data);
  $("font").each((_, e) => {
    let row = $(e).text().replace(/(\s+)/g, " ");
    let datas = $(e).html();
    dList.push(datas);
  });
  const r = dList.forEach((e) => {
    const datass = e;

    if (e.includes(".html")) {
      const d = e.split(/\s+/);
      d.forEach((element) => {
        if (element.includes("href")) {
          const arrayUrlbranch = element
            .replace(">", ` `)
            .trimEnd()
            .trim()
            .replace("a>", ` `)
            .replace("</", ``)
            .replace("</font>", ``)
            .replace("</p>", ``)
            .replace("&nbsp", ``)
            .replace(";", ``)
            .replace(",", ``)
            .replace(`href="`, ``)
            .replace(`"`, ``)
            .trimEnd()
            .split(" ");


 

          dDattas.push(arrayUrlbranch);
        }
      });
    }
    // console.log(dDattas);
    // returnsGeneralUrl(dDattas)
  });

  return dDattas;
};
module.exports = generateObjectC;
