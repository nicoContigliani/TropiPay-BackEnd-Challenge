const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const createMainArray = require("./createMainArray.services");
const generateObject = require("./generateObject.service");
const getDataUrl = require("./getDataUrl.services");
const todoPage = require("./todoPage.service");

const createMain = async (data) => {
 const datas =  await data.forEach((element) => {
    createMainArray(element);
    console.log("🚀 ~ file: createMain.services.js ~ line 13 ~ datas ~ element", element)
  });
};
module.exports = createMain;
