const fs = require("fs");
const path = require("path");
const asstesPath = path.join(__dirname, "/../assets");

function genSvg(color) {
  try {
    var originStr = fs.readFileSync(
      path.join(asstesPath, "/base/base.svg"),
      "utf-8"
    );
  } catch (e) {
    console.error("读取svg-base文件失败");
  }
  return originStr.replace("#000000", color);
}
function getDirFile(filePath) {
  let fileList = [];

  function readDirSync(path) {
    var pa = fs.readdirSync(path);
    pa.forEach(function(ele, index) {
      var info = fs.statSync(path + "/" + ele);
      if (info.isDirectory()) {
        // console.log("dir: " + ele);
        readDirSync(path + "/" + ele);
      } else {
        // if (ele.match(/^.+\.tpl\.less/)) {
        if (ele.match(/^.+\.less/)) {
          // console.log("file: " + path + ele);
          fileList.push(path + "/" + ele);
        }
      }
    });
  }
  readDirSync(filePath);
  return fileList;
}

module.exports = {
  genImg(key, color) {
    let genUrl = path.join(asstesPath, `/${key.replace("@", "")}.svg`);
    console.log(`生成svg${key}于：${genUrl}`);
    try {
      fs.writeFileSync(genUrl, genSvg(color));
    } catch (e) {
      console.error(`生成svg失败，变量名：${key}`);
    }
    return `![](${genUrl})`;
  },
  getDirFile
};
