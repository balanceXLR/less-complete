const util = require('../utils/index')
const path = require('path')
function getFileListCont(config, projectPath) {
  try {
    let fileList = [];
    config.fileList.forEach(file => {
      let realPath = path.join(projectPath, file)
      console.log("读取文件：" + realPath)
      fileList.push(realPath);
    });
    return fileList;
  } catch (e) {
    console.error("读取fileList失败，请检查csscpt.config.json");
  }
}

function getFolderListCont(config, projectPath) {
  try {
    let fileList = [];
    config.folderList.forEach(folder => {
      let realPath = path.join(projectPath, folder)
      console.log("读取文件夹：" + realPath)
      util.getDirFile(realPath).forEach(file => {
        fileList.push(file);
      });
    });
    return fileList;
  } catch (e) {
    console.error("读取folderList失败，请检查csscpt.config.json");
  }
}

module.exports = {
  getFileListCont,
  getFolderListCont
};
