const axios = require("axios");
const cheerio = require("cheerio");
const generateObjectB = require("./generateObjectB.service");
const getDataUrl = require("./getDataUrl.services");
require("dotenv").config();

const urlBase = "http://www.foodsubs.com/";

const forCrateMain = async (UrlAll) => {
  const data = { ...UrlAll };
  data[0].forEach((element) => {
    const url = element.url.replace(`"`, ``).replace(`.html"`, `.html`);
    const urls = `${urlBase}${url}`;
    generateObjectB(urls);
  });
};

module.exports = forCrateMain;
