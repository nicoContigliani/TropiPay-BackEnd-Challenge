const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const forCrateMain = require("./forCrateMain.service");
const generateObject = require("./generateObject.service");
const getDataUrl = require("./getDataUrl.services");
const todoPage = require("./todoPage.service");

const urlBase = "http://www.foodsubs.com/";

const createMainArray = async (data) => {
  const url = data.url.replace(`"`, ``).replace(`.html"`, `.html`);
  const title = data.titulo;
  try {
    const response = await axios.get(`${urlBase}${url}`);
  
    const UrlAll = await generateObject(response);

    const $ = cheerio.load(response.data);
    const todo = await todoPage($);
    const resultTitle = $("title").html();
    const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
    const fileName = `${title.split(/\s+/).join("")}.txt`;
    writeFile(`./Data/${fileName}`, JSON.stringify(dataWebPage));
  } catch (error) {
    console.log(
      "🚀 ~ file: createMainArray.services.js ~ line 23 ~ createMainArray ~ error",
      error
    );
  }

  //   const UrlAll = await generateObject(response);
  //   const $ = cheerio.load(response.data);
  //   const todo = await todoPage($);
  //   const resultTitle = $("title").html();
  //  const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
  //   const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;
  //    writeFile(`./Data/${fileName}`, JSON.stringify(dataWebPage));
};
module.exports = createMainArray;
