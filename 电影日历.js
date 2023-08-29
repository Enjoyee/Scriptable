// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: film;
/**
 * Author:LSP
 * Date:2023-08-29
 */
// -------------------------------------------------------
// 是否是开发环境，配合手机端调试使用，正式发布设置为false
const isDev = false;
const dependencyLSP = '20230602';
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

  constructor(scriptName) {
    super(scriptName);
    this.domain = 'https://cikeee.cc';
    this.defaultConfig.refreshInterval = `${2 * 60}`;
    this.backgroundColor = '#f0f0f4,#161823';
    this.defaultConfig.bgType = '2';
    this.titleColor = Color.dynamic(new Color('#222222'), new Color('#AAAAAA'));
    this.descColor = Color.dynamic(new Color('#FFFFFF'), new Color('#EEEEEE'));
    this.subTitleColor = Color.dynamic(new Color('#555555'), new Color('#AAAAAA'));
  }

  async getAppViewOptions() {
    return {
      showWidgetBg: false,
      widgetProvider: {
        small: false, // 是否提供小号组件
        medium: false, // 是否提供中号组件
        large: true, // 是否提供大号组件
      },
      // 预览界面的组件设置item
      settingItems: [],
    };
  }

  async render({ widgetSetting, family }) {
    return await this.provideLargeWidget();
  }

  async provideLargeWidget() {
    const RES = await this.loadMovieCalendar();
    const { movieImg, movieDesc, movieName, movieInformation, movieRating, movieLink } = RES;
    const lunarInfo = await this.getLunarInfo();
    const infoLunarText = `农历${lunarInfo.infoLunarText}`;
    // ----------------------------------------
    const widgetSize = this.getWidgetSize('大号');
    //=================================
    const widget = new ListWidget();
    widget.setPadding(0, 0, 0, 0);
    //=================================
    let stack = widget.addStack();
    stack.size = new Size(widgetSize.width, widgetSize.height);
    stack.layoutVertically();
    stack.url = `${this.domain}${movieLink}`;
    // ----------------------------------------TOP
    let topStack = stack.addStack();
    topStack.layoutVertically();
    topStack.setPadding(0, 16, 16, 16);
    topStack.size = new Size(widgetSize.width, widgetSize.height * 0.7);
    let image = await this.getImageByUrl(`${this.domain}${movieImg}`);
    image = await this.loadShadowColor2Image(image, new Color('#000000', 0.4));
    widget.backgroundImage = image;
    topStack.addSpacer();
    //
    let textSpan = topStack.addText('❝');
    textSpan.textColor = this.descColor;
    textSpan.font = Font.lightSystemFont(20);
    //
    textSpan = topStack.addText(movieDesc);
    textSpan.textOpacity = 0.9;
    textSpan.textColor = this.descColor;
    textSpan.font = Font.systemFont(14);
    // ----------------------------------------BOTTOM
    let bottomStack = stack.addStack();
    bottomStack.backgroundColor = this.dynamicColor("#f0f0f4", "#161823");
    bottomStack.size = new Size(widgetSize.width, widgetSize.height * 0.3);
    bottomStack.layoutHorizontally();
    bottomStack.addSpacer(10);
    //
    let movieInfoStack = bottomStack.addStack();
    movieInfoStack.addSpacer();
    movieInfoStack.layoutVertically();
    textSpan = movieInfoStack.addText(`${movieName}`);
    textSpan.textColor = this.titleColor;
    textSpan.font = Font.mediumSystemFont(17);
    //
    let imgSpan;
    let ratingSize = new Size(18, 18);
    let ratingColor = new Color('#F8D454');
    movieInfoStack.addSpacer(6);
    let hStack = movieInfoStack.addStack();
    hStack.layoutHorizontally();
    hStack.centerAlignContent();
    hStack.addSpacer(6);
    let emptyStar = this.getSFSymbol('star');
    let fillStar = this.getSFSymbol('star.fill');
    let halfStar = this.getSFSymbol('star.leadinghalf.filled');
    const fillCount = Math.floor(movieRating / 2);
    const remainCount = movieRating / 2 - fillCount;
    let totalCount = 0;
    for (let index = 0; index < fillCount; index++) {
      totalCount += 1;
      imgSpan = hStack.addImage(fillStar);
      imgSpan.tintColor = ratingColor;
      imgSpan.imageSize = ratingSize;
      hStack.addSpacer(2);
    }
    if (remainCount >= 0.5) {
      totalCount += 1;
      if (halfStar == undefined) {
        halfStar = emptyStar;
      }
      imgSpan = hStack.addImage(halfStar);
      imgSpan.tintColor = ratingColor;
      imgSpan.imageSize = ratingSize;
      hStack.addSpacer(2);
    }
    for (let index = 0; index < 5 - totalCount; index++) {
      imgSpan = hStack.addImage(emptyStar);
      imgSpan.tintColor = ratingColor;
      imgSpan.imageSize = ratingSize;
    }
    hStack.addSpacer(8);
    textSpan = hStack.addText(`豆瓣评分${movieRating}`);
    textSpan.textColor = this.subTitleColor;
    textSpan.font = Font.semiboldSystemFont(12);
    //
    movieInfoStack.addSpacer(6);
    hStack = movieInfoStack.addStack();
    hStack.layoutHorizontally();
    hStack.addSpacer(8)
    textSpan = hStack.addText(`${movieInformation}`);
    textSpan.textColor = this.subTitleColor;
    textSpan.font = Font.semiboldSystemFont(13);
    movieInfoStack.addSpacer();
    // ----------------------------------------
    bottomStack.addSpacer();
    const currDate = new Date();
    let dateStack = bottomStack.addStack();
    dateStack.url = `https://www.cikeee.com/wangri`;
    dateStack.centerAlignContent();
    dateStack.size = new Size(110, 0);
    dateStack.layoutVertically();
    hStack = dateStack.addStack();
    hStack.addSpacer();
    let date = currDate.getDate();
    textSpan = hStack.addText(date < 10 ? `0${date}` : `${date}`);
    hStack.addSpacer();
    textSpan.textColor = this.titleColor;
    textSpan.font = Font.semiboldSystemFont(48);
    //
    let month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][currDate.getMonth()];
    let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currDate.getDay()];
    hStack = dateStack.addStack();
    hStack.addSpacer();
    textSpan = hStack.addText(`${month} | ${week}`);
    hStack.addSpacer();
    textSpan.textColor = this.subTitleColor;
    textSpan.font = Font.mediumSystemFont(13);
    //
    dateStack.addSpacer(4);
    hStack = dateStack.addStack();
    hStack.addSpacer();
    textSpan = hStack.addText(`${infoLunarText}`);
    hStack.addSpacer();
    textSpan.textColor = this.subTitleColor;
    textSpan.font = Font.mediumSystemFont(13);
    bottomStack.addSpacer(6);
    //=================================
    return widget;
  }

  // --------------------------NET START--------------------------
  async loadHTML(url) {
    let req = new Request(url);
    req.headers = {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
    };
    let html = await req.loadString();
    return html.replace(/(\r\n|\n|\r)/gm, "");
  }

  async loadMovieCalendar() {
    const link = this.domain;
    let response = undefined;
    try {
      const ufm = this.useFileManager();
      const webview = new WebView();
      const cacheFileName = this.md5(link);
      const lastCacheTime = ufm.getCacheModifyDate(cacheFileName);
      const timeInterval = Math.floor((this.getCurrentTimeStamp() - lastCacheTime) / 60);
      // 读取本地缓存
      const localCache = ufm.readStringCache(cacheFileName);
      const canUseCache = localCache != null && localCache.length > 0;
      // 过时且有本地缓存则直接返回本地缓存数据 
      const { refreshInterval = '0' } = this.readWidgetSetting();
      const shouldLoadCache = timeInterval <= Number(refreshInterval) && canUseCache;
      let html = undefined;
      if (!shouldLoadCache) {
        console.log(`-->>在线加载网页数据：${link}`);
        html = await this.loadHTML(link);
        ufm.writeStringCache(cacheFileName, html);
      } else {
        html = ufm.readStringCache(cacheFileName);
        console.log(`-->>加载缓存网页数据：${link}`);
      }
      await webview.loadHTML(html);
      const getData =
        `
        function getData() {
            let movieImg = document.getElementById('movie-img').src;
            let movieDesc = document.querySelector('span#movie-text').textContent;
            let movieName = document.querySelector('a#movie-name').textContent.replaceAll('——', '');
            let movieInformation = document.querySelector('a#movie-information').textContent;
            let movieRating = movieInformation.slice(0, 3);
            movieInformation = movieInformation.slice(5);
            let movieLink = document.querySelector('a#movie-img-a').href;
            return { movieImg, movieDesc, movieName, movieInformation, movieRating, movieLink };
        }
        getData()
      `
      // 热榜数据
      response = await webview.evaluateJavaScript(getData, false);
      if (response.titleArr?.length > 0) {
        this.useFileManager().writeStringCache('movieCalendar', JSON.stringify(response));
      }
    } catch (error) {
      console.error(`🚫 请求数据出错了=>${error}`);
      response = JSON.parse(this.useFileManager().readStringCache('movieCalendar'));
    }
    return response;
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