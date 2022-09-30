const express = require("express");
const app = express();
const port = 3001;
require("dotenv").config();

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const { writeFile } = require("fs/promises");
const getDataUrl = require("./services/getDataUrl.services");
const generateObject = require("./services/generateObject.service");
const todoPage = require("./services/todoPage.service");
// const stream = fs.createWriteStream("tomaPorMiron.txt");

if (process.env.urlDatas) {
  // console.log("🚀 ~ file: server.js ~ line 7 ~ url", process.env.urlDatas);
  const url = process.env.urlDatas;

  try {
    (async () => {
      // const response = await axios.get(url);
      console.log(process.env.maxdist)

      const response = await getDataUrl(url);
      const UrlAll = await generateObject(response);
      const $ = cheerio.load(response.data);
      const todo = await todoPage($);
      const resultTitle = $("title").html();
      // console.log(
      //   "🚀 ~ file: generateObject.service.js ~ line 6 ~ generateObject ~ resultTitle",
      //   resultTitle.split(/\s+/).join("")
      // );

      const dataWebPage = { url: url, urlSpider: UrlAll, data: todo };

      const fileName = `${resultTitle.split(/\s+/).join("")}.txt`;

      writeFile(fileName, JSON.stringify(dataWebPage));
    })();
  } catch (error) {
    console.log("🚀 ~ file: server.js ~ line 17 ~ error", error);
  }
}

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//urlDatas="http://www.foodsubs.com/" maxdist=4  nodemon server.js