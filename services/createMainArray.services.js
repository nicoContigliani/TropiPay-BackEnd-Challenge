const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const generateObject = require("./generateObject.service");
const getDataUrl = require("./getDataUrl.services");
const todoPage = require("./todoPage.service");

const createMainArray = async (data) => {
  console.log(
    "🚀 ~ file: createMainArray.services.js ~ line 10 ~ createMainArray ~ data",
    data
  );
  const url = (data.url).replace(`"`, ``).replace(`.html"`, `.html`);
  console.log("🚀 ~ file: createMainArray.services.js ~ line 15 ~ createMainArray ~ url -------", url)
  const title = data.titulo;
  //const response = await axios.get(url);


  //   const UrlAll = await generateObject(response);
  //   const $ = cheerio.load(response.data);
  //   const todo = await todoPage($);
  //   const resultTitle = $("title").html();
  //  const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
  //   const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;
  //   writeFile(fileName, JSON.stringify(dataWebPage));
};
module.exports = createMainArray;
