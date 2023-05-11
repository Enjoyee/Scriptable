// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: user-astronaut;
/**
 * Author:LSP
 * Date:2023-05-11
 */
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230511';
console.log(`当前环境 👉👉👉👉👉 ${isDev ? 'DEV' : 'RELEASE'}`);
console.log(`----------------------------------------`);
// 分支
const branch = 'v2';
// 仓库根目录
const remoteGithubRoot = `https://raw.githubusercontent.com/Enjoyee/Scriptable/${branch}`;
const remoteHomeLandRoot = `https://glimmerk.coding.net/p/Scriptable/shared-depot/source/git/raw/${branch}`;
// 依赖包目录
const fm = FileManager.local();
const rootDir = fm.documentsDirectory();
const cacheDir = fm.joinPath(rootDir, 'LSP');
const dependencyFileName = isDev ? "_LSP.js" : `${cacheDir}/_LSP.js`;
// 下载依赖包
await downloadLSPDependency();
// -------------------------------------------------------
if (typeof require === 'undefined') require = importModule
// 引入相关方法
const { BaseWidget } = require(dependencyFileName);

// @定义小组件
class Widget extends BaseWidget {

  defaultPreference = {
    sourceIndex: '0',
    sourceArr: [
      { name: 'dopaminegirl' },
      { name: 'dounimei' },
    ]
  };

  getValueByKey = (key) => this.readWidgetSetting()[key] ?? this.defaultPreference[key];

  constructor(scriptName) {
    super(scriptName);
    this.backgroundColor = '#03071e,#03071e';
  }

  async getAppViewOptions() {
    return {
      showWidgetBg: false,
      widgetProvider: {
        small: true, // 是否提供小号组件
        medium: true, // 是否提供中号组件
        large: true, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [
        {
          name: 'photoHalving',
          label: '图片张数',
          type: 'select',
          icon: { name: 'photo.artframe', color: '#ef233c' },
          options: [
            { label: '占满组件', value: '1' },
            { label: '左右互搏', value: '2' },
            { label: '三分天下', value: '3' },
            { label: '四平八稳', value: '4' },
          ],
          default: "1"
        },
        {
          name: 'source',
          label: '图源选择',
          type: 'select',
          icon: { name: 'tray', color: '#a663cc', },
          options: [
            { label: 'dopaminegirl', value: '1' },
            { label: 'dounimei', value: '2' },
          ],
          default: "2"
        },
      ],
    };
  }

  async render({ widgetSetting, family }) {
    return await this.provideWidget(family, widgetSetting);
  }

  async provideWidget(widgetFamily, widgetSetting) {
    const photoHalving = widgetSetting.photoHalving ?? 1;
    const sourceIndex = Number(widgetSetting.source ?? '2');
    let name = '大号';
    switch (widgetFamily) {
      case 'small':
        name = '小号';
        break;

      case 'medium':
        name = '中号';
        break;
    }
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    widget.backgroundColor = new Color('#03071e');
    const imgRes = await this.loadMirrorPhotoRes(sourceIndex);
    const widgetSize = this.getWidgetSize(name);
    const widgetWidth = widgetSize.width + 10 * Device.screenScale();
    const widgetHeight = widgetSize.height + 6 * Device.screenScale();
    // 图片等分
    const picHalvingCache = Number(photoHalving);
    let imgStack;
    const divider = 3;
    switch (picHalvingCache) {
      case 2:
        stack.layoutHorizontally();
        imgStack = stack.addStack();
        imgStack.size = new Size(widgetWidth / 2, widgetHeight);
        await this.addStackImg(imgRes, imgStack);
        //
        stack.addSpacer(divider);
        imgStack = stack.addStack();
        imgStack.size = new Size(widgetWidth / 2, widgetHeight);
        await this.addStackImg(imgRes, imgStack);
        break;

      case 3:
        stack.layoutHorizontally();
        imgStack = stack.addStack();
        imgStack.size = new Size(widgetWidth * 0.6, widgetHeight);
        await this.addStackImg(imgRes, imgStack);
        //
        stack.addSpacer(divider);
        //
        imgStack = stack.addStack();
        imgStack.layoutVertically();
        let stack_3_1 = imgStack.addStack();
        stack_3_1.size = new Size(widgetWidth * 0.4, widgetHeight / 2);
        await this.addStackImg(imgRes, stack_3_1);
        //
        imgStack.addSpacer(divider);
        let stack_3_2 = imgStack.addStack();
        stack_3_2.size = new Size(widgetWidth * 0.4, widgetHeight / 2);
        await this.addStackImg(imgRes, stack_3_2);
        break;

      case 4:
        stack.layoutVertically();
        imgStack = stack.addStack();
        imgStack.layoutHorizontally();
        let stack_4_1 = imgStack.addStack();
        stack_4_1.size = new Size(widgetWidth / 2, widgetHeight / 2);
        await this.addStackImg(imgRes, stack_4_1);
        //
        imgStack.addSpacer(divider);
        let stack_4_2 = imgStack.addStack();
        stack_4_2.size = new Size(widgetWidth / 2, widgetHeight / 2);
        await this.addStackImg(imgRes, stack_4_2);
        //
        stack.addSpacer(divider);
        imgStack = stack.addStack();
        imgStack.layoutHorizontally();
        let stack_4_3 = imgStack.addStack();
        stack_4_3.size = new Size(widgetWidth / 2, widgetHeight / 2);
        await this.addStackImg(imgRes, stack_4_3);
        //
        imgStack.addSpacer(divider);
        let stack_4_4 = imgStack.addStack();
        stack_4_4.size = new Size(widgetWidth / 2, widgetHeight / 2);
        await this.addStackImg(imgRes, stack_4_4);
        break;

      default:
        stack.layoutVertically();
        imgStack = stack.addStack();
        imgStack.size = new Size(widgetWidth, widgetHeight);
        await this.addStackImg(imgRes, imgStack);
        break;
    }
    //=================================
    stack.addSpacer();
    return widget;
  }

  addStackImg = async (imgRes, imgStack) => {
    if (imgRes && imgRes.length > 0) {
      const index = parseInt(Math.random() * imgRes.length)
      let item = imgRes[index];
      imgRes.splice(index, 1);
      let imgUrl = item.url;
      imgStack.url = imgUrl;
      let img = await this.getImageByUrl(imgUrl, 'mirror', true);
      let imgSpan = imgStack.addImage(img);
      imgSpan.applyFillingContentMode();
    }
  }

  // --------------------------NET START--------------------------

  loadMirrorPhotoRes = async (source = 2) => {
    const imgResArr = [];
    switch (source) {
      case 1:
        const imgRes = await this.httpGet('https://dopaminegirl.com/api/art');
        imgRes.forEach(element => {
          imgResArr.push({ url: element.url });
        });
        break;

      case 2:
        const url = `https://www.dounimei.us/page/${parseInt(Math.random() * 80) + 1}?orderby=hot`;
        const headers = {
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36"
        };
        const webview = new WebView();
        const html = await this.httpGet(url, { jsonFormat: false, headers });
        await webview.loadHTML(html);
        const getData = `
          function getData() {
              let imgArr = []; 
              try {
                  let imgData = document.getElementsByTagName('img');
                  for (let index = 0; index < imgData.length; index++) {
                    let elementSrc = imgData[index].getAttribute("data-src");
                    if(elementSrc != null && elementSrc != undefined) {
                      let start = elementSrc.indexOf('?src=');
                      let end = elementSrc.lastIndexOf('&h');
                      imgArr.push({url : elementSrc.slice(start + 5, end)});
                    }
                  }
              } catch(e) {
                  console.log('抖你妹资源获取出错->' + e);
              }
              return imgArr;
          }
          getData();
        `
        const dounimeiRes = await webview.evaluateJavaScript(getData, false);
        dounimeiRes.forEach(element => {
          imgResArr.push({ url: element.url });
        });
        break;
    }
    return imgResArr;
  }

  // --------------------------NET END--------------------------

}

await new Widget(Script.name()).run();


// =================================================================================
// =================================================================================
async function downloadLSPDependency() {
  let fm = FileManager.local();
  const fileName = fm.joinPath(fm.documentsDirectory(), `LSP/${Script.name()}/settings.json`);
  const fileExists = fm.fileExists(fileName);
  let cacheString = '{}';
  if (fileExists) {
    cacheString = fm.readString(fileName);
  }
  const use_github = JSON.parse(cacheString)['use_github'];
  const dependencyURL = `${use_github ? remoteGithubRoot : remoteHomeLandRoot}/_LSP.js`;
  const update = needUpdateDependency();
  if (isDev) {
    const iCloudPath = FileManager.iCloud().documentsDirectory();
    const localIcloudDependencyExit = fm.isFileStoredIniCloud(`${iCloudPath}/_LSP.js`);
    const localDependencyExit = fm.fileExists(`${rootDir}/_LSP.js`);
    const fileExist = localIcloudDependencyExit || localDependencyExit;
    console.log(`🚀 DEV开发依赖文件${fileExist ? '已存在 ✅' : '不存在 🚫'}`);
    if (!fileExist || update) {
      console.log(`🤖 DEV 开始${update ? '更新' + dependencyLSP : '下载'}依赖~`);
      keySave('VERSION', dependencyLSP);
      await downloadFile2Scriptable('_LSP', dependencyURL);
    }
    return;
  }

  //////////////////////////////////////////////////////////
  console.log(`----------------------------------------`);
  const remoteDependencyExit = fm.fileExists(`${cacheDir}/_LSP.js`);
  console.log(`🚀 RELEASE依赖文件${remoteDependencyExit ? '已存在 ✅' : '不存在 🚫'}`);
  // ------------------------------
  if (!remoteDependencyExit || update) { // 下载依赖
    // 创建根目录
    if (!fm.fileExists(cacheDir)) {
      fm.createDirectory(cacheDir, true);
    }
    // 下载
    console.log(`🤖 RELEASE开始${update ? '更新' : '下载'}依赖~`);
    console.log(`----------------------------------------`);
    const req = new Request(dependencyURL);
    const moduleJs = await req.load();
    if (moduleJs) {
      fm.write(fm.joinPath(cacheDir, '/_LSP.js'), moduleJs);
      keySave('VERSION', dependencyLSP);
      console.log('✅ LSP远程依赖环境下载成功！');
      console.log(`----------------------------------------`);
    } else {
      console.error('🚫 获取依赖环境脚本失败，请重试！');
      console.log(`----------------------------------------`);
    }
  }
}

/**
 * 获取保存的文件名
 * @param {*} fileName 
 * @returns 
 */
function getSaveFileName(fileName) {
  const hasSuffix = fileName.lastIndexOf(".") + 1;
  return !hasSuffix ? `${fileName}.js` : fileName;
};

/**
 * 保存文件到Scriptable软件目录，app可看到
 * @param {*} fileName 
 * @param {*} content 
 * @returns 
 */
function saveFile2Scriptable(fileName, content) {
  try {
    const fm = FileManager.iCloud();
    let fileSimpleName = getSaveFileName(fileName);
    const filePath = fm.joinPath(fm.documentsDirectory(), fileSimpleName);
    fm.writeString(filePath, content);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 下载js文件到Scriptable软件目录
 * @param {*} moduleName 名称 
 * @param {*} url 在线地址 
 * @returns 
 */
async function downloadFile2Scriptable(moduleName, url) {
  const req = new Request(url);
  const content = await req.loadString();
  return saveFile2Scriptable(`${moduleName}`, content);
};

/**
 * 是否需要更新依赖版本
 */
function needUpdateDependency() {
  return dependencyLSP != keyGet('VERSION');
};

function keySave(cacheKey, cache) {
  if (cache) {
    Keychain.set(Script.name() + cacheKey, cache);
  }
}

function keyGet(cacheKey, defaultValue = '') {
  if (Keychain.contains(Script.name() + cacheKey)) {
    return Keychain.get(Script.name() + cacheKey);
  } else {
    return defaultValue;
  }
}
// =================================================================================
// =================================================================================