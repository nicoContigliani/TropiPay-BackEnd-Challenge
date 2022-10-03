const cheerio = require("cheerio");
const getDataUrl = require("./getDataUrl.services");

const generateObjectB = async (url) => {
  const resultUrl = await getDataUrl(url);
  const $ = cheerio.load(resultUrl.data);

  const dList = [];
  const ej = $("a").html();

  $("font").each((_, e) => {
    let row = $(e).text().replace(/(\s+)/g, " ");
    let datas = $(e).html();
    dList.push(datas);
  });
  // console.log("🚀 ~ file: generateObjectB.service.js ~ line 9 ~ generateObjectB ~ dList", dList)

  const dDattas = [];
  const r = dList.forEach((e) => {
    const datass = e;
    // .replace("<a", ``)
    // .replace("</a>", ``)
    // .replace(">", ` - `)
    // .replace("<i", "")
    // .replace("</i>", "")
    // .replace("href=", "")
    // .split(" ");
    //  console.log("🚀 ~ file: generateObjectB.service.js ~ line 25 ~ r ~ datass", datass)

    if (e.includes(".html")) {
      const d = e.split(/\s+/);
      d.forEach((element) => {
        if (element.includes("href")) {
 
          const arrayUrlbranch = element
            .replace(">", ` `)
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
          console.log("🚀 ~ file: generateObjectB.service.js ~ line 64 ~ d.forEach ~ arrayUrlbranch", arrayUrlbranch)
        }
      });
    }

    const info = { titulo: datass[3], url: datass[1] };

    const eS = cheerio.load(e);

    // datass[1].includes("html") ? dDattas.push(info) : "";
  });
};

module.exports = generateObjectB;
