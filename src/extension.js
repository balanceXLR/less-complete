// TOTO: 提示颜色值
const util = require("./utils/index");
const path = require("path");

const vscode = require("vscode");
const fs = require("fs");

const func = require("./func/index");

/**
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(document, position, token, context) {
  const line = document.lineAt(position);
  // 获取项目根目录
  const projectPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  // 截取到光标前的字符串
  const lineText = line.text.substring(0, position.character);

  if (/color|background|border/g.test(lineText)) {
    try {
      let config = JSON.parse(
        fs.readFileSync(path.join(projectPath, "/csscpt.config.json"), "utf-8")
      );
      try {
        let fileList = [],
          arr1 = [],
          arr2 = [];
        // file
        if (config.fileList) {
          arr1 = func.getFileListCont(config, projectPath);
        }
        // folder
        if (config.folderList) {
          arr2 = func.getFolderListCont(config, projectPath);
        }

        if (!(config.fileList || config.folderList)) {
          arr1 = [path.join(projectPath, "/index.less")];
        }

        fileList = Array.from(new Set(fileList.concat(arr1, arr2)));
        let list = [];
        fileList.forEach(path => {
          let tmpList = fs
            .readFileSync(path, "utf-8")
            .replace(/(\r\n\t|\n|\r\t)/g, "")
            .split(";");
          let aftList = [];
          tmpList.forEach(item => {
            aftList.push({
              cont: item,
              path
            });
          });
          list = Array.from(new Set(list.concat(aftList)));
        });
        let i = 0;
        return list
          .filter(item => {
            return item.cont.match(/^.+:.+$/);
          })
          .map(item => {
            let arr = item.cont.split(":");
            let key = arr[0],
              value = arr[1];
            // console.log(i++, key, value);
            let cptItem = new vscode.CompletionItem(
              key,
              vscode.CompletionItemKind.Color
            );
            // 面向开发者的描述
            cptItem.detail = item.path;
            // 面向用户的描述
            cptItem.documentation = new vscode.MarkdownString(
              util.genImg(key, value) + value
            );
            return cptItem;
          });
      } catch (err) {
        console.error("读取变量定义文件失败");
        console.error(err);
      }
    } catch (e) {
      console.error("读取csscpt.config.json文件失败");
    }
  }
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */

function resolveCompletionItem(item, token) {
  return null;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "less-complete" is now active!');
  let disposable = vscode.languages.registerCompletionItemProvider(
    "less",
    {
      provideCompletionItems,
      resolveCompletionItem
    },
    ":"
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
