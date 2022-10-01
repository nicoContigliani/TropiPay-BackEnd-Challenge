const express = require("express");
const app = express();
const port = 0;
require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const getDataUrl = require("./services/getDataUrl.services");
const generateObject = require("./services/generateObject.service");
const todoPage = require("./services/todoPage.service");
const createMain = require("./services/createMain.services");
// const stream = fs.createWriteStream("tomaPorMiron.txt");

const counter = [];
const urlForArray = [];

if (process.env.urlDatas) {
  // console.log("🚀 ~ file: server.js ~ line 7 ~ url", process.env.urlDatas);
  const url = process.env.urlDatas;

  try {
    (async () => {
      // const response = await axios.get(url);
      console.log(process.env.maxdist);

      if (counter.length == 0) {
        const response = await getDataUrl(url);
        const UrlAll = await generateObject(response);
        const $ = cheerio.load(response.data);
        const todo = await todoPage($);
        const resultTitle = $("title").html();
        const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
        const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;
        writeFile(fileName, JSON.stringify(dataWebPage));
        counter.push(1);
        urlForArray.push(UrlAll);
      }
      if (counter.length != 0) {
        for (let index = 1; counter.length < process.env.maxdist; index++) {
          urlForArray.forEach((element) => {
            createMain(element);
            counter.push(1);
            console.log("paso ++++++++++++++++++++++++++++++++++++++++++++++");
          });
        }

        // for (let index = 0; index < array.length; index++) {
        //   // const element = array[index];
        // }
      }

      // const response = await getDataUrl(url);
      // const UrlAll = await generateObject(response);
      // const $ = cheerio.load(response.data);
      // const todo = await todoPage($);
      // const resultTitle = $("title").html();
      // const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };
      // const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;
      // writeFile(fileName, JSON.stringify(dataWebPage));
    })();
  } catch (error) {
    console.log("🚀 ~ file: server.js ~ line 17 ~ error", error);
  }
}

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//urlDatas="http://www.foodsubs.com/" maxdist=4  nodemon server.js
