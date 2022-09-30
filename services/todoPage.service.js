const cheerio = require("cheerio");

const todoPage = async ($) => {
  return $.html().split(/\s+/).join("");
};
module.exports = todoPage;
