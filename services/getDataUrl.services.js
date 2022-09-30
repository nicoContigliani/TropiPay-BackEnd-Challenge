const axios = require("axios");

const getDataUrl = async (url) => {
  return  await axios.get(url);
};
module.exports = getDataUrl;
