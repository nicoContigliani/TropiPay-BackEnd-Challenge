const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const generateObjectB = require("./generateObjectB.service");
const generateObjectC = require("./generateObjectC.service");
const getDataUrl = require("./getDataUrl.services");
const firstUrl = require("./recursive/firstUrl.service");
const todoPage = require("./todoPage.service");
require("dotenv").config();

const urlBase = "http://www.foodsubs.com/";

const gUrl = [];
const counter = [];

const forCrateMain = async (UrlAlldata) => {
  // const response = await getDataUrl(url);
  // const UrlAll = await generateObject(response);
  // const $ = cheerio.load(response.data);
  // const todo = await todoPage($);
  // const resultTitle = $("title").html();
  // const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
  // const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;
  // writeFile(fileName, JSON.stringify(dataWebPage));

  if (UrlAlldata[1].length == 1) {
    const data = { ...UrlAlldata[0] };
    const dataR = await data[0].map(async (element) => {
      //debe ser un map ?¡
      const url = element.url.replace(`"`, ``).replace(`.html"`, `.html`);
      //todo en el misma función ?
      const urls = `${urlBase}${url}`;
      //demasiadas tareas en una sola función
      const d = await generateObjectB(urls);

      await ifBranchAll(d);
      // gUrl.push(d);

      // return d;
    });
    // const re = await firstUrl(UrlAlldata)
  }
};

const ifBranchAll = async (data) => {

  await data.forEach((element) => {
    generateData(element);
  });

  counter.push(1);
  // const response = await getDataUrl(url);

  // counter.length<process.env.maxdist
  // ver cantidad de saltos que están despuéns de 1

  // const response = await getDataUrl(url);
  // const UrlAll = await generateObject(response);
  // const $ = cheerio.load(response.data);
  // const todo = await todoPage($);
  // const resultTitle = $("title").html();
  // const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
  // const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;
  // writeFile(`./Data/${fileName}`, JSON.stringify(dataWebPage));
};

const generateData = async (urlAndTitle) => {
  const urls = `${urlBase}${urlAndTitle[0]}`;
  try {
    const response = await getDataUrl(urls);
    const UrlAll = await generateObjectC(response.data);
    console.log("🚀 ~ file: forCrateMain.service.js ~ line 73 ~ generateData ~ UrlAll", UrlAll)
    const $ = cheerio.load(response.data);
    const todo = await todoPage($);
    const dataWebPage = { url: urls, urlSpider: UrlAll, data: todo };
    const fileName = `${urlAndTitle[1].split(/\s+/).join("")}.txt`;
    writeFile(`./Data/${fileName}`, JSON.stringify(dataWebPage));

      generateDataDos(UrlAll);
   
  } catch (error) {}
};
const generateDataDos = async (urlAndTitle) => {
  console.log(counter.length);
  // console.log(
  //   "🚀 ~ file: forCrateMain.service.js ~ line 88 ~ generateDataDos ~ urlAndTitle",
  //   await urlAndTitle
  // );
};

module.exports = forCrateMain;
