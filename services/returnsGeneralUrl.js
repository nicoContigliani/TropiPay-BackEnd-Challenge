const dataUrl = [];

const returnsGeneralUrl = async (data) => {
    console.log("🚀 ~ file: returnsGeneralUrl.js ~ line 4 ~ returnsGeneralUrl ~ data", data)
    data.lenght != 0 ? dataUrl.push(data) : "";
};
const getUrl = async () => {
    return dataUrl
    
};
module.exports = { returnsGeneralUrl,getUrl };
